import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type TokenStore = {
  accessToken: string | null;
  refreshToken: string | null;
};

export const refreshTokenStore = create(
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
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export const accessTokenStore = create<
  Partial<TokenStore> & {
    setAccessToken: (token: TokenStore['accessToken']) => void;
    clearTokens: () => void;
  }
>((set) => ({
  accessToken: null,
  setAccessToken: (token) => set({ accessToken: token }),
  clearTokens: () => {
    refreshTokenStore.getState().setRefreshToken(null);
    set({ accessToken: null });
  },
}));

export const setRefreshToken = (token: string | null) => {
  refreshTokenStore.getState().setRefreshToken(token);
};

export const useRefreshToken = () => {
  return refreshTokenStore((state) => state.refreshToken);
};

export const setAccessToken = (token: string | null) => {
  accessTokenStore.getState().setAccessToken(token);
};

export const useAccessToken = () => {
  return accessTokenStore((state) => state.accessToken);
};
