import { verifyGoogleCredential } from '@utils/verifyCredential';

const handleSignIn = async ({ credential }: GoogleSignInResponse) => {
  try {
    const payload = await verifyGoogleCredential(credential);
    return payload;
  } catch (error) {
    console.error(error);
  }
};

export { handleSignIn };
