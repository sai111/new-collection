# DNS 预解析 prefetch

&emsp;&emsp;本文将详细介绍 DNS 预解析 prefetch 的主要内容

&nbsp;

### 概述

&emsp;&emsp;DNS(Domain Name System, 域名系统)，是域名和 IP 地址相互映射的一个分布式数据库。DNS 查询就是将域名转换成 IP 的过程，这个过程短的话 2ms 几乎无感，长则可能达到几秒钟
&emsp;&emsp;当浏览器访问一个域名的时候，需要解析一次 DNS，获得对应域名的 ip 地址。在解析过程中，按照浏览器缓存、系统缓存、路由器缓存、ISP(运营商)DNS 缓存、根域名服务器、顶级域名服务器、主域名服务器的顺序，逐步读取缓存，直到拿到 IP 地址

&emsp;&emsp;DNS Prefetch，即 DNS 预解析就是根据浏览器定义的规则，提前解析之后可能会用到的域名，使解析结果缓存到系统缓存中，缩短 DNS 解析时间，来提高网站的访问速度

&nbsp;

### 使用

&emsp;&emsp;现代浏览器在 DNS Prefetch 上做了两项工作：

&emsp;&emsp;1、html 源码下载完成后，会解析页面的包含链接的标签，提前查询对应的域名

&emsp;&emsp;2、对于访问过的页面，浏览器会记录一份域名列表，当再次打开时，会在 html 下载的同时去解析 DNS

&emsp;&emsp;DNS 预解析分为以下两种：

【自动解析】

&emsp;&emsp;浏览器使用超链接的 href 属性来查找要预解析的主机名。当遇到 a 标签，浏览器会自动将 href 中的域名解析为 IP 地址，这个解析过程是与用户浏览网页并行处理的。但是为了确保安全性，在 HTTPS 页面中不会自动解析

【手动解析】

&emsp;&emsp;在页面添加如下标记

```
<link rel="dns-prefetch" href="//img.alicdn.com">
```

&emsp;&emsp;上面的 link 标签会让浏览器预取`"img.alicdn.com"`的解析

&emsp;&emsp;希望在 HTTPS 页面开启自动解析功能时，添加如下标记

```
<meta http-equiv="x-dns-prefetch-control" content="on">
```

&emsp;&emsp;希望在 HTTP 页面关闭自动解析功能时，添加如下标记

```
<meta http-equiv="x-dns-prefetch-control" content="off">
```

&emsp;&emsp;并非所有页面都要手动解析，一般在整个站点的入口页做这个工作就行了，毕竟一个站点下用到的大多数域名都会在首页体现

&nbsp;

### 作用

&emsp;&emsp;DNS Prefetch 有效缩短了 DNS 的解析时间

&emsp;&emsp;如果浏览器最近将一个域名解析为 IP 地址，所属的操作系统将会缓存，下一次 DNS 解析时间可以低至 0-1ms。 如果结果不在系统本地缓存，则需要读取路由器的缓存，则解析时间的最小值大约为 15ms。如果路由器缓存也不存在，则需要读取 ISP（运营商）DNS 缓存，一般像`taobao.com`、`baidu.com`这些常见的域名，读取 ISP（运营商）DNS 缓存需要的时间在 80-120ms，如果是不常见的域名，平均需要 200-300ms。一般的网站在运营商这里都能查询的到，所以普遍来说 DNS Prefetch 可以给一个域名的 DNS 解析过程带来 15-300ms 的提升，尤其是一些大量引用很多其他域名资源的网站，提升效果就更加明显了

&emsp;&emsp;浏览器底层缓存进行了建模，当 Chrome 浏览器启动的时候，就会自动的快速解析浏览器最近一次启动时记录的前 10 个域名。所以经常访问的网址就没有 DNS 解析的延迟，打开速度更快

&nbsp;

## 最后

&emsp;&emsp;DNS Prefetch 是对网页性能优化的一个通用方案，对国际化的站点来说可能效果更加明显。学习成本和理解成本低，可以放心大胆地用到自己的网页上

&emsp;&emsp;以的前端小站为例

```
<link rel="dns-prefetch" href="//api.xiaohuochai.cc"/>
<link rel="dns-prefetch" href="//static.xiaohuochai.site"/>
<link rel="dns-prefetch" href="//demo.xiaohuochai.site"/>
<link rel="dns-prefetch" href="//pic.xiaohuochai.site"/>
```
