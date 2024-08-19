/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

interface ImportMetaEnv {
  readonly VITE_BASE_URL: string;
  readonly VITE_OAUTH_CLIENT_ID: string;
  readonly VITE_OAUTH_CLIENT_SECRET: string;
  readonly VITE_GOOGLE_CALENDAR_API_KEY: string;
  readonly VITE_GA4_MEASUREMENT_ID: string;
  readonly VITE_CHANNELTALK_PLUGIN_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
