import axios from 'axios'
import Vue from 'vue'
class Ajax {
  constructor(cfg) {
    // 成功标志key
    this.reqSuccessKey = cfg.reqSuccessKey
    // 成功标志value
    this.reqSuccessValue = cfg.reqSuccessValue
    // 失败
    this.resErrorValue = cfg.resErrorValue
    // 消息key
    this.msgKey = cfg.msgKey
    // 拦截错误
    this.interceptError = cfg.interceptError
    // 配置axios
    this.instance = axios.create({
      baseURL: '',
      timeout: 3000
    })
    this.initRequestInterceptors()
    this.initResponseInterceptors()
  }
  // 原型方法
  // get(url, params){
  //   return this.fetch('get', url + params)
  // }
  fetch(method, url, params, successCb) {
    let instance = null
    if (method === 'get') {
      instance = this.instance.get(url)
    } else if (method === 'post') {
      instance = this.instance.post(url)
    } else if (method === 'put') {
      instance = this.instance.put(url, params)
    } else if (method === 'delete') {
      instance = this.instance.delete(url, params)
    }

    return instance.then((res) => {
      // 自定义成功回调
      if (successCb) {
        successCb(res)
        return false
      }

      // 正常流程
      let code = res && res[this.reqSuccessKey]
      if (this.reqSuccessValue.indexOf(code) > -1) {
        return Promise.resolve(res, code)
      } else {
        let msg = (res && res[this.msgKey]) || JSON.stringify(res) || '错误类型未知'
        res && Vue.prototype.$notify({
          title: '错误提示',
          message: msg,
          type: 'error'
        })
        return Promise.reject(res) // 文档
      }
    }).catch((error) => {
      return Promise.reject(error)
    })
  }
  // 接口 request拦截器
  initRequestInterceptors() {
    this.instance.interceptors.request.use(config => {
      // console.log('Store.state.userInfo.token', Store.state.userInfo.token)
      // config.headers['x-auth-token'] = Store.state.userInfo.token
      // console.log('config', config)
      return config
    })
  }

  // 接口response拦截器
  initResponseInterceptors() {
    this.instance.interceptors.response.use((response) => {
      // 如果refreshToken存在则更新token
      let newToken = response.headers['x-auth-token']
      if (newToken) {
        // Store.dispatch('refreshToken', newToken)
      }
      let res = response.data
      let callbackFn = this.expireToken
      let code = res && parseInt(res[this.reqSuccessKey])
      //  授权失败
      if (this.resErrorValue.indexOf(code) > -1) {
        console.log('-----授权失败')
        callbackFn && callbackFn(res)
      } else {
        return res
      }
    }, (error) => {
      error = error.response
      let msg = '请求服务失败'
      if (error && error.status) {
        msg += `，错误码${error.status}`
      } else {
        msg = '请求超时，请检查网络~'
      }
      Vue.prototype.$notify({
        type: 'error',
        title: '错误提示',
        message: msg
      })
      return Promise.reject(error)
    })
  }
}

export default Ajax
