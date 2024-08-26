import { useState } from 'react';

import { Divider, Stack, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import Skeleton from '@mui/material/Skeleton';
import Box from '@mui/system/Box';

import { Layout } from '@packages/components/elements/Layout';
import { useQuery } from '@tanstack/react-query';
import { getProjects } from 'src/services/project.service';
import { Project } from 'src/types/project.type';

import ProjectCard from './ProjectCard';

export function ProjectList() {
  const {
    data: projects,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['projects'],
    queryFn: () => getProjects(),
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
    console.error(error);
  }

  const groupedProjects = Object.entries(
    projects?.reduce((acc: Record<string, Project[]>, project: Project) => {
      const key = `${project.held_year}-${project.held_semester}`;
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(project);
      return acc;
    }, {}) ?? {},
  ).sort(([keyA], [keyB]) => {
    const [yearA, semesterA] = keyA.split('-').map(Number);
    const [yearB, semesterB] = keyB.split('-').map(Number);
    if (yearA === yearB) {
      return semesterB! - semesterA!;
    }
    return yearB! - yearA!;
  });

  return (
    <Layout display={'flex'} flexDirection={'row'}>
      <Box>
        {groupedProjects.map(([key, projects]) => (
          <Box id={key} key={key}>
            <Typography variant='displaySmall' sx={{ pb: 1 }}>
              {key}
            </Typography>
            <Typography variant='titleMedium'>
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
              {projects?.map((project: Project) => (
                <Grid key={project.team_id} item xl={3} md={4} sm={6} xs={12}>
                  <ProjectCard {...project} />
                </Grid>
              ))}
            </Grid>
          </Box>
        ))}
      </Box>
      <ProjectSideNav projects={groupedProjects} />
    </Layout>
  );
}

function ProjectSideNav({ projects }: { projects: [string, Project[]][] }) {
  const [activeId, setActiveId] = useState<string | null>(null);
  return (
    <Box display={{ xs: 'none', md: 'block' }} ml={2} width={'360px'}>
      <Stack ml={2} position={'sticky'} top={64} direction={'row'} gap={2}>
        <Divider flexItem orientation='vertical' sx={{ borderRightWidth: 3 }} />
        <Stack>
          <Typography variant='labelSmall' mb={2}>
            해커톤
          </Typography>
          {projects.map(([key]) => (
            <Typography
              key={key}
              component={'a'}
              href={`#${key}`}
              variant='labelSmall'
              onClick={() => setActiveId(key)}
              sx={{
                cursor: 'pointer',
                color: activeId === key ? 'primary.main' : 'inherit',
              }}
            >
              {key}
            </Typography>
          ))}
        </Stack>
      </Stack>
    </Box>
  );
}
