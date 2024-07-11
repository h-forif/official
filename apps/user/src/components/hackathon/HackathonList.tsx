import Grid from '@mui/material/Grid';
import Skeleton from '@mui/material/Skeleton';
import Box from '@mui/system/Box';

import { useQuery } from '@tanstack/react-query';
import { getAllStudies } from 'src/services/study.service';
import { Data } from 'src/types/product.type';

import { HackathonCard } from './HackathonCard';

export function HackathonList() {
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
  return (
    <Box sx={{ px: { xs: 4, md: 8, xl: 12 }, pb: 4, margin: 'auto' }}>
      <Grid container spacing={{ xs: 2, xl: 4 }}>
        {data!.products.map((product) => (
          <Grid key={product.id} item xl={3} md={4} sm={6} xs={12}>
            <HackathonCard
              title={product.title}
              image={product.images[0]!}
              desc={product.description}
              type={product.category}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
