import { ChangeEvent, useState } from 'react';

import CloseIcon from '@mui/icons-material/Close';
import LinkIcon from '@mui/icons-material/Link';
import {
  Avatar,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  FormControlLabel,
  Grow,
  LinearProgress,
  Radio,
  RadioGroup,
  Typography,
} from '@mui/material';
import { Box, Stack } from '@mui/system';

import { TAG_OPTIONS } from '@constants/apply.constant';
import { Study } from '@packages/components/types/study';
import { Question } from '@routes/studies/guide';
import { Link } from '@tanstack/react-router';
import { getCurrentTerm } from '@utils/getCurrentTerm';

const currentTerm = getCurrentTerm();

interface StudyRecommendationModalProps {
  questions: Question[];
  studies: Study[];
  open: boolean;
  onClose: () => void;
}

interface TopStudy extends Study {
  score: number;
}

const getTag = (tag: string) => {
  const tagOption = TAG_OPTIONS.find((option) => option.value === tag);
  if (!tagOption) return '기타';
  return tagOption.label;
};

export function StudyRecommendationModal({
  questions,
  studies,
  open,
  onClose,
}: StudyRecommendationModalProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [result, setResult] = useState<TopStudy[]>();
  const [showResult, setShowResult] = useState(false);
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
  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const questionScores = [
    {
      scores: [],
    },
    {
      scores: [
        {
          '당근마켓 만들며 배우는 웹 개발 기초': 2,
          '프론트엔드 웹 프로젝트 with React': 2,
        },
        {
          '와 파이썬 진짜 쩐다 (아직 시작 안함)': 1,
          '외모췍? 데이터췍!': 1,
          '한스타그램을 설계해보자! (대형 서비스 설계)': 2,
          '제대로 배우는 데이터 모델링': 2,
          '당근마켓 만들며 배우는 웹 개발 기초': 2,
        },
        { '외모췍? 데이터췍!': 2, '제대로 배우는 데이터 모델링': 1 },
        { '백준과 서강준은 취향차이': 3 },
        { 'GPT야 나를 믿니? 네~ 띰장님': 3 },
        {
          '한스타그램을 설계해보자! (대형 서비스 설계)': 2,
          '나만의 NPM 패키지 만들기': 2,
          '제대로 배우는 데이터 모델링': 2,
          'GPT야 나를 믿니? 네~ 띰장님': 2,
        },
      ],
    },
    {
      scores: [{}, {}, {}],
    },
    {
      scores: [
        { '와 파이썬 진짜 쩐다 (아직 시작 안함)': 3 },
        {
          '외모췍? 데이터췍!': 1,
          '백준과 서강준은 취향차이': 2,
          '당근마켓 만들며 배우는 웹 개발 기초': 2,
        },
        {
          'GPT야 나를 믿니? 네~ 띰장님': 1,
          '나만의 NPM 패키지 만들기': 1,
          '제대로 배우는 데이터 모델링': 1,
        },
        {
          'GPT야 나를 믿니? 네~ 띰장님': 3,
          '한스타그램을 설계해보자! (대형 서비스 설계)': 3,
          '나만의 NPM 패키지 만들기': 2,
        },
      ],
    },
    {
      scores: [
        {
          'GPT야 나를 믿니? 네~ 띰장님': 4,
          '한스타그램을 설계해보자! (대형 서비스 설계)': 4,
          '제대로 배우는 데이터 모델링': 4,
          '백준과 서강준은 취향차이': 5,
          '와 파이썬 진짜 쩐다 (아직 시작 안함)': 5,
          '당근마켓 만들며 배우는 웹 개발 기초': 5,
          '외모췍? 데이터췍!': 5,
        },
        {
          '프론트엔드 웹 프로젝트 with React': 5,
          '나만의 NPM 패키지 만들기': 5,
        },
      ],
    },
    {
      scores: [
        {
          '와 파이썬 진짜 쩐다 (아직 시작 안함)': 2,
          '당근마켓 만들며 배우는 웹 개발 기초': 2,
          '외모췍? 데이터췍!': 2,
          '제대로 배우는 데이터 모델링': 2,
          'GPT야 나를 믿니? 네~ 띰장님': 2,
          '백준과 서강준은 취향차이': 2,
        },
        {
          '프론트엔드 웹 프로젝트 with React': 2,
          '나만의 NPM 패키지 만들기': 2,
          'GPT야 나를 믿니? 네~ 띰장님': 2,
          '한스타그램을 설계해보자! (대형 서비스 설계)': 2,
        },
        {
          '프론트엔드 웹 프로젝트 with React': 2,
          '나만의 NPM 패키지 만들기': 2,
          'GPT야 나를 믿니? 네~ 띰장님': 1,
          '한스타그램을 설계해보자! (대형 서비스 설계)': 2,
        },
      ],
    },
  ];

  const calculateResult = () => {
    const scores = Object.fromEntries(studies.map((study) => [study.name, 0]));

    Object.entries(answers).forEach(([questionIndex, answer]) => {
      const questionScoreData = questionScores[parseInt(questionIndex)];
      const answerScores = questionScoreData!.scores[parseInt(answer)];
      if (answerScores) {
        Object.entries(answerScores).forEach(([study, score]) => {
          scores[study] += score;
        });
      }
    });

    const topStudies = studies
      .map((study) => ({
        ...study,
        score: scores[study.name] || 0,
      }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 3);

    setResult(topStudies);

    setShowResult(true);
  };

  const getCurrentQuestion = (): Question | undefined => {
    return currentQuestion >= 0 && currentQuestion < questions.length
      ? questions[currentQuestion]
      : undefined;
  };
  const handleResetQuestion = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setResult([]);
    setShowResult(false);
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth='md' keepMounted>
      <DialogTitle
        sx={{
          backgroundColor: 'primary.main',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '16px 24px',
        }}
        color='primary.contrastText'
      >
        <Box>
          <Typography variant='bodyLarge' mt={1} mb={1} width='100%'>
            {showResult
              ? '스터디 추천 결과'
              : `${currentQuestion + 1} / ${questions.length} : ${getCurrentQuestion()!.title} `}
          </Typography>
        </Box>
        <Box display='flex' justifyContent='flex-end'>
          <Button
            onClick={onClose}
            size='large'
            sx={{
              color: 'primary.contrastText',
              minWidth: 'auto',
              padding: '4px 8px',
            }}
          >
            <CloseIcon />
          </Button>
        </Box>
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
                <Typography
                  variant='labelSmall'
                  sx={{ color: 'text.secondary' }}
                >
                  아래로 스크롤해보세요! 더 많은 옵션이 있습니다.
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
                    color='primary.contrastText'
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
          <Box sx={{ mt: 2, mb: 2 }}>
            <Box sx={{ mt: 4, mb: 4 }}>
              <Typography
                variant='bodySmall'
                gutterBottom
                align='center'
                sx={{ wordBreak: 'keep-all', mb: 3 }}
              >
                답변 결과를 바탕으로 어떤 스터디가 좋을지 분석해보았어요. <br />
                이런 스터디는 어떤가요?
              </Typography>
              <Typography
                variant='bodySmall'
                align='center'
                color='text.secondary'
              >
                오른쪽의 아이콘을 클릭하면 해당 스터디 페이지로 이동합니다.
              </Typography>
            </Box>
            {result!.map((study, index) => {
              return (
                <Grow in={showResult} timeout={(index + 1) * 500} key={index}>
                  <Card
                    elevation={0}
                    sx={{
                      border: 1,
                      borderColor: 'divider',
                      borderRadius: 4,
                      mb: 2,
                      backgroundColor: 'inherit',
                    }}
                  >
                    <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
                      <Avatar
                        sx={{
                          bgcolor:
                            index === 0
                              ? 'primary.light'
                              : index === 1
                                ? 'primary.main'
                                : 'primary.dark',
                          mr: 2,
                        }}
                      >
                        {index + 1}
                      </Avatar>
                      <Box width='85%'>
                        <Typography variant='bodyMedium'>
                          {study.name}
                        </Typography>
                        <Typography variant='bodySmall' color='text.secondary'>
                          #{getTag(study.tag)}
                        </Typography>
                      </Box>
                      <Box display='flex' justifyContent='flex-end'>
                        <Link to={`/studies/${study.id}`}>
                          <Button
                            variant='text'
                            onClick={onClose}
                            size='small'
                            sx={{
                              minWidth: 'auto',
                            }}
                          >
                            <LinkIcon />
                          </Button>
                        </Link>
                      </Box>
                    </CardContent>
                  </Card>
                </Grow>
              );
            })}
            <Box textAlign={'right'}>
              <Typography
                variant='labelSmall'
                color='text.secondary'
                fontWeight={'light'}
              >
                ※ 본 결과는 문항별 선택지의 가중치를 바탕으로 분석되었습니다.
              </Typography>
            </Box>

            <Divider sx={{ my: 2 }} />
            <Typography
              variant='bodySmall'
              color='text.secondary'
              align='center'
              sx={{ mt: 2 }}
            >
              더 많은 스터디가 궁금하다면 아래의 버튼을 클릭해주세요!
            </Typography>
            <Box display='flex' justifyContent='center' width='100%' mt={3}>
              <Link
                to={'/studies'}
                search={{
                  year: Number(currentTerm.year),
                  semester: Number(currentTerm.semester),
                }}
              >
                <Button variant='contained' onClick={onClose} size='large'>
                  24년 2학기 개설 스터디 목록 보러가기
                </Button>
              </Link>
            </Box>
          </Box>
        )}
      </DialogContent>
      <DialogActions
        style={{
          backgroundColor: 'primary.contrastText',
          display: 'flex',
          justifyContent: 'space-between',
          padding: '16px 24px',
        }}
      >
        <Box>
          <Button
            onClick={handleResetQuestion}
            size='small'
            disabled={currentQuestion === 0}
          >
            다시하기
          </Button>
        </Box>
        <Box>
          <Button
            onClick={handleBack}
            size='small'
            disabled={currentQuestion === 0 || showResult}
          >
            뒤로
          </Button>

          {!showResult ? (
            <Button
              onClick={handleNext}
              disabled={answers[currentQuestion] === undefined}
              size='small'
            >
              {currentQuestion < questions.length - 1 ? '다음' : '결과 보기'}
            </Button>
          ) : (
            <>
              <Button size='small' onClick={onClose}>
                닫기
              </Button>
            </>
          )}
        </Box>
      </DialogActions>
    </Dialog>
  );
}
