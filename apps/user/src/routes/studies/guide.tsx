import { SyntheticEvent, useState } from 'react';

import { Tab, Tabs, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { Stack, useTheme } from '@mui/system';

import { Button } from '@packages/components/Button';
import { createFileRoute } from '@tanstack/react-router';

import { Title } from '@components/Title';

export const Route = createFileRoute('/studies/guide')({
  component: StudyGuidePage,
});

function StudyGuidePage() {
  const theme = useTheme();
  const [tab, setTab] = useState('#introduction');
  // const [date, setDate] = useState<Dayjs | null>(dayjs(STUDY_START_DATE));

  const handleTabClick = (event: SyntheticEvent, newValue: string) => {
    setTab(newValue);
    event.preventDefault();
    const targetElement = document.querySelector(newValue);

    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
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
              <Typography variant='bodyMedium' mt={4}>
                스터디 소개
              </Typography>
              <Typography variant='titleLarge' mb={2}>
                프로그래밍이 뭔가요?
              </Typography>
              <Box>
                <p>
                  프로그래밍은 다양한 분야로 나뉘며, 각 분야마다 특징적인 기술과
                  도구를 사용합니다. 다음은 주요 프로그래밍 분야들입니다:
                </p>

                <div className='field'>
                  <h3>1.1 프론트엔드 개발</h3>
                  <p>
                    <strong>정의:</strong> 사용자가 직접 보고 상호작용하는
                    웹사이트의 인터페이스를 개발하는 분야
                  </p>
                  <p>
                    <strong>주요 기술:</strong> HTML, CSS, JavaScript, React,
                    Vue.js, Angular 등
                  </p>
                  <p>
                    <strong>특징:</strong> 시각적 디자인과 사용자 경험(UX)에
                    중점을 둡니다.
                  </p>
                </div>

                <div className='field'>
                  <h3>1.2 백엔드 개발</h3>
                  <p>
                    <strong>정의:</strong> 서버 측에서 데이터를 처리하고
                    저장하는 로직을 개발하는 분야
                  </p>
                  <p>
                    <strong>주요 기술:</strong> Python, Java, Node.js, PHP, SQL
                    등
                  </p>
                  <p>
                    <strong>특징:</strong> 데이터베이스 관리, 서버 로직, API
                    개발 등을 다룹니다.
                  </p>
                </div>

                <div className='field'>
                  <h3>1.3 모바일 앱 개발</h3>
                  <p>
                    <strong>정의:</strong> 스마트폰이나 태블릿용 애플리케이션을
                    개발하는 분야
                  </p>
                  <p>
                    <strong>주요 기술:</strong> Android(Java/Kotlin),
                    iOS(Swift), React Native, Flutter 등
                  </p>
                  <p>
                    <strong>특징:</strong> 모바일 기기의 특성을 고려한 UI/UX
                    설계가 중요합니다.
                  </p>
                </div>

                <div className='field'>
                  <h3>1.4 데이터 사이언스 & 머신러닝</h3>
                  <p>
                    <strong>정의:</strong> 대량의 데이터를 분석하고 인공지능
                    모델을 개발하는 분야
                  </p>
                  <p>
                    <strong>주요 기술:</strong> Python, R, TensorFlow, PyTorch,
                    Pandas 등
                  </p>
                  <p>
                    <strong>특징:</strong> 통계, 수학, 알고리즘에 대한 이해가
                    필요합니다.
                  </p>
                </div>

                <div className='field'>
                  <h3>1.5 게임 개발</h3>
                  <p>
                    <strong>정의:</strong> 컴퓨터, 콘솔, 모바일 등의 플랫폼을
                    위한 게임을 개발하는 분야
                  </p>
                  <p>
                    <strong>주요 기술:</strong> C++, Unity(C#), Unreal Engine 등
                  </p>
                  <p>
                    <strong>특징:</strong> 그래픽스, 물리 엔진, 게임 로직 등
                    다양한 요소를 다룹니다.
                  </p>
                </div>

                <div className='field'>
                  <h3>1.6 시스템 프로그래밍</h3>
                  <p>
                    <strong>정의:</strong> 운영 체제, 드라이버, 임베디드 시스템
                    등을 개발하는 분야
                  </p>
                  <p>
                    <strong>주요 기술:</strong> C, C++, Rust, Assembly 등
                  </p>
                  <p>
                    <strong>특징:</strong> 하드웨어에 가까운 저수준 프로그래밍을
                    다룹니다.
                  </p>
                </div>
              </Box>
            </Stack>
            <Box id='ongoing' component={'section'}>
              <Typography variant='bodyMedium' mt={4}>
                스터디 운영 방식
              </Typography>
              <Typography variant='titleLarge' mb={2}>
                스터디 진행 방식
              </Typography>
              <Stack gap={2}>
                포리프의 스터디는 크게 '정규스터디'와 '자율스터디'로
                나누어집니다.
                <br />
                정규스터디는 또다시 강의형과 프로젝트형으로 나누어집니다.
                <div className='study-types'>
                  <h4>1. 정규스터디</h4>
                  <div className='study-type'>
                    <h5>a) 강의형 스터디</h5>
                    <ul>
                      <li>
                        정해진 커리큘럼에 따라 주차별로 학습을 진행합니다.
                      </li>
                      <li>
                        스터디 리더 또는 초빙된 강사가 주도적으로 강의를
                        진행합니다.
                      </li>
                      <li>
                        참가자들은 강의를 듣고 질문하며, 과제를 수행합니다.
                      </li>
                      <li>
                        주로 기초 지식 습득이나 새로운 기술 학습에 적합합니다.
                      </li>
                    </ul>
                  </div>
                  <div className='study-type'>
                    <h5>b) 프로젝트형 스터디</h5>
                    <ul>
                      <li>
                        실제 프로젝트를 기획하고 개발하는 과정을 통해
                        학습합니다.
                      </li>
                      <li>팀을 구성하여 협업 능력을 기를 수 있습니다.</li>
                      <li>
                        기획, 설계, 개발, 테스트 등 전체 개발 과정을 경험할 수
                        있습니다.
                      </li>
                      <li>
                        포트폴리오 작성에 도움이 되는 결과물을 얻을 수 있습니다.
                      </li>
                    </ul>
                  </div>

                  <h4>2. 자율스터디</h4>
                  <ul>
                    <li>
                      참가자들이 자유롭게 주제를 선정하고 학습 방식을
                      결정합니다.
                    </li>
                    <li>
                      정기적인 모임을 통해 서로의 학습 진행 상황을 공유하고
                      피드백을 주고받습니다.
                    </li>
                    <li>
                      개인의 학습 목표에 맞춰 유연하게 진행할 수 있습니다.
                    </li>
                    <li>자기주도적 학습 능력을 기를 수 있습니다.</li>
                  </ul>
                </div>
                <div className='study-details'>
                  <h4>스터디 기간 및 시간</h4>
                  <ul>
                    <li>대부분의 스터디는 8~12주 과정으로 진행됩니다.</li>
                    <li>주 1회, 2~3시간 정도의 정기 모임을 갖습니다.</li>
                    <li>
                      방학 기간에는 집중 스터디로 단기간 고강도 학습을
                      진행하기도 합니다.
                    </li>
                  </ul>

                  <h4>온라인/오프라인 병행</h4>
                  <ul>
                    <li>
                      상황에 따라 온라인 또는 오프라인으로 유연하게 진행합니다.
                    </li>
                    <li>온라인 스터디의 경우 화상 회의 툴을 활용합니다.</li>
                    <li>
                      오프라인 스터디는 학교 내 스터디룸이나 근처 스터디 카페를
                      이용합니다.
                    </li>
                  </ul>

                  <h4>평가 및 피드백</h4>
                  <ul>
                    <li>
                      정기적인 과제 제출 및 발표를 통해 학습 진행 상황을
                      체크합니다.
                    </li>
                    <li>
                      스터디 종료 시 참가자들의 상호 평가와 자기 평가를
                      진행합니다.
                    </li>
                    <li>
                      우수 참가자에게는 인증서를 발급하거나 다음 스터디 참가
                      우선권을 부여합니다.
                    </li>
                  </ul>
                </div>
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
                스터디는 15주 중 중간고사/기말고사 기간의 휴강 일정을 고려하여
                약 8주간 진행되며, 스터디가 끝난 뒤 학기말 해커톤으로 스터디를
                마무리합니다.
              </Stack>
            </Box>
            <Box id='completion' component={'section'}>
              <Typography variant='bodyMedium' mt={4}>
                스터디 수료
              </Typography>
              <Typography variant='titleLarge' mb={2}>
                스터디 이수와 수료증
              </Typography>
              <Stack gap={2}>
                스터디별 이수 기준이 주어져있고, 모든 요건을 충족하면 수료증이
                발급됩니다.
              </Stack>
            </Box>
            <Box id='recommendation' component={'section'}>
              <Typography variant='bodyMedium' mt={4}>
                스터디 추천
              </Typography>
              <Typography variant='titleLarge' mb={2}>
                나에게 맞는 스터디는?
              </Typography>
              <Stack gap={2}>ddd</Stack>
            </Box>
            {/*  */}
          </Box>
          <StudySideBox />
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
      ></Box>
    </Box>
  );
}

function StudySideBox() {
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
      나에게 맞는 스터디는?
      <Button variant='contained' fullWidth size='large'>
        스터디 추천받기
      </Button>
    </Stack>
  );
  // const [activeStep, setActiveStep] = useState(0);
  // const [skipped, setSkipped] = useState(new Set<number>());

  // const isStepOptional = (step: number) => {
  //   return step === 1;
  // };

  // const isStepSkipped = (step: number) => {
  //   return skipped.has(step);
  // };

  // const handleNext = () => {
  //   let newSkipped = skipped;
  //   if (isStepSkipped(activeStep)) {
  //     newSkipped = new Set(newSkipped.values());
  //     newSkipped.delete(activeStep);
  //   }

  //   setActiveStep((prevActiveStep) => prevActiveStep + 1);
  //   setSkipped(newSkipped);
  // };

  // const handleBack = () => {
  //   setActiveStep((prevActiveStep) => prevActiveStep - 1);
  // };

  // const handleSkip = () => {
  //   if (!isStepOptional(activeStep)) {
  //     throw new Error("You can't skip a step that isn't optional.");
  //   }

  //   setActiveStep((prevActiveStep) => prevActiveStep + 1);
  //   setSkipped((prevSkipped) => {
  //     const newSkipped = new Set(prevSkipped.values());
  //     newSkipped.add(activeStep);
  //     return newSkipped;
  //   });
  // };

  // const handleReset = () => {
  //   setActiveStep(0);
  // };
  // return (
  //   <div>
  //     <Title title='스터디 가이드' label='나에게 맞는 스터디를 찾아보세요!' />
  //     {/* <Layout>
  //       <Stepper activeStep={activeStep}>
  //         {steps.map((label, index) => {
  //           const stepProps: { completed?: boolean } = {};
  //           const labelProps: {
  //             optional?: React.ReactNode;
  //           } = {};
  //           if (isStepOptional(index)) {
  //             labelProps.optional = (
  //               <Typography variant='bodyMedium'>Optional</Typography>
  //             );
  //           }
  //           if (isStepSkipped(index)) {
  //             stepProps.completed = false;
  //           }
  //           return (
  //             <Step key={label} {...stepProps}>
  //               <StepLabel {...labelProps}>{label}</StepLabel>
  //             </Step>
  //           );
  //         })}
  //       </Stepper>
  //       {activeStep === steps.length ? (
  //         <Box>
  //           <Typography sx={{ mt: 2, mb: 1 }}>
  //             All steps completed - you&apos;re finished
  //           </Typography>
  //           <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
  //             <Box sx={{ flex: '1 1 auto' }} />
  //             <Button onClick={handleReset}>Reset</Button>
  //           </Box>
  //         </Box>
  //       ) : (
  //         <Box>
  //           <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography>
  //           <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
  //             <Button
  //               color='inherit'
  //               disabled={activeStep === 0}
  //               onClick={handleBack}
  //               sx={{ mr: 1 }}
  //             >
  //               Back
  //             </Button>
  //             <Box sx={{ flex: '1 1 auto' }} />
  //             {isStepOptional(activeStep) && (
  //               <Button color='inherit' onClick={handleSkip} sx={{ mr: 1 }}>
  //                 Skip
  //               </Button>
  //             )}
  //             <Button onClick={handleNext}>
  //               {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
  //             </Button>
  //           </Box>
  //         </Box>
  //       )}
  //     </Layout> */}
  //   </div>
  // );
}

// <Basdfdsox id='place' component={'section'}>
//               <Typography variant='bodyMedium' pt={4}>
//                 스터디 진행 과정
//               </Typography>
//               <Typography variant='titleLarge'>..</Typography>
//               <Stack
//                 display={'flex'}
//                 sx={{
//                   flexDirection: {
//                     xs: 'column',
//                     md: 'row',
//                   },
//                 }}
//                 gap={6}
//                 mt={4}
//               >
//                 <LocalizationProvider
//                   dateAdapter={AdapterDayjs}
//                   adapterLocale='ko'
//                 ></LocalizationProvider>
//                 <Divider orientation='vertical' flexItem />
//                 <Stack gap={2}>
//                   <Typography variant='titleSmall'>
//                     asdfasdfsdfasdf
//                     {/* {date?.format('YYYY년 MM월 DD일')} */}
//                   </Typography>
//                   <Typography variant='labelLarge'>수업 장소 :</Typography>
//                 </Stack>
//               </Stack>
//             </Basdfdsox>
