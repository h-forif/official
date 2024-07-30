import { Card, CardContent, Grid, TextField, Typography } from '@mui/material';
import { Box, Stack } from '@mui/system';

import { Button } from '@packages/components/Button';
import { Link, createFileRoute } from '@tanstack/react-router';
import { getCurrentTerm } from '@utils/getCurrentTerm';
import dayjs from 'dayjs';
import { getApplication } from 'src/services/user.service';
import { Application } from 'src/types/apply.schema';

import { Title } from '@components/Title';
import { ApplicationState } from '@components/profile/application/ApplicationState';

export const Route = createFileRoute('/_layout/profile/application')({
  loader: () => getApplication(),
  component: MyApplication,
});

function MyApplication() {
  const currentTerm = getCurrentTerm();
  const application: Application = Route.useLoaderData();
  console.log(application);

  return (
    <Box width={'100%'}>
      <Title
        title='스터디 지원서'
        label='이번 학기에 제출한 스터디 지원서를 확인할 수 있습니다.'
        pt={0}
      />
      <Box
        sx={{ px: { xs: 4, md: 8, xl: 12 }, pb: 4, margin: 'auto' }}
        maxWidth={1120}
      >
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
                <Typography variant='bodySmall' color={'text.secondary'} mb={2}>
                  현재 학기({currentTerm.year} - {currentTerm.semester}) 기준
                </Typography>
                <Typography variant='bodyMedium'>
                  <strong>
                    {dayjs(application.timestamp).format(
                      'YYYY년 MM월 DD일 HH시 mm분',
                    )}
                  </strong>
                  에 마지막으로 제출하셨습니다.
                </Typography>
                <Stack gap={2} my={4}>
                  <Typography variant='bodyMedium'>
                    1순위 스터디: {application.primaryStudy.name}
                  </Typography>
                  <TextField
                    id='primary-study-application-textfield'
                    value={application.primaryStudy.introduction}
                    multiline
                    maxRows={4}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </Stack>
                <Stack gap={2} my={4}>
                  <Typography variant='bodyMedium'>
                    2순위 스터디: {application.secondaryStudy.name}
                  </Typography>
                  <TextField
                    id='primary-study-application-textfield'
                    value={application.secondaryStudy.introduction}
                    multiline
                    maxRows={4}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </Stack>
                <Link to='/apply/application'>
                  <Button variant='contained' size='large' fullWidth>
                    수정
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <ApplicationState application={application} />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
