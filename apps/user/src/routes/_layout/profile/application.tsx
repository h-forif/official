import { Card, CardContent, Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';

import { Layout } from '@packages/components/elements/Layout';
import { createFileRoute } from '@tanstack/react-router';
import { getCurrentTerm } from '@utils/getCurrentTerm';
import axios from 'axios';
import { getApplication } from 'src/services/apply.service';

import { Title } from '@components/Title';
import { ApplicationState } from '@components/profile/application/ApplicationState';

export const Route = createFileRoute('/_layout/profile/application')({
  loader: async () => {
    try {
      const application = await getApplication();
      return { application };
    } catch (error) {
      return { error };
    }
  },
  component: MyApplication,
});

function MyApplication() {
  const currentTerm = getCurrentTerm();
  const { application, error } = Route.useLoaderData();

  if (error && axios.isAxiosError(error) && error.response?.status === 502) {
    return (
      <Box width={'100%'}>
        <Title
          title='스터디 지원서'
          label='이번 학기에 제출한 스터디 지원서를 확인할 수 있습니다.'
          pt={0}
        />
        <Layout>
          <Grid container spacing={{ xs: 2, md: 4, xl: 6 }}>
            <Grid item xs={12}>
              <Card
                sx={{
                  minWidth: 275,
                  backgroundColor: 'background.default',
                  borderRadius: 3,
                  boxShadow: 0,
                  p: 2,
                  border: '1px solid',
                  borderColor: 'divider',
                }}
              >
                <CardContent>
                  <Typography variant='titleMedium' fontWeight={'bold'}>
                    제출한 스터디 지원서
                  </Typography>
                  <Typography
                    variant='bodySmall'
                    color={'text.secondary'}
                    mb={2}
                  >
                    현재 학기({currentTerm.year} - {currentTerm.semester}) 기준
                  </Typography>
                  <Typography variant='titleMedium'>
                    제출한 지원서가 없습니다.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12}>
              <ApplicationState application={application!} />
            </Grid>
          </Grid>
        </Layout>
      </Box>
    );
  } else {
    return (
      <Box width={'100%'}>
        <Title
          title='스터디 지원서'
          label='이번 학기에 제출한 스터디 지원서를 확인할 수 있습니다.'
          pt={0}
        />
        <Layout>
          <Grid container spacing={{ xs: 2, md: 4, xl: 6 }}>
            <Grid item xs={12}>
              <Card
                sx={{
                  minWidth: 275,
                  backgroundColor: 'background.default',
                  borderRadius: 3,
                  boxShadow: 0,
                  p: 2,
                  border: '1px solid',
                  borderColor: 'divider',
                }}
              >
                <CardContent>
                  <Typography variant='titleMedium' fontWeight={'bold'}>
                    제출한 스터디 지원서
                  </Typography>
                  <Typography
                    variant='bodySmall'
                    color={'text.secondary'}
                    mb={2}
                  >
                    현재 학기({currentTerm.year} - {currentTerm.semester}) 기준
                  </Typography>
                  <Typography variant='titleMedium'>
                    알 수 없는 오류가 발생했습니다. 다시 시도해주세요.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12}>
              <ApplicationState application={application!} />
            </Grid>
          </Grid>
        </Layout>
      </Box>
    );
  }
}
