const CLIENT_ID = import.meta.env.VITE_OAUTH_CLIENT_ID;
const CLIENT_SECRET = import.meta.env.VITE_OAUTH_CLIENT_SECRET;
const REDIRECT_URLS = [
  'http://localhost:3000/api/auth/callback/google',
  'https://forif.org/api/auth/callback/google',
  'https://www.forif.org/api/auth/callback/google',
  'http://localhost:5173/api/auth/callback/google',
  'http://localhost/api/auth/callback/google',
];
const scopes = [
  'https://www.googleapis.com/auth/userinfo.email',
  'https://www.googleapis.com/auth/userinfo.profile',
];

const signIn = async () => {
  const oauth2Client = new google.auth.OAuth2({
    clientId: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    redirectUri: REDIRECT_URLS[0],
  });
  console.log(oauth2Client);
};

export { signIn };
