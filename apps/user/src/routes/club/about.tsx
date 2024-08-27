import { Box, Stack, Typography, styled } from '@mui/material';

import AboutBgImg from '@assets/images/about-bg.png';
import Hackathon1 from '@assets/images/main/hackathon2.jpg';
import OT2024 from '@assets/images/main/ot_2024_1.jpeg';
import Image from '@packages/components/Image';
import { CenteredBox } from '@packages/components/elements/CenteredBox';
import { Layout } from '@packages/components/elements/Layout';
import { createFileRoute } from '@tanstack/react-router';

import Marquee from '@components/common/Marquee';

import useDeviceSize from '@hooks/useDeviceSize';

export const Route = createFileRoute('/club/about')({
  component: AboutPage,
});

const history = [
  {
    year: 2025,
    content: ['포리프 10주년 기념 행사'],
  },
  {
    year: 2024,
    content: [
      '선배와의 만남',
      'HSPC 한양X세종 알고리즘 대회 개최',
      '제 2회 홈커밍데이',
      '제 13·14회 해커톤',
    ],
  },
  {
    year: 2023,
    content: [
      '한 학기 부원 수 200명 돌파',
      'HPEC 한양 알고리즘 대회 개최',
      'OOPARTS 연합 스터디',
      '제 1회 홈커밍데이',
      '제 11·12회 해커톤',
    ],
  },
  {
    year: 2021,
    content: ['한양대학교 중앙동아리 승격', '프로젝트 뭉공포'],
  },
  {
    year: 2020,
    content: ['한양대학교 준동아리 승격', '프로젝트 잔디심기'],
  },
  {
    year: 2018,
    content: '청년참 지원사업선정',
  },
  {
    year: 2017,
    content: '한양 학술타운 총장상 수상',
  },
  {
    year: 2015,
    content: ['FORIF 창립', '소셜 벤쳐 동아리 선정'],
  },
];

function AboutPage() {
  const primaryColor = '#1D40BA';
  const { isMobile, isTablet } = useDeviceSize();
  return (
    <Box>
      <BackgroundImage>
        <Title
          variant='displayLarge'
          fontSize={isMobile ? '80px' : '120px'}
          lineHeight={'140px'}
        >
          about_
          <br />
          <Typography
            component={'span'}
            variant='displayLarge'
            fontSize={isMobile ? '60px' : '120px'}
          >
            <Typography
              component={'span'}
              variant='displayLarge'
              color={primaryColor}
              fontSize={isMobile ? '60px' : '120px'}
            >
              {'{'}
            </Typography>{' '}
            FORIF{' '}
            <Typography
              component={'span'}
              variant='displayLarge'
              color={primaryColor}
              fontSize={isMobile ? '60px' : '120px'}
            >
              {'}'}
            </Typography>
          </Typography>
        </Title>
      </BackgroundImage>
      <Layout
        display={'flex'}
        alignItems={'center'}
        height={'100vh'}
        bgcolor={primaryColor}
        position={'relative'}
      >
        <Typography
          variant='displaySmall'
          color={'white'}
          fontWeight={'700'}
          top={32}
          position={'absolute'}
        >
          프로그래밍을 하고 싶은 누구나,
          <br />
          포리프와 함께.
        </Typography>
        <Marquee />
        <Typography
          variant='displaySmall'
          color={'white'}
          fontWeight={'700'}
          bottom={32}
          right={64}
          position={'absolute'}
        >
          지식의 선순환을.
        </Typography>
      </Layout>
      <Layout minHeight={'100vh'} position={'relative'}>
        <Image
          src={Hackathon1}
          alt='해커톤 사진 1'
          style={{
            position: 'absolute',
            top: '50%',
            display: isTablet ? 'none' : 'block',
            width: '16vw',
          }}
        />
        <Image
          src={OT2024}
          alt='2024년 1학기 OT'
          width={'360px'}
          height={'auto'}
          style={{
            position: 'absolute',
            right: '20px',
            bottom: '20%',
            display: isTablet ? 'none' : 'block',
            width: '16vw',
          }}
        />
        <CenteredBox>
          <Typography variant='displaySmall' fontWeight={'700'} mt={20} mb={10}>
            강렬한{' '}
            <Typography
              component={'span'}
              fontWeight={'700'}
              variant='displaySmall'
              color={'primary.main'}
            >
              FORIF
            </Typography>
            의 역사
          </Typography>
          <Stack>
            {history.map((item, idx) => (
              <HistoryLine
                key={idx}
                year={item.year}
                content={item.content}
                idx={idx}
              />
            ))}
          </Stack>
          <Typography variant='displaySmall' fontWeight={'700'} mt={20} mb={10}>
            <Typography
              component={'span'}
              fontWeight={'700'}
              variant='displaySmall'
              color={'primary.main'}
            >
              지식의 선순환
            </Typography>
            이 일어날 수 있도록.
          </Typography>
        </CenteredBox>
      </Layout>
    </Box>
  );
}

const HistoryLine = ({
  year,
  content,
  idx,
}: {
  year: number;
  content: string | string[];
  idx: number;
}) => {
  return (
    <Stack direction={'row'} alignItems={'center'} px={2}>
      <Box
        sx={{
          minWidth: '48px', // Adjust this width as needed
          flexShrink: 0,
        }}
      >
        <Typography variant='bodySmall'>{year}</Typography>
      </Box>

      <Stack
        position={'relative'}
        alignItems={'flex-start'}
        justifyContent={'center'}
        alignSelf={'stretch'}
        mx={3}
        sx={
          idx !== history.length - 1
            ? idx === 0
              ? {
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    display: 'block',
                    zIndex: 0,
                    top: '50%',
                    bottom: 0,
                    left: 7,
                    width: '.1rem',
                    height: '50%',
                    bgcolor: 'divider',
                  },
                }
              : {
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    display: 'block',
                    zIndex: 0,
                    top: 0,
                    bottom: 0,
                    left: 7,
                    width: '.1rem',
                    height: '100%',
                    bgcolor: 'divider',
                  },
                }
            : {
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  display: 'block',
                  zIndex: 0,
                  top: 0,
                  bottom: 0,
                  left: 7,
                  width: '.1rem',
                  height: '50%',
                  bgcolor: 'divider',
                },
              }
        }
      >
        <Stack
          width={16}
          height={16}
          display={'flex'}
          alignItems={'center'}
          justifyContent={'center'}
          my={2}
          zIndex={1}
        >
          <Box
            width={16}
            height={'auto'}
            sx={{
              aspectRatio: 1,
              borderRadius: '50%',
              border: '2px solid #fff',
              bgcolor: 'primary.main',
            }}
          />
        </Stack>
      </Stack>
      <Stack direction={'column'} gap={2} py={4} width={'100%'}>
        {typeof content === 'string' ? (
          <Typography variant='bodySmall'>{content}</Typography>
        ) : (
          <Stack gap={1}>
            {content.map((label) => (
              <Typography key={label} variant='bodySmall'>
                {label}
              </Typography>
            ))}
          </Stack>
        )}
      </Stack>
    </Stack>
  );
};

const BackgroundImage = styled(Box)`
  background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url(${AboutBgImg});
  width: 100vw;
  height: 100vh;
`;

const Title = styled(Typography)(() => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  color: 'white',
}));
