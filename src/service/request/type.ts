import type {
  AxiosInterceptorManager,
  AxiosInterceptorOptions,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig
} from "axios"

export interface CFRequestInterceptors<T = AxiosResponse> {
  // 传入拦截器，用于实例请求拦截
  requestInterceptor?: (
    value: InternalAxiosRequestConfig<any>
  ) => InternalAxiosRequestConfig<any>
  requestInterceptorCatch?: (error: any) => any
  // 如果接口中的函数需要使用泛型，需要在接口定义泛型，之后在函数中使用
  responseInterceptor?: (res: T) => T
  responseInterceptorCatch?: (error: any) => any
}

export interface CFRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  // 传入拦截器，用于单一请求拦截
  interceptors?: CFRequestInterceptors<T>
  showLoading?: boolean
}
