import { UseFormReturn } from 'react-hook-form';

import { Box, FormHelperText, Stack, Typography } from '@mui/material';

import { MENTOR_DIFFICULTY_OPTIONS } from '@constants/filter.constant';
import { FormInput } from '@packages/components/form/FormInput';
import { FormSelect } from '@packages/components/form/FormSelect';
import { TimeRangeField } from '@packages/components/form/TimeRangeField';
import { WEEKDAYS_OPTIONS } from '@packages/constants';
import { getAppliedStudies } from '@services/apply.service';
import { useQuery } from '@tanstack/react-query';
import { formatStudyTimeToKorean, getWeekDayAsString } from '@utils/time';
import { ApplyMentorSchema } from 'src/types/apply.schema';
import { z } from 'zod';

import { Title } from '@components/Title';

export function StudyInfo({
  form,
}: {
  form: UseFormReturn<z.infer<typeof ApplyMentorSchema>>;
}) {
  const appliedStudies = useQuery({
    queryKey: ['appliedStudies'],
    queryFn: getAppliedStudies,
  });
  const timeLocationPairs = appliedStudies.data?.map((study) => ({
    weekDay: study.week_day,
    startTime: study.start_time,
    endTime: study.end_time,
    location: study.location,
  }));
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
          name='name'
          fullWidth
          label='개설할 스터디 이름을 작성해주세요.'
          placeholder='알아두면 쓸모있는 컴퓨터 구조'
          required
        />
        <FormInput
          control={form.control}
          name='one_liner'
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
        <Box>
          <Typography variant='titleSmall' textAlign={'center'} mb={2}>
            시간 및 장소
          </Typography>
          <Typography variant='bodySmall' color={'text.secondary'} mb={1}>
            시간 및 장소는 추후에 변경가능하니 부담없이 작성해주세요.
          </Typography>
        </Box>
        <Stack direction={'row'} gap={2} width={'100%'}>
          <FormSelect
            control={form.control}
            name='week_day'
            options={WEEKDAYS_OPTIONS}
            label='요일'
            minWidth={'20%'}
            required
          />
          <TimeRangeField
            control={form.control}
            start_time='start_time'
            end_time='end_time'
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
            아직 장소가 정해지지 않았다면 '미정'으로 남겨주세요. 동아리방에서
            진행한다면 '동아리방'이라고 입력해주세요.
          </FormHelperText>
        </Box>
        <Box width={'100%'} textAlign={'left'}>
          <Typography variant='bodySmall' mb={2}>
            현재까지 신청된 스터디 장소 목록은 다음과 같습니다.
          </Typography>
          <Typography component={'ul'}>
            {timeLocationPairs?.map((pair, idx) => (
              <Typography component={'li'} key={idx}>
                {getWeekDayAsString(Number(pair.weekDay))}{' '}
                {formatStudyTimeToKorean(pair.startTime)} ~{' '}
                {formatStudyTimeToKorean(pair.endTime)}: {pair.location}
              </Typography>
            ))}
          </Typography>
        </Box>
      </Stack>
    </>
  );
}
