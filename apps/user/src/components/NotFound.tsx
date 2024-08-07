import ErrorPeeps from '@assets/images/avatar/peep-error.svg?react';
import { Button } from '@packages/components/Button';
import { CenteredBox } from '@packages/components/elements/CenteredBox';

export default function NotFoundPage({ onClick }: { onClick?: () => void }) {
  return (
    <CenteredBox
      sx={{
        paddingTop: '68px',
        gap: 2,
        textAlign: 'center',
        maxWidth: '780px',
        margin: 'auto',
        paddingX: 3,
      }}
    >
      <h1
        style={{
          fontSize: '57pt',
          lineHeight: '64pt',
          letterSpacing: '-0.25pt',
          margin: 0,
        }}
      >
        요청하신 페이지를 찾을 수 없거나 오류가 발생했습니다.
      </h1>
      <h2
        style={{
          fontSize: '36pt',
          lineHeight: '44pt',
          fontWeight: 500,
        }}
      >
        검색했지만 원하는 항목을 찾을 수 없습니다. 아래 버튼을 통해 다시
        시도해주세요.
      </h2>
      <a href='/'>
        <Button size='large' variant='outlined' onClick={onClick}>
          메인 화면으로 돌아가기
        </Button>
      </a>
      <ErrorPeeps />
    </CenteredBox>
  );
}
