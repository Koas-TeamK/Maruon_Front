// src/stores/useNewsStore.ts
import { create } from 'zustand';
import { api } from '@/shared/lib/api';
import { 
  type NewsSummary, 
  type NewsSummaryItem,
  type NewsDetail, 
  type NewsApiResponse,
  type RawNewsItem,
  normalizeNewsItem,
  extractErrorMessage 
} from '@/shared/types';

// ===== Store 전용 타입 =====
type DetailEntry = {
  loading: boolean;
  data: NewsDetail | null;
  error: string | null;
  lastFetchedAt: number | null;
};

type NewsState = {
  // Summary 상태
  summaryLoading: boolean;
  summary: NewsSummary | null;
  summaryError: string | null;
  summaryLastFetchedAt: number | null;
  
  // Details 상태 (ID별 캐싱)
  detailsById: Record<number, DetailEntry>;
  
  // 액션
  fetchSummary: () => Promise<void>;
  fetchDetail: (id: number) => Promise<void>;
  clearAll: () => void;
  getDetail: (id: number) => DetailEntry;
};

// ===== 스토어 =====
export const useNewsStore = create<NewsState>((set, get) => ({
  // 초기 상태
  summaryLoading: false,
  summary: null,
  summaryError: null,
  summaryLastFetchedAt: null,
  detailsById: {},
  
  // 요약 가져오기
  fetchSummary: async () => {
    set({ summaryLoading: true, summaryError: null });
    
    try {
      const res = await api.get<NewsApiResponse>('/api/news/summary');
      
      // 데이터 정규화
      const raw: RawNewsItem[] = Array.isArray(res.data)
        ? res.data
        : Array.isArray(res.data?.content)
        ? res.data.content
        : res.data?.data ?? [];
      
      const list: NewsSummary = raw.map(normalizeNewsItem);
      
      set({
        summaryLoading: false,
        summary: list,
        summaryLastFetchedAt: Date.now(),
      });
    } catch (err) {
      const message = extractErrorMessage(err);
      set({ summaryLoading: false, summaryError: message });
    }
  },
  
  // 상세 가져오기
  fetchDetail: async (id: number) => {
    // 현재 해당 ID의 상태 업데이트
    set((state) => ({
      detailsById: {
        ...state.detailsById,
        [id]: {
          ...(state.detailsById[id] || {}),
          loading: true,
          error: null,
        },
      },
    }));
    
    try {
      const res = await api.get<NewsDetail>(`/api/news/${id}`);
      
      set((state) => ({
        detailsById: {
          ...state.detailsById,
          [id]: {
            loading: false,
            data: res.data,
            error: null,
            lastFetchedAt: Date.now(),
          },
        },
      }));
    } catch (err) {
      const message = extractErrorMessage(err);
      
      set((state) => ({
        detailsById: {
          ...state.detailsById,
          [id]: {
            ...(state.detailsById[id] || {}),
            loading: false,
            error: message,
          },
        },
      }));
    }
  },
  
  // 전체 초기화
  clearAll: () => set({
    summaryLoading: false,
    summary: null,
    summaryError: null,
    summaryLastFetchedAt: null,
    detailsById: {},
  }),
  
  // Selector 헬퍼 
  getDetail: (id: number) => {
    const state = get();
    return state.detailsById[id] ?? {
      loading: false,
      data: null,
      error: null,
      lastFetchedAt: null,
    };
  },
}));

// Re-export 타입 (기존 컴포넌트 호환성)
export type { NewsSummary, NewsSummaryItem, NewsDetail };