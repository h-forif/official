import { SyntheticEvent, useState } from 'react';
import { useForm } from 'react-hook-form';
import Markdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';

import CloseIcon from '@mui/icons-material/Close';
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
import { Button } from '@packages/components/Button';
import { FormInput } from '@packages/components/form/FormInput';
import { FormSelect } from '@packages/components/form/FormSelect';
import { Study } from '@packages/components/types/study';
import { User } from '@packages/components/types/user';
import { getMentees } from '@services/admin.service';
import { editStudy, getMyStudyId, getStudyInfo } from '@services/study.service';
import { DialogIconType, useDialogStore } from '@stores/dialog.store';
import { useQuery } from '@tanstack/react-query';
import {
  ReactNode,
  createFileRoute,
  redirect,
  useRouter,
} from '@tanstack/react-router';
import { getCurrentTerm } from '@utils/getCurrentTerm';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import { ApplyMentorSchema } from 'src/types/apply.schema';

import { Layout } from '@components/common/Layout';
import { TabPanel } from '@components/common/TabPanel';
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
      return { currentId, study };
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

function a11yProps(index: number) {
  return {
    id: `my-study-tab-${index}`,
    'aria-controls': `my-study-tabpanel-${index}`,
  };
}

function MyStudyPage() {
  const router = useRouter();
  const { currentId, study } = Route.useLoaderData();

  const [isExplanationEdit, setIsExplanationEdit] = useState(false);
  const [isCurriculumEdit, setIsCurriculumEdit] = useState(false);
  const [explanation, setExplanation] = useState(study.explanation);
  const [studyPlan, setStudyPlan] = useState(study.study_plans);
  const [value, setValue] = useState(0);
  const { openSingleButtonDialog } = useDialogStore();

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleSectionChange = (index: number, value: string) => {
    const updatedPlans = [...studyPlan];
    if (updatedPlans[index]) {
      updatedPlans[index].section = value;
      setStudyPlan(updatedPlans);
    }
  };

  const handleContentChange = (
    sectionIndex: number,
    contentIndex: number,
    value: string,
  ) => {
    const updatedPlans = [...studyPlan];
    if (updatedPlans[sectionIndex]?.content) {
      updatedPlans[sectionIndex].content[contentIndex] = value;
      setStudyPlan(updatedPlans);
    }
  };

  const handleEdit = async () => {
    const formData = form.getValues();

    try {
      await editStudy(currentId!.id, formData);
      router.invalidate();
      openSingleButtonDialog({
        title: '스터디 수정 완료',
        message: '스터디 정보가 수정되었습니다.',
        mainButtonText: '확인',
        dialogIconType: DialogIconType.CONFIRM,
      });
    } catch (err) {
      console.error(err);
      openSingleButtonDialog({
        title: '스터디 수정 실패',
        message: '스터디 정보 수정에 실패했습니다. 다시 시도해주세요.',
        mainButtonText: '확인',
        dialogIconType: DialogIconType.WARNING,
      });
    }
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

  const saveExplanation = () => {
    form.setValue('explanation', explanation);
    setIsExplanationEdit(false);
  };

  const saveCurriculum = () => {
    form.setValue('study_plans', studyPlan);
    setIsCurriculumEdit(false);
  };

  const cancelExplanationEdit = () => {
    setExplanation(form.getValues('explanation'));
    setIsExplanationEdit(false);
  };

  const cancelCurriculumEdit = () => {
    setStudyPlan(form.getValues('study_plans'));
    setIsCurriculumEdit(false);
  };

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
        <BorderBox
          props={{
            minHeight: 0,
          }}
        >
          <Typography variant='titleMedium' mb={2}>
            내 스터디 정보를 수정하세요.
          </Typography>
          <Typography variant='bodySmall' color={'text.secondary'} mb={2}>
            일부 정보는 부원 모집 기간({RECRUIT_START_DATE} - {RECRUIT_END_DATE}
            ) 이후에는 수정이 불가능합니다.
          </Typography>
          <Button variant='contained' onClick={handleEdit}>
            수정
          </Button>
        </BorderBox>
        <Grid container spacing={2} mt={2}>
          <Grid item xs={12}>
            <BorderBox
              props={{
                minHeight: 0,
              }}
            >
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
            </BorderBox>
          </Grid>
          <Grid item md={6} sm={12}>
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
                진행 요일 및 진행 시간은 수정할 수 없습니다. 수정이 필요한 경우
                회장단이나 SW팀에 말씀해주세요.
              </Typography>
            </BorderBox>
          </Grid>
          <Grid item md={6} sm={12}>
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
              <Typography variant='bodySmall' color={'text.secondary'}>
                난이도 및 태그는 부원 모집 기간({RECRUIT_START_DATE} -{' '}
                {RECRUIT_END_DATE}) 이후에 수정할 수 없습니다.
              </Typography>
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
                onClick={() =>
                  isExplanationEdit
                    ? saveExplanation()
                    : setIsExplanationEdit(true)
                }
              >
                {isExplanationEdit ? (
                  <DoneIcon color='primary' />
                ) : (
                  <EditIcon color='primary' />
                )}
              </IconButton>
              <IconButton
                size='large'
                sx={{
                  position: 'absolute',
                  zIndex: 10,
                  right: 48,
                }}
                onClick={() => isExplanationEdit && cancelExplanationEdit()}
              >
                {isExplanationEdit && <CloseIcon />}
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
                {isExplanationEdit ? (
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
                  <Markdown
                    rehypePlugins={[rehypeRaw]}
                    remarkPlugins={[remarkGfm]}
                    components={{
                      code(props) {
                        const { children, className, ...rest } = props;
                        const match = /language-(\w+)/.exec(className || '');
                        return match ? (
                          <SyntaxHighlighter
                            PreTag={'div'}
                            children={String(children).replace(/\n$/, '')}
                            language={match[1]}
                          />
                        ) : (
                          <code {...rest} className={className}>
                            {children}
                          </code>
                        );
                      },
                    }}
                  >
                    {explanation}
                  </Markdown>
                )}
              </Box>
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
                onClick={() =>
                  isCurriculumEdit
                    ? saveCurriculum()
                    : setIsCurriculumEdit(true)
                }
              >
                {isCurriculumEdit ? (
                  <DoneIcon color='primary' />
                ) : (
                  <EditIcon color='primary' />
                )}
              </IconButton>
              <IconButton
                size='large'
                sx={{
                  position: 'absolute',
                  zIndex: 10,
                  right: 48,
                }}
                onClick={cancelCurriculumEdit}
              >
                {isCurriculumEdit && <CloseIcon />}
              </IconButton>
              <Stack gap={5} my={4} width={'100%'}>
                <Typography variant='titleSmall' textAlign={'center'}>
                  커리큘럼
                </Typography>
                <Typography
                  component={'ol'}
                  variant='bodySmall'
                  color={'text.secondary'}
                  sx={{
                    wordBreak: 'keep-all',
                  }}
                >
                  커리큘럼은 부원들이 스터디를 선택하는 가장 중요한 요소입니다.
                  다음과 같은 주의사항을 확인해주세요.
                  <li>실질적인 스터디 일정이 8주차 이상인가?</li>
                  <li>중간고사 / 기말고사를 고려한 스터디일정인가?</li>
                  <li>
                    온라인 수업이 시험기간을 제외한 기간에 포함되어 있는가?
                  </li>
                  <li>오타는 없는가?</li>
                </Typography>
                <Divider />
                {studyPlan.map((plan, sectionIndex) => (
                  <Stack key={sectionIndex} width={'100%'} gap={2}>
                    <Box>
                      <Typography component={'span'} variant='titleMedium'>
                        {sectionIndex + 1}주차:{' '}
                      </Typography>
                      {isCurriculumEdit ? (
                        <TextField
                          value={plan.section}
                          onChange={(e) =>
                            handleSectionChange(sectionIndex, e.target.value)
                          }
                          variant='outlined'
                          size='small'
                          sx={{ width: '60%' }}
                        />
                      ) : (
                        <Typography component={'span'} variant='titleMedium'>
                          {plan.section}
                        </Typography>
                      )}
                    </Box>

                    <Stack component={'ul'} gap={1} my={0}>
                      {plan.content.map((content, contentIndex) =>
                        isCurriculumEdit ? (
                          <TextField
                            key={contentIndex}
                            value={content}
                            onChange={(e) =>
                              handleContentChange(
                                sectionIndex,
                                contentIndex,
                                e.target.value,
                              )
                            }
                            variant='outlined'
                            size='small'
                            fullWidth
                          />
                        ) : (
                          <Typography
                            component={'li'}
                            key={contentIndex}
                            variant='bodySmall'
                          >
                            {content}
                          </Typography>
                        ),
                      )}
                    </Stack>
                  </Stack>
                ))}
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
      bgcolor={'background.default'}
      {...props}
    >
      {children}
    </Box>
  );
}
