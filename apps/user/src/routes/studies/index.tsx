import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/system/Box';

import { CenteredBox } from '@packages/components/elements/CenteredBox';
import { createFileRoute } from '@tanstack/react-router';

import Image from '../../assets/images/title.png';
import { StudyCard } from '../../components/Card';
import { StudyFilter } from '../../components/study/StudyFilter';

type StudySearchLevelOptions = 0 | 1 | 2 | 3 | 4 | 5;

type StudySearch = {
  year: number;
  semester: number;
  level: StudySearchLevelOptions;
};

export const Route = createFileRoute('/studies/')({
  validateSearch: (search: Record<string, unknown>): StudySearch => {
    return {
      year: Number(search?.year ?? 2024),
      semester: Number(search?.semester ?? 1),
      level: (search.level as StudySearchLevelOptions) || 0,
    };
  },
  component: StudiesPage,
});

function StudiesPage() {
  const { year, semester } = Route.useSearch();
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
          영감을 주는 동료와 함께라면. The Better Life
        </Typography>
      </CenteredBox>
      <StudyFilter year={year} semester={semester} />
      <Box sx={{ px: { xs: 4, md: 8, xl: 12 }, pb: 4, margin: 'auto' }}>
        <Grid container spacing={{ sm: 2, xl: 4 }}>
          {items.map((item) => (
            <Grid key={item} item xl={2.4} md={4} sm={6} xs={12}>
              <StudyCard
                id={2}
                image={Image}
                mentor='표준성'
                title='REACT + CRUD'
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}

const items = [1, 2, 3, 4];
