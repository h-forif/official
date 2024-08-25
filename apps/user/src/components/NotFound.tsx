import { Typography } from '@mui/material';

import { Button } from '@packages/components/Button';
import { CenteredBox } from '@packages/components/elements/CenteredBox';

import useDeviceSize from '@hooks/useDeviceSize';

export default function NotFoundPage({ onClick }: { onClick?: () => void }) {
  const { isMobile } = useDeviceSize();
  return (
    <CenteredBox
      sx={{
        gap: 2,
        textAlign: 'center',
        maxWidth: '780px',
        margin: 'auto',
        paddingX: 3,
        minHeight: 'calc(100vh - 64px)',
      }}
    >
      <Typography variant={isMobile ? 'titleLarge' : 'displayLarge'}>
        요청하신 페이지를 찾을 수 없거나 오류가 발생했습니다.
      </Typography>
      <Typography variant={isMobile ? 'bodyLarge' : 'titleLarge'}>
        검색했지만 원하는 항목을 찾을 수 없습니다. 곧 추가하겠습니다. 아래
        버튼을 통해 다시 시도해주세요.
      </Typography>
      <a href='/'>
        <Button size='large' variant='outlined' onClick={onClick}>
          메인 화면으로 돌아가기
        </Button>
      </a>
    </CenteredBox>
  );
}
