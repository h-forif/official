import Typography from '@mui/material/Typography';

import NotFoundCharacter from '@assets/images/peep-not-found.svg?react';
import { CenteredBox } from '@packages/components/elements/CenteredBox';

interface ErrorProps {
  status: number;
}

export default function ErrorComponent({ status }: ErrorProps) {
  let message;
  switch (status) {
    case 404:
      message = '존재하는 항목이 없어요.';
      break;
    case 403:
      message = '서버가 요청을 거부했어요. 권한이 없는지 확인해보세요.';
      break;
    default:
      message = '예상하지 못한 오류가 발생했어요.';
      break;
  }

  return (
    <CenteredBox sx={{ width: '100%', height: '400px', my: 12 }}>
      <NotFoundCharacter />
      <Typography variant='headlineLarge' textAlign={'center'}>
        {message}
      </Typography>
    </CenteredBox>
  );
}
