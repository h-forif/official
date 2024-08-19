import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';

import { CenteredBox } from '@packages/components/elements/CenteredBox';
import { Link } from '@tanstack/react-router';

export default function OutwardBtn({ to }: { to: string }) {
  return (
    <Link to={to}>
      <CenteredBox
        component={'button'}
        border={1}
        borderColor={'divider'}
        width={48}
        height={48}
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
