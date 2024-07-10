import { Typography } from '@mui/material';
import { Stack, useTheme } from '@mui/system';

import AutoEverLogo from '@assets/images/autoever.png';
import HYUSimbol from '@assets/images/hyu-simbol.svg';
import LeapSimbol from '@assets/images/leap-simbol.png';
import { CenteredBox } from '@packages/components/elements/CenteredBox';

export function LogoWall() {
  const theme = useTheme();
  const textColor =
    theme.palette.mode === 'dark'
      ? theme.palette.common.black
      : theme.palette.common.white;
  return (
    <CenteredBox
      sx={{
        height: '160px',
        width: '100%',
        background: theme.palette.primary.main,
        zIndex: 2,
        flexDirection: 'row',
        gap: 2,
      }}
    >
      <img src={AutoEverLogo} width={150} height={80} alt='현대오토에버 로고' />
      <img src={HYUSimbol} width={150} height={80} alt='한양대학교 로고' />
      <Stack
        direction={'column'}
        justifyContent={'center'}
        alignItems={'center'}
        gap={1}
      >
        <img
          src={LeapSimbol}
          width={120}
          height={60}
          alt='한양대학교 동아리 총연합회 로고'
        />
        <Typography variant='labelSmall' color={textColor}>
          한양대학교 제39대 총동아리연합회 Leap
        </Typography>
      </Stack>
    </CenteredBox>
  );
}
