import axios from 'axios'
import {getToken} from '@/config/auth.js'
import {Message} from 'element-ui'

const CancelToken = axios.CancelToken
let messageInstance = null

const downloadAxios = axios.create({
  timeout: 120000,
  responseType: 'blob'
})

const pending = {}

/**
 * 移除撤销的 cancelToken
 * @param {*} key
 * @param {*} isRequest 是否请求 true - 请求阶段  false - 响应阶段
 */
const removePending = (key, isRequest = false) => {
  if (pending[key] && isRequest) {
    pending[key]('cancel request')
  }
  delete pending[key]
}

downloadAxios.interceptors.request.use(
  config => {
    if (!config.noDebounce) {
      const {url, method} = config
      const key = url + '&' + method
      removePending(key, true)
      config.cancelToken = new CancelToken((c) => { pending[key] = c })
    }
    if (getToken()) {
      config.headers.Authorization = 'Bearer ' + getToken()
    }
    messageInstance = Message.warning('导出中...', 0)
    return config
  },
  (err) => {
    messageInstance.close()
    console.log(err)
    return Promise.reject(err)
  }
)

downloadAxios.interceptors.response.use((response) => {
  messageInstance.close()
  messageInstance = null
  if (!response.config.noDebounce) {
    const {url, method} = response.config
    const key = url + '&' + method
    removePending(key)
  }
  if (response.status === 200) {
    const type = response.headers['content-type']
    let fileNameHttp = response.config.params ? response.config.params.fileName : null
    if (!fileNameHttp) {
      fileNameHttp = response.config.data ? JSON.parse(response.config.data).fileName : null
    }
    if (/json/.test(type)) {
      console.log(response, 'response---->>>>')
      const arr = new Blob(response.data)
      var encodedString = String.fromCharCode.apply(null, arr)
      var decodedString = decodeURIComponent(escape(encodedString))
      try {
        const res = JSON.parse(decodedString)
        Message.error(res.message)
      } catch (error) {
        Message.error('请求错误')
      }
      return
    }
    const disposition = response.headers['content-disposition']
    let fileName = null
    if (fileNameHttp) {
      fileName = fileNameHttp
    } else if (disposition.indexOf('*=') > -1) {
      fileName = decodeURIComponent(
        disposition.substring(
          disposition.indexOf('filename*=') + 17,
          disposition.length
        )
      )
    } else {
      fileName = decodeURIComponent(
        disposition.substring(
          disposition.indexOf('filename=') + 9,
          disposition.length
        )
      )
    }
    const blob = new Blob([response.data])
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.style.display = 'none'
    a.download = fileName
    a.href = url
    document.body.appendChild(a)
    a.click()
    URL.revokeObjectURL(a)
    a.remove()
    return url
  } else {
    return false
  }
}, err => {
  messageInstance.close()
  messageInstance = null
  if (err.message !== 'cancel request') { Message.error(err) }
  return err
})

export default downloadAxios
