interface TokenResponse {
  access_token: string;
  expires_in: number;
  token_type: string;
  scope: string;
  error?: string;
  error_description?: string;
  error_uri?: string;
}
interface TokenClientConfig {
  client_id: string;
  scope: string;
  callback?: (response: TokenResponse) => void;
}

interface TokenClient {
  initTokenClient: (config: TokenClientConfig) => TokenClient;
  requestAccessToken: () => void;
}

interface GoogleAccounts {
  id: GoogleAccountsId;
  oauth2: TokenClient;
}

interface Google {
  accounts: GoogleAccounts;
}

interface TokenInfo {
  id: string;
  email: string;
  verified_email: boolean;
  name: string;
  given_name: string;
  family_name: string;
  picture: string;
  hd: string;
}

declare const google: Google;
