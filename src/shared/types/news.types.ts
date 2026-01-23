// src/shared/types/news.types.ts

// 뉴스 요약 아이템
export interface NewsSummaryItem {
  id: number;
  thumbnailUrl: string | null;
  title: string;
  date: string;
  link: string;
}

// 뉴스 요약 리스트
export type NewsSummary = NewsSummaryItem[];

// 뉴스 상세 정보
export interface NewsDetail {
  id: number;
  number: number;
  title: string;
  content: string;
  date: string;
  imgUrl: string[];
}

// 원시 뉴스 아이템 (API 응답용)
export interface RawNewsItem {
  id?: number;
  newsId?: number;
  number?: number;
  title?: string;
  date?: string;
  link?: string;
  thumbnailUrl?: string | null;
  imgUrl?: string[];
}

// 뉴스 API 응답 구조
export interface NewsApiResponse {
  content?: RawNewsItem[];
  data?: RawNewsItem[];
  page?: number;
  size?: number;
  totalPages?: number;
  totalElements?: number;
}

// 뉴스 아이템 정규화 함수
export function normalizeNewsItem(raw: RawNewsItem): NewsSummaryItem {
  return {
    id: Number(raw.id ?? raw.newsId ?? raw.number ?? 0),
    title: String(raw.title ?? ''),
    date: String(raw.date ?? ''),
    link: String(raw.link ?? ''),
    thumbnailUrl: raw.thumbnailUrl 
      ?? (Array.isArray(raw.imgUrl) && raw.imgUrl.length > 0 
        ? raw.imgUrl[0] 
        : null),
  };
}