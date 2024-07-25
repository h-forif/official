import { SyntheticEvent, useState } from 'react';
import Markdown from 'react-markdown';

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
} from '@mui/material';
import { Box, Stack } from '@mui/system';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import {
  PickersDay,
  PickersDayProps,
} from '@mui/x-date-pickers/PickersDay/PickersDay';

import { Button } from '@packages/components/Button';
import { Study } from '@packages/components/types/study';
import { createFileRoute } from '@tanstack/react-router';
import { formatStudyTimeToKorean, getWeekDayAsString } from '@utils/time';
import dayjs, { Dayjs } from 'dayjs';
import 'dayjs/locale/ko';
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
  const [tab, setTab] = useState('#introduction');
  const [date, setDate] = useState<Dayjs | null>(dayjs(STUDY_START_DATE));

  console.log(study);

  const renderPickerDay = (props: PickersDayProps<Dayjs>) => {
    const { day, outsideCurrentMonth } = props;
    const isSelectedWeekDay =
      !outsideCurrentMonth && day.day() === study.weekDay;
    const isSameOrAfterToday =
      day.isSame(dayjs(STUDY_START_DATE), 'day') ||
      day.isAfter(dayjs(STUDY_START_DATE), 'day');

    return (
      <PickersDay
        {...props}
        sx={{
          ...(isSelectedWeekDay &&
            isSameOrAfterToday && {
              backgroundColor: 'primary.light',
              ':hover': {
                backgroundColor: 'primary.dark',
              },
            }),
        }}
      />
    );
  };

  const getWeeklyPlan = (date: Dayjs | null): string => {
    if (!date) return '';
    const startDate = dayjs(STUDY_START_DATE).startOf('day');
    const diffInDays = date.diff(startDate, 'day');
    const index = Math.floor(diffInDays / 7) % study.weeklyPlans.length;
    if (study.weeklyPlans[index] === '') return '휴강';
    return study.weeklyPlans[index]!;
  };

  const content = `# 한국이 자바 공화국인 이유
    한국정부는 정보통신산업을 중요한 경제 성장 동력으로 인식하고, 이를 육성하기 위한 다양한 정책을 추진해왔습니다.   
    자바는 다양한 플랫폼과 환경에서 사용할 수 있는 범용 프로그래밍 언어로서, 이러한 정보통신산업 육성 정책의 일환으로 자바 개발을 촉진하고 지원해왔습니다.   
       
    전자정부프레임워크는 한국 공공기관의 정보화 프로젝트를 위한 프레임워크로, 자바를 기반으로 개발되었습니다.   
    이 프레임워크의 활용으로 인해 자바가 한국 공공기관의 정보 시스템 개발에서 중요한 역할을 하게 되었고, 이로써 "자바공화국"이라는 명칭이 생겨났습니다.
       
    Spring Boot는 엔터프라이즈용 Java 애플리케이션 개발을 편하게 할 수 있게 해주는 오픈소스 경량급 애플리케이션 프레임워크입니다.
  `;

  const handleTabClick = (event: SyntheticEvent, newValue: string) => {
    setTab(newValue);
    event.preventDefault();
    const targetElement = document.querySelector(newValue);
    console.log(targetElement);

    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Box>
      <Box
        component={'section'}
        sx={{
          px: { xs: 4, md: 8, xl: 12 },
          py: 10,
          margin: 'auto',
          backgroundColor: '#f6f6f8',
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
          <Chip label='자바' sx={{ width: 'fit-content' }} />
          <Typography variant='displaySmall' mb={2}>
            {study.name}
          </Typography>
          <Typography variant='bodyMedium' mb={2} fontWeight={300}>
            프로그래밍 공부, 어떻게 시작해야 할지 막막하시다구요? 입문자도 쉽게
            배울 수 있는 파이썬과 함께 시작해 보세요! 이번 토픽을 통해 기초를
            탄탄히 쌓고 나면, '프로그래밍 생각보다 별 거 아니네?' 이런 생각이 들
            거예요.
          </Typography>
          <Button
            sx={{
              width: 'fit-content',
            }}
            variant='contained'
            size='large'
          >
            스터디 신청하기
          </Button>
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
          <Box flex={1}>
            <Stack>
              <Typography variant='bodyMedium' mt={4}>
                스터디 소개
              </Typography>
              <Typography variant='titleLarge' mb={2}>
                {study.name}
              </Typography>
              <Stack p={3} borderRadius={4} border={1} borderColor={'divider'}>
                <Markdown>{content}</Markdown>
              </Stack>
            </Stack>
            <Box id='curriculum' component={'section'}>
              <Typography variant='titleLarge' py={4}>
                커리큘럼
              </Typography>
              <Stack gap={2}>
                {study.weeklyPlans.map((plan, index) => (
                  <StudyCurriculum key={index} section={plan} index={index} />
                ))}
              </Stack>
            </Box>
            <Box id='place' component={'section'}>
              <Typography variant='bodyMedium' pt={4}>
                시간 및 장소
              </Typography>
              <Typography variant='titleLarge'>
                매주 {getWeekDayAsString(study.weekDay)}{' '}
                {formatStudyTimeToKorean(study.startTime)} -{' '}
                {formatStudyTimeToKorean(study.endTime)}
              </Typography>
              <Stack direction={'row'} flexWrap={'wrap'} gap={6} mt={4}>
                <LocalizationProvider
                  dateAdapter={AdapterDayjs}
                  adapterLocale='ko'
                >
                  <DateCalendar
                    value={date}
                    onChange={(newValue) => setDate(newValue)}
                    slots={{ day: renderPickerDay }}
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
                      {getWeeklyPlan(date)}
                    </Typography>
                  </Box>
                  <Typography variant='labelLarge'>{study.location}</Typography>
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
          backgroundColor: '#f6f6f8',
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
    >
      <Chip label='자바' sx={{ width: 'fit-content' }} color='primary' />
      <Typography variant='labelLarge'>{study.name}</Typography>
      <Typography variant='labelSmall' color={'text.secondary'}>
        매주 {getWeekDayAsString(study.weekDay)}
      </Typography>
      <Typography variant='labelSmall' color={'text.secondary'}>
        {formatStudyTimeToKorean(study.startTime)} -{' '}
        {formatStudyTimeToKorean(study.endTime)}
      </Typography>
      <Typography variant='labelSmall'>{study.mentorName} 멘토</Typography>
      <Button variant='contained' fullWidth size='large'>
        신청하기
      </Button>
    </Stack>
  );
}
