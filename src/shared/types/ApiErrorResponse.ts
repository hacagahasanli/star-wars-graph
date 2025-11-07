import type HttpMethods from "~/resources/constants/HttpMethods";
import type { ApiErrorDetail } from "./ApiErrorDetail";

interface ApiErrorResponse {
  path: string;
  code: string;
  status: number;
  message: string;
  timestamp: string;
  errors: ApiErrorDetail[];
  method: HttpMethods | string;
}

export type { ApiErrorResponse };
