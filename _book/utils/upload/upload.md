# 文件上传

  一般使用两种方式
   1：切片上传适用于大文件上传
   2: el-upload 上传
   3: 自定义上传

## 切片上传

## el-upload上传

## 自定义上传
   ```
     3:自定义上传
     export const uploadFile () {
      const formData = new FormData()
      formData.append('file', this.dataURLToFile(imgUrl))
      return new Promise((resolve, reject) => {
        const request = new XMLHttpRequest()
        request.open('post', '/file')
        request.setRequestHeader('Authorization', 'Bearer' + getToken())
        request.send(formData)
        request.onreadystatechange = () => {
          if (request.readyState === 4) {
            resolve(JSON.parse(request.response).data)
          }
        }
      })
     }

    // 将图片转成文件流
    dataURLToFile(dataUrl) {
      const arr = dataUrl.split(',')
      const mine = arr[0].match(/:(.*?);/)[1]
      const suffix = mine.split('/')[1]
      const bstr = atob(arr[1])
      let n = bstr.length
      const u8arr = new Uint8Array(n)
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n)
      }
      return new File([u8arr], `file.${suffix}`, { type: mine })
    }
   ```
