/**
 * 下载插件,传入Promise后，符合数据结构自动打开页面下载，数据格式{data:{url}}
 */
 import {Loading, Notification, Message} from 'element-ui'

 export default {
   install: (Vue, options) => {
     // method:post
     Vue.prototype.$download = async (promise, obj = {method: 'post'}) => {
      const loading = Loading.service({fullscreen: true, text: '正在请求下载,请稍侯...'})
      let form = ''
      form = document.getElementById('download-private-id')
      if (!form) {
        form = document.createElement('form')
        form.setAttribute('id', 'download-private-id')
        document.body.appendChild(form)
      }
      promise.then((res) => {
        let { error_code: errorCode, message, data: { url } } = res
        if (errorCode === undefined || errorCode === 200) {
          form.setAttribute('action', url)
          form.setAttribute('method', obj.method)
          form.submit()
          Notification.success({title: '成功', message: '下载开始', duration: 5000})
          return true
        }
        Message.error({message, duration: 5000})
      }).catch((err) => {
        Message.error({message: JSON.parse(err.message), duration: 5000})
      }).finally(() => {
        loading.close()
      })
     }
     // method:get,返回的url没有携带参数
     Vue.prototype.$downloadParams = async (promise, obj = {method: 'post'}) => {
      const loading = Loading.service({fullscreen: true, text: '正在请求下载,请稍侯...'})
      promise.then((res) => {
        let { error_code: errorCode, message, data: { url } } = res
        if (errorCode === undefined || errorCode === 200) {
          window.location.href = url
          Notification.success({title: '成功', message: '下载开始', duration: 5000})
          return true
        }
        Message.error({message, duration: 5000})
      }).catch((err) => {
        Message.error({message: JSON.parse(err.message), duration: 5000})
      }).finally(() => {
        loading.close()
      })
     }
   }
 }
