import Axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
import qs from 'qs'
import { loadEnv } from '@build/index'
import NProgress from '../progress'
import {
  PureHttpError,
  RequestMethods,
  PureHttpResponse,
  PureHttpRequestConfig,
  Result,
  ContentTypeEnum
} from './types.d'
import { isFunction } from '@/utils/is'
import { checkStatus } from './checkStatus'

import { useLoginAccountStoreWithOut } from '@/store/modules/login'

const { VITE_PROXY_DOMAIN, VITE_PROXY_DOMAIN_REAL, VITE_USE_MOCK } = loadEnv()

const baseURL = VITE_USE_MOCK
  ? ''
  : process.env.NODE_ENV === 'production'
  ? VITE_PROXY_DOMAIN_REAL
  : VITE_PROXY_DOMAIN

const defaultConfig: AxiosRequestConfig = {
  baseURL,
  timeout: 1000000,
  headers: {
    Accept: 'application/json, text/plain, */*',
    'Content-Type': ContentTypeEnum.JSON,
    'X-Requested-With': 'XMLHttpRequest'
  },
  withCredentials: true,
  // Array format parameter serialization
  paramsSerializer: params => qs.stringify(params, { indices: false })
}
class PureHttp {
  constructor() {
    this.httpInterceptorsRequest()
    this.httpInterceptorsResponse()
  }
  // Initialize the configuration object
  private static initConfig: PureHttpRequestConfig = {
    requestInterceptors: config => {
      // Enable progress bar animation
      NProgress.start()
      const loginStore = useLoginAccountStoreWithOut()
      const token = loginStore.getToken
      if (
        token &&
        loginStore.checkExpireTime &&
        !(config as Recordable).headers.Authorization
      ) {
        // jwt token
        ;(config as Recordable).headers.Authorization = token
      }
      return config
    },

    requestInterceptorsCatch: error => {
      return Promise.reject(error)
    },

    responseInterceptors: res => {
      // Turn off the progress bar animation
      NProgress.done()

      return res
    },

    responseInterceptorsCatch: (axiosInstance, error) => {
      const $error = error
      $error.isCancelRequest = Axios.isCancel($error)
      // Turn off the progress bar animation
      NProgress.done()

      checkStatus($error)

      return Promise.reject($error)
    }
  }

  /**
   * @description Save the current Axios instance object
   */
  private static axiosInstance: AxiosInstance = Axios.create(defaultConfig)

  // Request interception
  private httpInterceptorsRequest(): void {
    // Request interceptor configuration processing
    PureHttp.axiosInstance.interceptors.request.use(
      (config: PureHttpRequestConfig) => {
        let $config = config
        // Priority is given to judging whether methods such as post/get are passed in a callback, otherwise, callbacks such as initialization settings are executed
        if (
          PureHttp.initConfig.requestInterceptors &&
          isFunction(PureHttp.initConfig.requestInterceptors)
        ) {
          $config = PureHttp.initConfig.requestInterceptors($config)
        }
        return $config
      },
      undefined
    )

    // Request interceptor error capture
    if (
      PureHttp.initConfig.requestInterceptorsCatch &&
      isFunction(PureHttp.initConfig.requestInterceptorsCatch)
    ) {
      PureHttp.axiosInstance.interceptors.request.use(
        undefined,
        PureHttp.initConfig.requestInterceptorsCatch
      )
    }
  }

  // Response interception
  private httpInterceptorsResponse(): void {
    // Response result interceptor processing
    PureHttp.axiosInstance.interceptors.response.use(
      (response: PureHttpResponse) => {
        // Priority is given to judging whether methods such as post/get are passed in a callback, otherwise, callbacks such as initialization settings are executed
        if (
          PureHttp.initConfig.responseInterceptors &&
          isFunction(PureHttp.initConfig.responseInterceptors)
        ) {
          response = PureHttp.initConfig.responseInterceptors(response)
        }

        return response.data
      },
      undefined
    )

    // Response interceptor error capture
    if (
      PureHttp.initConfig.responseInterceptorsCatch &&
      isFunction(PureHttp.initConfig.responseInterceptorsCatch)
    ) {
      PureHttp.axiosInstance.interceptors.response.use(
        undefined,
        (error: PureHttpError) => {
          // @ts-ignore
          return PureHttp.initConfig.responseInterceptorsCatch(
            PureHttp.axiosInstance,
            error
          )
        }
      )
    }
  }

  // Common Request Facility Functions
  public request<T = any>(
    method: RequestMethods,
    url: string,
    param?: AxiosRequestConfig,
    axiosConfig?: PureHttpRequestConfig
  ): Promise<Result<T>> {
    const config = {
      method,
      url,
      ...param,
      ...axiosConfig
    } as PureHttpRequestConfig

    // Handling custom request/response callbacks individually
    return new Promise((resolve, reject) => {
      PureHttp.axiosInstance
        .request<any, PureHttpResponse>(config)
        .then((response: PureHttpResponse) => {
          resolve(response as unknown as Promise<Result<T>>)
        })
        .catch(error => {
          reject(error)
        })
    })
  }

  // Separately extracted post tool function
  public post<T = any>(
    url: string,
    params?: any,
    config?: PureHttpRequestConfig
  ): Promise<Result<T>> {
    return this.request<T>('post', url, params, config)
  }

  // Separately extracted get utility function
  public get<T = any>(
    url: string,
    params?: any,
    config?: PureHttpRequestConfig
  ): Promise<Result<T>> {
    return this.request<T>('get', url, params, config)
  }
}

export const http = new PureHttp()
