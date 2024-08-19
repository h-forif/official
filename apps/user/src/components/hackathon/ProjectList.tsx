import { Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import Skeleton from '@mui/material/Skeleton';
import Box from '@mui/system/Box';
import Stack from '@mui/system/Stack';

import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { getProjects } from 'src/services/project.service';
import { Project } from 'src/types/project.type';

import ErrorComponent from '@components/Error';

export function ProjectList() {
  const { data, error, isLoading } = useQuery<Project[], AxiosError>({
    queryKey: ['projects'],
    queryFn: getProjects,
    retry: false,
  });
  console.log(data);

  if (error) {
    return <ErrorComponent status={error.response!.status} />;
  }

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
    <Stack
      direction={'column'}
      justifyContent={'flex-start'}
      sx={{ px: { xs: 4, md: 8, xl: 12 }, pb: 4, margin: 'auto' }}
    >
      <Box>
        <Typography variant='displayMedium' sx={{ pb: 1 }}>
          2024-1 : 청춘
        </Typography>
        <Typography variant='labelLarge' sx={{ mb: 8 }}>
          청춘들의 열정이 가득한 프로젝트들을 만나보세요.
        </Typography>
        <Grid
          container
          spacing={{ xs: 2, xl: 4 }}
          sx={{
            '&.MuiGrid-root': {
              marginTop: 0,
            },
          }}
        >
          {/* {data!.products.map((project: Project) => (
            <Grid key={project.id} item xl={3} md={4} sm={6} xs={12}>
              <ProjectCard
                id={project.id}
                title={project.title}
                desc={project.description}
                image={project.images[0]}
                team_name={project.category}
                year={project.year}
                semester={project.semester}
              />
            </Grid>
          ))} */}
        </Grid>
      </Box>
    </Stack>
  );
}
