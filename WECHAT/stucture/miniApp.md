## 微信小程序



参考地址：https://juejin.cn/post/6986278171515568141

## 开发准备

1. 去[微信公众平台](https://mp.weixin.qq.com/) 注册，申请一个AppId
2. 下载小程序开发工具，[微信开发者工具](https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html)



### 创建一个项目

![创建一个项目]](../image/创建一个项目.png)

### 小程序主体部分
| 文件                                                         | 必需 | 作用             |
| ------------------------------------------------------------ | ---- | ---------------- |
| [app.js](https://developers.weixin.qq.com/miniprogram/dev/framework/app-service/app.html) | 是   | 小程序逻辑       |
| [app.json](https://developers.weixin.qq.com/miniprogram/dev/framework/config.html) | 是   | 小程序公共配置   |
| [app.wxss](https://developers.weixin.qq.com/miniprogram/dev/framework/view/wxss.html) | 否   | 小程序公共样式表 |



一个小程序页面有四个文件组件

| 文件类型                                                     | 必需 | 作用       |
| ------------------------------------------------------------ | ---- | ---------- |
| [js](https://developers.weixin.qq.com/miniprogram/dev/framework/app-service/page.html) | 是   | 页面逻辑   |
| [wxml](https://developers.weixin.qq.com/miniprogram/dev/framework/view/wxml/) | 是   | 页面结构   |
| [json](https://developers.weixin.qq.com/miniprogram/dev/framework/config.html#%E9%A1%B5%E9%9D%A2%E9%85%8D%E7%BD%AE) | 否   | 页面配置   |
| [wxss](https://developers.weixin.qq.com/miniprogram/dev/framework/view/wxss.html) | 否   | 页面样式表 |



### 注册小程序

每个小程序都需要在 `app.js` 中调用 `App` 方法注册小程序实例，绑定生命周期回调函数、错误监听和页面不存在监听函数等。详细的参数含义和使用请参考 [App 参考文档](https://developers.weixin.qq.com/miniprogram/dev/reference/api/App.html) 

```
// app.js
App({
 // 小程序初始化完成时触发，全局只触发一次
  onLaunch (options) {
    // Do something initial when launch.
  },
  // 小程序启动，或从后台进入前台显示时触发
  onShow (options) {
    // Do something when show.
  },
  // 小程序从前台进入后台时触发
  onHide () {
    // Do something when hide.
  },
  // 小程序发生脚本错误或 API 调用报错时触发
  onError (msg) {
    console.log(msg)
  },
  // 全局
  globalData: 'I am global data'
})

```



整个小程序只有一个 App 实例，是全部页面共享的。开发者可以通过 `getApp` 方法获取到全局唯一的 App 实例，获取App上的数据或调用开发者注册在 `App` 上的函数。它的作用有些类似Android 中的 Application

```
// xxx.js
const appInstance = getApp()
console.log(appInstance.globalData) // I am global data

```



### 全局配置

app.json 小程序的全局配置，用于声明页面文件的路径、窗口显示、设置多tab等。完整配置项说明请参考[小程序全局配置](https://developers.weixin.qq.com/miniprogram/dev/reference/configuration/app.html)



```
{
  "pages": [
    "pages/index/index",
    "pages/logs/index"
  ],
  // 用于设置小程序的状态栏、导航条、标题、窗口背景色
  "window": {
    "navigationBarTitleText": "Demo"
  },
  // 底部tarBar
  "tabBar": {
    "list": [{
      "pagePath": "pages/index/index",
      "text": "首页"
    }, {
      "pagePath": "pages/logs/index",
      "text": "日志"
    }]
  },
  // 各类网络请求的超时时间，单位均为毫秒
  "networkTimeout": {
    "request": 10000,
    "downloadFile": 10000
  },
  "debug": true
}

```



### 注册页面

小程序的每个页面，都需要在页面对应的js文件中进行注册，同时可以指定页面的初始数据、生命周期回调、事件处理函数等。

详细的参数说明 [page参考文档](https://developers.weixin.qq.com/miniprogram/dev/reference/api/Page.html)

```
//index.js
Page({
  data: {
    text: "This is page data."
  },
  onLoad: function(options) {
    // 页面创建时执行
  },
  onShow: function() {
    // 页面出现在前台时执行
  },
  onReady: function() {
    // 页面首次渲染完毕时执行
  },
  onHide: function() {
    // 页面从前台变为后台时执行
  },
  onUnload: function() {
    // 页面销毁时执行
  },
  onPullDownRefresh: function() {
    // 触发下拉刷新时执行
  },
  onReachBottom: function() {
    // 页面触底时执行
  },
  onShareAppMessage: function () {
    // 页面被用户分享时执行
  },
  onPageScroll: function() {
    // 页面滚动时执行
  },
  onResize: function() {
    // 页面尺寸变化时执行
  },
  onTabItemTap(item) {
    // tab 点击时执行
    console.log(item.index)
    console.log(item.pagePath)
    console.log(item.text)
  }
})
```



### 页面配置



每一个小程序页面也可以使用同名 `.json` 文件来对本页面的窗口表现进行配置，页面中配置项会覆盖 `app.json` 的 `window` 中相同的配置项。

完整配置项说明请参考[小程序页面配置](https://developers.weixin.qq.com/miniprogram/dev/reference/configuration/page.html)

```
{
  "navigationBarBackgroundColor": "#ffffff",
  "navigationBarTextStyle": "black",
  "navigationBarTitleText": "微信接口功能演示",
  "backgroundColor": "#eeeeee",
  "backgroundTextStyle": "light"
}
```



### 页面跳转



框架以栈的形式维护了当前的所有页面。 当发生页面切换的时候，页面栈的表现如下：

| 路由方式   | 页面栈表现                        | API                                                          |
| ---------- | --------------------------------- | ------------------------------------------------------------ |
| 打开新页面 | 新页面入栈                        | [wx.navigateTo](https://developers.weixin.qq.com/miniprogram/dev/api/route/wx.navigateTo.html) |
| 页面重定向 | 当前页面出栈，新页面入栈          | [wx.redirectTo](https://developers.weixin.qq.com/miniprogram/dev/api/route/wx.redirectTo.html) |
| 页面返回   | 页面不断出栈，直到目标返回页      | [wx.navigateBack]（https://developers.weixin.qq.com/miniprogram/dev/api/route/wx.navigateBack.html) |
| Tab 切换   | 页面全部出栈，只留下新的 Tab 页面 | [wx.switchTab](https://developers.weixin.qq.com/miniprogram/dev/api/route/wx.switchTab.html) |
| 重加载     | 页面全部出栈，只留下新的页面      | [wx.reLaunch](https://developers.weixin.qq.com/miniprogram/dev/api/route/wx.reLaunch.html) |

开发者可以使用 `getCurrentPages()` 函数获取当前页面栈。

```
  //跳转到test界面
  skipTest(event) {
    wx.navigateTo({ url: '../test/test' })
  }
```



## API 使用



### 存储

每个微信小程序都有自己的本地缓存，可以通过 [wx.setStorage](https://developers.weixin.qq.com/miniprogram/dev/api/storage/wx.setStorage.html)/[wx.setStorageSync](https://developers.weixin.qq.com/miniprogram/dev/api/storage/wx.setStorageSync.html)、[wx.getStorage](https://developers.weixin.qq.com/miniprogram/dev/api/storage/wx.getStorage.html)/[wx.getStorageSync](https://developers.weixin.qq.com/miniprogram/dev/api/storage/wx.getStorageSync.html)、[wx.clearStorage](https://developers.weixin.qq.com/miniprogram/dev/api/storage/wx.clearStorage.html)/[wx.clearStorageSync](https://developers.weixin.qq.com/miniprogram/dev/api/storage/wx.clearStorageSync.html)，[wx.removeStorage](https://developers.weixin.qq.com/miniprogram/dev/api/storage/wx.removeStorage.html)/[wx.removeStorageSync](https://developers.weixin.qq.com/miniprogram/dev/api/storage/wx.removeStorageSync.html) 对本地缓存进行读写和清理

其中以 Sync 结尾的代表同步操作，二者的区别在于，异步不会阻塞当前任务

```
  setStorageTest(event) {
    wx.setStorage({
      key: 'name',
      data: 'huangm',
      success(res) {
        console.log("storage success")
      }
    })
    console.log("storage end")
  }, 
  getStorageTest(event) {
    const that = this
    wx.getStorage({
      key: 'name',
      success (res) {
        that.setData({
          name: res.data
        })
        console.log(res.data)
      }
    })
    console.log('get Storage end')
  },
  deleteStorageTest(event) {
    const that = this
    wx.removeStorage({
      key: 'name',
      success(res) {
        that.getStorageTest()
      }
    })
  }

```



### 网络请求

小程序支持普通 HTTPS 请求（[wx.request](https://developers.weixin.qq.com/miniprogram/dev/api/network/request/wx.request.html)）、上传文件（[wx.uploadFile](https://developers.weixin.qq.com/miniprogram/dev/api/network/upload/wx.uploadFile.html)）、下载文件（[wx.downloadFile](https://developers.weixin.qq.com/miniprogram/dev/api/network/download/wx.downloadFile.html)) 和 WebSocket 通信（[wx.connectSocket](https://developers.weixin.qq.com/miniprogram/dev/api/network/websocket/wx.connectSocket.html)）



####  HTTPS 请求（[wx.request](https://developers.weixin.qq.com/miniprogram/dev/api/network/request/wx.request.html)）

```
const fetch = (options) => {
  const baseUrl = 'http://10.50.2.70/hde'
  // data: post, put... || params: get || pathData: 路由携带参数
  let { url, method, data, params, pathData } = options
  const token = getToken('token')
  const header = token ? { 'Authorization': `Bearer ${token}` } : {}
  if (method === 'post') header['content-type'] = 'application/json;charset=utf-8'
  const requestData = data || params || ''
  // pathData处理
  if (pathData) {
    for (const key in pathData) {
      url = url.replace(`:${key}`, pathData[key])
    }
  }
  // Taro.showLoading({ title: '加载中' })
  return wx.request({
    url: `${baseUrl}${url}`,
    method,
    data: requestData,
    header
  }).then(async (res) => {
    const { code, message } = res.data
    if (code !== 200) { // 错误提示
      wx.showToast({
        title: message,
        icon: 'none',
        duration: 2000
      })

      if (code === 401) { // 401跳往登录页
        removeAllKey()
        // wx.navigateTo({ url: '/pages/login/choice' })
        wx.switchTab({ url: '/pages/home/index' })
      }
    }
    return res.data
  }).catch(() => {
  }).finally(() => {
    // wx.hideLoading({
    //   fail: (error) => {
    //     console.log(error)
    //   }
    // })
  })
}
export default fetch
```



#### 上传文件（[wx.uploadFile](https://developers.weixin.qq.com/miniprogram/dev/api/network/upload/wx.uploadFile.html)）

```
wx.uploadFile({
      url,
      filePath,
      header: {
        'content-type': 'multipart/form-data',
        'Authorization': 'Bearer ' + getToken('token')
      },
      name: 'file',
      success: (res) => {
        if(res.errMsg === "uploadFile:ok") {
          // 上传成功
          let response = JSON.parse(res.data)
          fileUrl.value = response.data.filePath
          bus.emit('uploadSuccess', response.data)
        }
      }
    })
```



#### 下载文件（[wx.downloadFile](https://developers.weixin.qq.com/miniprogram/dev/api/network/download/wx.downloadFile.html)) 

```
wx.downloadFile({
  url: url,
  header: { 'content-type': 'application/json' },
  success: function (res) {
    Taro.showToast({ title: '下载成功', icon: 'success' })
    const tempFilePath = res.tempFilePath
    wx.openDocument({
      filePath: tempFilePath,
      success: function (res) {
        wx.hideToast()
      }
    })
  },
  fail: function (res) {
    wx.showToast({ title: '下载失败', icon: 'loading' })
  }
})
```



### [微信支付](https://developers.weixin.qq.com/miniprogram/dev/api/payment/wx.requestPayment.html)

```
wx.requestPayment(
  {
    ...JSON.parse(str),
    success: (res) => {
      console.log(res, 'success')
    },
    fail: (res) => {
      bus.emit('updateInfo')
      handleNavigate(400, props.data)
    },
    complete: (res) => {
      if (res.errMsg === 'requestPayment:ok') {
        getWechat({orderCode: props.data.orderCode}).then((result) => {
          bus.emit('updateInfo')
          handleNavigate(200, props.data)
        })
      }
    }
  }
)
```

### 五、自定义组件

在现有官方组件无法满足我们开发需求的时候，小程序也支持 [自定义组件](https://developers.weixin.qq.com/miniprogram/dev/framework/custom-component/)

组件模版

组件模板和页面类似，也是包含 xxx.js、xxx.wxml、xxx.wxss、xxx.json



```
// cityPicker.wxml

<template>
  <view class="city-picker">
    <view class="city-picker-container" :class="show?'show':''">
      <view class="city-picker-shadow" @tap="hideCityPicker" />
      <view class="city-picker-wrap">
        <view class="city-picker-header">
          <view class="city-picker-cancel" @tap="hideCityPicker">取消</view>
          <view class="city-picker-submit" @tap="submitCityPicker">确定</view>
        </view>
        <picker-view
          :value="provinceArr"
          indicator-class="custom-picker"
          indicator-style="height: calc(40/16*1rem);"
          style="width:100%;height: calc(200/16*1rem);line-height:calc(40/16*1rem);text-align:center;"
          @change="changeCityPicker"
        >
          <!-- 省 -->
          <picker-view-column>
            <view v-for="(province, index1) in provinces" :key="'province-li-'+index1">{{ province }}</view>
          </picker-view-column>
          <!-- 地级市 -->
          <picker-view-column>
            <view v-for="(city, index1) in citys" :key="'city-li-'+index1">{{ city }}</view>
          </picker-view-column>
          <!-- 区县 -->
          <picker-view-column>
            <view v-for="(county, index1) in county" :key="'county-li-'+index1">{{ county }}</view>
          </picker-view-column>
        </picker-view>
      </view>
    </view>
  </view>
</template>
<script>
import { reactive, toRefs, onMounted } from 'vue'
import './index.scss'
import cityJson from './city.min.json'
export default {
  props: {
    show: false,
    value: [],
    name: ''
  },
  setup(props, context) {
    const data = reactive({
      provinces: cityJson[86],
      citys: cityJson[props.value && props.value[0] ? props.value[0] : 110000],
      county: cityJson[props.value && props.value[1] ? props.value[1] : 110100],
      codes: props.value && props.value.length > 0 ? props.value : [110000, 110100, 110101],
      names: props.name ? props.name : '北京市-市辖区-东城区',
      provinceArr: [0, 0, 0]
    })
    onMounted(() => {
      initValue()
    })
    // 获取下标
    const initValue = () => {
      if (props.value && props.value.length > 0) {
        const proIndex = Object.keys(data.provinces).findIndex((v) => v === data.codes[0])
        const cityIndex = Object.keys(data.citys).findIndex((v) => v === data.codes[1])
        const couIndex = Object.keys(data.county).findIndex((v) => v === data.codes[2])
        data.provinceArr = [proIndex > 0 ? proIndex : 0 , cityIndex > 0 ? cityIndex : 0, couIndex > 0 ? couIndex : 0]
      }
    }
    // 初始化选择器信息
    const togglePicker = (arr) => {
      const provinceNum = arr[0]
      const cityNum = arr[1]
      const countyNum = arr[2]
      // 如果省份选择项和之前不一样，表示滑动了省份，此时市默认是省的第一组数据
      if (data.codes[0] !== provinceNum) {
        data.citys = cityJson[Object.keys(cityJson[86])[provinceNum]]
        data.county = cityJson[Object.keys(data.citys)[cityNum]]
      } else if (data.codes[1] !== cityNum) {
        // 滑动选择了第二项数据，即市，此时区显示省市对应的第一组数据
        data.county = cityJson[Object.keys(data.citys)[cityNum]]
      }
      const province = Object.keys(cityJson[86])[provinceNum]
      const city = Object.keys(data.citys)[cityNum]
      const county = Object.keys(data.county)[countyNum]
      const provinceName = Object.values(cityJson[86])[provinceNum]
      const cityName = Object.values(data.citys)[cityNum]
      const countyName = Object.values(data.county)[countyNum]
      data.provinceArr = arr
      data.names = `${provinceName}-${cityName}-${countyName}`
      data.codes = [province, city, county]
    }
    // 列滚动
    const changeCityPicker = (e) => {
      let result = e.detail.value
      if (data.provinceArr[0] !== e.detail.value[0]) {
        result = [e.detail.value[0], 0, 0]
      } else if (data.provinceArr[1] !== e.detail.value[1]) {
        result = [e.detail.value[0], e.detail.value[1], 0]
      }
      togglePicker(result)
    }
    // 取消
    const hideCityPicker = () => {
      context.emit('closePicker', data.codes, data.names)
    }
    // 确认
    const submitCityPicker = () => {
      context.emit('closePicker', data.codes, data.names)
    }
    return {
      ...toRefs(data),
      submitCityPicker,
      hideCityPicker,
      changeCityPicker,
      initValue
    }
  }
}
</script>

```

