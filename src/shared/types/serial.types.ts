// src/shared/types/serial.types.ts

// QR 파라미터
export interface QrParams {
  name: string;
  serial: string;
  token: string;
}

// 시리얼 데이터
export interface SerialData {
  serial: string;
  itemName: string;
  message: string;
  createdDate: string;
}

// QR 체크 응답 데이터
export interface QrCheckResponse {
  serial: string;
  itemName: string;
  message: string;
  createdDate: string;
}