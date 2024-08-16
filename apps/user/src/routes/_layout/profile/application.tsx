import {
  Card,
  CardContent,
  Grid,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';

import {
  RECRUIT_END_DATE,
  RECRUIT_START_DATE,
} from '@constants/apply.constant';
import { Button } from '@packages/components/Button';
import { Layout } from '@packages/components/elements/Layout';
import { Link, createFileRoute } from '@tanstack/react-router';
import dayjs from '@utils/dayjs';
import { getCurrentTerm } from '@utils/getCurrentTerm';
import axios from 'axios';
import { getApplication } from 'src/services/apply.service';

import { Title } from '@components/Title';
import { ApplicationState } from '@components/profile/application/ApplicationState';

import { usePeriod } from '@hooks/usePeriod';

export const Route = createFileRoute('/_layout/profile/application')({
  loader: async () => {
    try {
      const application = await getApplication();
      return { application };
    } catch (err) {
      return { err };
    }
  },
  onError: (err) => {
    console.error(err);
  },
  component: MyApplication,
});

function MyApplication() {
  const currentTerm = getCurrentTerm();
  const { application, err } = Route.useLoaderData();
  const { isIncluded } = usePeriod(RECRUIT_START_DATE, RECRUIT_END_DATE);
  if (err) {
    if (axios.isAxiosError(err) && err.response?.status === 404) {
      return (
        <Box width={'100%'}>
          <Title
            title='스터디 지원서'
            label={`이번 학기에 제출한 스터디 지원서를 확인할 수 있습니다. 지원서 수정은 스터디 신청 기간(${RECRUIT_START_DATE} - ${RECRUIT_END_DATE})에만 가능합니다.`}
            pt={0}
          />
          <Layout>
            <Grid container spacing={{ xs: 2, md: 4, xl: 6 }} sx={{ mt: 2 }}>
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
                      현재 학기({currentTerm.year} - {currentTerm.semester})
                      기준
                    </Typography>
                    <Typography variant='titleMedium' color='primary' mb={2}>
                      아직 스터디 지원서를 제출하지 않았습니다.
                    </Typography>
                    <Stack direction={'row'} gap={2}>
                      <Link
                        to='/studies'
                        search={{
                          year: Number(currentTerm.year),
                          semester: Number(currentTerm.semester),
                        }}
                      >
                        <Button variant='outlined'>스터디 목록 보기</Button>
                      </Link>
                      <Link to='/apply/member' disabled={!isIncluded}>
                        <Button variant='contained' disabled={!isIncluded}>
                          스터디 신청하기
                        </Button>
                      </Link>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Layout>
        </Box>
      );
    }
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
                  <Typography variant='titleMedium' color='error'>
                    스터디 지원서를 불러오는 중 오류가 발생했습니다. 다시 시도해
                    주세요.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Layout>
      </Box>
    );
  }

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
                <Typography variant='bodySmall' color={'text.secondary'} mb={2}>
                  현재 학기({currentTerm.year} - {currentTerm.semester}) 기준
                </Typography>
                <Typography variant='bodyMedium'>
                  <strong>
                    {dayjs(application!.timestamp).format(
                      'YYYY년 MM월 DD일 HH시 mm분',
                    )}
                  </strong>
                  에 마지막으로 제출하셨습니다.
                </Typography>
                <Stack gap={2} my={4}>
                  <Typography variant='bodyMedium'>
                    1순위 스터디: {application!.primary_study.name}
                  </Typography>
                  <TextField
                    id='primary-study-application-textfield'
                    value={application!.primary_study.introduction}
                    multiline
                    minRows={4}
                    maxRows={6}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </Stack>
                <Stack gap={2} my={4}>
                  <Typography variant='bodyMedium'>
                    2순위 스터디:{' '}
                    {application!.secondary_study === null
                      ? '미수강'
                      : application!.secondary_study.name}
                  </Typography>
                  <TextField
                    id='primary-study-application-textfield'
                    value={
                      application!.secondary_study === null
                        ? '1순위 스터디 미선정 시 2순위 스터디를 수강하지 않습니다.'
                        : application!.secondary_study.introduction
                    }
                    multiline
                    minRows={4}
                    maxRows={6}
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
            <ApplicationState application={application!} />
          </Grid>
        </Grid>
      </Layout>
    </Box>
  );
}
