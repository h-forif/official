import { Stack, Typography } from '@mui/material';

import { CenteredBox } from '@packages/components/elements/CenteredBox';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: Home,
});

const GOOGLE_CLIENT_ID = import.meta.env.VITE_OAUTH_CLIENT_ID;

function Home() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const tokenClient = google.accounts.oauth2.initTokenClient({
    client_id: GOOGLE_CLIENT_ID,
    scope: 'https://www.googleapis.com/auth/userinfo.email',
    callback: (data) => console.log(data),
  });

  return (
    <Stack direction={'row'}>
      <Stack
        width={'50%'}
        height={'100vh'}
        sx={{
          backgroundColor: 'primary.main',
        }}
      />
      <CenteredBox p={5} textAlign={'center'} flexGrow={1}>
        <Stack gap={2}>
          <Typography variant={'displaySmall'}>
            Welcome to the Admin Page
          </Typography>
          <Typography variant={'bodyMedium'}>
            This is the admin page for the Study With Us platform. Please login
            to access the admin features.
          </Typography>
          <div
            id='g_id_onload'
            data-client_id='YOUR_GOOGLE_CLIENT_ID'
            data-login_uri='https://your.domain/your_login_endpoint'
            data-auto_prompt='false'
          ></div>
          <div
            className='g_id_signin'
            data-type='standard'
            data-size='large'
            data-theme='outline'
            data-text='sign_in_with'
            data-shape='rectangular'
            data-logo_alignment='left'
          ></div>
        </Stack>
      </CenteredBox>
    </Stack>
  );
}
