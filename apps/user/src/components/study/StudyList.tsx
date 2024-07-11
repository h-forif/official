import { Skeleton } from '@mui/material';
import Grid from '@mui/material/Grid';
import Box from '@mui/system/Box';

import type { Study } from '@packages/components/types/study';
import { StudyProps } from '@routes/studies/index';
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { getAllStudies } from 'src/services/study.service';

import ErrorComponent from '@components/Error';

import { StudyCard } from './StudyCard';

export function StudyList({ year, semester, level }: StudyProps) {
  const { data, error, isLoading } = useQuery<Study[], AxiosError>({
    queryKey: ['studies', year, semester, level],
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
