/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

interface ImportMetaEnv {
  readonly VITE_BASE_URL: string;
  readonly VITE_OAUTH_CLIENT_ID: string;
  readonly VITE_OAUTH_CLIENT_SECRET: string;
  readonly VITE_GOOGLE_CALENDAR_API_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
