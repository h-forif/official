import { Skeleton, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import Box from '@mui/system/Box';

import NotFoundCharacter from '@assets/images/peep-not-found.svg?react';
import { CenteredBox } from '@packages/components/elements/CenteredBox';
import { StudySearch } from '@routes/studies/index';
import { useQuery } from '@tanstack/react-query';
import { getAllStudies } from 'src/services/study.service';
import { Data } from 'src/types/product.type';

import { StudyCard } from './StudyCard';

export function StudyList({ year, semester, level }: StudySearch) {
  const { data, isLoading } = useQuery<Data>({
    queryKey: ['studies'],
    queryFn: getAllStudies,
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

  console.log(year, semester, level);
  const filteredProducts = data!.products.filter(
    (product) => product.category === 'beauty',
  );

  return (
    <Box sx={{ px: { xs: 4, md: 8, xl: 12 }, pb: 4, margin: 'auto' }}>
      <Grid container spacing={{ xs: 2, xl: 4 }}>
        {filteredProducts.map((product) => (
          <Grid key={product.id} item xl={3} md={4} sm={6} xs={12}>
            <StudyCard
              id={product.id}
              image={product.images[0]!}
              mentor={product.availabilityStatus}
              title={product.title}
            />
          </Grid>
        ))}
        {filteredProducts.length === 0 && (
          <CenteredBox sx={{ width: '100%', height: '400px', my: 12 }}>
            <NotFoundCharacter />
            <Typography variant='headlineLarge' textAlign={'center'}>
              존재하는 스터디가 없어요.
            </Typography>
          </CenteredBox>
        )}
      </Grid>
    </Box>
  );
}
