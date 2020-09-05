import axios, {
  AxiosRequestConfig,
  AxiosInstance,
  AxiosResponse,
  AxiosError
} from 'axios'

import { T } from 'react-toast-mobile'
import { debounce } from 'lodash-es'

export interface IRequest {
  getInstance(): AxiosInstance
}

const STATUS: any = {
  SUCCESS: 200,
  CREATED: 201,
  ACCEPTED: 202,
  CLIENT_ERROR: 400,
  AUTHENTICATE: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  SERVER_ERROR: 500,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
  GATEWAY_TIMEOUT: 504,
  TIMESTAMP_ERROR: 5001, // 提交的时间戳不在半个小时范围内
  SIGNED_ERROR: 5002,  // sign验证不通过
  WECHAT_LOGINED_SOMEWHERE: 5003,  // 微信用户在其他手机登录
  YPUID_BINDED_SOMEWHERE: 5004    // 悦跑ID在其他微信上绑定
}

// default options
axios.defaults.headers.post['Content-Type'] = 'application/json'
// 开发模式，头部带上 cookie
if (process.env.NODE_ENV === 'development') {
  axios.defaults.withCredentials = true
}

// loading对象
let loading: any = null

// 当前正在请求的数量
let needLoadingRequestCount = 0

// 防抖：将 300ms 间隔内的关闭 loading 便合并为一次。防止连续请求时， loading闪烁的问题。
let toHideLoading = debounce(() => {
  T.loaded()
  loading = null
}, 300)

function showLoading() {
  // 因为关闭时加了抖动，此时loading对象可能还存在，
  // 但needLoadingRequestCount已经变成0.避免这种情况下会重新创建个loading
  if (needLoadingRequestCount === 0 && !loading) {
    loading = T.loading()
  }
  needLoadingRequestCount++
}

function hideLoading() {
  needLoadingRequestCount--
  // 防止减到负数
  needLoadingRequestCount = Math.max(needLoadingRequestCount, 0)
  if (needLoadingRequestCount === 0) {
    // 关闭loading
    toHideLoading()
  }
}

export default class Request implements IRequest {
  private api: AxiosInstance | any = null

  private created(config: AxiosRequestConfig): void {
    this.api = axios.create(config)
  }

  private handleInterceptors() {
    this.api.interceptors.request.use((config) => {
      if (!config.hideLoading) {
        showLoading()
      }
      return config
    }, (err: AxiosError) => {
      return Promise.reject(err)
    })

    this.api.interceptors.response.use(async (res: AxiosResponse) => {
      hideLoading()

      let statusCode = res.status

      if (statusCode === STATUS.SUCCESS) {
        let result = res.data

        if (res.data.ret != null && Number(res.data.ret) !== 0) {
          res.data.msg && T.notify(res.data.msg)
          return Promise.reject(res.data.msg)
        } else if (result.data || result.html || result.address || result.msg) {
          // 有数据则返回
          return result
        }

        // 有数据则返回
        // if (result.data || result.html || result.address || result.msg) {
        //   return result
        // } else if (Number(res.data.ret) !== 0) {
        //   T.notify(res.data.msg)
        //   return Promise.reject(res.data.msg)
        // }
      } else if (statusCode === STATUS.NOT_FOUND) {
        return Promise.reject('请求的资源不存在')
      } else if (statusCode === STATUS.BAD_GATEWAY) {
        return Promise.reject('服务器离家出走')
      } else if (statusCode === STATUS.AUTHENTICATE) {
        return Promise.reject('没有权限访问此资源')
      } else {
        return Promise.reject('网络不可用，请稍后重试')
      }
    }, (err: AxiosError) => {
      hideLoading()
      T.notify(err)
      return Promise.reject(err)
    })
  }

  constructor(config: AxiosRequestConfig) {
    this.created(config)
    this.handleInterceptors()
  }

  public getInstance(): AxiosInstance {
    return this.api
  }
}

export const mainApi = new Request({
  baseURL: `//${document.domain}`,
}).getInstance()

export const baseApi = new Request({
  baseURL: `//${document.domain}`
}).getInstance()
