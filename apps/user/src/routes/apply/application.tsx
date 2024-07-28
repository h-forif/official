import { ChangeEvent } from 'react';
import { Controller, useForm } from 'react-hook-form';

import {
  Box,
  Checkbox,
  FormControlLabel,
  Stack,
  TextField,
  Typography,
} from '@mui/material';

import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@packages/components/Button';
import { Input } from '@packages/components/Input';
import { Select, SelectOption } from '@packages/components/Select';
import { getAllStudies } from '@services/study.service';
import { getApplication, getUserInfo } from '@services/user.service';
import { createFileRoute } from '@tanstack/react-router';
import { ApplyMemberSchema } from 'src/types/apply.schema';
import { z } from 'zod';

import { Title } from '@components/Title';

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

  const { id, name, department, phoneNumber } = loaderData.userInfo;
  const form = useForm<z.infer<typeof ApplyMemberSchema>>({
    resolver: zodResolver(ApplyMemberSchema),
    defaultValues: {
      primaryStudy: loaderData.application.primaryStudy,
      primaryIntro: loaderData.application.primaryIntro,
      secondaryStudy: loaderData.application.secondaryStudy,
      secondaryIntro: loaderData.application.secondaryIntro,
      isPrimaryStudyOnly: false,
    },
  });

  const isPrimaryStudyOnly = form.watch('isPrimaryStudyOnly');

  const options: SelectOption[] = [
    {
      value: '0',
      label: '자율스터디 부원으로 신청하기',
    },
    ...loaderData.studies.map((study) => ({
      value: study.id.toString(),
      label: study.name,
    })),
  ];

  const handleCheckBoxChange = (e: ChangeEvent<HTMLInputElement>) => {
    form.setValue('isPrimaryStudyOnly', e.target.checked, {
      shouldDirty: true,
    });
  };

  const onSubmit = async (formData: z.infer<typeof ApplyMemberSchema>) => {
    console.log(formData);
    // const res = await authApi
    //   .post('/apply', {
    //     primary_study: formData.primaryStudy,
    //     primary_intro: formData.primaryIntro,
    //     apply_path: formData.applyPath,
    //   })
    //   .then((res) => res.data);
  };

  return (
    <>
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
            label='최종 제출일: 2024-09-10'
            mb={3}
          />
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <Stack
              gap={5}
              justifyContent={'center'}
              alignItems={'center'}
              my={4}
            >
              <Typography variant='titleSmall'>개인 정보</Typography>
              <Input
                required
                fullWidth
                label='학번'
                defaultValue={id}
                disabled
              />
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
            <Stack
              gap={5}
              justifyContent={'center'}
              alignItems={'center'}
              my={4}
            >
              <Typography variant='titleSmall'>1순위 스터디 신청서</Typography>
              <Select
                id='primary-study-select'
                placeholder='1순위 스터디를 신청해주세요.'
                val={loaderData.application.primaryStudy}
                options={options}
                required
                disabled
                minWidth={'100%'}
              />
              <Controller
                name='primaryIntro'
                control={form.control}
                render={({ field, fieldState }) => (
                  <TextField
                    fullWidth
                    id='primary-intro-textfield'
                    label='1순위 스터디 신청 사유를 작성해주세요.'
                    multiline
                    required
                    maxRows={4}
                    value={field.value}
                    onChange={field.onChange}
                    helperText={
                      fieldState.error
                        ? '50자 이상, 500자 이하로 작성해주세요.'
                        : '신청 사유는 50자 이상, 500자 이하로 작성해주세요.'
                    }
                  />
                )}
              />
              <Typography variant='titleSmall'>2순위 스터디 신청서</Typography>
              <FormControlLabel
                sx={{ width: '100%' }}
                control={
                  <Checkbox
                    id='is-primary-study-only-checkbox'
                    checked={isPrimaryStudyOnly}
                    onChange={handleCheckBoxChange}
                  />
                }
                label={
                  <Typography component={'span'}>
                    1순위 스터디에 선정되지 않을 시 2순위 스터디를 수강하지
                    않겠습니다.
                  </Typography>
                }
              />
              <Select
                id='secondary-study-select'
                val={loaderData.application.secondaryStudy!}
                placeholder='2순위 스터디를 신청해주세요.'
                options={options}
                required
                disabled
                minWidth={'100%'}
              />
              <Controller
                name='secondaryIntro'
                control={form.control}
                render={({ field, fieldState }) => (
                  <TextField
                    fullWidth
                    id='secondary-intro-textfield'
                    label='2순위 스터디 신청 사유를 작성해주세요.'
                    multiline
                    maxRows={4}
                    value={field.value}
                    onChange={field.onChange}
                    required={!isPrimaryStudyOnly}
                    error={!!fieldState.error}
                    disabled={isPrimaryStudyOnly}
                    helperText={
                      fieldState.error
                        ? '50자 이상, 500자 이하로 작성해주세요.'
                        : '신청 사유는 50자 이상, 500자 이하로 작성해주세요.'
                    }
                  />
                )}
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
    </>
  );
}
