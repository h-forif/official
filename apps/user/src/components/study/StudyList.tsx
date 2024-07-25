import { Skeleton, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import Box from '@mui/system/Box';

import NotFoundPeeps from '@assets/images/avatar/peep-not-found.svg?react';
import { DIFFICULTY } from '@constants/filter.constant';
import { CenteredBox } from '@packages/components/elements/CenteredBox';
import type { Study } from '@packages/components/types/study';
import { StudyProps } from '@routes/studies/index';
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { getAllStudies } from 'src/services/study.service';

import ErrorComponent from '@components/Error';

import { StudyCard } from './StudyCard';

function getDifficultyKeyByValue(value: number): string | undefined {
  return (Object.keys(DIFFICULTY) as Array<keyof typeof DIFFICULTY>).find(
    (key) => DIFFICULTY[key] === value,
  );
}

export function StudyList({ year, semester, difficulty }: StudyProps) {
  const { data, error, isLoading } = useQuery<Study[], AxiosError>({
    queryKey: ['studies', year, semester],
    queryFn: () => getAllStudies({ year, semester }),
    retry: false,
  });

  if (isLoading) {
    return (
      <Box sx={{ px: { xs: 4, md: 8, xl: 12 }, pb: 4, margin: 'auto' }}>
        <Grid container spacing={{ xs: 2, xl: 4 }}>
          {Array.from({ length: 7 }, (_, index) => index + 1).map((item) => (
            <Grid key={item} item xl={3} md={4} sm={6} xs={12}>
              <Skeleton variant='rounded' width={'100%'} height={240} />
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  }

  if (error) {
    return ErrorComponent({ status: error.response!.status });
  }

  const studies =
    difficulty === 0
      ? data!
      : data!.filter((study) => study.level === difficulty);

  return (
    <Box sx={{ px: { xs: 4, md: 8, xl: 12 }, pb: 4, margin: 'auto' }}>
      <Grid container spacing={{ xs: 2, xl: 4 }}>
        {studies.map((study) => (
          <Grid key={study.id} item xl={3} md={4} sm={6} xs={12}>
            <StudyCard
              id={study.id}
              image={study.image!}
              mentor={study.mentorName}
              title={study.name}
            />
          </Grid>
        ))}
        {studies.length === 0 && (
          <CenteredBox width={'100%'} height={320} my={8}>
            <NotFoundPeeps />
            <Typography variant='titleMedium'>
              <strong>{year}</strong>년 <strong>{semester}</strong>학기에
              진행되었으며 난이도가{' '}
              <strong>{getDifficultyKeyByValue(difficulty)}</strong>에 해당하는
              스터디가 없는 듯 해요. 오류일 수 있으니 다시 시도해주세
            </Typography>
          </CenteredBox>
        )}
      </Grid>
    </Box>
  );
}
