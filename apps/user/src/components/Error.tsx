import ErrorPerson from '@assets/images/peep-error.svg?react';
import { Button } from '@packages/components/Button';
import { CenteredBox } from '@packages/components/elements/CenteredBox';

export default function ErrorPage({ onClick }: { onClick?: () => void }) {
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
        We lost this page
      </h1>
      <h2
        style={{
          fontSize: '36pt',
          lineHeight: '44pt',
          fontWeight: 500,
        }}
      >
        We searched but couldn't find what you're looking for. Let's find a
        better place for you to go.
      </h2>
      <a href='/'>
        <Button size='large' variant='outlined' onClick={onClick}>
          Go Back To Home
        </Button>
      </a>
      <ErrorPerson />
    </CenteredBox>
  );
}
