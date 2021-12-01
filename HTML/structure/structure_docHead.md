# HTML 文档头部

&emsp;&emsp;在声明文档类型之后，HTML 文档的下一部分为`<html>`标签，告知浏览器应将括在`<html>`...`</html>`内的所有内容解析为 HTML。然后是 HTML 文档的两个主要部分：`<head>`和`<body>`。`<head>`将包含有关页面的常规信息和元数据，本文将详细介绍 HTML 的文档头部`<head>`

<p>&nbsp;</p>

### 概述

&emsp;&emsp;`<head>`大部分不可见，描述了文档的一些基本的属性和信息(可以呈现的是 title 和 icon)。`<head>`元素下的子元素主要包括`<meta>`、`<title>`、`<base>`、`<link>`、`<style>`和`<script>`这六个元素

<p>&nbsp;</p>

### meta

&emsp;&emsp;`<meta>`标签(meta-information)用于提供页面有关的元数据，除了提供文档字符集、使用语言、作者等基本信息外，还涉及对关键词和网页等级的设定。通过设置不同的属性，元数据可以分为以下几种:

&emsp;&emsp;如果设置了 charset，即将对网页使用的字符集作出声明 HTML5

&emsp;&emsp;如果设置了 name，它是一个文档级的元数据，将附着在整个页面上

&emsp;&emsp;如果设置了 http-equiv，它是一个编译指令，即由服务器提供的来指示页面应如何加载

&emsp;&emsp;如果设置了 itemprop，将定义一个用户自定义的元数据(未实现)

<p><strong>1、charset</strong></p>

&emsp;&emsp;charset 声明声明当前文档所使用的字符编码，但该声明可以被任何一个元素的 lang 特性的值覆盖。文档的编码一定要与文件本身的编码保持一致，否则会出现乱码，推荐使用 UTF-8 编码

&emsp;&emsp;注意：字符编码必须写在`<head>`元素的最开始，如果位于`<title>`标签之后，那么`<title>`标签很可能会乱码

    <meta charset="utf-8"/>

<p><strong>2、name</strong></p>

【关键词】

    <meta name="keywords" content="HTML, CSS, XML" />

【描述】

    <meta name="description" content="Free Web tutorials on HTML, CSS, JavaScript" />

【作者】

    <meta name="author" content="littlematch">

【版权】

    <meta name="copyright" content="本页版权归所有">

【视口(移动端使用)】

    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />

【IE 浏览器渲染】

    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />

&emsp;&emsp;如果安装了 GCF(Google Chrome Frame 谷歌内嵌浏览器框架 GCF)，则使用 GCF 来渲染页面，如果没有安装，则使用最高版本的 IE 内核进行渲染

【双核浏览器渲染】

    <meta name="renderer" content="webkit">

&emsp;&emsp;如果是双核浏览器，则使用 webkit 内核渲染

<p><strong>3、http-equiv</strong></p>

【定时跳转】

&emsp;&emsp;让网页多少秒刷新，或跳转到其他网页

    <meta http-equiv="refresh" content="5">
    <meta http-equiv="refresh" content="5;url=http://www.baidu.com">

【缓存过期时间】

&emsp;&emsp;可以用于设定网页的到期时间，一旦过期则必须到服务器上重新调用。需要注意的是必须使用 GMT 时间格式

    <meta http-equiv="Expires" Content="0">
    <meta http-equiv="Expires" Content="Sat Nov 28 2016 21:19:15 GMT+0800">

【禁止缓存】

&emsp;&emsp;用于设定禁止浏览器从本地机的缓存中调阅页面内容，用户无法脱机浏览

    <meta http-equiv="Pragma" Content="No-cach">

【独立页面】

&emsp;&emsp;强制页面在当前窗口中以独立页面显示，可以防止自己的网页被别人当作一个 frame 页调用

    <meta http-equiv="windows-Target" content="_top">

【兼容模式】

&emsp;&emsp;Edge 模式告诉 IE 以最高级模式渲染文档，也就是说，什么版本 IE 就用什么版本的标准模式渲染；chrome 模式表示强制 IE 使用 Chrome Frame 渲染。Google 官方提供了对 Google Frame 插件安装情况的检测，这里直接调用方法即可，如果检测到 IE 并未安装 Google Frame，则弹出对话框提示安装。使用此插件，用户可以通过 IE 的用户界面，以 Chrome 内核的渲染方式浏览网页

&emsp;&emsp;下面表示如果当前浏览器版本是小于等于 IE8 的，则使用 chrome，如果不是，则使用 IE 标准模式

    <meta http-equiv="X-UA-Compatible" content="IE=Edge,chrome=IE8">

&emsp;&emsp;注意：关于`<meta>`元素的更多信息[移步至此](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/meta)

<p>&nbsp;</p>

### title

&emsp;&emsp;`<title>`元素定义文档的标题，显示在浏览器的标题栏或标签页上。它只可以包含文本，若是包含有标签，则包含的任何标签都不会被解释

&emsp;&emsp;`<title>`元素详细来说，有以下三个作用：1、定义浏览器工具栏中的标题；2、提供页面被添加到收藏夹时显示的标题；3、显示在搜索引擎结果中的页面标题

&emsp;&emsp;注意：在所有 HTML 文档中，`<title>`都是必须的

    <title>About Me</title>

<p>&nbsp;</p>

### base

&emsp;&emsp;`<base>`用于指定文档里所有相对 URL 地址的基础 URL，为页面上所有链接规定默认地址和默认打开方式。文档中的基础 URL 可以使用 document.baseURI 进行查询

&emsp;&emsp;注意：一份文档最多一个`<base>`元素。如果指定了多个`<base`>`元素，只会使用第一个 href 和 target 值，其余都会被忽略

    <base href="http://cnblogs.com" target="_blank">

<p>&nbsp;</p>

### link

&emsp;&emsp;`<link>`指定了外部资源与当前文档的关系，具有属性 href、rel、media、hreflang、type 和 sizes。其中 href 和 rel 是常用的，href 指定了链接的资源的地址(url)，而 rel 指定了资源的类型

【rel 属性】

    alternate   指示链接到该文档的另一个版本
    author      指示链接到当前文档的作者主页
    help        指向一个跟网站或页面相关的帮助文档
    icon        引入代表当前文档的图标，新的sized属性与这个属性结合使用，指定链接图片的宽高
    license     链接到当前的文档的版权声明
    next        指示链接到文档是一组文档中的下一份
    pingback    处理当前文档被引用情况的服务器地址
    prefetch    指明需要缓存的目标资源
    prev        标明了上一个文档
    search      链接到可以用于搜索当前页面和相关页面的资源
    sidebar     链接到可以作为附属上下文的文档
    stylesheet  引入样式表
    tag         创建应用于当前文档的标签

【media 属性】

    screen      计算机屏幕
    tty         终端
    tv          电视
    projection  投影仪
    handheld    手持设备
    print       打印的页面
    braille     盲文设备
    aural       语音合成器
    all         所有

【sizes 属性】

&emsp;&emsp;sizes 属性规定被链接资源的尺寸，且只有当被链接资源是图标时，才可使用该属性

    <link rel="icon" href="demo.gif" type="image/gif" sizes="16x16" />

【引入图标】

    <link rel="shortcut icon" href="ico.ico"/>

【引入外部样式表】

    <link rel="stylesheet" type="text/css" href="mystyle.css" />

&emsp;&emsp;注意：关于`<link>`元素的更多信息<a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/link" target="_blank">移步至此</a>

<p>&nbsp;</p>

### style

&emsp;&emsp;`<style>`元素包含了文档的样式化信息或者文档的一部分，常用于引入内部 CSS 样式

    <style>
        body{background-color: red;}
    </style>

&emsp;&emsp;`<style>`主要包含以下属性

【type】

&emsp;&emsp;该属性以 MIME 类型(不应该指定字符集)定义样式语言。如果该属性未指定，则默认为‘text/css'

【media】

&emsp;&emsp;指定哪个媒体应该应用该样式

【title】

&emsp;&emsp;指定可选的样式表

【disabled】

&emsp;&emsp;如果指定该属性，关闭(不应用)样式规则到文档中的元素。

【scoped】

&emsp;&emsp;使用 scoped 属性，可以在页面任意位置添加 CSS 样式。但是这样就违背了结构与样式分离的原则，要小心使用。如果该属性存在，则样式应用于其父元素；如果不存在，则应用于整个文档。该属性只有 chrome 和 firefox 支持

    <article>
      <div>The scoped attribute</div>
      <p>This text should be black</p>
      <section>
        <style scoped>
          p { color: red; }
        </style>
        <p>This should be red.</p>
      </section>
    </article>

<p>&nbsp;</p>

### script

&emsp;&emsp;`<script>`的作用是在 HTML 或 XHTML 文档中嵌入或引用可执行的脚本。没有 async 或 defer 属性的脚本和内联脚本会在浏览器继续解析剩余文档前被获取并立刻执行

【src】

&emsp;&emsp;这个属性定义引用外部脚本的 URI，这可以用来代替直接在文档中嵌入脚本。有 src 属性的 script 元素标签内不应该再有嵌入的脚本

【type】

&emsp;&emsp;该属性定义 script 元素包含或 src 引用的脚本语言。属性的值为 MIME 类型，支持的 MIME 类型包括 text/javascript, text/ecmascript, application/javascript 和 application/ecmascript。如果没有定义这个属性，脚本会被视作 JavaScript。如果 MIME 类型不是 JavaScript 类型(上述支持的类型)，则该元素所包含的内容会被当作数据块而不会被浏览器执行

&emsp;&emsp;如果 type 属性为 module，代码会被当作 JavaScript 模块

    <!-- HTML4 and (x)HTML -->
    <script type="text/javascript" src="javascript.js">

    <!-- HTML5 -->
    <script src="javascript.js"></script>

【defer】

&emsp;&emsp;这个布尔属性定义该脚本是否会延迟到文档解析完毕后才执行

【async】

&emsp;&emsp;async 属性是 HTML5 新增的属性，IE9-浏览器不支持。该布尔属性指示浏览器是否在允许的情况下异步执行该脚本。该属性对于内联脚本无作用(即没有 src 属性的脚本）

<p><strong>javascript加载</strong></p>

&emsp;&emsp;正常情况下，当浏览器在解析 HTML 源文件时如果遇到外部的 script，那么解析过程会暂停，并发送请求来下载 script 文件，只有 script 完全下载并执行后才会继续执行 DOM 解析

    <script src="myBlockingScript.js"></script>

&emsp;&emsp;在下载过程中浏览器是被阻止做其他有用的工作的，包括解析 HTML，执行其他脚本，以及展示 CSS 布局。虽然 Webkit 预加载扫描程序可以探测性地在下载阶段进行多线程下载，但是某些页面仍然存在很大的网络延迟

&emsp;&emsp;当前有很多技术来提升页面显示速度，但都需要额外的代码以及针对特定浏览器的技巧。现在，script 可以通过添加 async 或者 defer 属性来让脚本不必同步执行

    <script async src="myAsyncScript.js" onload="myInit()"></script>
    <script defer src="myDeferScript.js" onload="myInit()"></script>

&emsp;&emsp;async 和 defer 标注的 script 都不会暂停 HTML 解析就立刻被下载，两者都支持 onload 事件回调来解决需要该脚本来执行的初始化

&emsp;&emsp;两者的区别在于执行时的不同：async 脚本在 script 文件下载完成后会立即执行，并且其执行时间一定在 window 的 load 事件触发之前。这意味着多个 async 脚本很可能不会按其在页面中的出现次序顺序执行；与此相对，浏览器确保多个 defer 脚本按其在 HTML 页面中的出现顺序依次执行，且执行时机为 DOM 解析完成后，document 的 DOMContentLoaded 事件触发之前

&emsp;&emsp;注意：如果同时设置 async 和 defer，和只设置 async 属性的效果一致

&emsp;&emsp;下面展示的是一个需要 1 秒来下载，以及 1 秒来解析执行其他操作的例子，整个页面载入花了大约 2 秒钟

<div><img src="https://pic.xiaohuochai.site/blog/HTML_structure_docHead_common.png" alt="common"></div>

&emsp;&emsp;同样的例子，但这次我们指定了 script 的 defer 属性.因为当 defer 脚本下载的时候，其他操作可以并行执行，所以大概快了 1 倍

<div><img src="https://pic.xiaohuochai.site/blog/HTML_structure_docHead_defer.png" alt="defer"></div>
