import { useState } from 'react';
import { UseFormReturn, useForm } from 'react-hook-form';

import { Box, Stack } from '@mui/material';

import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@packages/components/Button';
import { UserProfile } from '@packages/components/types/user';
import { DialogIconType, useDialogStore } from '@stores/dialog.store';
import { createFileRoute, useBlocker } from '@tanstack/react-router';
import { getCurrentTerm } from '@utils/getCurrentTerm';
import { handleGlobalError } from '@utils/handleGlobalError';
import dayjs from 'dayjs';
import { getUserInfo } from 'src/services/user.service';
import { ApplyMentorSchema } from 'src/types/apply.schema';
import { z } from 'zod';

import { Title } from '@components/Title';
import ApplyMentorStepper from '@components/apply/mentor/ApplyMentorStepper';
import { MentorInfo } from '@components/apply/mentor/steps/MentorInfo';
import { StudyInfo } from '@components/apply/mentor/steps/StudyInfo';
import { StudyPlan } from '@components/apply/mentor/steps/StudyPlan';
import BlockModal from '@components/common/BlockModal';

const STORAGE_KEY = 'applyMentorForm';

export const Route = createFileRoute('/apply/mentor')({
  loader: async () => getUserInfo(),
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
      studyName: '',
      oneLiner: '',
      difficulty: '',
      location: '',
      weekDay: '',
      startTime: dayjs(null),
      endTime: dayjs(null),
      secondaryMentor: false,
      secondaryMentorId: '',
      secondaryMentorName: '',
      studyPlan: Array(15).fill({ section: '', contents: [''] }),
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
      default:
        return <MentorInfo form={form} userInfo={user} />;
    }
  };

  const { proceed, reset, status } = useBlocker({
    condition: form.formState.isDirty,
  });

  // useEffect(() => {
  //   const savedData = localStorage.getItem(STORAGE_KEY);
  //   if (savedData) {
  //     const parsedData = JSON.parse(savedData);
  //     // eslint-disable-next-line @typescript-eslint/no-unused-vars
  //     const { startTime, endTime, ...rest } = parsedData;
  //     form.reset(rest);
  //   }
  // }, [form]);

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
    if (activeStep === 3) return;

    let isValid = true;
    if (activeStep === 0) {
      isValid = await form.trigger([
        'secondaryMentor',
        'secondaryMentorId',
        'secondaryMentorName',
      ]);
    } else if (activeStep === 1) {
      isValid = await form.trigger([
        'studyName',
        'oneLiner',
        'difficulty',
        'startTime',
        'endTime',
        'weekDay',
        'location',
      ]);
    }
    if (isValid) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const onSubmit = async (formData: z.infer<typeof ApplyMentorSchema>) => {
    console.log(formData);
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
            <Button variant='outlined' fullWidth onClick={handleSaveDraft}>
              임시 저장
            </Button>
            <Stack direction={'row'} gap={2}>
              <Button
                variant='outlined'
                size='large'
                fullWidth
                onClick={handlePrevious}
              >
                이전
              </Button>
              <Button
                variant='contained'
                size='large'
                fullWidth
                onClick={handleNext}
              >
                다음
              </Button>
            </Stack>
          </form>
        </Box>
      </Box>

      {status === 'blocked' && <BlockModal proceed={proceed} reset={reset} />}
    </>
  );
}
