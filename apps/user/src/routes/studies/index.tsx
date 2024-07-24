import { useState } from 'react';

import Typography from '@mui/material/Typography';
import Box from '@mui/system/Box';

import { CenteredBox } from '@packages/components/elements/CenteredBox';
import { createFileRoute } from '@tanstack/react-router';
import { getCurrentTerm } from '@utils/getCurrentTerm';

import { StudyFilter } from '@components/study/StudyFilter';
import { StudyList } from '@components/study/StudyList';

export interface StudySearch {
  year: number;
  semester: number;
}

export interface StudyProps extends StudySearch {
  level: string;
}

const currentTerm = getCurrentTerm();

export const Route = createFileRoute('/studies/')({
  validateSearch: (search: Record<string, unknown>): StudySearch => {
    return {
      year: Number(search?.year ?? currentTerm.year),
      semester: Number(search?.semester ?? currentTerm.semester),
    };
  },
  component: StudiesPage,
});

function StudiesPage() {
  const { year, semester }: StudySearch = Route.useSearch();
  const [level, setLevel] = useState('전체');
  console.log(level);

  return (
    <Box>
      <CenteredBox
        component={'section'}
        sx={{
          pt: 12,
          px: 6,
          textAlign: 'center',
          margin: 'auto',
          mb: 12,
          wordBreak: 'keep-all',
        }}
      >
        <Typography variant='displayLarge' sx={{ mb: 1 }}>
          스터디 목록
        </Typography>
        <Typography variant='labelLarge'>
          프런트, 백엔드, AI, 데이터 분석. 골고루 즐기세요.
        </Typography>
      </CenteredBox>
      <StudyFilter
        year={year}
        semester={semester}
        level={level}
        setLevel={setLevel}
      />
      <StudyList year={year} semester={semester} level={level} />
    </Box>
  );
}
