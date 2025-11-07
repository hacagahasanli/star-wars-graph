import { type AxiosRequestConfig } from "axios";

import type { ApiErrorDetail } from "~/shared/types/ApiErrorDetail";

import type BaseApiVersions from "~/resources/constants/BaseApiVersions";

export type RequestParams<T> = {
  mockData?: T;
  data?: unknown;
  status?: number;
  endpoint: string;
  mockDelay?: number;
  version?: BaseApiVersions;
  config?: AxiosRequestConfig;
  params?: Record<string, unknown>;
} & { shouldIncludeHeaders?: boolean };

export type BackendErrorResponse = {
  code?: number;
  status?: number;
  message?: string;
  timestamp?: string;
  errors?: ApiErrorDetail[];
};

export type BaseServiceOptions = {
  baseURL?: string;
  useMock?: boolean;
  version?: BaseApiVersions;
  defaultMockDelay?: number;
};
