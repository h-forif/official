import { Typography } from '@mui/material';

import { CenteredBox } from '@packages/components/elements/CenteredBox';

interface TitleProps {
  title: string;
  label?: string;
  pt?: number;
  px?: number;
  mb?: number;
}

export function Title({
  title,
  label = '영감을 주는 동료와 함께라면. The Better Life',
  pt = 12,
  px = 6,
  mb = 12,
}: TitleProps) {
  return (
    <CenteredBox
      component={'section'}
      sx={{
        paddingTop: pt,
        paddingX: px,
        textAlign: 'center',
        margin: 'auto',
        marginBottom: mb,
        wordBreak: 'keep-all',
      }}
    >
      <Typography variant='displaySmall' sx={{ mb: 1 }}>
        {title}
      </Typography>
      <Typography variant='labelLarge'>{label}</Typography>
    </CenteredBox>
  );
}
