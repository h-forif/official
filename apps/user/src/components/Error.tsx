import { Typography } from '@mui/material';
import { styled } from '@mui/system';

import { Button } from '@packages/components/Button';
import { CenteredBox } from '@packages/components/elements/CenteredBox';
import { Link } from '@tanstack/react-router';

import ErrorPerson from '../assets/images/peep-error.svg?react';

export default function ErrorPage() {
  return (
    <ErrorContainer>
      <Typography variant='displayLarge' color='text.primary'>
        We lost this page
      </Typography>
      <Typography variant='headlineLarge' fontWeight={300} color='text.primary'>
        We searched but couldn't find what you're looking for. Let's find a
        better place for you to go.
      </Typography>
      <Link to='/'>
        <Button variant='contained'>Go Back To Home</Button>
      </Link>
      <ErrorPerson />
    </ErrorContainer>
  );
}

const ErrorContainer = styled(CenteredBox)({
  marginTop: '128px',
  height: '100vh',
  gap: '24px',
  textAlign: 'center',
});
