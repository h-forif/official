import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type TokenStore = {
  accessToken: string | null;
  refreshToken: string | null;
};

type TokenAction = {
  setAccessToken: (token: TokenStore['accessToken']) => void;
  setRefreshToken: (token: TokenStore['refreshToken']) => void;
  clearTokens: () => void;
};

const useRefreshTokenStore = create(
  persist<
    Partial<TokenStore> & {
      setRefreshToken: (token: TokenStore['refreshToken']) => void;
    }
  >(
    (set) => ({
      refreshToken: null,
      setRefreshToken: (token) => set({ refreshToken: token }),
    }),
    {
      name: 'refreshToken',
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);

const useAccessTokenStore = create<
  Partial<TokenStore> & {
    setAccessToken: (token: TokenStore['accessToken']) => void;
    clearTokens: () => void;
  }
>((set) => ({
  accessToken: null,
  setAccessToken: (token) => set({ accessToken: token }),
  clearTokens: () => {
    useRefreshTokenStore.getState().setRefreshToken(null);
    set({ accessToken: null });
  },
}));

const useTokenStore = create<TokenAction>((set) => ({
  setAccessToken: (token) => {
    useAccessTokenStore.getState().setAccessToken(token);
  },
  setRefreshToken: (token) => {
    useRefreshTokenStore.getState().setRefreshToken(token);
  },
  clearTokens: () => {
    useAccessTokenStore.getState().clearTokens();
  },
}));

export const useSetRefreshToken = (token: string | null) => {
  useRefreshTokenStore.getState().setRefreshToken(token);
};

export const useRefreshToken = () => {
  return useRefreshTokenStore((state) => state.refreshToken);
};

export const useSetAccessToken = (token: string | null) => {
  useAccessTokenStore.getState().setAccessToken(token);
};

export const useAccessToken = () => {
  return useAccessTokenStore((state) => state.accessToken);
};

export default useTokenStore;
