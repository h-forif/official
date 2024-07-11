import { Skeleton, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import Box from '@mui/system/Box';

import NotFoundCharacter from '@assets/images/peep-not-found.svg?react';
import { CenteredBox } from '@packages/components/elements/CenteredBox';
import type { Study } from '@packages/components/types/study';
import { StudySearch } from '@routes/studies/index';
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { getAllStudies } from 'src/services/study.service';

import { StudyCard } from './StudyCard';

export function StudyList({ year, semester, level }: StudySearch) {
  const { data, error, isLoading } = useQuery<Study[], AxiosError>({
    queryKey: ['studies', year, semester, level],
    queryFn: () => getAllStudies({ year, semester, level }),
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
    if (error.response!.status === 404) {
      return (
        <CenteredBox sx={{ width: '100%', height: '400px', my: 12 }}>
          <NotFoundCharacter />
          <Typography variant='headlineLarge' textAlign={'center'}>
            존재하는 스터디가 없어요.
          </Typography>
        </CenteredBox>
      );
    } else {
      return (
        <CenteredBox sx={{ width: '100%', height: '400px', my: 12 }}>
          <NotFoundCharacter />
          <Typography variant='headlineLarge' textAlign={'center'}>
            예상하지 못한 오류가 발생했어요.
          </Typography>
        </CenteredBox>
      );
    }
  }

  return (
    <Box sx={{ px: { xs: 4, md: 8, xl: 12 }, pb: 4, margin: 'auto' }}>
      <Grid container spacing={{ xs: 2, xl: 4 }}>
        {data!.map((study) => (
          <Grid key={study.studyId} item xl={3} md={4} sm={6} xs={12}>
            <StudyCard
              id={study.studyId}
              image={study.image!}
              mentor={study.mentorName}
              title={study.studyName}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
