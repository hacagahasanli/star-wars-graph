import type { ApiErrorDetail } from "./ApiErrorDetail";

interface ApiResponse<T> {
  data: T;
  code?: number;
  status?: number;
  message?: string;
  timestamp?: string;
  errors?: ApiErrorDetail[];
}

export type { ApiResponse };
