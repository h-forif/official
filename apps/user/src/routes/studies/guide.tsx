import { ChangeEvent, Fragment, SyntheticEvent, useState } from 'react';

import ReviewsIcon from '@mui/icons-material/Reviews';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  Grid,
  LinearProgress,
  List,
  ListItem,
  ListItemText,
  Radio,
  RadioGroup,
  Stack,
  Tab,
  Tabs,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { Card, CardContent } from '@mui/material';

import { createFileRoute } from '@tanstack/react-router';

import { Title } from '@components/Title';

export const Route = createFileRoute('/studies/guide')({
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
    content: `정의: 사용자가 직접 보고 상호작용하는 웹사이트의 인터페이스를 개발하는 분야

주요 기술: HTML, CSS, JavaScript, React, Vue.js, Angular 등

특징: 시각적 디자인과 사용자 경험(UX)에 중점을 둡니다.`,
  },
  {
    id: 2,
    title: '백엔드 개발',
    content: `정의: 서버 측에서 데이터를 처리하고 저장하는 로직을 개발하는 분야

주요 기술: Python, Java, Node.js, PHP, SQL 등

특징: 데이터베이스 관리, 서버 로직, API 개발 등을 다룹니다.`,
  },
  {
    id: 3,
    title: '모바일 앱 개발',
    content: `정의: 스마트폰이나 태블릿용 애플리케이션을 개발하는 분야

주요 기술: Android(Java/Kotlin), iOS(Swift), React Native, Flutter 등

특징: 모바일 기기의 특성을 고려한 UI/UX 설계가 중요합니다.`,
  },
  {
    id: 4,
    title: '데이터 사이언스 & 머신러닝',
    content: `정의: 대량의 데이터를 분석하고 인공지능 모델을 개발하는 분야

주요 기술: Python, R, TensorFlow, PyTorch, Pandas 등

특징: 통계, 수학, 알고리즘에 대한 이해가 필요합니다.`,
  },
  {
    id: 5,
    title: '게임 개발',
    content: `정의: 컴퓨터, 콘솔, 모바일 등의 플랫폼을 위한 게임을 개발하는 분야

주요 기술: C++, Unity(C#), Unreal Engine 등

특징: 그래픽스, 물리 엔진, 게임 로직 등 다양한 요소를 다룹니다.`,
  },
  {
    id: 6,
    title: '시스템 프로그래밍',
    content: `정의: 운영 체제, 드라이버, 임베디드 시스템 등을 개발하는 분야

주요 기술: C, C++, Rust, Assembly 등

특징: 하드웨어에 가까운 저수준 프로그래밍을 다룹니다.`,
  },
];

interface FlippableCardProps {
  card: ProgrammingCard;
}

function FlippableCard({ card }: FlippableCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.only('xs'));

  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <Box
      onClick={handleClick}
      sx={{
        width: '100%',
        height: isXs ? 200 : 300, // xs일 때 높이를 200px로 변경
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
            }}
          >
            <Typography
              component='div'
              sx={{
                fontSize: isXs ? '0.88rem' : '1.25rem', // xs일 때 글자 크기 변경
                fontWeight: 'bold',
              }}
            >
              {card.title}
            </Typography>
            <Typography
              color='text.secondary'
              mt={2}
              sx={{
                fontSize: isXs ? '0.6rem' : '1rem', // xs일 때 글자 크기 변경
              }}
            >
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
              color='text.secondary'
              sx={{
                whiteSpace: 'pre-wrap',
                fontSize: isXs ? '0.8rem' : '1rem', // xs일 때 글자 크기 변경
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
interface Question {
  id: number;
  title: string;
  text: string;
  options: [string, string];
}

const questions: Question[] = [
  {
    id: 1,
    title: '학습 스타일',
    text: '새로운 기술을 배우는 것을 선호하십니까, 아니면 기존 기술을 깊이 있게 탐구하는 것을 선호하십니까?',
    options: ['새로운 기술', '기존 기술 탐구'],
  },
  {
    id: 2,
    title: '학습 스타일',
    text: '멘토의 강의를 들으며 비교적 대규모로 진행되는 강의형 스터디와 팀원들과 함께 결과물을 만들어내는 프로젝트형 스터디 중 어떤 형태를 선호하시나요?',
    options: ['강의형 방식', '프로젝트형 방식'],
  },
  {
    id: 3,
    title: '학습 스타일',
    text: '이론 학습과 실습 중 어느 것을 더 중요하게 생각하십니까?',
    options: ['이론 학습', '실습'],
  },
  {
    id: 4,
    title: '학습 스타일',
    text: '프론트엔드와 백엔드 중 어느 쪽에 더 관심이 있으십니까?',
    options: ['프론트엔드', '백엔드'],
  },
  {
    id: 5,
    title: '학습 스타일',
    text: '단기 집중 학습과 장기 지속 학습 중 어느 것을 선호하십니까?',
    options: ['단기 집중', '장기 지속'],
  },
  {
    id: 6,
    title: '학습 스타일',
    text: '코딩 챌린지와 프로젝트 기반 학습 중 어느 것을 선호하십니까?',
    options: ['코딩 챌린지', '프로젝트 기반'],
  },
  {
    id: 7,
    title: '학습 스타일',
    text: '온라인 학습과 오프라인 학습 중 어느 것을 선호하십니까?',
    options: ['온라인', '오프라인'],
  },
  {
    id: 8,
    title: '학습 스타일',
    text: '구조화된 커리큘럼과 자유로운 학습 방식 중 어느 것을 선호하십니까?',
    options: ['구조화된 커리큘럼', '자유로운 학습'],
  },
];

export default function StudyGuidePage() {
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
              <Typography variant='bodyMedium' mt={4}>
                스터디 소개
              </Typography>
              <Typography variant='titleLarge' mb={2}>
                프로그래밍이 뭔가요?
              </Typography>
              <Typography>
                프로그래밍은 다양한 분야로 나뉘며, 각 분야마다 특징적인 기술과
                도구를 사용합니다. 다음은 주요 프로그래밍 분야들입니다:
              </Typography>
              <Box sx={{ mt: 4 }}>
                <FlippableProgrammingCards />
              </Box>{' '}
            </Stack>
            <Box id='ongoing' component={'section'}>
              <Typography variant='bodyMedium' mt={4}>
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
                        primary='진행 횟수'
                        secondary='총 15주 중 중간고사 / 기말고사 기간을 고려하여 8주 이상의 스터디가 진행됩니다.'
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary='진행 횟수'
                        secondary='총 15주 중 중간고사 / 기말고사 기간을 고려하여 8주 이상의 스터디가 진행됩니다.'
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary='진행 일시'
                        secondary='주 1회, 멘토가 지정한 요일과 시간에 진행됩니다.'
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary='개설 스터디'
                        secondary='개설 스터디는 매 학기마다 달라집니다.'
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary='진행 방식'
                        secondary={
                          <Fragment>
                            <Typography component='span' display='block'>
                              강의형과 프로젝트형으로 나누어집니다.
                            </Typography>
                            <Typography component='span' display='block'>
                              - 강의형: 다인원을 대상으로 이루어지며, 멘토가
                              강의식으로 수업을 진행합니다. 일반적으로
                              기초스터디가 이에 해당합니다.
                            </Typography>
                            <Typography component='span' display='block'>
                              - 프로젝트형: 소규모로 진행되며, 프로젝트 결과물을
                              만들어내는 것을 중심으로 진행됩니다. 기본적인
                              프로그래밍 능력이 요구됩니다.
                            </Typography>
                          </Fragment>
                        }
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
                    '멘토'는 존재하지 않으며, 함께 공부할 사람들을 모아 스터디를
                    진행하는 것입니다.
                  </Typography>
                  <List>
                    <ListItem>
                      <ListItemText
                        primary='진행 횟수 및 일시'
                        secondary='정규스터디에 비해 자유롭습니다.'
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary='개설 방법'
                        secondary='운영진측에 스터디 계획서를 제출하면 스터디 홍보가 진행됩니다.'
                      />
                    </ListItem>
                  </List>
                </Box>
              </Stack>
            </Box>
            <Box id='procedure' component={'section'}>
              <Typography variant='bodyMedium' mt={4}>
                스터디 진행 과정
              </Typography>
              <Typography variant='titleLarge' mb={2}>
                우리의 한 학기는 이렇게 진행돼요.
              </Typography>
              <Stack gap={2}>
                <Typography>
                  15주 중 중간고사/기말고사 기간을 고려하여 8주 이상의 스터디가
                  진행됩니다. <br /> 스터디가 종료된 이후에는 한 학기의 마지막
                  행사인 해커톤이 개최됩니다.
                </Typography>
              </Stack>
            </Box>
            {/* 스터디 수료 섹션 */}
            <Box id='completion' component={'section'}>
              <Typography variant='bodyMedium' mt={4}>
                스터디 수료
              </Typography>
              <Typography variant='titleLarge' mb={2}>
                스터디 이수와 수료증
              </Typography>
              <Stack gap={2}>
                <Typography>
                  스터디를 3/4이상 수료 및 해커톤 참여 시 스터디가 이수됩니다.
                  <br />
                  스터디를 이수하면 해커톤이 끝난 뒤 수료증이 지급됩니다.
                </Typography>
              </Stack>
            </Box>
            {/* 스터디 추천 섹션 */}
            <Box id='recommendation' component={'section'}>
              <Typography variant='bodyMedium' mt={4}>
                스터디 추천
              </Typography>
              <Typography variant='titleLarge' mb={2}>
                나에게 맞는 스터디는?
              </Typography>
              <Stack gap={2}>
                <Typography>
                  강의 방식, 난이도, 관심 분야를 고려하여 본인에게 맞는 스터디를
                  수강해보세요.
                </Typography>
              </Stack>
            </Box>
          </Box>
          <StudySideBox />
        </Stack>
      </Box>
      <ScrollToTopButton />
    </Box>
  );
}
interface StudyRecommendationModalProps {
  open: boolean;
  onClose: () => void;
}

export function StudyRecommendationModal({
  open,
  onClose,
}: StudyRecommendationModalProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [result, setResult] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [additionalInfo, setAdditionalInfo] = useState('');
  const handleAnswerChange = (event: ChangeEvent<HTMLInputElement>) => {
    setAnswers({ ...answers, [currentQuestion]: event.target.value });
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateResult();
      setShowResult(true);
    }
  };

  const calculateResult = () => {
    let webDevelopmentScore = 0;
    let algorithmScore = 0;

    // 각 질문에 대한 답변을 개별적으로 분석
    Object.entries(answers).forEach(([questionIndex, answer]) => {
      const questionNumber = parseInt(questionIndex);
      const answerValue = parseInt(answer);

      switch (questionNumber) {
        case 0: // 새로운 기술 vs 기존 기술
          answerValue === 0 ? webDevelopmentScore++ : algorithmScore++;
          break;
        case 1: // 강의형 vs 프로젝트형
          answerValue === 0 ? algorithmScore++ : webDevelopmentScore++;
          break;
        case 2: // 이론 vs 실습
          answerValue === 0 ? algorithmScore++ : webDevelopmentScore++;
          break;
        case 3: // 프론트엔드 vs 백엔드
          webDevelopmentScore++; // 둘 다 웹 개발 관련이므로
          break;
        case 4: // 단기 집중 vs 장기 지속
          answerValue === 0 ? algorithmScore++ : webDevelopmentScore++;
          break;
        case 5: // 코딩 챌린지 vs 프로젝트 기반
          answerValue === 0 ? algorithmScore++ : webDevelopmentScore++;
          break;
        case 6: // 온라인 vs 오프라인
          // 이 질문은 스터디 유형 결정에 큰 영향을 주지 않으므로 건너뜁니다
          break;
        case 7: // 구조화된 커리큘럼 vs 자유로운 학습
          answerValue === 0 ? algorithmScore++ : webDevelopmentScore++;
          break;
      }
    });

    // 결과 결정
    if (webDevelopmentScore > algorithmScore) {
      setResult(
        "당신에게는 '웹 개발 종합 스터디'를 추천합니다! 웹 개발에 대한 관심과 프로젝트 기반 학습 선호도가 높습니다.",
      );
    } else if (algorithmScore > webDevelopmentScore) {
      setResult(
        "당신에게는 '알고리즘 마스터 스터디'를 추천합니다! 알고리즘과 코딩 챌린지에 대한 관심이 높습니다.",
      );
    } else {
      setResult(
        '당신은 웹 개발과 알고리즘 모두에 균형 잡힌 관심을 가지고 있습니다. 두 스터디 모두 고려해보는 것이 좋겠습니다.',
      );
    }

    // 추가 정보 제공
    setAdditionalInfo(
      `웹 개발 점수: ${webDevelopmentScore}, 알고리즘 점수: ${algorithmScore}`,
    );
  };
  const getCurrentQuestion = (): Question | undefined => {
    return currentQuestion >= 0 && currentQuestion < questions.length
      ? questions[currentQuestion]
      : undefined;
  };
  const handleResetQuestion = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setResult('');
    setShowResult(false);
  };
  const handleClose = () => {
    // setCurrentQuestion(0);
    // setAnswers({});
    // setResult('');
    // setShowResult(false);
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth='md'
      keepMounted
    >
      <DialogTitle sx={{ backgroundColor: 'primary.main' }} color='white'>
        <Typography variant='bodyLarge' mt={1} mb={1}>
          {showResult
            ? '스터디 추천 결과'
            : `Step ${currentQuestion + 1} of ${questions.length} : ${getCurrentQuestion()!.title} `}
        </Typography>
      </DialogTitle>
      <DialogContent style={{ height: '360px' }}>
        {!showResult ? (
          <>
            <LinearProgress
              variant='determinate'
              value={(currentQuestion / questions.length) * 100}
              sx={{ mb: 2, mt: 4 }}
            />
            {getCurrentQuestion() && (
              <>
                <Typography variant='bodyMedium' gutterBottom mt={4} mb={4}>
                  {getCurrentQuestion()!.text}
                </Typography>
                <FormControl
                  component='fieldset'
                  sx={{
                    width: '100%',
                  }}
                >
                  <RadioGroup
                    name='quiz-options'
                    value={answers[currentQuestion] || ''}
                    onChange={handleAnswerChange}
                  >
                    {getCurrentQuestion()!.options.map((option, index) => (
                      <Stack
                        key={index}
                        border={1}
                        borderColor='divider'
                        p={2}
                        gap={3}
                        mb={1}
                        sx={{
                          width: '100%',
                        }}
                      >
                        <FormControlLabel
                          value={index.toString()}
                          control={<Radio />}
                          label={option}
                        />
                      </Stack>
                    ))}
                  </RadioGroup>
                </FormControl>
              </>
            )}
          </>
        ) : (
          <Box sx={{ mt: 4, mb: 2 }}>
            <Typography>{result}</Typography>
            <Typography variant='bodyMedium' sx={{ mt: 2 }}>
              {additionalInfo}
            </Typography>
            <Box display='flex' justifyContent='center' width='100%'>
              <Button variant='outlined' onClick={handleClose} size='large'>
                스터디 보러가기
              </Button>
            </Box>
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleResetQuestion} size='large'>
          다시 검사하기
        </Button>
        {currentQuestion == questions.length - 1 ? null : (
          <Button
            onClick={handleClose}
            size='large'
            sx={{ color: 'primary.main' }}
          >
            닫기
          </Button>
        )}
        {!showResult ? (
          <Button
            onClick={handleNext}
            disabled={answers[currentQuestion] === undefined}
            size='large'
          >
            {currentQuestion < questions.length - 1 ? '다음' : '결과 보기'}
          </Button>
        ) : (
          <>
            <Button onClick={handleClose}>닫기</Button>
          </>
        )}
      </DialogActions>
    </Dialog>
  );
}
export function StudySideBox() {
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
      <Typography>나에게 맞는 스터디는?</Typography>
      <Button variant='contained' fullWidth size='large' onClick={handleOpen}>
        스터디 추천받기
      </Button>
      <StudyRecommendationModal open={open} onClose={handleClose} />
    </Stack>
  );
}
export function ScrollToTopButton() {
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
          right: 16,
          bottom: 16,
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography
          fontSize={'8pt'}
          sx={{
            mb: 1,
            color: 'black',
          }}
        >
          스터디 추천받기
        </Typography>
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
          <ReviewsIcon />
        </Box>
      </Box>
      <StudyRecommendationModal open={open} onClose={handleClose} />
    </>
  );
}
