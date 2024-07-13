import axios from 'axios';

const verifyAccessToken = async (accessToken: string) => {
  const response = await axios.get<TokenInfo>(
    'https://www.googleapis.com/oauth2/v3/tokeninfo',
    {
      params: {
        access_token: accessToken,
      },
    },
  );
  return response;
};

export { verifyAccessToken };
