import { ChangeEvent, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import {
  Box,
  Checkbox,
  FormControlLabel,
  Stack,
  TextField,
  Typography,
} from '@mui/material';

import { APPLY_PATH_OPTIONS } from '@constants/apply.constant';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@packages/components/Button';
import { Input } from '@packages/components/Input';
import {
  Modal,
  ModalContent,
  ModalDescription,
} from '@packages/components/Modal';
import { Select, SelectOption } from '@packages/components/Select';
import { CenteredBox } from '@packages/components/elements/CenteredBox';
import { createFileRoute, redirect, useBlocker } from '@tanstack/react-router';
import { authApi } from 'src/services/axios-instance';
import { getAllStudies } from 'src/services/study.service';
import { getApplication, getUserInfo } from 'src/services/user.service';
import { ApplyMemberSchema } from 'src/types/apply.schema';
import { z } from 'zod';

import { Title } from '@components/Title';
import CautionList from '@components/apply/member/CautionList';
import BlockModal from '@components/common/BlockModal';

const STORAGE_KEY = 'applyMemberForm';

export const Route = createFileRoute('/apply/member')({
  loader: async () => {
    const savedApplication = await getApplication();
    console.log(savedApplication);

    if (savedApplication) {
      throw redirect({
        to: '/apply/application',
      });
    }

    const [userInfo, studies] = await Promise.all([
      getUserInfo(),
      getAllStudies({ year: 2024, semester: 1 }),
    ]);
    console.log(userInfo);

    return { userInfo, studies };
  },
  onError: ({ error }) => {
    console.error(error);
  },
  component: ApplyMember,
});

function ApplyMember() {
  const loaderData = Route.useLoaderData();
  const { id, name, department, phoneNumber } = loaderData!.userInfo;
  const [modalOpen, setModalOpen] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const form = useForm<z.infer<typeof ApplyMemberSchema>>({
    resolver: zodResolver(ApplyMemberSchema),
    defaultValues: {
      primary_study: '',
      primary_intro: '',
      secondary_study: '',
      secondary_intro: '',
      apply_path: '',
      is_primary_study_only: false,
    },
  });

  const { proceed, reset, status } = useBlocker({
    condition: form.formState.isDirty || !isSaved,
  });

  useEffect(() => {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
      form.reset(JSON.parse(savedData));
    }
  }, [form]);

  const handleSaveDraft = () => {
    const formData = form.getValues();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
    setIsSaved(true);
    setModalOpen(true);
  };

  const primaryStudyValue = form.watch('primary_study');
  const secondaryStudyValue = form.watch('primary_intro');
  const is_primary_study_only = form.watch('is_primary_study_only');

  const options: SelectOption[] = loaderData!.studies.map((study) => ({
    value: study.id.toString(),
    label: study.name,
  }));

  const handleCheckBoxChange = (e: ChangeEvent<HTMLInputElement>) => {
    form.setValue('is_primary_study_only', e.target.checked);
  };

  const filteredSecondaryOptions = options.filter(
    (option) => option.value !== primaryStudyValue,
  );

  const onSubmit = async (formData: z.infer<typeof ApplyMemberSchema>) => {
    if (formData.is_primary_study_only) {
      const res = await authApi
        .post('/apply', {
          primary_study: formData.primary_study,
          primary_intro: formData.primary_intro,
          apply_path: formData.secondary_study,
        })
        .then((res) => res.data);
      console.log(res);
    }
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
          <Title title='스터디 신청' label='2024-08-26 ~ 2024-09-11' mb={3} />
          <CautionList />
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <Stack
              gap={5}
              justifyContent={'center'}
              alignItems={'center'}
              my={4}
            >
              <Typography variant='titleSmall'>신청 부원 정보</Typography>
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
              <Typography variant='titleSmall'>1순위 스터디 신청</Typography>
              <Controller
                name='primary_study'
                control={form.control}
                render={({ field, fieldState }) => (
                  <Select
                    id='primary-study-select'
                    val={field.value}
                    setVal={field.onChange}
                    placeholder='1순위 스터디를 신청해주세요.'
                    error={!!fieldState.error}
                    errorMessage='1순위 스터디는 필수값입니다.'
                    options={options}
                    minWidth={'100%'}
                    required
                  />
                )}
              />
              <Controller
                name='primary_intro'
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
                    disabled={primaryStudyValue === '0'}
                    helperText={
                      fieldState.error
                        ? '50자 이상, 500자 이하로 작성해주세요.'
                        : '신청 사유는 50자 이상, 500자 이하로 작성해주세요.'
                    }
                    error={!!fieldState.error && primaryStudyValue !== '0'}
                  />
                )}
              />
              <Typography variant='titleSmall'>2순위 스터디 신청</Typography>
              <FormControlLabel
                sx={{ width: '100%' }}
                control={
                  <Checkbox
                    disabled={primaryStudyValue === '0'}
                    checked={is_primary_study_only}
                    onChange={handleCheckBoxChange}
                  />
                }
                label={
                  <Typography component={'span'}>
                    1순위 스터디에 선정되지 않을 시 2순위 스터디를 수강하지
                    않겠습니다.
                    <br />
                    <Typography color={'text.secondary'}>
                      (이 결정은 신청서 제출 이후에도 스터디 신청 기간 내에서
                      자유롭게 변경할 수 있습니다.)
                    </Typography>
                  </Typography>
                }
              />
              <Controller
                name='secondary_study'
                control={form.control}
                render={({ field, fieldState }) => (
                  <Select
                    id='secondary-study-select'
                    val={field.value!}
                    setVal={field.onChange}
                    placeholder='2순위 스터디를 신청해주세요.'
                    options={filteredSecondaryOptions}
                    required={!is_primary_study_only}
                    error={!!fieldState.error}
                    errorMessage={fieldState.error?.message}
                    disabled={
                      primaryStudyValue === '' ||
                      primaryStudyValue === '0' ||
                      is_primary_study_only
                    }
                    minWidth={'100%'}
                  />
                )}
              />
              <Controller
                name='secondary_intro'
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
                    required={!is_primary_study_only}
                    disabled={
                      primaryStudyValue === '0' ||
                      primaryStudyValue === '' ||
                      secondaryStudyValue === '0' ||
                      primaryStudyValue === '' ||
                      is_primary_study_only
                    }
                    error={!!fieldState.error}
                    helperText={
                      fieldState.error
                        ? '50자 이상, 500자 이하로 작성해주세요.'
                        : '신청 사유는 50자 이상, 500자 이하로 작성해주세요.'
                    }
                  />
                )}
              />
              <Typography variant='titleSmall'>포리프를 접한 경로</Typography>
              <Controller
                name='apply_path'
                control={form.control}
                render={({ field, fieldState }) => (
                  <Select
                    required
                    id='from-select'
                    val={field.value}
                    setVal={field.onChange}
                    placeholder='포리프를 접하게 된 경로를 작성해주세요.'
                    options={APPLY_PATH_OPTIONS}
                    error={!!fieldState.error}
                    errorMessage='지원 경로는 필수값입니다.'
                    minWidth={'100%'}
                  />
                )}
              />
            </Stack>
            <Stack direction={'row'} gap={2}>
              <Button
                variant='outlined'
                size='large'
                fullWidth
                disabled={!form.formState.isDirty}
                onClick={handleSaveDraft}
              >
                임시저장
              </Button>
              <Button type='submit' variant='contained' size='large' fullWidth>
                제출
              </Button>
            </Stack>
          </form>
        </Box>
      </Box>
      {status === 'blocked' && <BlockModal proceed={proceed} reset={reset} />}
      {modalOpen && (
        <Modal isOpen>
          <ModalContent>
            <CenteredBox gap={2} height={256}>
              <ModalDescription>
                <CheckCircleOutlineIcon
                  color='primary'
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%',
                    mb: 2,
                    fontSize: '5rem',
                  }}
                />
                <Typography variant='bodyMedium'>
                  스터디 임시 저장에 성공했습니다.
                </Typography>
              </ModalDescription>
            </CenteredBox>
          </ModalContent>
        </Modal>
      )}
    </>
  );
}
