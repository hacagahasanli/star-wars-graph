import axios, {
  type AxiosError,
  type AxiosInstance,
  type AxiosResponse,
} from "axios";

import MockAdapter from "axios-mock-adapter";

import HttpMethods from "~/resources/constants/HttpMethods";
import BaseApiVersions from "~/resources/constants/BaseApiVersions";

import MockAdapterMethods from "./BaseService.consts";

import type {
  RequestParams,
  BaseServiceOptions,
  BackendErrorResponse,
} from "./BaseService.types";

const API_BASE_URL = import.meta.env.REACT_APP_BASE_URL;

class BaseService {
  protected api: AxiosInstance;

  private useMock: boolean;
  private defaultMockDelay: number;
  private mockAdapter?: MockAdapter;
  private baseVersion: BaseApiVersions;

  constructor({
    baseURL = API_BASE_URL,
    defaultMockDelay = 1500,
    version = BaseApiVersions.V1,
    useMock = import.meta.env.VITE_ENABLE_MOCKS === "true",
  }: BaseServiceOptions = {}) {
    this.useMock = useMock;
    this.baseVersion = version;
    this.defaultMockDelay = defaultMockDelay;

    // Main API axios instance
    this.api = axios.create({ baseURL });

    // Setup mock adapter if mocking enabled
    if (useMock) {
      this.mockAdapter = new MockAdapter(this.api, {
        delayResponse: this.defaultMockDelay,
      });
    }

    this.setupInterceptors();
  }

  private setupInterceptors() {
    // Add access token from cookies to Authorization header
    // ....

    // Handle response errors (e.g. 401 to refresh token)
    this.api.interceptors.response.use(
      (response) => response,
      async (error) => {
        // If 401 unauthorized & not retrying & not on login page
        // .....

        return Promise.reject(error);
      }
    );
  }

  private getEndpoint(endpoint: string, prefix: string = "api"): string {
    return `/${prefix || this.baseVersion}/${endpoint}`;
  }

  private registerMock<T>(
    method: HttpMethods,
    fullEndpoint: string,
    response: T,
    status = 200
  ) {
    if (!this.mockAdapter) return;

    const methodName = MockAdapterMethods[method];
    // eslint-disable-next-line
    const handler = (this.mockAdapter as any)[methodName]?.bind(
      this.mockAdapter
    );

    if (handler) handler(fullEndpoint).reply(status, response);
  }

  private async executeRequest<T>(
    method: HttpMethods,
    params: RequestParams<T>,
    requestFn: (endpoint: string) => Promise<AxiosResponse<T>>
  ): Promise<T> {
    const { status, endpoint, mockData, shouldIncludeHeaders = false } = params;
    const fullEndpoint = this.getEndpoint(endpoint);


    // Register mock if enabled
    if (this.useMock) {
      this.registerMock(method, fullEndpoint, mockData, status);
    }

    try {
      const response = await requestFn(fullEndpoint);
      const { data, headers } = response;

      if (shouldIncludeHeaders) {
        return { ...data, headers };
      }

      return data;
    } catch (err: unknown) {
      const error = (err as AxiosError<BackendErrorResponse>) || {};

      if (error.response?.data) {
        throw error.response.data;
      } else {
        throw {
          method,
          errors: [],
          path: fullEndpoint,
          message: error.message,
          code: error.code || "UNKNOWN_ERROR",
          timestamp: new Date().toISOString(),
          status: error.response?.status || 500,
        };
      }
    }
  }

  protected async get<T>(params: RequestParams<T>): Promise<T> {
    const { params: queryParams, config } = params;
    return this.executeRequest<T>(HttpMethods.GET, params, (endpoint: string) =>
      this.api.get<T>(endpoint, { params: queryParams, ...config })
    );
  }

  protected async post<T>(params: RequestParams<T>): Promise<T> {
    const { params: queryParams, config, data } = params;
    return this.executeRequest<T>(
      HttpMethods.POST,
      params,
      (endpoint: string) =>
        this.api.post<T>(endpoint, data, { params: queryParams, ...config })
    );
  }

  protected async put<T>(params: RequestParams<T>): Promise<T> {
    const { params: queryParams, config, data } = params;
    return this.executeRequest<T>(HttpMethods.PUT, params, (endpoint: string) =>
      this.api.put<T>(endpoint, data, { params: queryParams, ...config })
    );
  }

  protected async patch<T>(params: RequestParams<T>): Promise<T> {
    const { params: queryParams, config, data } = params;
    return this.executeRequest<T>(
      HttpMethods.PATCH,
      params,
      (endpoint: string) =>
        this.api.patch<T>(endpoint, data, { params: queryParams, ...config })
    );
  }

  protected async delete<T>(params: RequestParams<T>): Promise<T> {
    const { params: queryParams, config, data } = params;
    return this.executeRequest<T>(
      HttpMethods.DELETE,
      params,
      (endpoint: string) =>
        this.api.delete<T>(endpoint, { params: queryParams, data, ...config })
    );
  }
}

export default BaseService;
