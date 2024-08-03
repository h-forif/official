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
          제3항의 승인을 얻지 못한 때에는 그 처분 또는 명령은 그때부터 효력을
          상실한다. 이 경우 그 명령에 의하여 개정 또는 폐지되었던 법률은 그
          명령이 승인을 얻지 못한 때부터 당연히 효력을 회복한다. 공무원은
          국민전체에 대한 봉사자이며, 국민에 대하여 책임을 진다. 대한민국은
          민주공화국이다. 국무총리 또는 행정각부의 장은 소관사무에 관하여
          법률이나 대통령령의 위임 또는 직권으로 총리령 또는 부령을 발할 수
          있다.
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
