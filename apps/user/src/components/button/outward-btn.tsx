import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import { useTheme } from '@mui/material';

import { CenteredBox } from '@packages/components/elements/CenteredBox';
import { Link } from '@tanstack/react-router';

export default function OutwardBtn({
  width = 48,
  height = 48,
  to,
  label,
}: {
  width?: number;
  height?: number;
  to: string;
  label?: string;
}) {
  const mode = useTheme().palette.mode;
  return (
    <Link to={to}>
      <CenteredBox
        component={'button'}
        aria-label={label}
        border={1}
        borderColor={mode === 'light' ? 'divider' : 'black'}
        width={width}
        height={height}
        borderRadius={'50%'}
        bgcolor={'primary.light'}
        sx={{
          cursor: 'pointer',
          '&:hover': {
            bgcolor: 'primary.main',
          },
        }}
      >
        <ArrowOutwardIcon
          fontSize='small'
          sx={{ color: 'background.default' }}
        />
      </CenteredBox>
    </Link>
  );
}
