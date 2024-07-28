import {
  Card,
  CardContent,
  Divider,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import { Box, Stack } from '@mui/system';

import { Button } from '@packages/components/Button';
import { Study } from '@packages/components/types/study';
import { UserProfile } from '@packages/components/types/user';
import { useQuery } from '@tanstack/react-query';
import { Link, createFileRoute } from '@tanstack/react-router';
import { getCurrentTerm } from '@utils/getCurrentTerm';
import { getWeekDayAsString } from '@utils/time';
import { AxiosError } from 'axios';
import { getStudyInfo } from 'src/services/study.service';
import { getUserInfo } from 'src/services/user.service';

import { Title } from '@components/Title';

export const Route = createFileRoute('/_layout/profile/study')({
  loader: () => getUserInfo(),
  component: MyStudy,
});

function MyStudy() {
  const user: UserProfile = Route.useLoaderData();
  const currentTerm = getCurrentTerm();
  const { data, isLoading } = useQuery<Study, AxiosError>({
    queryKey: ['currentStudy'],
    queryFn: () => getStudyInfo(user.currentStudyId?.toString() || ''),
  });

  return (
    <Box width={'100%'}>
      <Title
        title='내 스터디'
        label='수강 중인 스터디를 포함한 스터디 수강 내역을 확인할 수 있습니다.'
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
                <Box>
                  <Typography variant='titleMedium' fontWeight={'bold'}>
                    제출한 스터디 지원서
                  </Typography>
                  <Typography variant='bodySmall' color={'text.secondary'}>
                    현재 학기({currentTerm.year} - {currentTerm.semester}) 기준
                  </Typography>
                  <Stack gap={2} my={4}>
                    <Typography variant='bodyMedium'>
                      1순위 스터디: {isLoading ? 'Unknown' : data!.name}
                    </Typography>
                    <TextField
                      id='primary-study-application-textfield'
                      value={'Hi through the fire and the flames'}
                      multiline
                      disabled
                      maxRows={4}
                    />
                  </Stack>
                  <Stack gap={2} my={4}>
                    <Typography variant='bodyMedium'>
                      2순위 스터디: {isLoading ? 'Unknown' : data!.name}
                    </Typography>
                    <TextField
                      id='primary-study-application-textfield'
                      value={'Hi through the fire and the flames'}
                      multiline
                      disabled
                      maxRows={4}
                    />
                  </Stack>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item sm={12} md={4}>
            <Card
              sx={{
                minWidth: 275,
                height: 342,
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
                    현재 수강 중인 스터디
                  </Typography>
                  <Typography variant='bodySmall' color={'text.secondary'}>
                    현재 학기({currentTerm.year} - {currentTerm.semester}) 기준
                  </Typography>
                  <Stack gap={2} my={4}>
                    <Typography variant='bodyMedium'>
                      {isLoading ? 'Unknown' : data!.name}
                    </Typography>
                    <Typography variant='bodyMedium'>
                      {isLoading ? 'Unknown' : data!.startTime} -{' '}
                      {isLoading ? 'Unknown' : data!.endTime}
                    </Typography>
                    <Typography variant='bodyMedium'>
                      {isLoading
                        ? 'Unknown'
                        : getWeekDayAsString(data!.weekDay)}
                    </Typography>
                  </Stack>
                  <Link to={`/studies/${data?.id}`}>
                    <Button variant='contained' size='large'>
                      스터디 정보 자세히 보기
                    </Button>
                  </Link>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item sm={12} md={8}>
            <Card
              sx={{
                minWidth: 275,
                height: 342,
                backgroundColor: 'background.default',
                borderRadius: 3,
                boxShadow: 0,
                p: 2,
                border: '1px solid',
                borderColor: 'divider',
              }}
            >
              <CardContent>
                <Typography variant='titleMedium' fontWeight={'bold'} mb={2}>
                  수강 내역
                </Typography>
                <Stack
                  divider={<Divider />}
                  sx={{
                    maxHeight: 200,
                    overflow: 'auto',
                  }}
                >
                  <Stack
                    direction={'row'}
                    alignItems={'center'}
                    justifyContent={'space-between'}
                    py={2}
                  >
                    <Typography variant='bodySmall'>
                      {data?.name}({currentTerm.year} - {currentTerm.semester})
                    </Typography>
                    <Typography variant='labelSmall' color={'primary'}>
                      수료
                    </Typography>
                  </Stack>
                  <Stack
                    direction={'row'}
                    alignItems={'center'}
                    justifyContent={'space-between'}
                    py={2}
                  >
                    <Typography variant='bodySmall'>
                      {data?.name}(2023 - 2)
                    </Typography>
                    <Typography variant='labelSmall' color={'error'}>
                      미수료
                    </Typography>
                  </Stack>
                  <Stack
                    direction={'row'}
                    alignItems={'center'}
                    justifyContent={'space-between'}
                    py={2}
                  >
                    <Typography variant='bodySmall'>
                      {data?.name}(2023 - 1)
                    </Typography>
                    <Typography variant='labelSmall' color={'primary'}>
                      수료
                    </Typography>
                  </Stack>
                  <Stack
                    direction={'row'}
                    alignItems={'center'}
                    justifyContent={'space-between'}
                    py={2}
                  >
                    <Typography variant='bodySmall'>
                      {data?.name}(2023 - 1)
                    </Typography>
                    <Typography variant='labelSmall' color={'primary'}>
                      수료
                    </Typography>
                  </Stack>
                  <Stack
                    direction={'row'}
                    alignItems={'center'}
                    justifyContent={'space-between'}
                    py={2}
                  >
                    <Typography variant='bodySmall'>
                      {data?.name}(2023 - 1)
                    </Typography>
                    <Typography variant='labelSmall' color={'primary'}>
                      수료
                    </Typography>
                  </Stack>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
