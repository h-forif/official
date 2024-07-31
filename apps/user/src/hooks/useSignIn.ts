import { useCallback } from 'react';

import { signIn } from '@services/auth.service';
import { useNavigate } from '@tanstack/react-router';
import { handleGlobalError } from '@utils/handleGlobalError';

const GOOGLE_CLIENT_ID = import.meta.env.VITE_OAUTH_CLIENT_ID;

export function useSignIn() {
  const navigate = useNavigate();

  const signInWithToken = async (tokenResponse: TokenResponse) => {
    try {
      await signIn(tokenResponse.access_token);
      navigate({ to: '/profile' });
    } catch (err) {
      if (err === 'UserNotFound') {
        navigate({ to: '/auth/sign-up' });
      }
      handleGlobalError(err);
    }
  };

  const client = google.accounts.oauth2.initTokenClient({
    client_id: GOOGLE_CLIENT_ID,
    scope: 'https://www.googleapis.com/auth/userinfo.email',
    callback: signInWithToken,
  });

  const handleSignIn = useCallback(async () => {
    if (client) {
      client.requestAccessToken();
    } else {
      console.error('Google OAuth2 client is not initialized.');
    }
  }, [client]);

  return { handleSignIn };
}
