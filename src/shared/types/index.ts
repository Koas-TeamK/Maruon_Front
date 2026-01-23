// src/shared/types/index.ts

// API 관련 타입
export type {
  ApiResponse,
  ApiErrorResponse,
  PaginationMeta,
  PaginatedResponse,
} from './api.types';

export {
  isAxiosError,
  extractErrorMessage,
} from './api.types';

// 뉴스 관련 타입
export type {
  NewsSummaryItem,
  NewsSummary,
  NewsDetail,
  RawNewsItem,
  NewsApiResponse,
} from './news.types';

export {
  normalizeNewsItem,
} from './news.types';

// 시리얼/QR 관련 타입
export type {
  QrParams,
  SerialData,
  QrCheckResponse,
} from './serial.types';