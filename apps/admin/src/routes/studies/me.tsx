import { SyntheticEvent, useState } from 'react';
import { useForm } from 'react-hook-form';
import Markdown from 'react-markdown';

import DoneIcon from '@mui/icons-material/Done';
import EditIcon from '@mui/icons-material/Edit';
import {
  Box,
  BoxProps,
  Divider,
  Grid,
  IconButton,
  Stack,
  Tab,
  Tabs,
  TextField,
  Typography,
} from '@mui/material';
import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid';

import {
  RECRUIT_END_DATE,
  RECRUIT_START_DATE,
  TAG_OPTIONS,
  WEEKDAYS_OPTIONS,
} from '@constants/apply.constant';
import { MENTOR_DIFFICULTY_OPTIONS } from '@constants/filter.constant';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormInput } from '@packages/components/form/FormInput';
import { FormSelect } from '@packages/components/form/FormSelect';
import { Study } from '@packages/components/types/study';
import { User } from '@packages/components/types/user';
import { getMentees } from '@services/admin.service';
import { getMyStudyId, getStudyInfo } from '@services/study.service';
import { useQuery } from '@tanstack/react-query';
import { ReactNode, createFileRoute, redirect } from '@tanstack/react-router';
import { getCurrentTerm } from '@utils/getCurrentTerm';
import rehypeRaw from 'rehype-raw';
import { ApplyMentorSchema } from 'src/types/apply.schema';

import { Layout } from '@components/common/Layout';
import { Title } from '@components/common/Title';
import NoResultsOverlay from '@components/common/table/NoResultOverlay';

const columns: GridColDef<User>[] = [
  { field: 'id', headerName: '학번', flex: 1 },
  { field: 'name', headerName: '이름', flex: 1 },
  {
    field: 'department',
    headerName: '학과',
    flex: 1,
  },
  {
    field: 'phone_number',
    headerName: '전화번호',
    flex: 2,
  },
];

export const Route = createFileRoute('/studies/me')({
  loader: async () => {
    const currentTerm = getCurrentTerm();
    try {
      const ids = await getMyStudyId();

      const currentId = ids.find(
        (studyId) =>
          studyId.act_year.toString() === currentTerm.year &&
          studyId.act_semester.toString() === currentTerm.semester,
      );
      const study = await getStudyInfo(currentId!.id.toString());
      return { ids, study };
    } catch (err) {
      console.error(err);
      alert('개최한 스터디가 없거나 스터디 정보를 불러오는데 실패했습니다.');
      throw redirect({
        to: '/dashboard',
      });
    }
  },
  onError: (err) => {
    console.error(err);
  },
  component: MyStudyPage,
});

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function MyStudyPage() {
  const { study } = Route.useLoaderData();
  const [isEdit, setIsEdit] = useState(false);
  const [explanation, setExplanation] = useState(study.explanation);
  const [value, setValue] = useState(0);

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const saveExplanation = () => {
    form.setValue('explanation', explanation);
    setIsEdit(false);
  };

  const form = useForm<Study>({
    resolver: zodResolver(ApplyMentorSchema),
    defaultValues: {
      name: study.name,
      primary_mentor_name: study.primary_mentor_name,
      secondary_mentor_name: study.secondary_mentor_name,
      one_liner: study.one_liner,
      difficulty: study.difficulty,
      location: study.location,
      week_day: study.week_day,
      tag: study.tag,
      start_time: study.start_time,
      end_time: study.end_time,
      explanation: study.explanation,
      study_plans: study.study_plans,
    },
  });

  const { data: mentees, isLoading } = useQuery({
    queryKey: ['mentee'],
    queryFn: () => getMentees(study.id),
  });

  return (
    <Layout width={'100%'}>
      <Title
        title='내 스터디 관리'
        label='아래 스터디 정보에서 부족하거나 수정해야할 부분이 있는지 확인해주세요.'
      />
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label='basic tabs example'
        >
          <Tab label='정보 관리' {...a11yProps(0)} />
          <Tab label='멘티 관리' {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <BorderBox>
              <Typography variant='bodySmall' mb={2}>
                한 줄 소개
              </Typography>
              <FormInput
                control={form.control}
                name='one_liner'
                fullWidth
                multiline
                minRows={2}
                sx={{
                  mb: 2,
                }}
              />
              <Typography variant='bodySmall' color={'text.secondary'}>
                스터디에 대한 간략한 설명입니다. 흥미를 유발하고, 참여자들에게
                스터디의 목적을 알려주고 있는 지 확인해주세요.
              </Typography>
            </BorderBox>
          </Grid>
          <Grid item sm={6} xs={12}>
            <BorderBox>
              <Typography variant='bodySmall' mb={2}>
                진행 요일
              </Typography>
              <FormSelect
                control={form.control}
                name='week_day'
                options={WEEKDAYS_OPTIONS}
                minWidth={'100%'}
                disabled
              />
              <Typography variant='bodySmall' my={2}>
                진행 시간
              </Typography>
              <Stack
                direction={'row'}
                alignItems={'center'}
                justifyContent={'space-between'}
                mb={2}
              >
                <TextField value={study.start_time} disabled />
                <Typography variant='bodyLarge'>-</Typography>
                <TextField value={study.end_time} disabled />
              </Stack>
              <Typography variant='bodySmall' color={'text.secondary'}>
                진행 요일 및 진행 시간은 부원 모집 기간({RECRUIT_START_DATE} -{' '}
                {RECRUIT_END_DATE}) 이후에는 수정할 수 없습니다.
              </Typography>
            </BorderBox>
          </Grid>
          <Grid item xs={6}>
            <BorderBox>
              <Typography variant='bodySmall' mb={2}>
                난이도
              </Typography>
              <FormSelect
                control={form.control}
                name='difficulty'
                options={MENTOR_DIFFICULTY_OPTIONS}
                minWidth={'100%'}
              />
              <Typography variant='bodySmall' my={2}>
                태그
              </Typography>
              <FormSelect
                options={TAG_OPTIONS}
                control={form.control}
                name='tag'
                sx={{ mb: 2 }}
              />
            </BorderBox>
          </Grid>
          <Grid item xs={12}>
            <BorderBox
              props={{
                position: 'relative',
              }}
            >
              <IconButton
                size='large'
                sx={{
                  position: 'absolute',
                  zIndex: 10,
                  right: 10,
                }}
                onClick={() => (isEdit ? saveExplanation() : setIsEdit(true))}
              >
                {isEdit ? (
                  <DoneIcon color='primary' />
                ) : (
                  <EditIcon color='primary' />
                )}
              </IconButton>
              <Typography
                variant='titleSmall'
                textAlign={'center'}
                mb={5}
                mt={4}
              >
                스터디 설명
              </Typography>
              <Typography variant='bodySmall' color={'text.secondary'} mb={5}>
                * 스터디에 대한 자세한 설명입니다. 마크다운으로 작성된 만큼,
                오타가 발생하지 않았는지 확인해주세요.
              </Typography>
              <Divider />
              <Box>
                {isEdit ? (
                  <TextField
                    value={explanation}
                    onChange={(e) => setExplanation(e.target.value)}
                    fullWidth
                    multiline
                    minRows={10}
                    sx={{
                      mb: 2,
                    }}
                  />
                ) : (
                  <Markdown rehypePlugins={[rehypeRaw]}>{explanation}</Markdown>
                )}
              </Box>
            </BorderBox>
          </Grid>
          <Grid item xs={12}>
            <BorderBox>
              <Stack gap={5} my={4} width={'100%'}>
                <Typography variant='titleSmall' textAlign={'center'}>
                  커리큘럼
                </Typography>
                <Typography
                  component={'ul'}
                  variant='bodySmall'
                  color={'text.secondary'}
                >
                  * 커리큘럼은 부원들이 스터디를 선택하는 가장 중요한
                  요소입니다. 다음과 같은 내용들을 확인해주세요.
                  <li>1. 실질적인 스터디 일정이 8주차 이상인가?</li>
                  <li>2. 중간고사 / 기말고사를 고려한 스터디일정인가?</li>
                  <li>
                    3. 온라인 수업이 시험기간을 제외한 기간에 포함되어 있는가?
                  </li>
                  <li>4. 오타는 없는가?</li>
                  <Typography
                    component={'span'}
                    variant='bodySmall'
                    color={'error'}
                  >
                    개발 미흡으로 커리큘럼은 현재 직접적인 수정이 불가능합니다.
                    만약 수정사항이나 문제가 있다면 회장단이나 SW팀에{' '}
                    <strong>반드시</strong> 말씀해주세요.
                  </Typography>
                </Typography>
                <Divider />
                {study.study_plans.map((plan, sectionIndex) => {
                  return (
                    <Stack
                      key={`${plan.section} - ${sectionIndex}`}
                      width={'100%'}
                      gap={2}
                    >
                      <Typography variant='titleMedium'>
                        {sectionIndex + 1}주차. {plan.section}
                      </Typography>
                      <Stack component={'ul'} gap={1} my={0}>
                        {plan.content.map((content, index) => (
                          <Typography
                            component={'li'}
                            key={index}
                            variant='bodySmall'
                          >
                            {content}
                          </Typography>
                        ))}
                      </Stack>
                    </Stack>
                  );
                })}
              </Stack>
            </BorderBox>
          </Grid>
        </Grid>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <DataGrid
          loading={isLoading}
          rows={mentees}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
              },
            },
          }}
          disableRowSelectionOnClick
          pageSizeOptions={[10]}
          checkboxSelection
          slots={{ toolbar: GridToolbar, noResultsOverlay: NoResultsOverlay }}
          slotProps={{
            toolbar: {
              showQuickFilter: true,
            },
            loadingOverlay: {
              variant: 'skeleton',
              noRowsVariant: 'skeleton',
            },
          }}
        />
      </TabPanel>
    </Layout>
  );
}

function BorderBox({
  children,
  props,
}: {
  children: ReactNode;
  props?: BoxProps;
}) {
  return (
    <Box
      border={1}
      borderColor={'divider'}
      p={3}
      width={'100%'}
      borderRadius={2}
      minHeight={240}
      {...props}
    >
      {children}
    </Box>
  );
}
