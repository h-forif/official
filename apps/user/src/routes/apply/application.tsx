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
import { getAllStudies } from '@services/study.service';
import { getApplication, getUserInfo } from '@services/user.service';
import { createFileRoute } from '@tanstack/react-router';
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
      getUserInfo(),
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
  const { application, studies, userInfo } = loaderData;
  const { id, name, department, phoneNumber } = userInfo;
  const options: SelectOption[] = [
    {
      value: '0',
      label: '자율스터디 부원으로 신청하기',
    },
    ...studies.map((study) => ({
      value: study.id.toString(),
      label: study.name,
    })),
  ];

  const secondary_options: SelectOption[] = options.filter(
    (option) => option.value !== application.primaryStudy.id.toString(),
  );

  const form = useForm<z.infer<typeof ApplyMemberSchema>>({
    resolver: zodResolver(ApplyMemberSchema),
    defaultValues: {
      primaryStudy: application.primaryStudy.id.toString(),
      primaryIntro: application.secondaryStudy.introduction,
      secondaryStudy: application.secondaryStudy.id.toString(),
      secondaryIntro: application.secondaryStudy.introduction,
      isPrimaryStudyOnly: application.secondaryStudy.id === 0,
      applyPath: application.applyPath,
    },
  });

  const isPrimaryStudyOnly = form.watch('isPrimaryStudyOnly');
  const primaryStudy = form.watch('primaryStudy');

  const onSubmit = async (formData: z.infer<typeof ApplyMemberSchema>) => {
    const data = refineApplyForm(formData);
    console.log(data);
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
              defaultValue={phoneNumber}
              disabled
            />
          </Stack>
          <Stack gap={5} justifyContent={'center'} alignItems={'center'} my={4}>
            <Typography variant='titleSmall'>1순위 스터디 신청서</Typography>
            <FormSelect
              control={form.control}
              name='primaryStudy'
              options={options}
              minWidth={'100%'}
              required
              label='1순위 스터디를 선택해주세요.'
            />
            <FormInput
              control={form.control}
              name='primaryIntro'
              label='1순위 스터디 신청 사유를 작성해주세요.'
              fullWidth
              multiline
              maxRows={4}
              disabled={primaryStudy === '0'}
            />
            <Typography variant='titleSmall'>2순위 스터디 신청서</Typography>
            <FormCheckbox
              control={form.control}
              name='isPrimaryStudyOnly'
              label='1순위 스터디 미선정 시 2순위 스터디 미수강'
              sx={{
                display: 'flex',
                justifyContent: 'flex-start',
              }}
              disabled={primaryStudy === '0'}
            />
            {isPrimaryStudyOnly && (
              <Typography
                variant='labelSmall'
                color={'error'}
                fontWeight={'300'}
              >
                2순위 스터디를 다시 수강하고 싶을 때 2순위 스터디 지원서를 다시
                작성해야 합니다. 1순위 스터디 지원서는 저장됩니다.
              </Typography>
            )}
            <FormSelect
              control={form.control}
              name='secondaryStudy'
              options={secondary_options}
              minWidth={'100%'}
              disabled={isPrimaryStudyOnly || primaryStudy === '0'}
              label='2순위 스터디를 선택해주세요.'
            />
            <FormInput
              control={form.control}
              name='secondaryIntro'
              label='2순위 스터디 신청 사유를 작성해주세요.'
              fullWidth
              multiline
              disabled={
                isPrimaryStudyOnly ||
                form.watch('secondaryStudy') === '0' ||
                primaryStudy === '0'
              }
              maxRows={4}
            />
            <Typography variant='titleSmall'>포리프를 접한 경로</Typography>
            <FormSelect
              control={form.control}
              options={APPLY_PATH_OPTIONS}
              name='applyPath'
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
