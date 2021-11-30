# 下载

## 本地文件下载
```
import downloadAxios from './utils/download/download.js'
downloadPdf () {
  const url = `${location.protocol}//${location.host}${location.pathname}pdf/docking-document.pdf`
      downloadAxios.get(encodeURI(url), {params: {fileName: '对接文档.pdf'}})
}
```


## 服务器地址下载

### form表单下载
     

   1. 后段直接返回文件流，前端读取文件流写入到文件中，这种方式可以加上鉴权，前端直接js写入文件流时超过500M时，浏览器卡死或者文件下载不全的问题，这时建议直接采用file-saver 插件写入文件，此版本的插件在chrome浏览器上最大可支持2G文件下载
   优点：能解决鉴权的问题；能下载浏览器可浏览的文件
   缺点：下载的文件大小有限制，能彻底解决文件名问题需采用原生请求方式


```
import { saveAs } from './utils/download/fileSaver.js'
downloadReport(params).then((res) => {
  const name = sessionStorage.getItem('resHeaders')
  saveAs(new Blob([res]), name)
})

```
### 两步下载
    现有系统中的两步下载
       第一步：通过接口获取下载地址的url,这一步可以实现接口中加入鉴权的判定
       第二步：通过浏览器(form,window.open,a标签等)的下载，接口的响应也是二进制文件流，这一步往往是不能加入鉴权功能(现有后端是通过这两种方式实现；一种是第一步生成url,这个url是一个临时的URL,只要使用之后就会自动删除，不回存在鉴权问题；另一种是将token值以query参数形式传给后端，变相的实现鉴权)
       具体可以参考download-url.js

       ```
        在mian.js中
        import Download from '../utils/download/download-url.js'

        Vue.use(Download)
        // Vue.prototype.$download = Download
        使用
        this.$download(getAjax())
       ```

### 后台接口提供文件流，前端自行下载
```
   第一步：
  // 在接口中加入responseType标志
  export function exportOrder (data) {
    return axios({
      url: '/oc/orders/toExcel',
      method: 'post',
      data,
      responseType: 'blob'
    })
  }

  第二步

    修改axios的返回response
     // 导出订单后台提供的文件流，需要前端自行下载excel
    if (response.config.responseType === 'blob') {
      const fileName = window.decodeURI(response.headers['content-disposition'].split(';')[1].split('=')[1], 'UTF-8')
      downFile(res, fileName)
    }

    // 处理流文件【导出订单后台提供的文件流，需要前端自行下载excel】
    function downFile (content, fileName) {
      var ele = document.createElement('a')
      ele.download = fileName
      ele.style.display = 'none'
      var blob = new Blob([content], { type: 'application/vnd.ms-excel' })
      ele.href = URL.createObjectURL(blob)
      document.body.appendChild(ele)
      ele.click()
      document.body.removeChild(ele)
    }
    
    
  第三步
   res.code 这里不提示错误
```



