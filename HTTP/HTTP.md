# HTTP 知识结构

除了 HTML、CSS、javascript 这三门前端基础知识之外，HTTP 恐怕是前端工程师最需要掌握的知识了，它是前端和后端沟通的桥梁，前端工程师需要能够调试 HTTP、修复网络传输中可能遇到的 BUG，进而认识到 HTTP 协议的局限性，从而了解网络性能和安全性等

HTTP 的内容主要参照《HTTP 权威指南》和《图解 HTTP》，将 HTTP 的知识体系进行了梳理和归纳，总结成以下目录

- 基础
  - [简明学习](base/base.md)
  - [网络基础](base/network.md)
  - [数据传输](base/transport.md)
  - [网站架构演化](base/WebArchitecture.md)
  - [连接管理](base/connect.md)
  - [缓存](base/cache.md)
- 组成
  - [URL](composition/URL.md)
  - [报文起始行](composition/StartingLine.md)
  - [报文首部](composition/MessageHeader.md)
- 结构
  - [Web 服务器](structure/server.md)
  - [代理](structure/proxy.md)
  - [网关、隧道和中继](structure/others.md)
- 安全
  - [Web 攻击技术](security/webAttack.md)
  - [客户端识别及 Cookie](security/cookie.md)
  - [基本认证](security/baseAuth.md)
  - [摘要认证](security/summaryAuth.md)
  - [安全 HTTP](security/https.md)
- 编码
  - [实体和编码](coding/coding.md)
  - [字符集](coding/charset.md)
  - [内容协商](coding/contentNegotiation.md)
  - [使用 javascript 实现 base64 编码器](coding/base64Coding.md)
- 内容发布
  - [Web 主机托管](issue/hosting.md)
  - [重定向和负载均衡](issue/redirect.md)
  - [日志记录](issue/log.md)
