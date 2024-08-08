import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import SwapCallsIcon from '@mui/icons-material/SwapCalls';
import { Grid } from '@mui/material';
import Typography from '@mui/material/Typography';
import { Box, Stack } from '@mui/system';

import Peep1 from '@assets/images/avatar/peep-2.svg';
import Box1 from '@assets/images/main/box1.svg';
import Box2 from '@assets/images/main/box2.svg';
import Box3 from '@assets/images/main/box3.svg';
import Box4 from '@assets/images/main/box4.svg';
import Box5 from '@assets/images/main/box5.svg';
import { Button } from '@packages/components/Button';
import Image from '@packages/components/Image';
import { CenteredBox } from '@packages/components/elements/CenteredBox';
import { Layout } from '@packages/components/elements/Layout';
import { getAllStudies } from '@services/study.service';
import { Link, createFileRoute } from '@tanstack/react-router';
import { getCurrentTerm } from '@utils/getCurrentTerm';
import { getUniqueRandomInts } from '@utils/random';
import { max, min } from 'es-toolkit/compat';

import GravityBox from '@components/main/GravityBox';
import JourneyBox from '@components/main/JourneyBox';
import AnimatedContainer from '@components/study/AnimatedStudyContainer';
import { StudyCard } from '@components/study/StudyCard';

import { useSignIn } from '@hooks/useSignIn';

export const Route = createFileRoute('/')({
  loader: async () => {
    const currentTerm = getCurrentTerm();
    const studies = getAllStudies({
      year: Number(currentTerm.year),
      semester: Number(currentTerm.semester),
    });
    return studies;
  },
  component: Home,
});

function Home() {
  const studies = Route.useLoaderData();
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
      <Box sx={{ backgroundColor: 'primary.main', my: 4 }}>
        <GravityBox images={[Box1, Box2, Box3, Box4, Box5]} />
      </Box>
      <Layout>
        <Stack
          direction={'row'}
          alignItems={'center'}
          gap={4}
          width={'100%'}
          my={8}
        >
          <Box
            width={'60%'}
            height={'auto'}
            sx={{ aspectRatio: '1' }}
            border={1}
            borderColor={'divider'}
            borderRadius={2}
            display={{ md: 'flex', sm: 'none', xs: 'none' }}
            justifyContent={'center'}
            alignItems={'center'}
          >
            <Image
              src={Peep1}
              alt={'About us'}
              width={'100%'}
              height={'100%'}
            />
          </Box>
          <Box display={'flex'} flexDirection={'column'} gap={1}>
            <Typography variant={'labelMedium'}>ABOUT FORIF</Typography>
            <Typography variant={'titleLarge'}>
              프로그래밍을 하고 싶은 누구나,{' '}
              <Typography
                component={'span'}
                variant='titleLarge'
                color={'primary'}
              >
                포리프
              </Typography>
              에서 함께.
            </Typography>
            <Typography variant={'bodySmall'} mb={2}>
              포리프는 전공과 관계없이 프로그래밍에 관심이 있는 학생들이 모여
              함께 공부하고 성장할 수 있는 한양대학교 최대 규모의 중앙
              프로그래밍 동아리입니다. 포리프와 함께 프로그래밍을 시작하고
              성장해보세요.
            </Typography>
            <Stack
              component={'ul'}
              sx={{ p: 0, mx: 0, mt: 0, mb: 4, listStyle: 'none' }}
              gap={1}
            >
              <Typography component='li' variant='bodyMedium'>
                <Stack
                  direction={{ md: 'row', sm: 'column' }}
                  alignItems={'center'}
                >
                  <SwapCallsIcon
                    fontSize='inherit'
                    color='primary'
                    sx={{ mr: 1 }}
                  />
                  <strong style={{ marginRight: '8px' }}>SHARE</strong> 멘토들은
                  자신의 지식을 공유하며 회원들의 성장을 돕습니다.
                </Stack>
              </Typography>
              <Typography component='li' variant='bodyMedium'>
                <Stack
                  direction={{ md: 'row', sm: 'column' }}
                  alignItems={'center'}
                >
                  <AutoGraphIcon
                    color='primary'
                    fontSize='inherit'
                    sx={{ mr: 1 }}
                  />
                  <strong style={{ marginRight: '8px' }}>GROWTH</strong>{' '}
                  멘티들은 양질의 스터디를 통해 프로그래밍 역량을 키웁니다.
                </Stack>
              </Typography>
              <Typography component='li' variant='bodyMedium'>
                <Stack
                  direction={{ md: 'row', sm: 'column' }}
                  alignItems={'center'}
                >
                  <EmojiPeopleIcon
                    color='primary'
                    fontSize='inherit'
                    sx={{ mr: 1 }}
                  />
                  <strong style={{ marginRight: '8px' }}>NETWORKING</strong>{' '}
                  다양한 네트워킹 기회를 통해 인적 네트워크를 확장할 수
                  있습니다.
                </Stack>
              </Typography>
            </Stack>
            <Stack
              direction={'row'}
              gap={2}
              justifyContent={{ xs: 'center', sm: 'flex-start' }}
            >
              <Button size='large' variant='outlined' onClick={handleSignIn}>
                부원 가입하기
              </Button>
              <Link to='/club/about'>
                <Button size='large' variant='contained'>
                  더 알아보기
                </Button>
              </Link>
            </Stack>
          </Box>
        </Stack>
        <Box my={8}>
          <Typography variant={'headlineSmall'} textAlign={'center'}>
            Our Mission
          </Typography>
          <Stack direction={'row'} gap={2}>
            <Typography variant={'bodyMedium'}>
              포리프는 프로그래밍을 하고 싶은 누구나 함께 성장할 수 있는 공간을
              만들고자 합니다.
            </Typography>
            <Typography variant={'bodyMedium'}>
              포리프는 프로그래밍을 하고 싶은 누구나 함께 성장할 수 있는 공간을
              만들고자 합니다.
            </Typography>
          </Stack>
        </Box>
        <Box>
          <Typography variant={'headlineSmall'} mb={2}>
            포리프의 한 학기 여정에 함께해요
          </Typography>
          <Typography variant={'bodySmall'} mb={2}>
            포리프는 멘토와 멘티가 함께 성장합니다. 이후 해커톤으로 이어지는
            마무리까지, 포리프의 여정을 함께 살펴보세요.
          </Typography>
          <Grid container spacing={2} maxHeight={{ md: '240px', sm: '100%' }}>
            <JourneyBox
              index={0}
              month={9}
              year={2024}
              title='시즌1'
              contents={['동아리 박람회', '부원 모집', 'HSPC 개최']}
            />
            <JourneyBox
              index={1}
              month={10}
              year={2024}
              title='시즌2'
              contents={['간식 행사']}
            />
            <JourneyBox
              index={2}
              month={11}
              year={2024}
              title='시즌3'
              contents={['연합 해커톤']}
            />
            <JourneyBox
              index={3}
              month={12}
              year={2024}
              title='시즌4'
              contents={['제 2회 홈커밍데이', '제 8회 해커톤']}
            />
          </Grid>
        </Box>
        <Stack
          direction={'row'}
          alignItems={'center'}
          gap={4}
          width={'100%'}
          py={8}
        >
          <Box display={'flex'} flexDirection={'column'} gap={1}>
            <Typography variant={'labelMedium'}>ABOUT FORIF</Typography>
            <Typography variant={'titleLarge'}>
              프로그래밍을 하고 싶은 누구나,{' '}
              <Typography
                component={'span'}
                variant='titleLarge'
                color={'primary'}
              >
                포리프
              </Typography>
              에서 함께.
            </Typography>
            <Typography variant={'bodySmall'}>
              포리프는 전공과 관계없이 프로그래밍에 관심이 있는 학생들이 모여
              함께 공부하고 성장할 수 있는 공간입니다. 포리프와 함께
              프로그래밍을 시작해보세요.
            </Typography>
            <Stack
              component={'ul'}
              sx={{ p: 0, mx: 0, mt: 0, mb: 4, listStyle: 'none' }}
              gap={1}
            >
              <Typography component='li' variant='bodyMedium'>
                <Stack direction={'row'} alignItems={'center'}>
                  <AutoGraphIcon fontSize='inherit' sx={{ mr: 1 }} />
                  Opportunity for Growth
                </Stack>
              </Typography>
              <Typography component='li' variant='bodyMedium'>
                <Stack direction={'row'} alignItems={'center'}>
                  <AutoGraphIcon fontSize='inherit' sx={{ mr: 1 }} />
                  Flexibility and Accessibility
                </Stack>
              </Typography>
              <Typography component='li' variant='bodyMedium'>
                <Stack direction={'row'} alignItems={'center'}>
                  <AutoGraphIcon fontSize='inherit' sx={{ mr: 1 }} />
                  Empowerment, Control and Reliability
                </Stack>
              </Typography>
            </Stack>
            <Stack direction={'row'} gap={2}>
              <Button size='large' variant='outlined'>
                Build on FORIF
              </Button>
              <Button size='large' variant='contained'>
                Learn more
              </Button>
            </Stack>
          </Box>
          <Box
            width={'40%'}
            height={'auto'}
            sx={{ aspectRatio: '1' }}
            border={1}
            borderColor={'divider'}
            borderRadius={2}
            display={'flex'}
            justifyContent={'center'}
            alignItems={'center'}
          >
            <Image
              src={Peep1}
              alt={'About us'}
              width={'100%'}
              height={'100%'}
            />
          </Box>
        </Stack>
      </Layout>
    </main>
  );
}
