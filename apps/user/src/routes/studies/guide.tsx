import { Fragment, SyntheticEvent, useState } from 'react';

import ReviewsIcon from '@mui/icons-material/Reviews';
import {
  Box,
  Button,
  Grid,
  List,
  ListItem,
  ListItemText,
  Stack,
  Tab,
  Tabs,
  Typography, // useMediaQuery,
  // useTheme,
} from '@mui/material';
import { Card, CardContent } from '@mui/material';

import { Study } from '@packages/components/types/study';
import { getAllStudies } from '@services/study.service';
import { createFileRoute } from '@tanstack/react-router';
import { getCurrentTerm } from '@utils/getCurrentTerm';

import { Title } from '@components/Title';
import { StudyRecommendationModal } from '@components/study/RecommendationModal';

import useDeviceSize from '@hooks/useDeviceSize';

export const Route = createFileRoute('/studies/guide')({
  loader: async () => {
    const currentTerm = getCurrentTerm();
    const studies = await getAllStudies({
      year: Number(currentTerm.year),
      semester: Number(currentTerm.semester),
    });
    return studies;
  },
  component: StudyGuidePage,
});

interface ProgrammingCard {
  id: number;
  title: string;
  content: string;
}

const programmingCards: ProgrammingCard[] = [
  {
    id: 1,
    title: '프론트엔드 개발',
    content: `-정의-
사용자가 직접 보고 상호작용하는 웹사이트의 인터페이스를 개발하는 분야

-주요 기술-
HTML, CSS, JavaScript, React, Vue.js, Angular 등

-특징-
시각적 디자인과 사용자 경험(UX)에 중점을 둡니다.`,
  },
  {
    id: 2,
    title: '백엔드 개발',
    content: `-정의-
서버 측에서 데이터를 처리하고 저장하는 로직을 개발하는 분야

-주요 기술-
Python, Java, Node.js, PHP, SQL 등

-특징-
데이터베이스 관리, 서버 로직, API 개발 등을 다룹니다.`,
  },
  {
    id: 3,
    title: '모바일 앱 개발',
    content: `-정의-
스마트폰이나 태블릿용 애플리케이션을 개발하는 분야

-주요 기술-
Android(Java/Kotlin), iOS(Swift), React Native, Flutter 등

-특징-
모바일 기기의 특성을 고려한 UI/UX 설계가 중요합니다.`,
  },
  {
    id: 4,
    title: '데이터 사이언스 & 머신러닝',
    content: `-정의-
대량의 데이터를 분석하고 인공지능 모델을 개발하는 분야

-주요 기술-
Python, R, TensorFlow, PyTorch, Pandas 등

-특징- 
통계, 수학, 알고리즘에 대한 이해가 필요합니다.`,
  },
  {
    id: 5,
    title: '게임 개발',
    content: `-정의-
컴퓨터, 콘솔, 모바일 등의 플랫폼을 위한 게임을 개발하는 분야

-주요 기술-
C++, Unity(C#), Unreal Engine 등

-특징- 
그래픽스, 물리 엔진, 게임 로직 등 다양한 요소를 다룹니다.`,
  },
  {
    id: 6,
    title: '시스템 프로그래밍',
    content: `-정의-
운영 체제, 드라이버, 임베디드 시스템 등을 개발하는 분야

-주요 기술-
C, C++, Rust, Assembly 등

-특징- 
하드웨어에 가까운 저수준 프로그래밍을 다룹니다.`,
  },
];

interface FlippableCardProps {
  card: ProgrammingCard;
}

function FlippableCard({ card }: FlippableCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  // const theme = useTheme();
  // const isXs = useMediaQuery(theme.breakpoints.only('xs'));
  const { isMobile } = useDeviceSize();
  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };
  const formattedTitle = card.title.replace(/ & /g, '&\u00A0');

  return (
    <Box
      onClick={handleClick}
      sx={{
        width: '100%',
        height: isMobile ? 200 : 300,
        perspective: '1000px',
        cursor: 'pointer',
      }}
    >
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          height: '100%',
          transition: 'transform 0.6s',
          transformStyle: 'preserve-3d',
          transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
        }}
      >
        {/* 앞면 */}
        <Card
          sx={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            backfaceVisibility: 'hidden',
            backgroundColor: 'background.default',
          }}
        >
          <CardContent
            sx={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
            }}
          >
            <Typography
              component='div'
              variant={isMobile ? 'titleSmall' : 'titleMedium'}
              sx={{
                fontWeight: 'bold',
                wordBreak: 'keep-all',
                overflowWrap: 'break-word',
              }}
            >
              {formattedTitle}
            </Typography>
            <Typography variant='labelSmall' color='text.secondary' mt={2}>
              클릭하여 자세히 보기
            </Typography>
          </CardContent>
        </Card>

        {/* 뒷면 */}
        <Card
          sx={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            backgroundColor: 'background.default',
          }}
        >
          <CardContent
            sx={{
              height: '100%',
              overflow: 'auto',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start',
            }}
          >
            <Typography
              variant='bodySmall'
              sx={{
                whiteSpace: 'pre-wrap',
              }}
            >
              {card.content}
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}

function FlippableProgrammingCards() {
  return (
    <Grid container spacing={2}>
      {programmingCards.map((card) => (
        <Grid item xs={6} sm={6} md={4} key={card.id}>
          <FlippableCard card={card} />
        </Grid>
      ))}
    </Grid>
  );
}
export interface Question {
  id: number;
  title: string;
  text: string;
  options: string[];
}

const questions: Question[] = [
  {
    id: 1,
    title: '관심 분야',
    text: '2학기 개강을 맞아 새로운 동아리에 들어가려 해요. 어떤 동아리에 들어갈까요?',
    options: ['FORIF', '포리프'],
  },
  {
    id: 2,
    title: '관심 분야',
    text: '포리프에는 아주 다양한 스터디가 열려 어떤 스터디를 선택해야 할 지 고민이에요. 어떤 분야에 관심이 있나요?',
    options: [
      '나는 눈에 바로바로 보이는게 좋아! (Front-end)',
      '눈에 바로 보이지는 않지만, 서버에서 데이터를 처리하고 저장하는 것이 궁금해! (Back-end)',
      '데이터를 다루어보자!',
      '알고리즘 공부를 해볼까?',
      '요즘 AI가 핫하다며? GPT는 어때?',
      '쉽게 배울수 없는 주제를 배워보고 싶어.',
    ],
  },
  {
    id: 3,
    title: '학습 스타일',
    text: '학습을 할 때 이론 학습과 실습 중 어느 것을 더 중요시하나요?',
    options: ['이론 학습', '실습', '둘 다'],
  },
  {
    id: 4,
    title: '스터디 난이도',
    text: '본인은 프로그래밍에 대해 어느 정도 알고 있다고 생각하며, 어떤 난이도의 스터디를 수강하고 싶나요?',
    options: [
      '완전 처음 해본다! 기초 스터디를 수강하고 싶어요.',
      '어느정도 기초 지식이 있어요.(창컴/공창컴 이수) 기초적인 지식을 응용하는 스터디를 수강하고 싶어요.',
      '저는 2학년 이상의 전공자입니다. 조금은 난이도가 있는 스터디를 원해요.',
      '심도깊은 주제를 다루는 스터디에 참여하고 싶어요.',
    ],
  },
  {
    id: 5,
    title: '스터디 방식',
    text: '포리프의 스터디 진행 방식에는 두가지가 있어요. 강의형과 프로젝트형 스터디 중 어떤 방식을 선호하시나요?',
    options: [
      '대규모로 멘토가 강의식으로 진행하는 [강의형 진행 방식]이 좋아요.',
      '소수의 사람들이 모여 결과물을 만들어내는 [프로젝트형 진행 방식]이 좋아요.',
    ],
  },
  {
    id: 6,
    title: '스터디 결과물',
    text: '스터디를 통해 어떤 부분을 얻어가고 싶나요?',
    options: [
      '프로그래밍의 기초적인 지식을 탄탄히 다지고 싶어요.',
      '응용을 하는 법을 배우고 싶어요.',
      '혼자 공부하기는 어려운 분야를 사람들과 함께 인사이트를 얻으며 공부하고 싶어요.',
    ],
  },
];
export default function StudyGuidePage() {
  const studies = Route.useLoaderData();
  const [tab, setTab] = useState<string>('#introduction');
  const handleTabClick = (event: SyntheticEvent, newValue: string) => {
    setTab(newValue);
    event.preventDefault();
    const targetElement = document.querySelector(newValue);

    if (targetElement) {
      const yOffset = -60;
      const y =
        targetElement.getBoundingClientRect().top + window.scrollY + yOffset;

      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };
  const [open, setOpen] = useState<boolean>(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Box>
      <Box>
        <Title title='스터디 가이드' label='나에게 맞는 스터디를 찾아보세요!' />
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
          <Tab component='a' label='스터디 운영 방식' value={'#ongoing'} />
          <Tab component='a' label='스터디 진행 과정' value={'#procedure'} />
          <Tab component='a' label='스터디 이수' value={'#completion'} />
          <Tab component='a' label='스터디 추천' value={'#recommendation'} />
        </Tabs>
        <Stack direction={'row'} gap={4} justifyContent={'space-between'}>
          <Box flex={1} width={'100%'}>
            <Stack width={'100%'}>
              {/* 스터디 소개 섹션 */}
              <Typography variant='bodyMedium' mt={6}>
                스터디 소개
              </Typography>
              <Typography variant='titleLarge' mb={2}>
                프로그래밍이 뭔가요?
              </Typography>
              <Typography>
                프로그래밍은 다양한 분야로 나뉘며, 각 분야마다 특징적인 기술과
                도구를 사용합니다. <br />
                다음은 주요 프로그래밍 분야들입니다.
              </Typography>
              <Box sx={{ mt: 4 }}>
                <FlippableProgrammingCards />
              </Box>{' '}
            </Stack>
            <Box id='ongoing' component={'section'}>
              <Typography variant='bodyMedium' mt={6}>
                스터디 운영 방식
              </Typography>
              <Typography variant='titleLarge' mb={2}>
                스터디 진행 방식
              </Typography>
              <Stack gap={2}>
                <Typography>
                  포리프의 스터디는 크게 '정규스터디'와 '자율스터디'로
                  나누어집니다. 정규스터디는 또다시 강의형과 프로젝트형으로
                  나누어집니다.
                </Typography>
                <Box>
                  <Typography variant='bodyMedium' fontWeight='bold'>
                    1. 정규 스터디
                  </Typography>
                  <Typography>
                    매 학기가 시작하며 다양한 지식을 갖춘 멘토님들이 스터디를
                    개설합니다. 이렇게 개설되는 스터디를 '정규스터디'라고
                    합니다.
                  </Typography>
                  <List>
                    <ListItem>
                      <ListItemText
                        secondaryTypographyProps={{ color: 'text.primary' }}
                        primary='모집'
                        secondary='3월 / 9월 초 부원 모집 기간'
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        secondaryTypographyProps={{ color: 'text.primary' }}
                        primary='진행 횟수'
                        secondary='총 15주 중 중간고사 / 기말고사 기간을 고려하여 8주 이상의 스터디가 진행됩니다.'
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        secondaryTypographyProps={{ color: 'text.primary' }}
                        primary='진행 일시'
                        secondary='주 1회, 멘토가 지정한 요일과 시간에 진행됩니다.'
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        secondaryTypographyProps={{ color: 'text.primary' }}
                        primary='개설 스터디'
                        secondary='개설 스터디는 매 학기마다 다르며, 포리프는 매 학기 다양한 분야의 스터디가 개설되고 있습니다.'
                      />
                    </ListItem>

                    <ListItem>
                      <ListItemText
                        secondaryTypographyProps={{ color: 'text.primary' }}
                        primary='진행 방식'
                        secondary={
                          <Fragment>
                            강의형과 프로젝트형으로 나누어집니다. <br />
                            <Typography
                              sx={{ mt: 2 }}
                              variant='labelSmall'
                              component='span'
                              display='block'
                              fontWeight='light'
                            >
                              - 강의형: 다인원을 대상으로 이루어지며, 멘토가
                              강의식으로 수업을 진행합니다. 일반적으로
                              기초스터디가 이에 해당합니다.
                            </Typography>
                            <Typography
                              variant='labelSmall'
                              component='span'
                              display='block'
                              fontWeight='light'
                              sx={{ mt: 1 }}
                            >
                              - 프로젝트형: 소규모로 진행되며, 프로젝트 결과물을
                              만들어내는 것을 중심으로 진행됩니다. 기본적인
                              프로그래밍 능력이 요구됩니다.
                            </Typography>
                          </Fragment>
                        }
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        secondaryTypographyProps={{ color: 'text.primary' }}
                        primary='혜택'
                        secondary='일정 요건 충족 시 수료증이 발급됩니다.'
                      />
                    </ListItem>
                  </List>
                </Box>
                <Box>
                  <Typography variant='bodyMedium' fontWeight='bold'>
                    2. 자율 스터디
                  </Typography>
                  <Typography>
                    자율 스터디는 정규 스터디와는 다르게 학기가 시작된 후
                    부원들의 수요에 따라 개설되는 스터디입니다. 일반적으로
                    '멘토'는 존재하지 않으며, 함께 공부할 사람들이 모여 스터디를
                    진행합니다.
                  </Typography>

                  <List>
                    <ListItem>
                      <ListItemText
                        secondaryTypographyProps={{ color: 'text.primary' }}
                        primary='모집'
                        secondary='3월 / 9월 중순'
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        secondaryTypographyProps={{ color: 'text.primary' }}
                        primary='진행 횟수 및 일시'
                        secondary='스터디원들간의 조율로 진행 계획을 세웁니다.'
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        secondaryTypographyProps={{ color: 'text.primary' }}
                        primary='개설 방법'
                        secondary='운영진측에 스터디 계획서를 제출하면 스터디 홍보가 진행됩니다.'
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        secondaryTypographyProps={{ color: 'text.primary' }}
                        primary='혜택'
                        secondary={
                          <>
                            스터디 별 기준에 따라 최대 5만원 지급
                            <Fragment>
                              <Typography
                                variant='labelSmall'
                                component='span'
                                display='block'
                              >
                                <br />* 자율스터디 수강은 포리프 인증서가
                                발급되지 않습니다.
                              </Typography>
                              <Typography
                                variant='labelSmall'
                                component='span'
                                display='block'
                              >
                                * 자율스터디는 출석체크 대상에 포함되지 않으며
                                정해진 회차나 일정이 없습니다.
                              </Typography>
                            </Fragment>
                          </>
                        }
                      />
                    </ListItem>
                  </List>
                </Box>
                <Box>
                  <Typography variant='bodySmall' fontWeight='bold'>
                    +) 자율부원은 무엇인가요?
                  </Typography>
                  <Typography></Typography>
                </Box>
              </Stack>
              <Stack
                component={'article'}
                p={3}
                borderRadius={4}
                border={1}
                borderColor={'divider'}
                width={'100%'}
                sx={{ mt: 2 }}
              >
                위의 내용과 같이 포리프의 스터디는 크게 정규스터디와
                자율스터디로 구성되어 있습니다. <br />
                학기 초, 부원모집 시 지원자들은 '정규스터디'에 지원하거나
                '자율부원'에 지원합니다.
                <br />
                <br />
                정규스터디 부원은 정규스터디와 자율스터디를 동시에 수강할 수도
                있고, 정규스터디만 수강할 수도 있습니다. 반대로 자율부원은
                정규스터디를 수강하지 않지만, 자율스터디를 수강할 수 있습니다.
                <br />
                <br />
                지율부원은 스터디를 정규스터디 수강을 제외한 모든 포리프 행사
                참여와 부원으로서의 혜택을 누릴 수 있습니다.
              </Stack>
            </Box>
            <Box id='procedure' component={'section'}>
              <Typography variant='bodyMedium' mt={6}>
                스터디 진행 과정
              </Typography>
              <Typography variant='titleLarge' mb={2}>
                우리의 한 학기는 이렇게 진행돼요.
              </Typography>
              <Stack gap={2}>
                <Typography>
                  정규 스터디 기준 15주 중 시험 기간을 고려하여 8주 이상의
                  스터디가 진행됩니다.
                  <br /> 스터디가 종료된 이후에는 한 학기의 마지막 행사인
                  해커톤이 개최됩니다.
                  <br />
                  <br />
                  이외에도 알고리즘 대회, 홈커밍 데이 등 학기별로 다양한 행사를
                  진행합니다.
                </Typography>
              </Stack>
            </Box>
            {/* 스터디 수료 섹션 */}
            <Box id='completion' component={'section'}>
              <Typography variant='bodyMedium' mt={6}>
                스터디 수료
              </Typography>
              <Typography variant='titleLarge' mb={2}>
                스터디 이수와 수료증
              </Typography>
              <Stack gap={2}>
                <Typography>
                  스터디 총 수업 중 3 / 4 이상을 참석하고 해커톤에 참여했을 시
                  스터디 이수 조건을 충족합니다.
                  <br />
                  스터디를 이수하면 해커톤이 끝난 뒤 수료증이 지급됩니다.
                </Typography>
              </Stack>
            </Box>
            {/* 스터디 추천 섹션 */}
            <Box id='recommendation' component={'section'}>
              <Typography variant='bodyMedium' mt={6}>
                스터디 추천
              </Typography>
              <Typography variant='titleLarge' mb={2}>
                나에게 맞는 스터디는?
              </Typography>
              <Stack gap={2}>
                <Typography>
                  포리프의 스터디를 듣고싶지만, 어떤 스터디를 들어야 할 지
                  고민이 된다면,
                  <br />
                  저희가 스터디 선택을 도와드릴게요!
                  <br />
                  아래의 테스트를 진행하여 관심 분야를 알아보고
                  <br /> 강의 방식, 난이도, 관심 분야를 고려하여 본인에게 맞는
                  스터디를 수강해보세요.
                </Typography>
                <Button
                  variant='outlined'
                  fullWidth
                  size='large'
                  onClick={handleOpen}
                  sx={{ mt: 4, mb: 4 }}
                >
                  나에게 맞는 스터디 알아보기
                </Button>
                <StudyRecommendationModal
                  studies={studies}
                  questions={questions}
                  open={open}
                  onClose={handleClose}
                />
              </Stack>
            </Box>
          </Box>

          <StudySideBox studies={studies} />
        </Stack>
      </Box>
      <ScrollToTopButton studies={studies} />
    </Box>
  );
}

export function StudySideBox({ studies }: { studies: Study[] }) {
  const [open, setOpen] = useState<boolean>(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
      textAlign={'center'}
    >
      <Typography>
        포리프의 다양한 스터디 중 <br /> 어떤 스터디가 나에게 맞을까?
      </Typography>
      <Button variant='contained' fullWidth size='large' onClick={handleOpen}>
        나에게 맞는 스터디 알아보기
      </Button>
      <StudyRecommendationModal
        questions={questions}
        studies={studies}
        open={open}
        onClose={handleClose}
      />
    </Stack>
  );
}
export function ScrollToTopButton({ studies }: { studies: Study[] }) {
  const [open, setOpen] = useState<boolean>(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Box
        display={{ xs: 'flex', md: 'none' }}
        sx={{
          position: 'fixed',
          left: 20,
          bottom: 20,
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {/* <Typography
          fontSize={'8pt'}
          sx={{
            mb: 1,
            color: 'black',
          }}
        >
          스터디 추천받기
        </Typography> */}
        <Box
          component='button'
          borderRadius='50%'
          border={1}
          borderColor='divider'
          width={64}
          height={64}
          display='flex'
          justifyContent='center'
          alignItems='center'
          sx={{
            backgroundColor: 'background.default',
            cursor: 'pointer',
            '&:hover': {
              backgroundColor: 'action.hover',
            },
          }}
          onClick={handleOpen}
        >
          <ReviewsIcon color='primary' />
        </Box>
      </Box>
      <StudyRecommendationModal
        studies={studies}
        questions={questions}
        open={open}
        onClose={handleClose}
      />
    </>
  );
}
