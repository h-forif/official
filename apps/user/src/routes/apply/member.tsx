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
import { createFileRoute, useBlocker } from '@tanstack/react-router';
import { authApi } from 'src/services/axios-instance';
import { getAllStudies } from 'src/services/study.service';
import { getUserInfo } from 'src/services/user.service';
import { ApplyMemberSchema } from 'src/types/apply.schema';
import { z } from 'zod';

import { Title } from '@components/Title';
import CautionList from '@components/apply/member/CautionList';
import BlockModal from '@components/common/BlockModal';

const STORAGE_KEY = 'applyMemberForm';

export const Route = createFileRoute('/apply/member')({
  loader: async () => {
    const [userInfo, studies] = await Promise.all([
      getUserInfo(),
      getAllStudies({ year: 2024, semester: 1 }),
    ]);
    return { userInfo, studies };
  },
  onError: ({ error }) => {
    console.error(error);
  },
  component: ApplyMember,
});

function ApplyMember() {
  const loaderData = Route.useLoaderData();
  const { id, name, department, phoneNumber } = loaderData.userInfo;
  const [modalOpen, setModalOpen] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const form = useForm<z.infer<typeof ApplyMemberSchema>>({
    resolver: zodResolver(ApplyMemberSchema),
    defaultValues: {
      primaryStudy: '',
      primaryIntro: '',
      secondaryStudy: '',
      secondaryIntro: '',
      applyPath: '',
      isPrimaryStudyOnly: false,
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

  const primaryStudyValue = form.watch('primaryStudy');
  const secondaryStudyValue = form.watch('secondaryStudy');
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

  const applyPathOptions: SelectOption[] = [
    {
      value: 'everytime',
      label: '에브리타임',
    },
    {
      value: 'instagram',
      label: '인스타그램',
    },
    {
      value: 'linkedin',
      label: '링크드인',
    },
    {
      value: 'kakaotalk',
      label: '학과 단톡방',
    },
    {
      value: 'friend',
      label: '지인 추천',
    },
    {
      value: 'etc',
      label: '기타',
    },
  ];

  const handleCheckBoxChange = (e: ChangeEvent<HTMLInputElement>) => {
    form.setValue('isPrimaryStudyOnly', e.target.checked);
  };

  const filteredSecondaryOptions = options.filter(
    (option) => option.value !== primaryStudyValue,
  );

  const onSubmit = async (formData: z.infer<typeof ApplyMemberSchema>) => {
    if (formData.isPrimaryStudyOnly) {
      const res = await authApi
        .post('/apply', {
          primary_study: formData.primaryStudy,
          primary_intro: formData.primaryIntro,
          apply_path: formData.applyPath,
        })
        .then((res) => res.data);
      console.log(res);
    }
  };

  return (
    <>
      <Box component={'main'} sx={{ mx: '3vw' }}>
        <Box sx={{ maxWidth: '512px', mx: 'auto', mb: 8 }}>
          <Title title='스터디 신청' label='2024-08-26 ~ 2024-09-11' mb={3} />
          <CautionList />
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
              <Typography variant='titleSmall'>1순위 스터디 신청</Typography>
              <Controller
                name='primaryStudy'
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
                    minWidth={512}
                    required
                  />
                )}
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
                    checked={isPrimaryStudyOnly}
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
                name='secondaryStudy'
                control={form.control}
                render={({ field, fieldState }) => (
                  <Select
                    id='secondary-study-select'
                    val={field.value!}
                    setVal={field.onChange}
                    placeholder='2순위 스터디를 신청해주세요.'
                    options={filteredSecondaryOptions}
                    minWidth={512}
                    required={!isPrimaryStudyOnly}
                    error={!!fieldState.error}
                    errorMessage={fieldState.error?.message}
                    disabled={
                      primaryStudyValue === '' ||
                      primaryStudyValue === '0' ||
                      isPrimaryStudyOnly
                    }
                  />
                )}
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
                    disabled={
                      primaryStudyValue === '0' ||
                      primaryStudyValue === '' ||
                      secondaryStudyValue === '0' ||
                      primaryStudyValue === '' ||
                      isPrimaryStudyOnly
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
                name='applyPath'
                control={form.control}
                render={({ field, fieldState }) => (
                  <Select
                    required
                    id='from-select'
                    val={field.value}
                    setVal={field.onChange}
                    placeholder='포리프를 접하게 된 경로를 작성해주세요.'
                    options={applyPathOptions}
                    error={!!fieldState.error}
                    errorMessage='지원 경로는 필수값입니다.'
                    minWidth={512}
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
