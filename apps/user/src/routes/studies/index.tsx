import { useEffect, useState } from 'react';

import Box from '@mui/system/Box';

import { DIFFICULTY, DIFFICULTY_TYPES } from '@constants/filter.constant';
import { createFileRoute } from '@tanstack/react-router';
import { getCurrentTerm } from '@utils/getCurrentTerm';

import { Title } from '@components/Title';
import { StudyFilter } from '@components/study/StudyFilter';
import { StudyList } from '@components/study/StudyList';

export interface StudySearch {
  year: number;
  semester: number;
}

export interface StudyProps extends StudySearch {
  difficulty: number;
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
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { year, semester }: StudySearch = Route.useSearch();
  const [difficulty, setDifficulty] = useState<DIFFICULTY_TYPES>(
    DIFFICULTY['전체'],
  );

  return (
    <Box>
      <Title
        title='스터디 목록'
        label='프런트, 백엔드, AI, 데이터 분석. 다양한 분야의 멘토들의 수업을 골고루 즐기세요.'
      />
      <StudyFilter
        year={year}
        semester={semester}
        difficulty={difficulty}
        setDifficulty={setDifficulty}
      />
      <StudyList
        year={year}
        semester={semester}
        difficulty={Number(difficulty)}
      />
    </Box>
  );
}
