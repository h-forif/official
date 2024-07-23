import { useTheme } from '@mui/system';

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
    ></CenteredBox>
  );
}
