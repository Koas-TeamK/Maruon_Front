// src/shared/types/api.types.ts

import { AxiosError } from 'axios';

// API 성공 응답 구조
export interface ApiResponse<T> {
  data: T;
  message?: string;
  status?: number;
}

// API 오류 응답 구조
export interface ApiErrorResponse {
  message: string;
  status?: number;
  code?: string;
  errors?: Record<string, string[]>;
}

// 페이지네이션 메타데이터
export interface PaginationMeta {
  page: number;
  size: number;
  totalPages: number;
  totalElements: number;
}

// 페이지네이션된 응답 구조
export interface PaginatedResponse<T> {
  content: T[];
  page: number;
  size: number;
  totalPages: number;
  totalElements: number;
}

// AxiosError 타입 가드
export function isAxiosError(error: unknown): error is AxiosError<ApiErrorResponse> {
  return (error as AxiosError).isAxiosError === true;
}

// 오류 메시지 추출 유틸리티
export function extractErrorMessage(error: unknown): string {
  if (isAxiosError(error)) {
    return error.response?.data?.message 
      ?? error.message 
      ?? '알 수 없는 오류가 발생했습니다.';
  }
  
  if (error instanceof Error) {
    return error.message;
  }
  
  return '알 수 없는 오류가 발생했습니다.';
}