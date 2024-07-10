import { Typography } from '@mui/material';

import ErrorPerson from '@assets/images/peep-error.svg?react';
import { Button } from '@packages/components/Button';
import { CenteredBox } from '@packages/components/elements/CenteredBox';
import { Link } from '@tanstack/react-router';

export default function ErrorPage() {
  return (
    <CenteredBox
      sx={{
        paddingTop: '128px',
        gap: 2,
        textAlign: 'center',
        maxWidth: '780px',
        margin: 'auto',
        paddingX: 3,
      }}
    >
      <Typography variant='displayLarge' color='text.primary'>
        We lost this page
      </Typography>
      <Typography variant='displaySmall' fontWeight={300} color='text.primary'>
        We searched but couldn't find what you're looking for. Let's find a
        better place for you to go.
      </Typography>
      <Link to='/'>
        <Button variant='contained'>Go Back To Home</Button>
      </Link>
      <ErrorPerson />
    </CenteredBox>
  );
}
