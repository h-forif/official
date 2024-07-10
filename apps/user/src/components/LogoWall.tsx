import { useTheme } from '@mui/system';

import AutoEverLogo from '@assets/images/autoever.png';
import HYUSimbol from '@assets/images/hyu-simbol.svg';
import LeapSimbol from '@assets/images/leap-simbol.png';
import { CenteredBox } from '@packages/components/elements/CenteredBox';

export function LogoWall() {
  const theme = useTheme();
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
    ></CenteredBox>
  );
}
