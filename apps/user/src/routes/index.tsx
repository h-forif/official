import AddchartIcon from '@mui/icons-material/Addchart';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionDetails, Chip, Grid } from '@mui/material';
import Typography from '@mui/material/Typography';
import { Box, Stack } from '@mui/system';

import Box1 from '@assets/images/main/box1.svg';
import Box2 from '@assets/images/main/box2.svg';
import Box3 from '@assets/images/main/box3.svg';
import Box4 from '@assets/images/main/box4.svg';
import Box5 from '@assets/images/main/box5.svg';
import { AccordionSummary } from '@packages/components/Accordion';
import { Button } from '@packages/components/Button';
import { CenteredBox } from '@packages/components/elements/CenteredBox';
import { Layout } from '@packages/components/elements/Layout';
import { getFaqs } from '@services/post.service';
import { getAllStudies } from '@services/study.service';
import { Link, createFileRoute } from '@tanstack/react-router';
import { getCurrentTerm } from '@utils/getCurrentTerm';
import { getUniqueRandomInts } from '@utils/random';
import { max, min } from 'es-toolkit/compat';

import GravityBox from '@components/main/GravityBox';
import JourneyImageList from '@components/main/JourneyImageList';
import ParallaxContainer from '@components/main/ParallaxContainer';
import AnimatedContainer from '@components/study/AnimatedStudyContainer';
import { StudyCard } from '@components/study/StudyCard';

import { useSignIn } from '@hooks/useSignIn';

export const Route = createFileRoute('/')({
  loader: async () => {
    const currentTerm = getCurrentTerm();

    const [studies, faq] = await Promise.all([
      getAllStudies({
        year: Number(currentTerm.year),
        semester: Number(currentTerm.semester),
      }),
      getFaqs(),
    ]);
    return { studies, faq };
  },
  component: Home,
});

function Home() {
  const { studies, faq } = Route.useLoaderData();
  const studyIds = studies.map((study) => study.id).filter((id) => id !== 0);
  const { handleSignIn } = useSignIn();
  const uniqueStudyIds = getUniqueRandomInts(
    min(studyIds),
    max(studyIds),
    2,
    studyIds,
  );

  return (
    <main>
      <ParallaxContainer />
      <CenteredBox
        sx={{
          paddingX: 3,
          paddingTop: 12,
          paddingBottom: 3,
          gap: 3,
          textAlign: 'center',
          maxWidth: '780px',
          margin: 'auto',
        }}
      >
        <Typography
          variant='displayLarge'
          color='text.primary'
          sx={{ textTransform: 'uppercase' }}
        >
          Upgrade your passion
        </Typography>
        <Typography variant='titleLarge' fontWeight={300} color='text.primary'>
          지식 공유의 선순환을 행하고, 이를 토대로 함께 성장하고자 합니다. 지금
          선순환에 동참해주세요.
        </Typography>
        <Stack direction={'row'} alignItems={'center'} gap={1}>
          <Button variant='contained' onClick={handleSignIn}>
            부원 가입하기
          </Button>
          <Link to='/apply/mentor'>
            <Button variant='outlined'>멘토 신청하기</Button>
          </Link>
        </Stack>
        <AnimatedContainer>
          {uniqueStudyIds.map((id) => {
            const study = studies.find((study) => study.id === id);
            return (
              <StudyCard
                key={study!.id}
                title={study!.name}
                image={study!.image}
                difficulty={study!.difficulty}
                id={study!.id}
                primaryMentorName={study!.primary_mentor_name}
                secondaryMentorName={study!.secondary_mentor_name}
              />
            );
          })}
        </AnimatedContainer>
      </CenteredBox>
      <Box sx={{ backgroundColor: 'primary.light', my: 4 }}>
        <GravityBox images={[Box1, Box2, Box3, Box4, Box5]} />
      </Box>
      <Layout>
        <Box py={16} mb={8} textAlign={'center'}>
          <Typography variant={'titleLarge'} mb={2}>
            왜 포리프인가요?
          </Typography>
          <Typography variant={'bodySmall'} mb={2}>
            포리프는 멘토와 멘티가 함께 성장합니다. 이후 해커톤으로 이어지는
            마무리까지, 포리프의 여정을 함께 살펴보세요.
          </Typography>
          <Grid container spacing={4} my={6}>
            <Grid item xs={12} md={4}>
              <Box
                border={1}
                borderColor={'divider'}
                borderRadius={2}
                display={'flex'}
                flexDirection={'column'}
                justifyContent={'flex-start'}
                alignItems={'flex-start'}
                p={4}
                gap={2}
              >
                <CenteredBox
                  p={1}
                  border={1}
                  borderColor={'primary.main'}
                  borderRadius={'50%'}
                >
                  <AddchartIcon fontSize='large' color='primary' />
                </CenteredBox>
                <Typography variant={'titleLarge'}>멘토링</Typography>
                <Typography variant={'bodySmall'}>
                  멘토와 멘티가 함께 성장합니다.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box
                border={1}
                borderColor={'divider'}
                borderRadius={2}
                display={'flex'}
                flexDirection={'column'}
                justifyContent={'flex-start'}
                alignItems={'flex-start'}
                p={4}
                gap={2}
              >
                <CenteredBox
                  p={1}
                  border={1}
                  borderColor={'primary.main'}
                  borderRadius={'50%'}
                >
                  <AddchartIcon fontSize='large' color='primary' />
                </CenteredBox>
                <Typography variant={'titleLarge'}>멘토링</Typography>
                <Typography variant={'bodySmall'}>
                  멘토와 멘티가 함께 성장합니다.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box
                border={1}
                borderColor={'divider'}
                borderRadius={2}
                display={'flex'}
                flexDirection={'column'}
                justifyContent={'flex-start'}
                alignItems={'flex-start'}
                p={4}
                gap={2}
              >
                <CenteredBox
                  p={1}
                  border={1}
                  borderColor={'primary.main'}
                  borderRadius={'50%'}
                >
                  <AddchartIcon fontSize='large' color='primary' />
                </CenteredBox>
                <Typography variant={'titleLarge'}>멘토링</Typography>
                <Typography variant={'bodySmall'}>
                  멘토와 멘티가 함께 성장합니다.
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Layout>
      <Box
        py={16}
        textAlign={'center'}
        sx={{
          background: 'linear-gradient(to right, #faf8ff, white)',
        }}
      >
        <Layout>
          <Box px={{ md: 12, sm: 4 }}>
            <Stack direction={'row'} justifyContent={'space-between'} mb={4}>
              <Typography
                variant={'headlineSmall'}
                mb={2}
                textAlign={'left'}
                width={'30%'}
                sx={{ wordBreak: 'keep-all' }}
              >
                포리프의 한 학기 여정에 함께해요
              </Typography>
              <Typography
                variant={'bodySmall'}
                mb={2}
                textAlign={'left'}
                width={'40%'}
                sx={{ wordBreak: 'keep-all' }}
              >
                포리프는 멘토와 멘티가 함께 성장합니다. 이후 해커톤으로 이어지는
                마무리까지, 포리프의 여정을 함께 살펴보세요.
              </Typography>
            </Stack>
            <JourneyImageList />
          </Box>
        </Layout>
      </Box>

      <Box bgcolor={'text.primary'} height={'100vh'} width={'100%'} />
      <Box
        py={16}
        textAlign={'center'}
        sx={{
          background: 'linear-gradient(to right, #faf8ff, white)',
        }}
      >
        <Layout>
          <Box px={{ md: 12, sm: 4 }}>
            <Stack direction={'row'} justifyContent={'space-between'} mb={4}>
              <Typography
                variant={'headlineSmall'}
                mb={2}
                textAlign={'left'}
                width={'40%'}
                sx={{ wordBreak: 'keep-all' }}
              >
                일반적으로 자주 묻는 질문을 확인해보세요.
              </Typography>
              <Layout
                display={'flex'}
                flexDirection={'column'}
                gap={2}
                minHeight={320}
              >
                {faq.slice(0, 3).map((faq, index) => (
                  <Accordion
                    key={index}
                    disableGutters
                    elevation={0}
                    sx={{
                      '&.MuiAccordion-root': {
                        backgroundColor: 'transparent',
                      },
                      '&:before': {
                        display: 'none', // Accordion의 기본 구분선 제거
                      },
                    }}
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMore />}
                      aria-controls={`panel${index}-content`}
                      id={`panel${index}-header`}
                    >
                      <Stack direction={'row'} alignItems={'center'} gap={1.5}>
                        <Typography variant='labelLarge' fontWeight={'300'}>
                          Q. {faq.title}
                        </Typography>
                        <Chip
                          label={faq.tag}
                          color='primary'
                          variant='outlined'
                        />
                      </Stack>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography variant='bodyMedium' textAlign={'left'}>
                        A. {faq.content}
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                ))}
                <Button fullWidth variant='contained'>
                  더 많은 자주 묻는 질문 보러가기
                </Button>
              </Layout>
            </Stack>
          </Box>
        </Layout>
      </Box>
    </main>
  );
}
