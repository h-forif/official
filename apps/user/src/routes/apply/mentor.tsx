import { useEffect, useState } from 'react';
import { UseFormReturn, useForm } from 'react-hook-form';

import { Box, Stack } from '@mui/material';

import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@packages/components/Button';
import { UserProfile } from '@packages/components/types/user';
import { applyStudy } from '@services/study.service';
import { DialogIconType, useDialogStore } from '@stores/dialog.store';
import { createFileRoute, useBlocker } from '@tanstack/react-router';
import { getCurrentTerm } from '@utils/getCurrentTerm';
import { handleGlobalError } from '@utils/handleGlobalError';
import dayjs from 'dayjs';
import { getUser } from 'src/services/user.service';
import { ApplyMentorSchema } from 'src/types/apply.schema';
import { z } from 'zod';

import { Title } from '@components/Title';
import ApplyMentorStepper from '@components/apply/mentor/ApplyMentorStepper';
import { MentorInfo } from '@components/apply/mentor/steps/MentorInfo';
import { StudyInfo } from '@components/apply/mentor/steps/StudyInfo';
import { StudyPlan } from '@components/apply/mentor/steps/StudyPlan';
import { StudySubmit } from '@components/apply/mentor/steps/StudySubmit';
import BlockModal from '@components/common/BlockModal';

const STORAGE_KEY = 'applyMentorForm';

export const Route = createFileRoute('/apply/mentor')({
  loader: async () => getUser(),
  onError: ({ error }) => {
    handleGlobalError(error);
  },
  component: ApplyMember,
});

const steps = ['신청 부원 정보', '스터디 소개', '스터디 계획서', '신청 완료'];

function ApplyMember() {
  const user = Route.useLoaderData();
  const currentTerm = getCurrentTerm();
  const [activeStep, setActiveStep] = useState(0);
  const { closeDialog, openSingleButtonDialog } = useDialogStore();

  const form = useForm<z.infer<typeof ApplyMentorSchema>>({
    resolver: zodResolver(ApplyMentorSchema),
    defaultValues: {
      name: '',
      one_liner: '',
      difficulty: '',
      location: '',
      week_day: '',
      start_time: dayjs(null),
      end_time: dayjs(null),
      primary_mentor_name: user.name!,
      primary_mentor_id: user.id!,
      secondary_mentor: false,
      explanation: '',
      secondary_mentor_id: '',
      secondary_mentor_name: '',
      study_plans: Array(15).fill({ section: '', contents: [''] }),
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
        return <StudyPlan form={form} />;
      case 3:
        return <StudySubmit form={form} />;
    }
  };

  const { proceed, reset, status } = useBlocker({
    condition: form.formState.isDirty,
  });

  useEffect(() => {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { start_time, end_time, ...rest } = parsedData;
      form.reset(rest);
    }
  }, [form]);

  const handleSaveDraft = () => {
    const formData = form.getValues();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
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
    if (activeStep === 3) {
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
    }
    if (isValid) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const onSubmit = async (formData: z.infer<typeof ApplyMentorSchema>) => {
    try {
      await applyStudy(formData);
      openSingleButtonDialog({
        dialogIconType: DialogIconType.CONFIRM,
        title: '스터디 지원서 제출 완료',
        message: '스터디 지원서 제출이 완료되었습니다.',
        mainButtonText: '확인',
        mainButtonAction: () => {
          closeDialog();
        },
      });
    } catch (err) {
      handleGlobalError(err);
    }
  };

  return (
    <>
      <Box component={'main'} mt={8}>
        <Title
          title={`${currentTerm.year}년도 ${currentTerm.semester}학기 스터디 개설`}
          label='2024-08-26 ~ 2024-09-11'
          mb={3}
        />
        <ApplyMentorStepper steps={steps} activeStep={activeStep} />
        <Box
          sx={{
            width: { xs: '100%', md: '512px' },
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
                {activeStep === 3 ? '제출' : '다음'}
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
