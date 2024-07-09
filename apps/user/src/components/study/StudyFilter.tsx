import { useState } from 'react';

import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import Stack from '@mui/system/Stack';

import { Button } from '@packages/components/Button';
import { Select, SelectOption } from '@packages/components/Select';

import {
  LEVELS,
  POSSIBLE_YEARS,
  SEMESTERS,
} from '../../constants/filter.constant';
import { getCurrentTerm } from '../../utils/getCurrentTerm';

const YEAR_OPTIONS: SelectOption[] = POSSIBLE_YEARS.map((year) => ({
  value: year.toString(),
  label: year.toString(),
}));

const SEMESTER_OPTIONS: SelectOption[] = SEMESTERS.map((semester) => ({
  value: semester.toString(),
  label: `${semester}학기`,
}));

const LEVEL_OPTIONS: SelectOption[] = [
  { value: '전체', label: '전체' },
  ...LEVELS.map((level) => ({
    value: level,
    label: level,
  })),
];

export function StudyFilter() {
  const currentTerm = getCurrentTerm();

  const [filter, setFilter] = useState({
    year: currentTerm.year,
    semester: currentTerm.semester,
    level: LEVEL_OPTIONS[0]!.value,
  });

  console.log(filter);
  return (
    <Stack
      component={'section'}
      justifyContent={'space-between'}
      direction={'row'}
      alignItems={'center'}
      sx={{ px: { xs: 4, md: 8, xl: 12 }, pb: 4 }}
    >
      <Stack direction={'row'} alignItems={'center'} gap={2}>
        <Select
          val={filter.year}
          setVal={(value) => setFilter((prev) => ({ ...prev, year: value }))}
          placeholder='스터디 진행 연도'
          options={YEAR_OPTIONS}
        />
        <Select
          val={filter.semester}
          setVal={(value) =>
            setFilter((prev) => ({ ...prev, semester: value }))
          }
          placeholder='스터디 진행 학기'
          options={SEMESTER_OPTIONS}
        />
        <Select
          val={filter.level}
          setVal={(value) => setFilter((prev) => ({ ...prev, level: value }))}
          placeholder='난이도'
          options={LEVEL_OPTIONS}
        />
      </Stack>
      <Button variant='contained' size='large'>
        스터디 가이드 <ArrowOutwardIcon fontSize='small' sx={{ ml: 1 }} />
      </Button>
    </Stack>
  );
}
