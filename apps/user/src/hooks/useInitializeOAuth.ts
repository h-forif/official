import { useEffect } from 'react';

import useGoogleOAuthStore from '@store/oauth.store';

const CLIENT_ID = import.meta.env.VITE_OAUTH_CLIENT_ID;

const useInitializeGoogleOAuth = () => {
  const setClient = useGoogleOAuthStore((state) => state.setClient);
  const setOAuthToken = useGoogleOAuthStore((state) => state.setOAuthToken);
  const setTokenRequestCompleted = useGoogleOAuthStore(
    (state) => state.setTokenRequestCompleted,
  );

  useEffect(() => {
    const initClient = () => {
      const googleClient = google.accounts.oauth2.initTokenClient({
        client_id: CLIENT_ID,
        scope: 'https://www.googleapis.com/auth/userinfo.email',
        callback: (res: TokenResponse) => {
          if (res.access_token) {
            setOAuthToken(res.access_token);
          } else {
            console.error('Failed to get access token');
          }
          setTokenRequestCompleted(true);
        },
      });
      setClient(googleClient);
    };

    if (window.google) {
      initClient();
    } else {
      const scriptLoadHandler = () => {
        if (window.google) {
          initClient();
          window.removeEventListener('google-loaded', scriptLoadHandler);
        }
      };
      window.addEventListener('google-loaded', scriptLoadHandler);
    }

    return () => {
      window.removeEventListener('google-loaded', initClient);
    };
  }, [setClient, setOAuthToken, setTokenRequestCompleted]);
};

export const useGoogleOAuthClient = () => {
  return useGoogleOAuthStore((state) => state.client);
};

export default useInitializeGoogleOAuth;
