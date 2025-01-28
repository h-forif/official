import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import Stack from '@mui/system/Stack';

import {
  DIFFICULTY,
  DIFFICULTY_TYPES,
  SEMESTER_OPTIONS,
  YEAR_OPTIONS,
} from '@constants/filter.constant';
import { Button } from '@packages/components/Button';
import { Select, SelectOption } from '@packages/components/Select';
import { StudyProps } from '@routes/studies/index';
import { Link, useNavigate } from '@tanstack/react-router';

const DIFFICULTY_OPTIONS: SelectOption[] = Object.entries(DIFFICULTY).map(
  ([key, value]) => ({
    value: value.toString(),
    label: key.replace(/_/g, ' '),
  }),
);

interface StudyFilterProps extends StudyProps {
  setDifficulty: (val: DIFFICULTY_TYPES) => void;
}

export function StudyFilter({
  year,
  semester,
  difficulty,
  setDifficulty,
}: StudyFilterProps) {
  const navigate = useNavigate({ from: '/studies' });
  return (
    <Stack
      component={'section'}
      justifyContent={'space-between'}
      direction={{ md: 'row', xs: 'column' }}
      alignItems={'center'}
      gap={2}
      sx={{ px: { xs: 4, md: 8, xl: 12 }, pb: 4 }}
    >
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        alignItems={'flex-start'}
        gap={2}
        flexWrap={'wrap'}
        width={'100%'}
      >
        <Select
          val={year.toString()}
          setVal={(value) => {
            navigate({
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              search: (prev: any) => ({ ...prev, year: Number(value) }),
            });
          }}
          placeholder='스터디 진행 연도'
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
          placeholder='스터디 진행 학기'
          options={SEMESTER_OPTIONS}
          minWidth={120}
        />
        <Select
          variant='outlined'
          val={difficulty.toString()}
          setVal={(val) => setDifficulty(val as unknown as DIFFICULTY_TYPES)}
          placeholder='난이도'
          options={DIFFICULTY_OPTIONS}
          minWidth={120}
        />
      </Stack>
      <Stack direction={'row'} justifyContent={'flex-end'} width={'100%'}>
        <Link to='/studies/guide'>
          <Button variant='contained' size='large'>
            스터디 가이드 <ArrowOutwardIcon fontSize='small' sx={{ ml: 1 }} />
          </Button>
        </Link>
      </Stack>
    </Stack>
  );
}
