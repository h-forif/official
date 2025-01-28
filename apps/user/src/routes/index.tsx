import AddchartIcon from '@mui/icons-material/Addchart';
import CloudIcon from '@mui/icons-material/Cloud';
import ShareIcon from '@mui/icons-material/Share';
import { Grid, useTheme } from '@mui/material';
import Typography from '@mui/material/Typography';
import { Box, Stack, useMediaQuery } from '@mui/system';

import { Button } from '@packages/components/Button';
import { CenteredBox } from '@packages/components/elements/CenteredBox';
import { Layout } from '@packages/components/elements/Layout';
import {
  CURRENT_SEMESTER,
  CURRENT_YEAR,
  MENTOR_RECRUIT_END_DATE,
  MENTOR_RECRUIT_START_DATE,
  RECRUIT_END_DATE,
  RECRUIT_START_DATE,
} from '@packages/constants';
import { getUserState } from '@stores/user.store';
import { Link, createFileRoute } from '@tanstack/react-router';

import GravityBox from '@components/main/GravityBox';
import JourneyImageList from '@components/main/JourneyImageList';

import { usePeriod } from '@hooks/usePeriod';
import { useSignIn } from '@hooks/useSignIn';

export const Route = createFileRoute('/')({
  component: Home,
});

function Home() {
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

  const { handleSignIn } = useSignIn();
  const titleVariant = isMobile ? 'titleSmall' : 'titleLarge';

  return (
    <main>
      <CenteredBox
        sx={{
          paddingX: 3,
          paddingTop: 12,
          paddingBottom: 3,
          gap: 3,
          textAlign: 'center',
          maxWidth: '780px',
          margin: 'auto',
          minHeight: isMobile ? '80vh' : '100vh',
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
        <Typography variant={titleVariant} fontWeight={400}>
          {RECRUIT_START_DATE} ~ {RECRUIT_END_DATE}
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
              year: CURRENT_YEAR,
              semester: CURRENT_SEMESTER,
            }}
          >
            <Button variant='outlined'>스터디 보러가기</Button>
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
      <GravityBox />
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
                <Typography variant={'bodySmall'} height={48}>
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
                <Typography variant={'bodySmall'} height={48}>
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
                <Typography variant={'bodySmall'} height={48}>
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
                color={'black'}
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
    </main>
  );
}
