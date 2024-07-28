import {
  Card,
  CardContent,
  FormControlLabel,
  Grid,
  Skeleton,
  Switch,
  TextField,
  Typography,
} from '@mui/material';
import { Box, Stack } from '@mui/system';

import { Button } from '@packages/components/Button';
import { useQuery } from '@tanstack/react-query';
import { Link, createFileRoute } from '@tanstack/react-router';
import { AxiosError } from 'axios';
import { getApplication } from 'src/services/user.service';
import { Application } from 'src/types/apply.schema';

import { Title } from '@components/Title';

export const Route = createFileRoute('/_layout/profile/application')({
  component: MyApplication,
});

function MyApplication() {
  const { data, isLoading } = useQuery<Application, AxiosError>({
    queryKey: ['application'],
    queryFn: getApplication,
  });

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
          {isLoading ? (
            <>
              <Grid item sm={12} md={6}>
                <Skeleton width={'100%'} height={512} />
              </Grid>
              <Grid item sm={12} md={6}>
                <Skeleton width={'100%'} height={512} />
              </Grid>
              <Grid item sm={12} md={6}>
                <Skeleton width={'100%'} height={512} />
              </Grid>
            </>
          ) : (
            <>
              <Grid item sm={12} md={6}>
                <Card
                  sx={{
                    minWidth: 275,
                    height: 512,
                    backgroundColor: 'background.default',
                    borderRadius: 3,
                    boxShadow: 0,
                    p: 2,
                    border: '1px solid',
                    borderColor: 'divider',
                  }}
                >
                  <CardContent>
                    <Box>
                      <Typography variant='titleMedium' fontWeight={'bold'}>
                        1순위 스터디 지원서
                      </Typography>
                      <Typography variant='bodySmall' color={'text.secondary'}>
                        1순위 스터디와 2순위 스터디에 모두 합격한 경우, 1순위
                        스터디로 배정됩니다.
                      </Typography>
                      <Stack gap={2} my={4}>
                        <FormControlLabel
                          control={
                            <Switch
                              id='priamry-study-switch'
                              defaultChecked
                              disabled
                            />
                          }
                          label='1순위 스터디는 반드시 수강해야 합니다.'
                        />
                        <Typography
                          variant='bodyMedium'
                          sx={{
                            height: 52,
                          }}
                        >
                          {isLoading ? 'Unknown' : data?.primaryStudy}
                        </Typography>
                        <TextField
                          id='primary-study-application-textfield'
                          value={data?.primaryIntro}
                          multiline
                          disabled
                          maxRows={4}
                        />
                      </Stack>
                      <Link to='/apply/application'>
                        <Button variant='outlined' fullWidth>
                          수정
                        </Button>
                      </Link>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item sm={12} md={6}>
                <Card
                  sx={{
                    minWidth: 275,
                    height: 512,
                    backgroundColor: 'background.default',
                    borderRadius: 3,
                    boxShadow: 0,
                    p: 2,
                    border: '1px solid',
                    borderColor: 'divider',
                  }}
                >
                  <CardContent>
                    <Box>
                      <Typography variant='titleMedium' fontWeight={'bold'}>
                        2순위 스터디 지원서
                      </Typography>
                      <Typography variant='bodySmall' color={'text.secondary'}>
                        2순위 스터디는 1순위 스터디에 합격하지 못한 경우에만
                        배정됩니다.
                      </Typography>
                      <Stack gap={2} my={4}>
                        <FormControlLabel
                          control={
                            <Switch
                              id='primary-study-switch'
                              defaultChecked
                              disabled
                            />
                          }
                          label='1순위 스터디 불합격 시 2순위 스터디 미수강'
                        />
                        <Typography
                          variant='bodyMedium'
                          sx={{
                            height: 52,
                          }}
                        >
                          {isLoading ? 'Unknown' : data!.secondaryStudy}
                        </Typography>
                        <TextField
                          id='primary-study-application-textfield'
                          value={data?.secondaryIntro}
                          multiline
                          disabled
                          maxRows={4}
                        />
                      </Stack>
                      <Link to='/apply/application'>
                        <Button variant='outlined' fullWidth>
                          수정
                        </Button>
                      </Link>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item sm={12} md={6}>
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
                    <Box>
                      <Typography variant='titleMedium' fontWeight={'bold'}>
                        2순위 스터디 수강 여부
                      </Typography>
                      <Typography variant='bodySmall' color={'text.secondary'}>
                        1순위 스터디에 불합격한 경우의 2순위 스터디 수강 여부를
                        정합니다.
                      </Typography>
                      <Stack gap={2} my={4}>
                        <Typography variant='bodyMedium'>
                          2순위 스터디를 수강할 경우 2순위 스터디에 대한
                          지원서를 새롭게 작성해야 합니다.
                        </Typography>
                      </Stack>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            </>
          )}
        </Grid>
      </Box>
    </Box>
  );
}
