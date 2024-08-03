import { useForm } from 'react-hook-form';

import { Box, Stack, Typography } from '@mui/material';

import { APPLY_PATH_OPTIONS } from '@constants/apply.constant';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@packages/components/Button';
import { Input } from '@packages/components/Input';
import { SelectOption } from '@packages/components/Select';
import { FormCheckbox } from '@packages/components/form/FormCheckbox';
import { FormInput } from '@packages/components/form/FormInput';
import { FormSelect } from '@packages/components/form/FormSelect';
import { getApplication, updateApplication } from '@services/apply.service';
import { getAllStudies } from '@services/study.service';
import { getUser } from '@services/user.service';
import { DialogIconType, useDialogStore } from '@stores/dialog.store';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { handleGlobalError } from '@utils/handleGlobalError';
import { refineApplyForm } from '@utils/refine';
import dayjs from 'dayjs';
import { ApplyMemberSchema } from 'src/types/apply.schema';
import { z } from 'zod';

import { Title } from '@components/Title';
import CautionList from '@components/apply/application/CautionList';

export const Route = createFileRoute('/apply/application')({
  loader: async () => {
    const [application, userInfo, studies] = await Promise.all([
      getApplication(),
      getUser(),
      getAllStudies({ year: 2024, semester: 1 }),
    ]);
    return { application, userInfo, studies };
  },
  onError: ({ error }) => {
    console.error(error);
  },
  component: MyApplication,
});

function MyApplication() {
  const loaderData = Route.useLoaderData();
  const navigate = useNavigate();
  const { application, studies, userInfo } = loaderData;

  const { id, name, department, phone_number } = userInfo;
  const options: SelectOption[] = studies.map((study) => ({
    value: study.id.toString(),
    label: study.name,
  }));
  const { openSingleButtonDialog, closeDialog } = useDialogStore();

  const secondary_options: SelectOption[] = options.filter(
    (option) => option.value !== application.primary_study.id.toString(),
  );

  const form = useForm<z.infer<typeof ApplyMemberSchema>>({
    resolver: zodResolver(ApplyMemberSchema),
    defaultValues: {
      primary_study: application.primary_study.id.toString(),
      primary_intro: application.secondary_study.introduction,
      secondary_study: application.secondary_study.id.toString(),
      secondary_intro: application.secondary_study.introduction || '',
      is_primary_study_only: application.secondary_study.id === null,
      apply_path: application.apply_path,
    },
  });

  const is_primary_study_only = form.watch('is_primary_study_only');
  const primary_study = form.watch('primary_study');

  const onSubmit = async (formData: z.infer<typeof ApplyMemberSchema>) => {
    const application = refineApplyForm(formData);
    try {
      await updateApplication(application);
      openSingleButtonDialog({
        dialogIconType: DialogIconType.CONFIRM,
        title: '스터디 신청서 수정 완료',
        mainButtonText: '확인',
        mainButtonAction: () => {
          closeDialog();
          navigate({ to: '/profile/application' });
        },
      });
    } catch (error) {
      handleGlobalError(error);
    }
  };

  return (
    <Box component={'main'}>
      <Box
        sx={{
          width: { xs: '100%', md: '512px' },
          px: { xs: 2 },
          pb: 4,
          margin: 'auto',
        }}
      >
        <Title
          title='내 스터디 신청서'
          label={`최종 제출일: ${dayjs(application.timestamp).format('YYYY년 MM월 DD일 HH시 mm분')}`}
          mb={3}
        />
        <CautionList />
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Stack gap={5} justifyContent={'center'} alignItems={'center'} my={4}>
            <Typography variant='titleSmall'>신청 부원 정보</Typography>
            <Input required fullWidth label='학번' defaultValue={id} disabled />
            <Input
              required
              fullWidth
              label='이름'
              defaultValue={name}
              disabled
            />
            <Input
              required
              fullWidth
              label='학과'
              defaultValue={department}
              disabled
            />
            <Input
              required
              fullWidth
              label='전화번호'
              defaultValue={phone_number}
              disabled
            />
          </Stack>
          <Stack gap={5} justifyContent={'center'} alignItems={'center'} my={4}>
            <Typography variant='titleSmall'>1순위 스터디 신청서</Typography>
            <FormSelect
              control={form.control}
              name='primary_study'
              options={options}
              minWidth={'100%'}
              required
              label='1순위 스터디를 선택해주세요.'
            />
            <FormInput
              control={form.control}
              name='primary_intro'
              label='1순위 스터디 신청 사유를 작성해주세요.'
              required
              multiline
              fullWidth
              maxRows={4}
              disabled={primary_study === '0'}
            />
            <Typography variant='titleSmall'>2순위 스터디 신청서</Typography>
            <FormCheckbox
              control={form.control}
              name='is_primary_study_only'
              label='1순위 스터디 미선정 시 2순위 스터디 미수강'
              sx={{
                display: 'flex',
                justifyContent: 'flex-start',
              }}
              disabled={primary_study === '0'}
            />
            <FormSelect
              control={form.control}
              name='secondary_study'
              options={secondary_options}
              minWidth={'100%'}
              disabled={is_primary_study_only || primary_study === '0'}
              label='2순위 스터디를 선택해주세요.'
            />
            <FormInput
              control={form.control}
              name='secondary_intro'
              label='2순위 스터디 신청 사유를 작성해주세요.'
              fullWidth
              multiline
              disabled={
                is_primary_study_only ||
                form.watch('secondary_study') === '0' ||
                primary_study === '0'
              }
              maxRows={4}
            />
            <Typography variant='titleSmall'>포리프를 접한 경로</Typography>
            <FormSelect
              control={form.control}
              options={APPLY_PATH_OPTIONS}
              name='apply_path'
              minWidth={'100%'}
              label='포리프를 접하게 된 경로를 작성해주세요.'
            />
          </Stack>
          <Button
            type='submit'
            variant='contained'
            size='large'
            fullWidth
            disabled={!form.formState.isDirty}
          >
            수정
          </Button>
        </form>
      </Box>
    </Box>
  );
}
