# SVG 动画

&emsp;&emsp;SVG 动画非常强大，只需要设置 HTML 元素，不需要 CSS 和 JS，就可以实现动画效果。本文将详细介绍 SVG 动画

&nbsp;

### 概述

&emsp;&emsp;动画实际上就是值关于时间的一个函数。在这个函数中，包含起始值和结束值，经过的时间一般被称为持续时间。动画执行时的曲线就是动画函数。但是，在计算机中，不可能穷尽每一时刻的状态，而是取多个采样点，每个采样点就叫做帧。要让动画流畅显示，一般地需要每秒 60 帧

&emsp;&emsp;在 SVG 中实现动画主要通过 SMIL。SVG 的动画元素是和 SMIL 开发组合作开发的。SMIL 开发组和 SVG 开发组合作开发了 SMIL 动画规范，在规范中制定了一个基本的 XML 动画特征集合。SVG 吸收了 SMIL 动画规范当中的动画优点，并提供了一些 SVG 继承实现

&emsp;&emsp;注意：SVG 动画除了 IE 浏览器不支持之外，兼容其他主流浏览器

&nbsp;

### 动画元素

&emsp;&emsp;SVG 动画元素共有 4 个，包括：`<set>`、`<animate>`、`<animateTransform>`、`<animateMotion>`

【`<set>`】

&emsp;&emsp;`<set>`可以实现基本的延迟功能。就是指：可以在特定时间之后修改某个属性值（也可以是 CSS 属性值）

```
<svg height="70" xmlns="http://www.w3.org/2000/svg">
  <g>
    <text font-family="microsoft yahei" font-size="20" y="30" x="30">
      的蓝色理想
      <set attributeName="x" attributeType="XML" to="60" begin="2s" />
    </text>
  </g>
</svg>
```

&emsp;&emsp;2s 后，文字会向右移动 30px

<iframe style="width: 100%; height: 100px;" src="https://demo.xiaohuochai.site/js/svg/animate/a1.html" frameborder="0" width="230" height="240"></iframe>

【`<animate>`】

&emsp;&emsp;`<animate>`是基础动画元素，用于实现单属性的动画过渡效果

```
<svg height="70" xmlns="http://www.w3.org/2000/svg">
  <g>
    <text font-family="microsoft yahei" font-size="20" y="30" x="30">
      的蓝色理想
      <animate attributeName="x" to="60" begin="0s" dur="2s"  repeatCount="indefinite" />
    </text>
  </g>
</svg>
```

<iframe style="width: 100%; height: 100px;" src="https://demo.xiaohuochai.site/js/svg/animate/a2.html" frameborder="0" width="230" height="240"></iframe>

【`<animateTransform>`】

&emsp;&emsp;`<animateTransform>`用于实现 transform 变换动画效果

```
<svg height="70" xmlns="http://www.w3.org/2000/svg">
  <g>
    <text font-family="microsoft yahei" font-size="20" y="30" x="30">
      的蓝色理想
      <animateTransform attributeName="transform" type="scale" from="1" to="1.5" begin="0s" dur="2s"  repeatCount="indefinite" />
    </text>
  </g>
</svg>
```

<iframe style="width: 100%; height: 100px;" src="https://demo.xiaohuochai.site/js/svg/animate/a3.html" frameborder="0" width="230" height="240"></iframe>

【`<animateMotion>`】

&emsp;&emsp;`<animateMotion>`可以让 SVG 各种图形沿着特定的 path 路径运动

```
<svg height="70" xmlns="http://www.w3.org/2000/svg">
  <g>
    <text font-family="microsoft yahei" font-size="20" y="0" x="0">
      火柴
      <animateMotion path="M 20 20 H 60 V 50 Z" begin="0s" dur="3s" repeatCount="indefinite" />
    </text>
    <path d="M 20 20 H 60 V 50 Z" fill="transparent" stroke="black"></path>
  </g>
</svg>
```

<iframe style="width: 100%; height: 100px;" src="https://demo.xiaohuochai.site/js/svg/animate/a4.html" frameborder="0" width="230" height="240"></iframe>

&nbsp;

### 动画属性

【attributeName】

&emsp;&emsp;attributeName 表示要变化的元素属性名称

&emsp;&emsp;① 可以是元素直接暴露的属性，例如，对应的 text 元素上的 x, y 或者 font-size;

&emsp;&emsp;② 可以是 CSS 属性。例如，透明度 opacity

```
<svg height="70" xmlns="http://www.w3.org/2000/svg">
  <g>
    <text font-family="microsoft yahei" font-size="20" y="30" x="30">
      的蓝色理想
      <animate attributeName="opacity" to="0" begin="0s" dur="1s"  repeatCount="indefinite" />
    </text>
  </g>
</svg>
```

<iframe style="width: 100%; height: 100px;" src="https://demo.xiaohuochai.site/js/svg/animate/a5.html" frameborder="0" width="230" height="240"></iframe>

【attributeType】

&emsp;&emsp;attributeType 支持三个固定参数：CSS、XML、auto，用来表明 attributeName 属性值的列表。x、y 以及 transform 属于 XML；opacity 等 CSS 属于 CSS；auto 为默认值，自动判别的意思（实际上是先当成 CSS 处理，如果发现不认识，直接 XML 类别处理）。因此，如果不确信某属性是 XML 类别还是 CSS 类别的时候，可以不设置 attributeType 值，直接让浏览器自己去判断

【from, to, by, values】

```
from  动画的起始值
to  指定动画的结束值
by 动画的相对变化值
values  用分号分隔的一个或多个值，可以看成是动画的多个关键值点
```

&emsp;&emsp;from、to、by、values 相互之间有制约关系：

&emsp;&emsp;1、如果动画的起始值与元素的默认值是一样的，from 参数可以省略

&emsp;&emsp;2、如果不考虑 values，to、by 两个参数至少需要有一个出现。否则没有动画效果。to 表示绝对值，by 表示相对值。以位移距离为例子，如果 from 是 100, to 值为 160，则表示移动到 160 这个位置；如果 by 值是 160，则表示移动到 100+160=260 这个位置

&emsp;&emsp;3、如果 to、by 同时出现，则只识别 to

&emsp;&emsp;4、 当 values 值设置并能识别时，from、to、by 的值都会被忽略

```
<svg height="70" xmlns="http://www.w3.org/2000/svg">
  <g>
    <text font-family="microsoft yahei" font-size="20" y="30" x="30">
      的蓝色理想
      <animate attributeName="x" values="30;50;30;70;30" dur="2s"  repeatCount="indefinite" />
    </text>
  </g>
</svg>
```

<iframe style="width: 100%; height: 100px;" src="https://demo.xiaohuochai.site/js/svg/animate/a6.html" frameborder="0" width="230" height="240"></iframe>

【时间表示】

&emsp;&emsp;SVG animation 中的时间表示，常见单位有 "h"、"min"、"s"、"ms"。单位含义都是英文单位的缩写。例如 h 表示小时(hour)

&emsp;&emsp;时间值支持小数写法，因此，90s 也可以使用 1.5min 表示。时间值还支持 hh:mm:ss 这种写法，因此，90s 也可以使用 01:30 表示

&emsp;&emsp;如果 begin="1.5"没有单位，这里的小数点表示秒，也就是 1.5s 的意思

【begin、end】

&emsp;&emsp;begin 指动画开始的时间，begin 的定义是分号分隔的一组值。

&emsp;&emsp;例如，beigin="3s;6s"表示的是 3s 之后动画走一下，6s 时候动画再走一下（如果之前动画没走完，会立即停止从头开始）

&emsp;&emsp;所以，如果一次动画时间为 3s, 即 dur="3s"，同时没有 repeatCount 属性时候，可以看到动画似乎连续执行了 2 次

&emsp;&emsp;begin 的单值除了普通 value，还有下面这些类别的 value：

```
offset-value | syncbase-value | event-value | repeat-value | accessKey-value | media-marker-value | wallclock-sync-value | "indefinite"
```

&emsp;&emsp;① offset-value 表示偏移值，数值前面有+或-，相对于 document 的 begin 值而言。

&emsp;&emsp;② syncbase-value 基于同步确定的值。语法为：`[元素的id].begin/end +/- 时间值`。就是说借用其他元素的 begin 值进行加减运算，这个可以准确实现两个独立元素的动画级联效果

```
<svg height="70" xmlns="http://www.w3.org/2000/svg">
  <g>
    <text font-family="microsoft yahei" font-size="20" y="30" x="30">
      的蓝色理想
      <animate id="x" attributeName="x" to="70" dur="2" fill="freeze"/>
      <animate attributeName="y" begin="x.end" to="60" dur="2" fill="freeze"/>
    </text>
  </g>
</svg>
```

<iframe style="width: 100%; height: 100px;" src="https://demo.xiaohuochai.site/js/svg/animate/a7.html" frameborder="0" width="230" height="240"></iframe>

&emsp;&emsp;③ event-value 表示与事件相关联的值。类似于 PowerPoint 动画的“点击执行该动画”。语法是：`[元素的id].[事件类型] +/- 时间值`

```
<svg height="70" xmlns="http://www.w3.org/2000/svg">
  <g>
    <circle id="circle1" cx="15" cy="15" r="15"/>
    <text font-family="microsoft yahei" font-size="20" y="30" x="30">
      的蓝色理想
      <animate id="x" attributeName="x" begin="circle1.click" to="70" dur="2"/>
    </text>
  </g>
</svg>
```

&emsp;&emsp;点击小球，会触发文字的运动。如果想点击小球 2 秒后文字才支持，加上偏移时间就可以了——begin="circle1.click+2s"

```
<svg height="70" xmlns="http://www.w3.org/2000/svg">
  <g>
    <circle id="circle1" cx="15" cy="15" r="15"/>
    <text font-family="microsoft yahei" font-size="20" y="30" x="30">
      的蓝色理想
      <animate id="x" attributeName="x" begin="circle1.click" to="70" dur="2"/>
    </text>
  </g>
</svg>
```

<iframe style="width: 100%; height: 100px;" src="https://demo.xiaohuochai.site/js/svg/animate/a8.html" frameborder="0" width="230" height="240"></iframe>

&emsp;&emsp;④ repeat-value 指重复 N 次之后再进行其他运动。语法为：`[元素的id].repeat(整数) +/- 时间值`

&emsp;&emsp;注意：经测试该属性并不生效

```
<svg height="70" xmlns="http://www.w3.org/2000/svg">
  <g>
    <text font-family="microsoft yahei" font-size="20" y="30" x="30">
      的蓝色理想
      <animate id="x" attributeName="x" to="70" dur="2"/>
      <animate attributeName="y" begin="x.repeat(2)" to="70" dur="2" fill="freeze"/>
    </text>
  </g>
</svg>
```

&emsp;&emsp;⑤accessKey-value 定义快捷键。即按下某个按键动画开始。语法为：accessKey("character")。character 表示快捷键所在的字符

&emsp;&emsp;注意：经测试该属性并不生效

```
<svg height="70" xmlns="http://www.w3.org/2000/svg">
  <g>
    <text font-family="microsoft yahei" font-size="20" y="30" x="30">
      的蓝色理想
      <animate attributeName="y" begin="accessKey('s')" to="70" dur="2" />
    </text>
  </g>
</svg>
```

&emsp;&emsp;⑥ wallclock-sync-value 指真实世界的时钟时间定义。时间语法是基于在 ISO8601 中定义的语法

&emsp;&emsp;⑦ "indefinite"这个字符串值，表示“无限等待”。需要指向该动画元素的超链接(SVG 中的 a 元素)

```
<svg height="70" xmlns="http://www.w3.org/2000/svg">
  <g>
    <text font-family="microsoft yahei" font-size="20" y="30" x="40">
      的蓝色理想
      <animate id="animate1" attributeName="x" begin="indefinite" to="70" dur="1" repeatCount="indefinite"/>
    </text>
     <a xlink:href="#animate1">
          <text  y="30" fill="#cd0000" font-size="20">点击</text>
     </a>
  </g>
</svg>
```

<iframe style="width: 100%; height: 100px;" src="https://demo.xiaohuochai.site/js/svg/animate/a9.html" frameborder="0" width="230" height="240"></iframe>

【dur】

&emsp;&emsp;dur 属性值只有两种：常规时间值 | "indefinite"

&emsp;&emsp;“常规时间值”就是 3s 之类的正常值；"indefinite"指动画不执行

【calcMode, keyTimes, keySplines】

&emsp;&emsp;这几个参数是控制动画曲线的

&emsp;&emsp;calcMode 属性支持 4 个值：discrete | linear | paced | spline. 中文意思分别是：“离散”|“线性”|“踏步”|“样条”

```
discrete from值直接跳到to值
linear animateMotion元素以外元素的calcMode默认值。动画从头到尾的速率都是一致的
paced 通过插值让动画的变化步调平稳均匀。仅支持线性数值区域内的值，这样点之间“距离”的概念才能被计算（如position, width, height等）。如果”paced“指定，任何keyTimes或keySplines值都失效
spline 插值定义贝塞尔曲线。spline点的定义在keyTimes属性中，每个时间间隔控制点由keySplines定义
```

```
keyTimes = “<list>”
```

&emsp;&emsp;跟上面提到的`<list>`类似，都是分号分隔一组值。keyTimes 是关键时间点的意思，这里有一些约定的规则：首先，keyTimes 值的数目要和 values 一致，如果是 from/to/by 动画，keyTimes 就必须有两个值。然后对于 linear 和 spline 动画，第一个数字要是 0, 最后一个是 1。 最后，每个连续的时间值必须比它前面的值大或者相等

&emsp;&emsp;paced 模式下，keyTimes 会被忽略；keyTimes 定义错误，也会被忽略；dur 为 indefinite 也会被忽略

```
keySplines = “<list>”
```

&emsp;&emsp;keySplines 表示的是与 keyTimes 相关联的一组贝塞尔控制点（默认 0 0 1 1）。每个控制点使用 4 个浮点值表示：x1 y1 x2 y2. 只有模式是 spline 时候这个参数才有用，也是分号分隔，值范围 0~1，总是比 keyTimes 少一个值。

&emsp;&emsp;如果 keySplines 值不合法或个数不对，是没有动画效果的

&emsp;&emsp;下面是离散值 discrete 的例子

```
<svg height="70" xmlns="http://www.w3.org/2000/svg">
  <g>
    <text font-family="microsoft yahei" font-size="20" y="30" x="40">
      的蓝色理想
      <animate id="animate1" attributeName="x"  dur="3" values="40;60;80;100" calcMode="discrete" repeatCount="indefinite"/>
    </text>
  </g>
</svg>
```

<iframe style="width: 100%; height: 100px;" src="https://demo.xiaohuochai.site/js/svg/animate/a10.html" frameborder="0" width="230" height="240"></iframe>

&emsp;&emsp;下面是踏步值 paces 的例子

```
<svg height="70" xmlns="http://www.w3.org/2000/svg">
  <g>
    <text font-family="microsoft yahei" font-size="20" y="30" x="40">
      的蓝色理想
      <animate id="animate1" attributeName="x"  dur="3" values="40;60;80;100" calcMode="paced" repeatCount="indefinite"/>
    </text>
  </g>
</svg>
```

<iframe style="width: 100%; height: 100px;" src="https://demo.xiaohuochai.site/js/svg/animate/a11.html" frameborder="0" width="230" height="240"></iframe>

&emsp;&emsp;下面是贝塞尔曲线 spline 的例子

```
<svg height="70" xmlns="http://www.w3.org/2000/svg">
  <g>
    <text font-family="microsoft yahei" font-size="20" y="30" x="40">
      的蓝色理想
      <animate id="animate1" attributeName="x"  dur="3" values="40;60;100" keyTimes="0; .8; 1" calcMode="spline"  keySplines=".5 0 .5 1; 0 0 1 1" repeatCount="indefinite"/>
    </text>
  </g>
</svg>
```

<iframe style="width: 100%; height: 100px;" src="https://demo.xiaohuochai.site/js/svg/animate/a12.html" frameborder="0" width="230" height="240"></iframe>

【repeatCount, repeatDur】

&emsp;&emsp;repeatCount 表示动画执行次数，可以是合法数值或者"indefinite"

&emsp;&emsp;repeatDur 定义重复动画的总时间。可以是普通时间值或者"indefinite"

```
<animate attributeName="x" to="60" dur="3s" repeatCount="indefinite" repeatDur="10s" />
```

&emsp;&emsp;上面的代码中，动画只执行完整 3 个 + 一个 1/3 个动画。因为 repeat 总时间是 10s

【fill】

&emsp;&emsp;fill 表示动画间隙的填充方式。支持参数有：freeze | remove。其中 remove 是默认值，表示动画结束直接回到开始的地方。freeze“冻结”表示动画结束后像是被冻住了，元素保持了动画结束之后的状态

【accumulate, additive】

&emsp;&emsp;accumulate 是累积的意思。支持参数有：none | sum。默认值是 none，如果值是 sum 表示动画结束时候的位置作为下次动画的起始位置

&emsp;&emsp;additive 控制动画是否附加。支持参数有：replace | sum。默认值是 replace.，如果值是 sum 表示动画会附加到其他低优先级的动画上

【restart】

&emsp;&emsp;restart 支持的参数有：always | whenNotActive | never.

&emsp;&emsp;always 是默认值，表示总是。whenNotActive 表示动画正在进行的时候，是不能重启动画的。never 表示动画是一波流

【min、max】

&emsp;&emsp;min/max 表示动画执行最短和最长时间。支持参数为时间值和"media"（媒介元素有效）, max 还支持 indefinite

&nbsp;

### API

&emsp;&emsp;SVG animation 有内置的 API 可以暂停和启动动画的。语法为：

```
// 暂停
svg.pauseAnimations();

// 恢复
svg.unpauseAnimations()
```

```
<svg height="70" xmlns="http://www.w3.org/2000/svg" id="svg">
  <g id="test">
    <text font-family="microsoft yahei" font-size="20" y="30" x="40">
      的蓝色理想
      <animate id="animate1" attributeName="x"  dur="2" to="80" repeatCount="indefinite" />
    </text>
  </g>
</svg>
<script>
svg.onclick = function(){
  if(!this.paused){
    this.paused = true;
    this.pauseAnimations();
  }else{
    this.paused = false;
    this.unpauseAnimations();
  }
}
</script>
```

&emsp;&emsp;点击文字可暂停或恢复

<iframe style="width: 100%; height: 100px;" src="https://demo.xiaohuochai.site/js/svg/animate/a13.html" frameborder="0" width="230" height="240"></iframe>
