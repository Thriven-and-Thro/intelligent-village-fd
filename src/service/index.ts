import CFRequest from "./request"
import { BASE_URL, TIME_OUT } from "./request/config"
import localCache from "@/utils/cache"

const cfRequest = new CFRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  headers: { "Content-Type": "application/json", Accept: "*/*" },
  interceptors: {
    requestInterceptor: (config: any) => {
      // 携带token
      const token = localCache.getCache("token")

      if (token) {
        // 设置token
        config.headers.Authorization = `Bearer ${token}`
      }

      return config
    },
    requestInterceptorCatch: (err: any) => {
      return err
    },
    responseInterceptor: (res: any) => {
      return res
    },
    responseInterceptorCatch: (err: any) => {
      return err
    }
  }
})

export default cfRequest
