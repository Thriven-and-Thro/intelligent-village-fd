import axios from "axios"
import type { AxiosInstance } from "axios"

import type { CFRequestInterceptors, CFRequestConfig } from "./type"

import { ElLoading, ElMessage } from "element-plus"

const DEAFULT_LOADING = false

class CFRequest {
  instance: AxiosInstance
  interceptors?: CFRequestInterceptors
  showLoading: boolean
  loading?: any

  constructor(config: CFRequestConfig) {
    this.instance = axios.create(config)
    this.interceptors = config.interceptors
    // 保存基本信息
    this.showLoading = config.showLoading ?? DEAFULT_LOADING

    // 实例拦截器
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    )
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    )

    // 全局拦截器
    this.instance.interceptors.request.use(
      (config) => {
        if (this.showLoading) {
          this.loading = ElLoading.service({
            lock: true,
            text: "正在请求...",
            background: "rgba(0,0,0,0.5)"
          })
        }
        return config
      },
      (err) => {
        return err
      }
    )
    this.instance.interceptors.response.use(
      (res) => {
        // 将loading移除
        this.loading?.close()

        const data = res.data

        if (data.returnCode === "-1001") {
          console.log("Error")
          ElMessage.error("未知错误")
        } else {
          return data
        }
      },
      (err) => {
        // 将loading移除
        this.loading?.close()

        if (err.response.status === 404) {
          console.log("Not Found")
        }
        return err
      }
    )
  }

  // 函数需要泛型，默认为any，否则在不指定的情况下是unknown
  request<T = any>(config: CFRequestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      // 1.单个请求对请求config的处理
      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors.requestInterceptor(config as any)
      }

      // 2.判断是否需要显示loading
      if (config.showLoading === false) {
        this.showLoading = config.showLoading
      }

      this.instance
        // 根据request的类型，res的需要
        .request<any, T>(config)
        .then((res) => {
          // 1.单个请求对数据的处理
          if (config.interceptors?.responseInterceptor) {
            // 此处的res需要是一个泛型或者any
            res = config.interceptors.responseInterceptor(res)
          }
          // 2.将showLoading设置true, 这样不会影响下一个请求
          this.showLoading = DEAFULT_LOADING
          this.loading?.close()

          // 3.将结果resolve返回出去
          resolve(res)
        })
        .catch((err) => {
          // 将showLoading设置true, 这样不会影响下一个请求
          this.showLoading = DEAFULT_LOADING
          this.loading?.close()
          reject(err)
          return err
        })
    })
  }

  get<T = any>(config: CFRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: "GET" })
  }

  post<T = any>(config: CFRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: "POST" })
  }

  delete<T = any>(config: CFRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: "DELETE" })
  }

  patch<T = any>(config: CFRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: "PATCH" })
  }
}

export default CFRequest
