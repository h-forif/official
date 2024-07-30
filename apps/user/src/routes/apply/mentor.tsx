import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { Box, FormHelperText, Stack, Typography } from '@mui/material';

import { WEEKDAYS_OPTIONS } from '@constants/apply.constant';
import { MENTOR_DIFFICULTY_OPTIONS } from '@constants/filter.constant';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@packages/components/Button';
import { Input } from '@packages/components/Input';
import { FormInput } from '@packages/components/form/FormInput';
import { FormSelect } from '@packages/components/form/FormSelect';
import { TimeRangeField } from '@packages/components/form/TimeRangeField';
import { DialogIconType, useDialogStore } from '@stores/dialog.store';
import { createFileRoute, useBlocker } from '@tanstack/react-router';
import { getCurrentTerm } from '@utils/getCurrentTerm';
import dayjs from 'dayjs';
import { getUserInfo } from 'src/services/user.service';
import { ApplyMentorSchema } from 'src/types/apply.schema';
import { z } from 'zod';

import { Title } from '@components/Title';
import CautionList from '@components/apply/mentor/CautionList';
import BlockModal from '@components/common/BlockModal';

const STORAGE_KEY = 'applyMentorForm';

export const Route = createFileRoute('/apply/mentor')({
  loader: async () => getUserInfo(),
  onError: ({ error }) => {
    console.error(error);
  },
  component: ApplyMember,
});

function ApplyMember() {
  const user = Route.useLoaderData();
  const currentTerm = getCurrentTerm();
  const { id, name, department, phoneNumber } = user;
  const { openSingleButtonDialog, closeDialog } = useDialogStore();

  const form = useForm<z.infer<typeof ApplyMentorSchema>>({
    resolver: zodResolver(ApplyMentorSchema),
    defaultValues: {
      studyName: '',
      oneLiner: '',
      level: '',
      location: '',
      weekDay: '',
      startTime: dayjs(null),
      endTime: dayjs(null),
    },
  });

  const { proceed, reset, status } = useBlocker({
    condition: form.formState.isDirty,
  });

  useEffect(() => {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { startTime, endTime, ...rest } = parsedData;
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

  const onSubmit = async (formData: z.infer<typeof ApplyMentorSchema>) => {
    console.log(formData);
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
            title={`${currentTerm.year}년도 ${currentTerm.semester}학기 스터디 개설`}
            label='2024-08-26 ~ 2024-09-11'
            mb={3}
          />
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
              <Typography variant='titleSmall'>
                스터디 이름 및 한 줄 소개
              </Typography>
              <FormInput
                control={form.control}
                name='studyName'
                fullWidth
                label='개설할 스터디 이름을 작성해주세요.'
                placeholder='알아두면 쓸모있는 컴퓨터 구조'
                required
              />
              <FormInput
                control={form.control}
                name='oneLiner'
                fullWidth
                maxRows={4}
                label='스터디에 대한 한 줄 소개를 작성해주세요.'
                placeholder='프로그래밍 공부, 어떻게 시작해야 할지 막막하시다구요? 입문자도 쉽게 배울 수 있는 파이썬과 함께 시작해 보세요! 이번 토픽을 통해 기초를 탄탄히 쌓고 나면, "프로그래밍 생각보다 별 거 아니네?" 이런 생각이 들 거예요.'
                multiline
                required
              />
              <Box>
                <Typography variant='titleSmall' textAlign={'center'} mb={2}>
                  난이도 설정
                </Typography>
                <Typography variant='bodySmall' color={'text.secondary'} mb={1}>
                  스터디 난이도의 기준은{' '}
                  <strong>코딩을 한 번도 해보지 않은 비전공자</strong>를
                  기준으로 합니다.
                </Typography>
                <Typography variant='bodySmall' color={'text.secondary'}>
                  난이도 판단이 어렵다면 '운영진의 판단에 맡깁니다.'를
                  선택해주세요.
                </Typography>
              </Box>
              <FormSelect
                control={form.control}
                name='level'
                options={MENTOR_DIFFICULTY_OPTIONS}
                minWidth={'100%'}
                label='스터디 난이도를 선택해주세요.'
                required
              />
              <Typography variant='titleSmall'>시간 및 장소</Typography>
              <Stack direction={'row'} gap={2} width={'100%'}>
                <FormSelect
                  control={form.control}
                  name='weekDay'
                  options={WEEKDAYS_OPTIONS}
                  label='요일'
                  minWidth={'20%'}
                  required
                />
                <TimeRangeField
                  control={form.control}
                  startTime='startTime'
                  endTime='endTime'
                  required
                />
              </Stack>
              <Box width={'100%'}>
                <FormInput
                  control={form.control}
                  name='location'
                  fullWidth
                  label='스터디를 진행할 장소를 작성해주세요.'
                  placeholder='IT/BT관 202호'
                  required
                />
                <FormHelperText>
                  아직 장소가 정해지지 않았다면 '미정'으로 남겨주세요.
                </FormHelperText>
              </Box>
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
    </>
  );
}
