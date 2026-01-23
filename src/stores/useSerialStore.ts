// src/stores/useSerialStore.ts
import { create } from 'zustand';
import { api } from '@/shared/lib/api';
import { 
  type QrParams, 
  type SerialData, 
  type QrCheckResponse,
  extractErrorMessage  
} from  '@/shared/types';

type SerialState = {
  // 상태
  loading: boolean;
  data: SerialData | null;
  error: string | null;
  
  // 액션
  checkQr: (params: QrParams) => Promise<void>;
  reset: () => void;
};

// ===== 스토어 =====
export const useSerialStore = create<SerialState>((set) => ({
  // 초기 상태
  loading: false,
  data: null,
  error: null,
  
  // QR 체크
  checkQr: async (params) => {
    set({ loading: true, error: null });
    
    try {
      const { data } = await api.get<QrCheckResponse>('/api/qr/check', {
        params,
        withCredentials: true,
        headers: { Accept: 'application/json' },
      });
      
      set({ loading: false, data, error: null });
    } catch (err) {
      const message = extractErrorMessage(err);
      set({ loading: false, error: message });
    }
  },
  
  // 초기화
  reset: () => set({ loading: false, data: null, error: null }),
}));

// Re-export 타입
export type { SerialData, QrParams };