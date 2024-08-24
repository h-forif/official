import { Typography } from '@mui/material';
import { Stack } from '@mui/system';
import Box from '@mui/system/Box';

import { SEMESTER_OPTIONS, YEAR_OPTIONS } from '@constants/filter.constant';
import { Select } from '@packages/components/Select';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { getCurrentTerm } from '@utils/getCurrentTerm';

import { Title } from '@components/Title';
import { TeamList } from '@components/club/TeamList';

export interface TeamSearch {
  year: number;
  semester: number;
}

const currentTerm = getCurrentTerm();

export const Route = createFileRoute('/club/team')({
  validateSearch: (search: Record<string, unknown>): TeamSearch => {
    return {
      year: Number(search?.year ?? currentTerm.year),
      semester: Number(search?.semester ?? currentTerm.semester),
    };
  },
  component: TeamPage,
});

function TeamPage() {
  const { year, semester }: TeamSearch = Route.useSearch();

  return (
    <Box>
      <Title title='FORIF TEAM' label='지식의 선순환을 실천합니다.' />
      <Box sx={{ paddingX: { xs: 4, sm: 8, md: 12 }, pb: 4, margin: 'auto' }}>
        <TeamSelect year={year} semester={semester} />
        <TeamList year={year} semester={semester} />
      </Box>
    </Box>
  );
}

function TeamSelect({ year, semester }: TeamSearch) {
  const navigate = useNavigate();
  return (
    <Stack
      direction={{ sm: 'column', md: 'row' }}
      justifyContent={'space-between'}
      alignItems={{ sm: 'flex-start', md: 'end' }}
      mb={3}
      gap={3}
    >
      <Stack direction={'row'} alignItems={'center'} gap={2}>
        <Select
          val={year.toString()}
          setVal={(value) => {
            navigate({
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              search: (prev: any) => ({ ...prev, year: Number(value) }),
            });
          }}
          placeholder='운영진 활동 년도'
          options={YEAR_OPTIONS}
          minWidth={120}
        />
        <Select
          val={semester.toString()}
          setVal={(value) => {
            navigate({
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              search: (prev: any) => ({ ...prev, semester: Number(value) }),
            });
          }}
          placeholder='운영진 활동 학기'
          options={SEMESTER_OPTIONS}
          minWidth={120}
        />
      </Stack>
      <Typography variant='bodySmall' color='text.secondary'>
        * 2024년 2학기 이전 운영진으로 활동하셨다면, contact@forif.org로
        문의해주세요!
      </Typography>
    </Stack>
  );
}
