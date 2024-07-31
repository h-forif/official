import { UseFormReturn } from 'react-hook-form';

import { Box, FormHelperText, Stack, Typography } from '@mui/material';

import { WEEKDAYS_OPTIONS } from '@constants/apply.constant';
import { MENTOR_DIFFICULTY_OPTIONS } from '@constants/filter.constant';
import { FormInput } from '@packages/components/form/FormInput';
import { FormSelect } from '@packages/components/form/FormSelect';
import { TimeRangeField } from '@packages/components/form/TimeRangeField';
import { ApplyMentorSchema } from 'src/types/apply.schema';
import { z } from 'zod';

import { Title } from '@components/Title';

export function StudyInfo({
  form,
}: {
  form: UseFormReturn<z.infer<typeof ApplyMentorSchema>>;
}) {
  return (
    <>
      <Title
        title='스터디 소개'
        label='개설하려는 스터디에 대해 소개해주세요.'
        pt={4}
        mb={0}
      />
      <Stack gap={5} justifyContent={'center'} alignItems={'center'} my={4}>
        <Typography variant='titleSmall'>스터디 이름 및 한 줄 소개</Typography>
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
          maxRows={2}
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
            <strong>코딩을 한 번도 해보지 않은 비전공자</strong>를 기준으로
            합니다.
          </Typography>
          <Typography variant='bodySmall' color={'text.secondary'}>
            난이도 판단이 어렵다면 '운영진의 판단에 맡깁니다.'를 선택해주세요.
          </Typography>
        </Box>
        <FormSelect
          control={form.control}
          name='difficulty'
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
    </>
  );
}
