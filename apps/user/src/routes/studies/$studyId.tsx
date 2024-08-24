import { SyntheticEvent, useState } from 'react';
import Markdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';

import { Chip, Divider, Tab, Tabs, Typography, useTheme } from '@mui/material';
import { Box, Stack, useMediaQuery } from '@mui/system';
import {
  DateCalendar,
  LocalizationProvider,
  PickersDay,
  PickersDayProps,
} from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import {
  RECRUIT_END_DATE,
  RECRUIT_START_DATE,
  TAG_OPTIONS,
} from '@constants/apply.constant';
import { DIFFICULTY } from '@constants/filter.constant';
import { Button } from '@packages/components/Button';
import { Study } from '@packages/components/types/study';
import { Link, createFileRoute } from '@tanstack/react-router';
import dayjs from '@utils/dayjs';
import formatMarkdown from '@utils/formatMarkdown';
import { getCurrentTerm } from '@utils/getCurrentTerm';
import { formatStudyTimeToKorean, getWeekDayAsString } from '@utils/time';
import { Dayjs } from 'dayjs';
import 'dayjs/locale/ko';
import rehypeSanitize from 'rehype-sanitize';
import remarkGfm from 'remark-gfm';
import { getStudyInfo } from 'src/services/study.service';

import StudyCurriculum from '@components/study/StudyCurriculum';

import { usePeriod } from '@hooks/usePeriod';

export const Route = createFileRoute('/studies/$studyId')({
  loader: ({ params }) => getStudyInfo(params.studyId),
  component: StudyComponent,
});

//TODO: Replace with actual start date
const STUDY_START_DATE = '2024-09-10';

const getTag = (tag: string) => {
  const tagOption = TAG_OPTIONS.find((option) => option.value === tag);
  if (!tagOption) return '기타';
  return tagOption.label;
};

function StudyComponent() {
  const study: Study = Route.useLoaderData();
  const difficulty =
    (Object.keys(DIFFICULTY) as Array<keyof typeof DIFFICULTY>).find(
      (key) => DIFFICULTY[key] === study.difficulty,
    ) || '';
  const currentTerm = getCurrentTerm();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const mode = theme.palette.mode;
  const [tab, setTab] = useState('#introduction');
  const [date, setDate] = useState<Dayjs | null>(dayjs(STUDY_START_DATE));
  const { isIncluded } = usePeriod(RECRUIT_START_DATE, RECRUIT_END_DATE);
  const isDisabled =
    currentTerm.year !== study.act_year.toString() ||
    currentTerm.semester !== study.act_semester.toString() ||
    !isIncluded;

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
          <Box>
            {study.tag && (
              <Chip
                label={getTag(study.tag)}
                color='primary'
                sx={{ width: 'fit-content', mr: 1 }}
              />
            )}
            <Chip
              label={`${difficulty} 난이도`}
              color='info'
              sx={{ width: 'fit-content' }}
            />
          </Box>

          <Typography
            variant={isMobile ? 'titleLarge' : 'headlineSmall'}
            mb={2}
          >
            {study.id === 0 ? '자율스터디' : study.name}
          </Typography>
          <Typography variant='bodyMedium' mb={2} fontWeight={300}>
            {study.one_liner}
          </Typography>
          {study.id !== 0 && (
            <Link
              to={'/apply/member'}
              disabled={isDisabled}
              style={{
                width: 'fit-content',
              }}
            >
              <Button
                sx={{
                  width: 'fit-content',
                }}
                variant='contained'
                size='large'
                disabled={isDisabled}
              >
                스터디 신청하기
              </Button>
            </Link>
          )}
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
                component={'article'}
                p={3}
                borderRadius={4}
                border={1}
                borderColor={'divider'}
                width={'100%'}
                data-color-mode={mode}
              >
                <Markdown
                  children={formatMarkdown(study.explanation)}
                  rehypePlugins={[rehypeSanitize]}
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
          <StudySideBox study={study} isDisabled={isDisabled} />
        </Stack>
      </Box>
    </Box>
  );
}

function StudySideBox({
  study,
  isDisabled,
}: {
  study: Study;
  isDisabled: boolean;
}) {
  const difficulty =
    (Object.keys(DIFFICULTY) as Array<keyof typeof DIFFICULTY>).find(
      (key) => DIFFICULTY[key] === study.difficulty,
    ) || '';
  console.log(difficulty);
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
      <Box>
        {study.tag && (
          <Chip
            label={getTag(study.tag)}
            color='primary'
            sx={{ width: 'fit-content', mr: 1 }}
          />
        )}
        <Chip
          label={`${difficulty} 난이도`}
          color='info'
          sx={{ width: 'fit-content' }}
        />
      </Box>
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
      {study.id !== 0 && (
        <Link to={'/apply/member'} disabled={isDisabled}>
          <Button
            variant='contained'
            fullWidth
            size='large'
            disabled={isDisabled}
          >
            신청하기
          </Button>
        </Link>
      )}
      <Link
        to='/studies'
        onClick={() => window.scrollTo(0, 0)}
        search={{
          semester: study.act_semester,
          year: study.act_year,
        }}
      >
        <Button variant='outlined' fullWidth size='large'>
          스터디 목록으로 돌아가기
        </Button>
      </Link>
    </Stack>
  );
}
