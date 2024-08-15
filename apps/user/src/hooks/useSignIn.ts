import { useCallback, useEffect, useState } from 'react';

import { signIn } from '@services/auth.service';
import { DialogIconType, useDialogStore } from '@stores/dialog.store';
import useToastStore from '@stores/toast.store';
import { useNavigate } from '@tanstack/react-router';

const GOOGLE_CLIENT_ID = import.meta.env.VITE_OAUTH_CLIENT_ID;

export function useSignIn() {
  const navigate = useNavigate();
  const { closeDialog, openSingleButtonDialog } = useDialogStore();
  const [isGoogleScriptLoaded, setIsGoogleScriptLoaded] = useState(false);
  const [client, setClient] = useState<TokenClient | null>(null);
  const { showToast } = useToastStore();
  const signInWithToken = async (tokenResponse: TokenResponse) => {
    console.log(tokenResponse);
    const { data, access_token, error } = await signIn(
      tokenResponse.access_token,
    );
    console.log(data, access_token, error?.status);

    if (error) {
      if (error?.status === 401) {
        openSingleButtonDialog({
          dialogIconType: DialogIconType.WARNING,
          title: error.title!,
          message: error.message,
          mainButtonText: '확인',
          mainButtonAction: () => {
            navigate({ to: '/' });
            closeDialog();
          },
        });
        return;
      }
      if (access_token) {
        navigate({
          to: `/auth/sign-up`,
          search: {
            access_token: access_token,
          },
        });
      }
    } else {
      showToast({
        message: '포리프 웹사이트에 오신 것을 환영해요!',
        severity: 'success',
      });
      navigate({ to: '/profile' });
    }
  };

  useEffect(() => {
    const onGoogleScriptLoad = () => {
      if (
        typeof google !== 'undefined' &&
        google.accounts &&
        google.accounts.oauth2
      ) {
        setIsGoogleScriptLoaded(true);
        const tokenClient = google.accounts.oauth2.initTokenClient({
          client_id: GOOGLE_CLIENT_ID,
          scope:
            'https://www.googleapis.com/auth/userinfo.profile  https://www.googleapis.com/auth/userinfo.email',
          callback: signInWithToken,
        });
        setClient(tokenClient);
      } else {
        console.error('Google OAuth2 client script is not loaded.');
      }
    };

    if (typeof window.google === 'undefined') {
      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.defer = true;
      script.onload = onGoogleScriptLoad;
      document.head.appendChild(script);
    } else {
      onGoogleScriptLoad();
    }

    // Cleanup function in case the component unmounts before the script is loaded
    return () => {
      const existingScript = document.querySelector(
        'script[src="https://accounts.google.com/gsi/client"]',
      );
      if (existingScript) {
        existingScript.removeEventListener('load', onGoogleScriptLoad);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSignIn = useCallback(async () => {
    if (isGoogleScriptLoaded && client) {
      client.requestAccessToken();
    } else {
      console.error(
        'Google OAuth2 client is not initialized or script is not loaded.',
      );
    }
  }, [isGoogleScriptLoaded, client]);

  return { handleSignIn };
}
