import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { Stack } from '@mui/system';
import Box from '@mui/system/Box';

import { CenteredBox } from '@packages/components/elements/CenteredBox';
import { createFileRoute } from '@tanstack/react-router';

import Image from '../../assets/images/title.png';
import { StudyCard } from '../../components/Card';
import { StudyFilter } from '../../components/study/StudyFilter';

export const Route = createFileRoute('/studies/')({
  component: StudiesPage,
});

function StudiesPage() {
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
      <StudyFilter />
      <Stack>
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
      </Stack>
    </Box>
  );
}

const items = [1, 2, 3, 4];
