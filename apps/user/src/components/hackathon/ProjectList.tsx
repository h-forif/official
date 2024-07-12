import Grid from '@mui/material/Grid';
import Skeleton from '@mui/material/Skeleton';
import Box from '@mui/system/Box';

import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { getProjects } from 'src/services/project.service';
import { Project } from 'src/types/project.type';

import { ProjectCard } from '@components/hackathon/ProjectCard';

export function ProjectList() {
  const { data, error, isLoading } = useQuery<Project[], AxiosError>({
    queryKey: ['projects'],
    queryFn: getProjects,
    retry: false,
  });
  if (error) {
    switch (error.response!.status) {
      case 404:
        return <Box>FAILED</Box>;
      default:
        return <Box>Uncaught error</Box>;
    }
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
    <Box sx={{ px: { xs: 4, md: 8, xl: 12 }, pb: 4, margin: 'auto' }}>
      <Grid container spacing={{ xs: 2, xl: 4 }}>
        {data!.map((project) => (
          <Grid key={project.id} item xl={3} md={4} sm={6} xs={12}>
            <ProjectCard
              id={project.id}
              title={project.title}
              desc={project.desc}
              image={project.image}
              study={project.study}
              year={project.year}
              semester={project.semester}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
