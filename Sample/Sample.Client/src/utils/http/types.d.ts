import {
  Method,
  AxiosError,
  AxiosResponse,
  AxiosRequestConfig,
  AxiosInstance
} from 'axios'

export type RequestMethods = Extract<
  Method,
  'get' | 'post' | 'put' | 'delete' | 'patch' | 'option' | 'head'
>

export interface PureHttpError extends AxiosError {
  isCancelRequest?: boolean
}

export interface PureHttpResponse<T = Result> extends AxiosResponse {
  config: PureHttpRequestConfig
  data: T
}

export interface PureHttpRequestConfig extends AxiosRequestConfig {
  /**
   * @description: Request interception
   */
  requestInterceptors?: (config: PureHttpRequestConfig) => PureHttpRequestConfig

  /**
   * @description: Response interception
   */
  responseInterceptors?: (
    response: PureHttpResponse<any>
  ) => PureHttpResponse<any>

  /**
   * @description: Request interceptor error capture
   */
  requestInterceptorsCatch?: (error: PureHttpError) => void

  /**
   * @description: Response interceptor error capture
   */
  responseInterceptorsCatch?: (
    axiosInstance: AxiosInstance,
    error: PureHttpError
  ) => void
}

export enum Status {
  ERROR = -1,
  SUCCESS = 0,
  FAILURE = 1
}

export interface Result<T = any> {
  status: Status
  message: string
  data?: T | T[]
  pageNum?: number
  pageSize?: number
  total?: number
  accessToken?: string
}

/**
 * @description:  contentType
 */
export enum ContentTypeEnum {
  // json
  JSON = 'application/json;charset=UTF-8',
  // form-data qs
  FORM_URLENCODED = 'application/x-www-form-urlencoded;charset=UTF-8',
  // form-data  upload
  FORM_DATA = 'multipart/form-data;charset=UTF-8'
}

export default class PureHttp {
  request<T>(
    method: RequestMethods,
    url: string,
    param?: AxiosRequestConfig,
    axiosConfig?: PureHttpRequestConfig
  ): Promise<T>
  post<T, P>(
    url: string,
    params?: T,
    config?: PureHttpRequestConfig
  ): Promise<P>
  get<T, P>(url: string, params?: T, config?: PureHttpRequestConfig): Promise<P>
}
