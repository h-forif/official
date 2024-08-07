import { SyntheticEvent, useState } from 'react';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Chip,
  Divider,
  Tab,
  Tabs,
  Typography,
  useTheme,
} from '@mui/material';
import { Box, Stack } from '@mui/system';
import {
  DateCalendar,
  LocalizationProvider,
  PickersDay,
  PickersDayProps,
} from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import { Button } from '@packages/components/Button';
import { Study } from '@packages/components/types/study';
import { Link, createFileRoute } from '@tanstack/react-router';
import MDEditor from '@uiw/react-md-editor';
import dayjs from '@utils/dayjs';
import formatMarkdown from '@utils/formatMarkdown';
import { getCurrentTerm } from '@utils/getCurrentTerm';
import { formatStudyTimeToKorean, getWeekDayAsString } from '@utils/time';
import { Dayjs } from 'dayjs';
import 'dayjs/locale/ko';
import rehypeSanitize from 'rehype-sanitize';
import { getStudyInfo } from 'src/services/study.service';

import StudyCurriculum from '@components/study/StudyCurriculum';

export const Route = createFileRoute('/studies/$studyId')({
  loader: ({ params }) => getStudyInfo(params.studyId),
  component: StudyComponent,
});

//TODO: Replace with actual start date
const STUDY_START_DATE = '2024-09-10';

function StudyComponent() {
  const study: Study = Route.useLoaderData();

  const theme = useTheme();
  const [tab, setTab] = useState('#introduction');
  const [date, setDate] = useState<Dayjs | null>(dayjs(STUDY_START_DATE));

  const handleTabClick = (event: SyntheticEvent, newValue: string) => {
    setTab(newValue);
    event.preventDefault();
    const targetElement = document.querySelector(newValue);

    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const renderPickerDay = (props: PickersDayProps<Dayjs>) => {
    const { day, outsideCurrentMonth } = props;
    const isSelectedWeekDay =
      !outsideCurrentMonth && day.day() === study.week_day;
    const isSameOrAfterToday =
      day.isSame(dayjs(STUDY_START_DATE), 'day') ||
      day.isAfter(dayjs(STUDY_START_DATE), 'day');

    if (!isSameOrAfterToday) {
      return <PickersDay {...props} />;
    }

    const startDate = dayjs(STUDY_START_DATE).startOf('day');
    const diffInDays = day.diff(startDate, 'day');
    const index = Math.floor(diffInDays / 7);

    if (index >= study.study_plans.length) {
      return <PickersDay {...props} disabled />;
    }
    return (
      <PickersDay
        {...props}
        sx={{
          ...(isSelectedWeekDay && {
            backgroundColor: 'primary.light',
            color: 'primary.contrastText',
            '&:hover': {
              backgroundColor: 'primary.main',
            },
          }),
        }}
      />
    );
  };

  const getTodayStudyPlan = (date: Dayjs | null): string => {
    if (!date) return '';
    const weekDay = date.day();
    const startDate = dayjs(STUDY_START_DATE).startOf('day');
    const diffInDays = date.diff(startDate, 'day');

    const index = Math.floor(diffInDays / 7);
    if (weekDay !== study.week_day)
      return '해당 날짜에 정해진 일정이 없습니다.';
    return (
      study.study_plans[index]?.section || '해당 날짜에 정해진 일정이 없습니다.'
    );
  };

  return (
    <Box>
      <Box
        component={'section'}
        sx={{
          px: { xs: 4, md: 8, xl: 12 },
          py: 10,
          margin: 'auto',
          backgroundColor: theme.palette.background.paper,
        }}
      >
        <Stack
          bgcolor={'background.default'}
          borderRadius={4}
          border={1}
          borderColor={'divider'}
          p={6}
          gap={1}
        >
          <Chip
            label={study.tag}
            color='primary'
            sx={{ width: 'fit-content' }}
          />
          <Typography variant='displaySmall' mb={2}>
            {study.name}
          </Typography>
          <Typography variant='bodyMedium' mb={2} fontWeight={300}>
            {study.one_liner}
          </Typography>
          <Link to='/apply/member'>
            <Button
              sx={{
                width: 'fit-content',
              }}
              variant='contained'
              size='large'
            >
              스터디 신청하기
            </Button>
          </Link>
        </Stack>
      </Box>
      <Box
        id='introduction'
        component={'section'}
        sx={{
          px: { xs: 4, md: 8, xl: 12 },
          py: 4,
          margin: 'auto',
        }}
      >
        <Tabs
          value={tab}
          onChange={handleTabClick}
          aria-label='Study Tabs'
          variant='scrollable'
          role='navigation'
          sx={{
            position: 'sticky',
            top: 0,
            backgroundColor: 'background.default',
            zIndex: 5,
          }}
        >
          <Tab component='a' label='스터디 소개' value={'#introduction'} />
          <Tab component='a' label='커리큘럼' value={'#curriculum'} />
          <Tab component='a' label='시간 및 장소' value={'#place'} />
          <Tab component='a' label='FAQ' value={'#faq'} />
        </Tabs>
        <Stack direction={'row'} gap={4} justifyContent={'space-between'}>
          <Box flex={1} width={'100%'}>
            <Stack width={'100%'}>
              <Typography variant='bodyMedium' mt={4}>
                스터디 소개
              </Typography>
              <Typography variant='titleLarge' mb={2}>
                {study.name}
              </Typography>
              <Stack
                p={3}
                borderRadius={4}
                border={1}
                borderColor={'divider'}
                width={'100%'}
              >
                <MDEditor.Markdown
                  source={formatMarkdown(study.explanation)}
                  rehypePlugins={[rehypeSanitize]}
                  style={{ whiteSpace: 'pre-wrap' }}
                />
              </Stack>
            </Stack>
            <Box id='curriculum' component={'section'}>
              <Typography
                variant='titleLarge'
                pt={4}
                pb={study.id === 0 ? 0 : 4}
              >
                커리큘럼
              </Typography>
              <Stack gap={2}>
                {study.id === 0 ? (
                  <Typography variant='bodyLarge'>
                    자율스터디는 커리큘럼이 정해져 있지 않습니다. 동아리 활동
                    기간 내에 서로 협의 하에 일정을 결정하게 됩니다.
                  </Typography>
                ) : (
                  study.study_plans.map((plan, index) => (
                    <StudyCurriculum
                      key={index}
                      studyPlan={plan}
                      index={index}
                    />
                  ))
                )}
              </Stack>
            </Box>
            <Box id='place' component={'section'}>
              <Typography variant='bodyMedium' pt={4}>
                시간 및 장소
              </Typography>
              <Typography variant='titleLarge'>
                {study.id === 0
                  ? '자율스터디는 시간 및 장소가 정해져 있지 않습니다.'
                  : `매주 ${getWeekDayAsString(study.week_day)} 
                ${formatStudyTimeToKorean(study.start_time)} - 
                ${formatStudyTimeToKorean(study.end_time)}`}
              </Typography>
              <Stack
                display={'flex'}
                sx={{
                  flexDirection: {
                    xs: 'column',
                    md: 'row',
                  },
                }}
                gap={6}
                mt={4}
              >
                <LocalizationProvider
                  dateAdapter={AdapterDayjs}
                  adapterLocale='ko'
                >
                  <DateCalendar
                    value={date}
                    slots={{ day: renderPickerDay }}
                    onChange={(newValue) => setDate(newValue)}
                    sx={{
                      margin: 0,
                    }}
                  />
                </LocalizationProvider>
                <Divider orientation='vertical' flexItem />
                <Stack gap={2}>
                  <Typography variant='titleSmall'>
                    {date?.format('YYYY년 MM월 DD일')}
                  </Typography>
                  <Box minHeight={200}>
                    <Typography variant='titleLarge'>
                      {getTodayStudyPlan(date)}
                    </Typography>
                    <Box component={'ul'}>
                      {study.study_plans
                        .find(
                          (plan) => plan.section === getTodayStudyPlan(date),
                        )
                        ?.content.map((content, index) => (
                          <Typography
                            component={'li'}
                            variant='bodyLarge'
                            key={index}
                          >
                            {content}{' '}
                          </Typography>
                        ))}
                    </Box>
                  </Box>
                  <Typography variant='labelLarge'>
                    수업 장소 : {study.location}
                  </Typography>
                </Stack>
              </Stack>
            </Box>
          </Box>
          <StudySideBox {...study} />
        </Stack>
      </Box>
      <Box
        id='faq'
        component={'section'}
        sx={{
          px: { xs: 4, md: 8, xl: 12 },
          py: 10,
          margin: 'auto',
          backgroundColor: theme.palette.background.paper,
        }}
      >
        <Stack justifyContent={'center'} alignItems={'center'} gap={4}>
          <Typography variant='headlineMedium'>자주 묻는 질문</Typography>
          <Accordion
            elevation={0}
            sx={{
              bgcolor: 'background.default',
              border: 1,
              borderColor: 'divider',
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls='panel1-content'
              id='panel1-header'
            >
              Accordion 1
            </AccordionSummary>
            <AccordionDetails>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
              eget.
            </AccordionDetails>
          </Accordion>
          <Accordion
            elevation={0}
            sx={{
              bgcolor: 'background.default',
              border: 1,
              borderColor: 'divider',
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls='panel1-content'
              id='panel1-header'
            >
              Accordion 1
            </AccordionSummary>
            <AccordionDetails>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
              eget.
            </AccordionDetails>
          </Accordion>
          <Accordion
            elevation={0}
            sx={{
              bgcolor: 'background.default',
              border: 1,
              borderColor: 'divider',
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls='panel1-content'
              id='panel1-header'
            >
              Accordion 1
            </AccordionSummary>
            <AccordionDetails>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
              eget.
            </AccordionDetails>
          </Accordion>
        </Stack>
      </Box>
    </Box>
  );
}

function StudySideBox(study: Study) {
  return (
    <Stack
      flexBasis={320}
      p={3}
      borderRadius={4}
      border={1}
      borderColor={'divider'}
      gap={2}
      height={'fit-content'}
      position={'sticky'}
      top={64}
      display={{ xs: 'none', md: 'flex' }}
    >
      <Chip label={study.tag} sx={{ width: 'fit-content' }} color='primary' />
      <Typography variant='labelLarge'>{study.name}</Typography>
      <Typography variant='labelSmall' color={'text.secondary'}>
        매주 {getWeekDayAsString(study.week_day)}
      </Typography>
      <Typography variant='labelSmall' color={'text.secondary'}>
        {formatStudyTimeToKorean(study.start_time)} -{' '}
        {formatStudyTimeToKorean(study.end_time)}
      </Typography>
      <Typography variant='labelSmall'>
        {study.primary_mentor_name} 멘토{' '}
        {study.secondary_mentor_name
          ? `| ${study.secondary_mentor_name} 멘토`
          : ''}
      </Typography>
      <Link to='/apply/member'>
        <Button variant='contained' fullWidth size='large'>
          신청하기
        </Button>
      </Link>
      <Link
        to='/studies'
        onClick={() => window.scrollTo(0, 0)}
        search={{
          semester: Number(getCurrentTerm().semester),
          year: Number(getCurrentTerm().year),
        }}
      >
        <Button variant='outlined' fullWidth size='large'>
          스터디 목록으로 돌아가기
        </Button>
      </Link>
    </Stack>
  );
}
