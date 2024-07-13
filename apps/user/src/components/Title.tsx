import { Typography } from '@mui/material';

import { CenteredBox } from '@packages/components/elements/CenteredBox';

export function Title({
  title,
  label = '영감을 주는 동료와 함께라면. The Better Life',
}: {
  title: string;
  label?: string;
}) {
  return (
    <CenteredBox
      component={'section'}
      sx={{
        paddingTop: 12,
        paddingX: 6,
        textAlign: 'center',
        margin: 'auto',
        marginBottom: 12,
        wordBreak: 'keep-all',
      }}
    >
      <Typography variant='displayLarge' sx={{ mb: 1 }}>
        {title}
      </Typography>
      <Typography variant='labelLarge'>{label}</Typography>
    </CenteredBox>
  );
}
