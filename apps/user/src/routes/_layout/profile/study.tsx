import {
  Card,
  CardContent,
  Divider,
  Grid,
  List,
  ListItemButton,
  ListItemText,
  TextField,
  Typography,
} from '@mui/material';
import { Box, Stack } from '@mui/system';

import { Button } from '@packages/components/Button';
import {
  Modal,
  ModalContent,
  ModalDescription,
  ModalHeader,
  ModalTrigger,
} from '@packages/components/Modal';
import { Study } from '@packages/components/types/study';
import { UserProfile } from '@packages/components/types/user';
import { useQuery } from '@tanstack/react-query';
import { Link, createFileRoute } from '@tanstack/react-router';
import { getCurrentTerm } from '@utils/getCurrentTerm';
import { AxiosError } from 'axios';
import { getStudyInfo } from 'src/services/study.service';
import { getUser } from 'src/services/user.service';

import { Title } from '@components/Title';

export const Route = createFileRoute('/_layout/profile/study')({
  loader: () => getUser(),
  component: MyStudy,
});

function MyStudy() {
  const user: UserProfile = Route.useLoaderData();

  const currentTerm = getCurrentTerm();
  const currentStudy = useQuery<Study, AxiosError>({
    queryKey: ['currentStudy'],
    queryFn: () => getStudyInfo(user.currentStudyId?.toString() || '0'),
  });
  const passedStudy = useQuery<Study, AxiosError>({
    queryKey: ['passedStudy'],
    queryFn: () => getStudyInfo(user.passedStudyId!.join(',')[0]!), // TO-DO: Fix this
  });

  if (currentStudy.isLoading && passedStudy.isLoading && !passedStudy.data)
    return null;
  if (!currentStudy.data) {
    return <Box>현재 수강 중인 스터디가 없습니다.</Box>;
  }
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
                    현재 수강 중인 스터디
                  </Typography>
                  <Typography variant='bodySmall' color={'text.secondary'}>
                    현재 학기({currentTerm.year} - {currentTerm.semester}) 기준
                  </Typography>
                  <>
                    <Stack gap={2} my={4}>
                      <Typography variant='bodyMedium'>
                        {currentStudy.data!.name}
                      </Typography>
                      <TextField
                        value={currentStudy.data!.explanation}
                        multiline
                        maxRows={4}
                        InputProps={{
                          readOnly: true,
                        }}
                      />
                      <Typography variant='bodyMedium'>
                        {currentStudy.data!.id === 0
                          ? `자율스터디는 정해진 스터디 시간이 없습니다.`
                          : `매주 {getWeekDayAsString(currentStudy.data!.week_day)}{' '}
                        {formatStudyTimeToKorean(currentStudy.data!.start_time)}{' '}
                        - {formatStudyTimeToKorean(currentStudy.data!.end_time)}
                        에 진행합니다.`}
                      </Typography>
                      <Typography variant='bodyMedium'></Typography>
                    </Stack>
                    <Stack direction={'row'} gap={2}>
                      <Modal>
                        <ModalTrigger>
                          <Button variant='contained' size='large'>
                            학습 계획 확인하기
                          </Button>
                        </ModalTrigger>
                        <ModalContent>
                          <ModalHeader>
                            <Typography variant='titleSmall' mb={1}>
                              <strong>{currentStudy.data!.name}</strong> 스터디
                              계획서
                            </Typography>
                            <Typography
                              variant='bodySmall'
                              color={'text.secondary'}
                            >
                              스터디 계획의 순서 혹은 자세한 내용은 멘토에 따라
                              변경될 수 있습니다.
                            </Typography>
                          </ModalHeader>
                          <ModalDescription>
                            <List dense={false}>
                              {currentStudy.data.id === 0
                                ? '자율스터디는 계획서가 없습니다.'
                                : currentStudy.data!.study_plans.map(
                                    (plan, index) => (
                                      <Box key={`plan-${index}`}>
                                        <ListItemButton>
                                          <ListItemText
                                            primary={
                                              plan
                                                ? `${index + 1}주차: ${plan}`
                                                : `${index + 1}주차: 시험기간으로 인한 휴강`
                                            }
                                          />
                                        </ListItemButton>
                                        <Divider />
                                      </Box>
                                    ),
                                  )}
                            </List>
                          </ModalDescription>
                        </ModalContent>
                      </Modal>

                      <Link to={`/studies/${currentStudy.data!.id}`!}>
                        <Button variant='outlined' size='large'>
                          스터디 자세히 보기
                        </Button>
                      </Link>
                    </Stack>
                  </>
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
                <Typography variant='titleMedium' fontWeight={'bold'} mb={2}>
                  출석 내역
                </Typography>
                <Stack
                  divider={<Divider />}
                  sx={{
                    maxHeight: 200,
                    overflow: 'auto',
                  }}
                >
                  {/* {Array.from({ length: 8 }).map((_, index) => {
                    const day = date.add(index, 'week').format('YYYY.MM.DD');
                    return (
                      <Stack
                        key={day}
                        direction={'row'}
                        alignItems={'center'}
                        justifyContent={'space-between'}
                        py={2}
                      >
                        <Typography variant='bodySmall'>
                          {index + 1}주차({day})
                        </Typography>
                        <Typography
                          variant='labelSmall'
                          color={index % 2 === 0 ? 'primary' : 'error'}
                        >
                          {index % 2 === 0 ? '출석' : '결석'}
                        </Typography>
                      </Stack>
                    );
                  })} */}
                </Stack>
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
                  역대 스터디 수강 내역
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
                      {/* {passedStudy.data!.name}
                      {passedStudy.data!.act_semester &&
                        passedStudy.data!.act_year &&
                        `(${passedStudy.data!.act_year} - ${passedStudy.data!.act_semester})`} */}
                    </Typography>
                    <Typography variant='labelSmall' color={'primary'}>
                      수료 완료!
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
