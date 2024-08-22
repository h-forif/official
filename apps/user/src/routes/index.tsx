import AddchartIcon from '@mui/icons-material/Addchart';
import CloudIcon from '@mui/icons-material/Cloud';
import ExpandMore from '@mui/icons-material/ExpandMore';
import ShareIcon from '@mui/icons-material/Share';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Chip,
  Grid,
  useTheme,
} from '@mui/material';
import Typography from '@mui/material/Typography';
import { Box, Stack, useMediaQuery } from '@mui/system';

import Box1 from '@assets/images/main/box1.svg';
import Box2 from '@assets/images/main/box2.svg';
import Box3 from '@assets/images/main/box3.svg';
import Box4 from '@assets/images/main/box4.svg';
import Box5 from '@assets/images/main/box5.svg';
import {
  MENTOR_RECRUIT_END_DATE,
  MENTOR_RECRUIT_START_DATE,
  RECRUIT_END_DATE,
  RECRUIT_START_DATE,
} from '@constants/apply.constant';
import { Button } from '@packages/components/Button';
import { CenteredBox } from '@packages/components/elements/CenteredBox';
import { Layout } from '@packages/components/elements/Layout';
import { getFaqs } from '@services/post.service';
import { getUserState } from '@stores/user.store';
import { Link, createFileRoute } from '@tanstack/react-router';
import { getCurrentTerm } from '@utils/getCurrentTerm';

import GravityBox from '@components/main/GravityBox';
import JourneyImageList from '@components/main/JourneyImageList';

import { usePeriod } from '@hooks/usePeriod';
import { useSignIn } from '@hooks/useSignIn';

export const Route = createFileRoute('/')({
  loader: () => getFaqs(),
  component: Home,
});

function Home() {
  const faq = Route.useLoaderData();
  const userState = getUserState();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const { isIncluded } = usePeriod(
    MENTOR_RECRUIT_START_DATE,
    MENTOR_RECRUIT_END_DATE,
  );
  const { isIncluded: isMemberIncluded } = usePeriod(
    RECRUIT_START_DATE,
    RECRUIT_END_DATE,
  );

  // const studyIds = studies.map((study) => study.id).filter((id) => id !== 0);
  const { handleSignIn } = useSignIn();
  const titleVariant = isMobile ? 'titleSmall' : 'titleLarge';

  return (
    <main>
      {/* <ParallaxContainer /> */}
      <CenteredBox
        sx={{
          paddingX: 3,
          paddingTop: 12,
          paddingBottom: 3,
          gap: 3,
          textAlign: 'center',
          maxWidth: '780px',
          margin: 'auto',
          minHeight: '100vh',
          position: 'relative',
        }}
      >
        <Typography
          variant={isMobile ? 'displaySmall' : 'displayLarge'}
          color='text.primary'
          sx={{ textTransform: 'uppercase' }}
        >
          Upgrade your passion
        </Typography>
        <Typography variant={titleVariant}>
          {RECRUIT_START_DATE} - {RECRUIT_END_DATE}
        </Typography>
        <Typography
          variant={titleVariant}
          fontWeight={300}
          color='text.primary'
          sx={{
            wordBreak: 'keep-all',
          }}
        >
          지식 공유의 선순환을 행하고, 이를 토대로 함께 성장하고자 합니다. 지금
          선순환에 동참해주세요.
        </Typography>
        <Stack direction={'row'} alignItems={'center'} gap={1}>
          {userState === 'sign-out' && (
            <Button variant='outlined' onClick={handleSignIn}>
              부원 가입하기
            </Button>
          )}
          <Link
            to='/studies'
            search={{
              year: Number(getCurrentTerm().year),
              semester: Number(getCurrentTerm().semester),
            }}
          >
            <Button variant='contained'>스터디 보러가기</Button>
          </Link>
          {userState === 'sign-in' && (
            <>
              <Link to='/apply/member' disabled={!isMemberIncluded}>
                <Button variant='contained' disabled={!isMemberIncluded}>
                  스터디 신청하기
                </Button>
              </Link>
            </>
          )}
          {isIncluded && (
            <Link to='/apply/mentor' disabled={!isIncluded}>
              <Button variant='outlined' disabled={!isIncluded}>
                멘토 신청하기
              </Button>
            </Link>
          )}
        </Stack>
      </CenteredBox>
      <Box sx={{ backgroundColor: 'primary.light' }}>
        <GravityBox images={[Box1, Box2, Box3, Box4, Box5]} />
      </Box>
      <Layout>
        <Box py={16} mb={8} textAlign={'center'}>
          <Typography variant={'titleLarge'} mb={2}>
            왜 포리프인가요?
          </Typography>
          <Typography variant={'labelLarge'} mb={2}>
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
                sx={{
                  '&:hover': {
                    transition: 'all 0.2s',
                    border: 1,
                    borderColor: 'primary.main',
                  },
                }}
              >
                <CenteredBox
                  p={1}
                  border={1}
                  borderColor={'primary.main'}
                  borderRadius={'50%'}
                >
                  <AddchartIcon fontSize='large' color='primary' />
                </CenteredBox>
                <Typography variant={'titleLarge'}>GROWTH</Typography>
                <Typography variant={'bodySmall'}>
                  멘토와 멘티가 함께 성장하는 기회
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
                sx={{
                  '&:hover': {
                    transition: 'all 0.2s',
                    border: 1,
                    borderColor: 'primary.main',
                  },
                }}
              >
                <CenteredBox
                  p={1}
                  border={1}
                  borderColor={'primary.main'}
                  borderRadius={'50%'}
                >
                  <ShareIcon fontSize='large' color='primary' />
                </CenteredBox>
                <Typography variant={'titleLarge'}>SHARING</Typography>
                <Typography variant={'bodySmall'}>
                  부원들과의 지식 공유
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
                sx={{
                  '&:hover': {
                    transition: 'all 0.2s',
                    border: 1,
                    borderColor: 'primary.main',
                  },
                }}
              >
                <CenteredBox
                  p={1}
                  border={1}
                  borderColor={'primary.main'}
                  borderRadius={'50%'}
                >
                  <CloudIcon fontSize='large' color='primary' />
                </CenteredBox>
                <Typography variant={'titleLarge'}>NETWORKING</Typography>
                <Typography variant={'bodySmall'}>
                  다양한 학과, 분야의 사람들과의 네트워킹
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
                variant={isMobile ? 'titleLarge' : 'headlineSmall'}
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

      <Box py={16} textAlign={'center'}>
        <Layout>
          <Box px={{ md: 12, sm: 4 }}>
            <Stack
              direction={isMobile ? 'column' : 'row'}
              justifyContent={'space-between'}
              mb={4}
            >
              <Typography
                variant={isMobile ? 'titleLarge' : 'headlineSmall'}
                mb={2}
                textAlign={isMobile ? 'center' : 'left'}
                width={isMobile ? '100%' : '40%'}
                sx={{ wordBreak: 'keep-all' }}
              >
                일반적으로 자주 묻는 질문을 확인해보세요.
              </Typography>
              <Layout
                display={'flex'}
                flexDirection={'column'}
                gap={2}
                minHeight={320}
                px={isMobile ? '0!important' : ''}
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
                        display: 'none',
                      },
                    }}
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMore />}
                      aria-controls={`panel${index}-content`}
                      id={`panel${index}-header`}
                      sx={{
                        '&.MuiAccordionSummary-root': {
                          padding: isMobile ? '0!important' : '',
                        },
                      }}
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
                <Link to='/faq'>
                  <Button fullWidth variant='outlined' size='large'>
                    더 많은 자주 묻는 질문 보러가기
                  </Button>
                </Link>
              </Layout>
            </Stack>
          </Box>
        </Layout>
      </Box>
    </main>
  );
}
