import Vue from 'vue'
import AJAX from './Ajax'

// 防止多个接口报错同时弹窗
let tokenExpire = false
export const ajaxConfig = {
  baseUrl: '/',
  reqSuccessKey: 'resultCode', // 成功标志key
  reqSuccessValue: ['100'], // 成功标志value
  resErrorValue: [401], // 失败标识
  msgKey: 'resultMsg', // 消息key
  // 登录过期， 重新请求登录
  interceptError: (res) => {
    if (tokenExpire) return
    tokenExpire = true
    // 清空用户信息
    // Store.dispatch('clearUserInfo')

    Vue.prototype.$notify({
      type: 'error',
      title: '错误提示',
      message: '登录失效，请重新登录',
      duration: 1500,
      onClose: () => {
        tokenExpire = false
        // Store.dispatch('cancelAutoLogin')
        // 打开登录页
        window.location.href = '/login'
      }
    })
  },
  expireToken: (res) => {
    if (tokenExpire) return
    tokenExpire = true

    // 清空用户信息和取消自动登录
    // Store.dispatch('clearUserInfo')

    Vue.prototype.$notify({
      type: 'error',
      title: '错误提示',
      message: '登录失效，请重新登录',
      duration: 1500,
      onClose: () => {
        tokenExpire = false

        // 打开登录页
        window.location.href = '/login'
      }
    })
  }
}

const ajax = new AJAX(ajaxConfig)
// 登录
// export const login = params => testAjax.get('/login', params)
export const login = params => ajax.post('/login', params)
