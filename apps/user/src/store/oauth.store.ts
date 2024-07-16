import { create } from 'zustand';

interface GoogleOAuthStore {
  client: TokenClient | null;
  oauthToken: string | null;
  isTokenRequestCompleted: boolean;
}

interface GoogleOAuthAction {
  setOAuthToken: (token: string) => void;
  setClient: (client: TokenClient) => void;
  setTokenRequestCompleted: (completed: boolean) => void;
}

const useGoogleOAuthStore = create<GoogleOAuthStore & GoogleOAuthAction>(
  (set) => ({
    client: null,
    oauthToken: null,
    isTokenRequestCompleted: false,
    setClient: (client) => set({ client }),
    setTokenRequestCompleted: (completed) =>
      set({ isTokenRequestCompleted: completed }),
    setOAuthToken: (token) => set({ oauthToken: token }),
  }),
);

export function useOAuthToken() {
  return useGoogleOAuthStore((state) => state.oauthToken);
}

export default useGoogleOAuthStore;
