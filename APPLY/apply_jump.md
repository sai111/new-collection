# 跳转

## a表单跳转
  
   ```
   <a href="http://www.baidu.com" target="_Self">百度</a>
    _black 在新页面打开
    _self 在本页面打开
    _parent 在父窗口打开
    _top 在顶层窗口打开
   ```

    a标签的另外一种写法

    ```
      var link = document.createElement('a')
      link.target = '_blank'
      link.href = url
      link.rel = 'noopener norefferrer'
      link.id = new Date().getTime()
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      
    ```
## 页面跳转
    需求：跳转到指定的空页面
    path: '/merchant/#/preview'
    ```
    // 跳转到新的tab空页
    export function getServerPath (params) {
        const urlPath = window.document.location.href
        const docPath = window.document.location.pathname
        const index = urlPath.indexOf(docPath)
        const serverPath = urlPath.substring(0, index)
        return serverPath + params
    }
    var num = 0
    export function openUrl (url) {
        var a = document.createElement('a')
        a.setAttribute('href', url)
        a.setAttribute('target', '_blank')
        a.setAttribute('id', 'camnpr' + num++)
        document.body.appendChild(a)
        a.click()
    }
    ```

## 
