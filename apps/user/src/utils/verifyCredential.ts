import { AUTH_CONSTANT } from '@constants/auth.constant';
import { createRemoteJWKSet, jwtVerify } from 'jose';

export const verifyGoogleCredential = async (credential: string) => {
  const CLIENT_ID = import.meta.env.VITE_OAUTH_CLIENT_ID;
  const JWKS_URL = 'https://www.googleapis.com/oauth2/v3/certs';
  const JWKS = createRemoteJWKSet(new URL(JWKS_URL));

  const { payload } = await jwtVerify(credential, JWKS, {
    issuer: 'https://accounts.google.com',
    algorithms: ['RS256'],
    typ: 'JWT',
    audience: CLIENT_ID,
  });

  const { hd } = payload;
  if (hd !== AUTH_CONSTANT.EMAIL_DOMAIN) throw new Error('Not Allowed');
  return payload;
};
