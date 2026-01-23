# / <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string;
  readonly VITE_PURCHASE_URL: string;
  readonly VITE_NEWS_URL: string;
  readonly VITE_SNS_WECHAT: string;
  readonly VITE_SNS_LINE: string;
  readonly VITE_SNS_LINKEDIN: string;
  readonly VITE_SNS_FACEBOOK: string;
  readonly VITE_ASSET_BASE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
