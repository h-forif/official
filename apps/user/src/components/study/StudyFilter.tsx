import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import Stack from '@mui/system/Stack';

import { Button } from '@packages/components/Button';
import { Select, SelectOption } from '@packages/components/Select';
import { useNavigate } from '@tanstack/react-router';

import {
  LEVELS,
  POSSIBLE_YEARS,
  SEMESTERS,
} from '../../constants/filter.constant';
import { StudySearch } from '../../routes/studies/index.lazy';

const YEAR_OPTIONS: SelectOption[] = POSSIBLE_YEARS.map((year) => ({
  value: year.toString(),
  label: year.toString(),
}));

const SEMESTER_OPTIONS: SelectOption[] = SEMESTERS.map((semester) => ({
  value: semester.toString(),
  label: `${semester}학기`,
}));

const LEVEL_OPTIONS: SelectOption[] = LEVELS.map((level) => ({
  value: level,
  label: level,
}));

export function StudyFilter({ year, semester, level }: StudySearch) {
  const navigate = useNavigate({ from: '/studies' });
  return (
    <Stack
      component={'section'}
      justifyContent={'space-between'}
      direction={{ md: 'row', sm: 'column' }}
      alignItems={'center'}
      gap={2}
      sx={{ px: { xs: 4, md: 8, xl: 12 }, pb: 4 }}
    >
      <Stack
        direction={'row'}
        alignItems={'center'}
        gap={2}
        flexWrap={'wrap'}
        width={'100%'}
      >
        <Select
          val={year.toString()}
          setVal={(value) => {
            navigate({
              search: (prev) => ({ ...prev, year: Number(value) }),
            });
          }}
          placeholder='스터디 진행 연도'
          options={YEAR_OPTIONS}
        />
        <Select
          val={semester.toString()}
          setVal={(value) => {
            navigate({
              search: (prev) => ({ ...prev, semester: Number(value) }),
            });
          }}
          placeholder='스터디 진행 학기'
          options={SEMESTER_OPTIONS}
        />
        <Select
          val={level.toString()}
          setVal={(value) => {
            navigate({
              search: (prev) => ({ ...prev, level: value }),
            });
          }}
          placeholder='난이도'
          options={LEVEL_OPTIONS}
        />
      </Stack>
      <Stack direction={'row'} justifyContent={'flex-end'} width={'100%'}>
        <Button variant='contained' size='large'>
          스터디 가이드 <ArrowOutwardIcon fontSize='small' sx={{ ml: 1 }} />
        </Button>
      </Stack>
    </Stack>
  );
}
