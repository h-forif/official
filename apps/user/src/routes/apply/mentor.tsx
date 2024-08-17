import { useEffect, useState } from 'react';
import { UseFormReturn, useForm } from 'react-hook-form';

import { Box, Stack } from '@mui/material';

import {
  MENTOR_RECRUIT_END_DATE,
  MENTOR_RECRUIT_START_DATE,
} from '@constants/apply.constant';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@packages/components/Button';
import { UserProfile } from '@packages/components/types/user';
import { applyStudy } from '@services/apply.service';
import { DialogIconType, useDialogStore } from '@stores/dialog.store';
import {
  createFileRoute,
  useBlocker,
  useNavigate,
} from '@tanstack/react-router';
import dayjs from '@utils/dayjs';
import { getCurrentTerm } from '@utils/getCurrentTerm';
import { handleGlobalError } from '@utils/handleGlobalError';
import { getUser } from 'src/services/user.service';
import { ApplyMentorSchema } from 'src/types/apply.schema';
import { z } from 'zod';

import { Title } from '@components/Title';
import ApplyMentorStepper from '@components/apply/mentor/ApplyMentorStepper';
import { MentorInfo } from '@components/apply/mentor/steps/MentorInfo';
import { StudyExplanation } from '@components/apply/mentor/steps/StudyExplanation';
import { StudyInfo } from '@components/apply/mentor/steps/StudyInfo';
import { StudyPlan } from '@components/apply/mentor/steps/StudyPlan';
import { StudySubmit } from '@components/apply/mentor/steps/StudySubmit';
import BlockModal from '@components/common/BlockModal';

import { usePeriod } from '@hooks/usePeriod';

const STORAGE_KEY = 'applyMentorForm';

export const Route = createFileRoute('/apply/mentor')({
  loader: async () => getUser(),
  onError: ({ error }) => {
    handleGlobalError(error);
  },
  component: ApplyMember,
});

const steps = [
  '신청 부원 정보',
  '스터디 소개',
  '스터디 설명',
  '스터디 계획서',
  '신청 완료',
];

function ApplyMember() {
  const user = Route.useLoaderData();
  const currentTerm = getCurrentTerm();
  const [activeStep, setActiveStep] = useState(0);
  const { closeDialog, openSingleButtonDialog } = useDialogStore();
  const navigate = useNavigate();

  const { isIncluded } = usePeriod(
    MENTOR_RECRUIT_START_DATE,
    MENTOR_RECRUIT_END_DATE,
  );

  useEffect(() => {
    if (!isIncluded) {
      alert(
        '스터디 개설 신청 기간이 아닙니다. 추가 개설 신청 문의는 공식 메일(contact@forif.org)로 문의해주세요.',
      );
      navigate({ to: '/' });
    }
  }, [isIncluded, navigate]);

  const form = useForm<z.infer<typeof ApplyMentorSchema>>({
    resolver: zodResolver(ApplyMentorSchema),
    defaultValues: {
      name: '',
      one_liner: '',
      difficulty: '',
      location: '',
      week_day: '',
      tag: '',
      start_time: '',
      end_time: '',
      primary_mentor_name: user.name!,
      primary_mentor_id: user.id?.toString(),
      secondary_mentor: false,
      explanation:
        '# 마크다운 작성법<br/>  이렇게 작성하면 됩니다. 설명은 반드시 50자 이상으로 작성해주세요!',
      secondary_mentor_id: '',
      secondary_mentor_name: '',
      study_apply_plans: Array(15).fill({ section: '', content: [''] }),
    },
  });

  const renderStep = (
    activeStep: number,
    form: UseFormReturn<z.infer<typeof ApplyMentorSchema>>,
    user: UserProfile,
  ) => {
    switch (activeStep) {
      case 0:
        return <MentorInfo form={form} userInfo={user} />;
      case 1:
        return <StudyInfo form={form} />;
      case 2:
        return <StudyExplanation form={form} />;
      case 3:
        return <StudyPlan form={form} />;
      case 4:
        return <StudySubmit form={form} />;
    }
  };

  const { proceed, reset, status } = useBlocker({
    condition: form.formState.isDirty && activeStep !== 4,
  });

  useEffect(() => {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      form.reset(parsedData);
    }
  }, [form]);

  const handleSaveDraft = () => {
    const formData = form.getValues();

    const transformedData = {
      ...formData,
      start_time: formData.start_time
        ? dayjs(formData.start_time).format('YYYY-MM-DDTHH:mm:ssZ') // 로컬 시간대로 포맷팅
        : null,
      end_time: formData.end_time
        ? dayjs(formData.end_time).format('YYYY-MM-DDTHH:mm:ssZ') // 로컬 시간대로 포맷팅
        : null,
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(transformedData));
    openSingleButtonDialog({
      dialogIconType: DialogIconType.CONFIRM,
      title: '스터디 지원서 저장 완료',
      message: '임시 저장이 완료되었습니다.',
      mainButtonText: '확인',
      mainButtonAction: () => {
        closeDialog();
      },
    });
  };

  const handlePrevious = () => {
    if (activeStep === 0) return;
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleNext = async () => {
    if (activeStep === 4) {
      const formData = form.getValues();

      onSubmit(formData);
      return;
    }

    let isValid = true;
    if (activeStep === 0) {
      isValid = await form.trigger([
        'secondary_mentor',
        'secondary_mentor_id',
        'secondary_mentor_name',
      ]);
    } else if (activeStep === 1) {
      isValid = await form.trigger([
        'name',
        'one_liner',
        'difficulty',
        'start_time',
        'end_time',
        'week_day',
        'location',
      ]);
    } else if (activeStep === 2) {
      isValid = await form.trigger(['explanation']);
    }
    if (isValid) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const onSubmit = async (formData: z.infer<typeof ApplyMentorSchema>) => {
    const transformedData = {
      ...formData,
      start_time: dayjs(formData.start_time).format('HH:mm'),
      end_time: dayjs(formData.end_time).format('HH:mm'),
      study_apply_plans: formData.study_apply_plans.map((plan) => ({
        ...plan,
        content: Array.isArray(plan.content)
          ? plan.content.join(';')
          : plan.content,
      })),
    };
    try {
      await applyStudy(transformedData);
      openSingleButtonDialog({
        dialogIconType: DialogIconType.CONFIRM,
        title: '스터디 지원서 제출 완료',
        message:
          '스터디 지원서 제출이 완료되었습니다. 스터디 승인 결과는 빠른 시일 내에 문자로 알려드릴 예정입니다.',
        mainButtonText: '메인 페이지로 이동',
        mainButtonAction: () => {
          closeDialog();
          navigate({ to: '/' });
        },
      });
    } catch (err) {
      handleGlobalError(err);
    }
  };

  return (
    <>
      <Box mt={8}>
        <Title
          title={`${currentTerm.year}년도 ${currentTerm.semester}학기 스터디 개설`}
          label='2024-08-13 ~ 2024-08-16'
          mb={3}
        />
        <ApplyMentorStepper steps={steps} activeStep={activeStep} />
        <Box
          sx={{
            width: { xs: '100%', md: activeStep === 2 ? '100%' : '512px' },
            px: { xs: 2 },
            py: 4,
            margin: 'auto',
          }}
        >
          <form onSubmit={form.handleSubmit(onSubmit)}>
            {renderStep(activeStep, form, user)}
            <Button
              variant='outlined'
              fullWidth
              onClick={handleSaveDraft}
              disabled={!form.formState.isDirty}
              sx={{ mb: 2 }}
            >
              임시 저장
            </Button>
            <Stack direction={'row'} gap={2}>
              <Button
                variant='outlined'
                size='large'
                fullWidth
                onClick={handlePrevious}
                disabled={activeStep === 0}
              >
                이전
              </Button>
              <Button
                variant='contained'
                size='large'
                fullWidth
                onClick={handleNext}
              >
                {activeStep === 4 ? '제출' : '다음'}
              </Button>
            </Stack>
          </form>
        </Box>
      </Box>

      {status === 'blocked' && (
        <BlockModal
          title='스터디 개설 신청서 작성 중입니다.'
          description='신청서의 내용을 저장하지 않고 다른 페이지로 이동시에 작성중인 신청서의
          내용이 사라질 수 있습니다.'
          proceed={proceed}
          reset={reset}
        />
      )}
    </>
  );
}
