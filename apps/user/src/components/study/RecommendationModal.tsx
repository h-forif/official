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
import { getAllStudies } from '@services/study.service';
import { useQuery } from '@tanstack/react-query';
import { Link } from '@tanstack/react-router';

interface StudyRecommendationModalProps {
  questions: any;
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
  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  // 질문 및 답변에 따른 점수 정의
  const questionScores = [
    {
      // FORIF vs 포리프
      scores: [], // 이 질문은 점수에 영향을 주지 않음
    },
    {
      // 관심 분야
      scores: [
        { 70: 2, 67: 2 },
        { 69: 1, 71: 1 },
        { 71: 2, 75: 2 },
        { 68: 2 },
        { 66: 2 },
        {
          73: 2,
          74: 2,
          75: 2,
          66: 2,
        },
      ],
    },
    {
      // 이론 vs 실습 vs 둘 다
      scores: [
        {},
        {},
        {}, // '둘 다'를 선택한 경우 점수 변화 없음
      ],
    },
    {
      // 프로그래밍 경험 수준
      scores: [
        { 69: 3 },
        { 71: 1, 68: 2, 70: 2 },
        { 66: 1, 74: 1, 75: 1 },
        { 66: 3, 73: 3, 74: 2 },
      ],
    },
    {
      // 강의형 vs 프로젝트형
      scores: [
        {
          66: 4,
          73: 4,
          75: 4,
          68: 5,
          69: 5,
          70: 5,
          71: 5,
        },
        { 67: 5, 74: 5 },
      ],
    },
    {
      // 마지막 질문 (포리프 어때요)
      scores: [], // 이 질문은 점수에 영향을 주지 않음
    },
  ];

  const calculateResult = () => {
    const scores = Object.fromEntries(studies.map((study) => [study.id, 0]));

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
        score: scores[study.id] || 0,
      }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 3);

    setResult(topStudies);

    // setAdditionalInfo(JSON.stringify(scores));
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
  const handleClose = () => {
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
      <DialogTitle
        sx={{
          backgroundColor: 'primary.main',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '16px 24px',
        }}
        color='white'
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
            onClick={handleClose}
            size='large'
            sx={{ color: 'white', minWidth: 'auto', padding: '4px 8px' }}
          >
            <CloseIcon />
          </Button>
        </Box>
      </DialogTitle>
      <DialogContent style={{ height: '360px', backgroundColor: 'white' }}>
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
          <Box sx={{ mt: 2, mb: 2, backgroundColor: 'white' }}>
            <Box sx={{ mt: 4, mb: 4 }}>
              <Typography variant='bodySmall' gutterBottom align='center'>
                답변 결과를 바탕으로 어떤 스터디가 좋을지 분석해보았어요. <br />
                이런 스터디는 어떤가요?
              </Typography>
              <Typography variant='bodySmall' align='center'>
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
                      backgroundColor: index === 0 ? 'white' : 'inherit',
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
                          // bgcolor: index === 0 ? 'pink' : 'primary.main',
                          mr: 2,
                        }}
                      >
                        {index + 1}
                      </Avatar>
                      <Box width='80%'>
                        <Typography variant='bodyMedium' component='div'>
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
                            onClick={handleClose}
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
            <Divider sx={{ my: 2 }} />
            <Typography
              variant='bodyMedium'
              color='text.secondary'
              align='center'
              sx={{ mt: 2 }}
            >
              더 많은 스터디를 보러가려면 아래의 버튼을 클릭해주세요!
            </Typography>
            <Box display='flex' justifyContent='center' width='100%' mt={3}>
              <a href='/studies'>
                <Button variant='contained' onClick={handleClose} size='large'>
                  24년 2학기 개설 스터디 목록 보러가기
                </Button>
              </a>
            </Box>
          </Box>
        )}
      </DialogContent>
      <DialogActions
        style={{
          backgroundColor: 'white',
          display: 'flex',
          justifyContent: 'space-between',
          padding: '16px 24px',
        }}
      >
        <Box>
          <Button
            onClick={handleResetQuestion}
            size='small'
            disabled={currentQuestion === 0 || showResult}
          >
            처음부터
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
              <Button onClick={handleClose}>닫기</Button>
            </>
          )}
        </Box>
      </DialogActions>
    </Dialog>
  );
}
