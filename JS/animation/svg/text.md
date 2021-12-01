# SVG 文本

&emsp;&emsp;本文将详细介绍 SVG 文本相关内容

&nbsp;

### 位置属性

&emsp;&emsp;在一个 SVG 文档中，使用`<text>`元素来设置文本，`<text>`元素有 x、y、dx、dy 这四个位置属性

【x 和 y】

&emsp;&emsp;属性 x 和属性 y 性决定了文本在视口中显示的位置

```
<text x="30" y="30">Hello World!</text>
```

<iframe style="width: 100%; height: 60px;" src="https://demo.xiaohuochai.site/js/svg/text/t-1.html" frameborder="0" width="230" height="240"></iframe>

&emsp;&emsp;可以只设置 y 属性，此时 x 属性默认为 0

&emsp;&emsp;注意:如果不设置 y 属性，则文本将不会显示

```
<text  y="30">Hello World!</text>
```

<iframe style="width: 100%; height: 60px;" src="https://demo.xiaohuochai.site/js/svg/text/t0.html" frameborder="0" width="230" height="240"></iframe> 
【dx和dy】

&emsp;&emsp;属性 dx 和 dy 用于设置文本相对于当前位置的偏移量

```
<svg version="1.1" height="70" xmlns="http://www.w3.org/2000/svg">
  <text x="30" y="30">Hello World!</text>
  <text x="30" y="50" dx="10">Hello World!</text>
</svg>
```

<iframe style="width: 100%; height: 100px;" src="https://demo.xiaohuochai.site/js/svg/text/t1.html" frameborder="0" width="230" height="240"></iframe>

&emsp;&emsp;如果 dx 或 dy 的值是多个值，则从第二个值开始，表示文本内字符的间距

```
<svg version="1.1" height="70" xmlns="http://www.w3.org/2000/svg">
  <text x="30" y="30">Hello World!</text>
  <text x="30" y="50" dx="10 10 20 30 40">Hello World!</text>
</svg>
```

<iframe style="width: 100%; height: 100px;" src="https://demo.xiaohuochai.site/js/svg/text/t2.html" frameborder="0" width="230" height="240"></iframe> 


&nbsp;

### 对齐属性

【水平对齐】

&emsp;&emsp;属性 text-anchor 用来设置水平对齐，取值包括：start、middle、end 或 inherit

```
<svg version="1.1" width="200" height="100" xmlns="http://www.w3.org/2000/svg">
  <polyline points="130 80, 130 20, 200,20" fill="transparent" stroke="black"/>
  <text x="130" y="20" text-anchor="start"></text>
  <text x="130" y="50" text-anchor="middle"></text>
  <text x="130" y="80" text-anchor="end"></text>
</svg>
```

<iframe style="width: 100%; height: 130px;" src="https://demo.xiaohuochai.site/js/svg/text/t3.html" frameborder="0" width="230" height="240"></iframe> 


【垂直对齐】

&emsp;&emsp;属性 dominant-baseline 可以设置垂直对齐，包括以下属性

<iframe style="width: 100%; height: 530px;" src="https://demo.xiaohuochai.site/js/svg/text/t4.html" frameborder="0" width="230" height="240"></iframe> 


&nbsp;

### 样式属性

&emsp;&emsp;和形状元素类似，属性 fill 可以给文本填充颜色，属性 stroke 可以给文本描边，也可以引用渐变或图案

&emsp;&emsp;对于字体相关属性，下列每个属性可以被设置为一个 SVG 属性或者成为一个 CSS 声明：font-family、font-style、font-weight、font-variant、font-stretch、font-size、font-size-adjust、kerning、letter-spacing、word-spacing 和 text-decoration

```
<svg version="1.1" height="30" xmlns="http://www.w3.org/2000/svg">
  <text y="20" font-size="20px" font-weight="bold" stroke="red" fill="transparent">Hello World!</text>
</svg>
```

<iframe style="width: 100%; height: 60px;" src="https://demo.xiaohuochai.site/js/svg/text/t5.html" frameborder="0" width="230" height="240"></iframe>

&nbsp;

### tspan

&emsp;&emsp;tspan 元素用来标记大块文本的子部分，它必须是一个 text 元素或别的 tspan 元素的子元素。一个典型的用法是把句子中的一个词变成粗体

```
<text x="10" y="50">
  <tspan font-weight="bold"></tspan>的蓝色理想
</text>
```

<iframe style="width: 100%; height: 100px;" src="https://demo.xiaohuochai.site/js/svg/text/t6.html" frameborder="0" width="230" height="240"></iframe>

【自定义属性】

&emsp;&emsp;tspan 元素有以下的自定义属性

&emsp;&emsp;x 为容器设置一个新绝对 x 坐标。它覆盖了默认的当前的文本位置。这个属性可以包含一个数列，它们将一个一个地应用到 tspan 元素内的每一个字符上

&emsp;&emsp;dx 从当前位置，用一个水平偏移开始绘制文本。这里，可以提供一个值数列，可以应用到连续的字体，因此每次累积一个偏移

&emsp;&emsp;类似地，还有 y 和 dy

&emsp;&emsp;rotate 把所有的字符旋转一个角度。如果是一个数列，则使每个字符旋转分别旋转到那个值，剩下的字符根据最后一个值旋转

&emsp;&emsp;textLength 这是一个很模糊的属性，给出字符串的计算长度。它意味着如果它自己的度量文字和长度不满足这个提供的值，则允许渲染引擎精细调整字型的位置

```
<svg version="1.1" height="30" xmlns="http://www.w3.org/2000/svg">
  <text x="10" y="20">
    的<tspan x="100" dx="0 10 10 10" rotate="30" font-weight="bold">蓝色理想</tspan>
  </text>
</svg>
```

<iframe style="width: 100%; height: 60px;" src="https://demo.xiaohuochai.site/js/svg/text/t7.html" frameborder="0" width="230" height="240"></iframe> 


&nbsp;

### textPath

&emsp;&emsp;该元素利用路径文本 textPath 的 xlink:href 属性取得一个任意路径，把字符对齐到路径，于是字体会环绕路径、顺着路径走

&emsp;&emsp;注意:如果给出的路径长度不够长，则超出部分不会被渲染出来

&emsp;&emsp;渲染原理如下图所示

![](https://pic.xiaohuochai.site/blog/svg_text1.png)

&emsp;&emsp;下面是一个例子

```
<svg version="1.1" width="300" height="100" xmlns="http://www.w3.org/2000/svg">
  <path id="my_path" d="M 20,20 C 50 50, 160 50, 160 20" fill="none"/>
  <text>
    <textPath xlink:href="#my_path">的蓝色理想</textPath>
  </text>
</svg>
```

<iframe style="width: 100%; height: 100px;" src="https://demo.xiaohuochai.site/js/svg/text/t8.html" frameborder="0" width="230" height="240"></iframe>

【属性】

&emsp;&emsp;使用 textPath 后，text 元素的 x 和 y 属性的含义有所改变

```
x 路径位置
y 无效
```

<iframe style="width: 100%; height: 340px;" src="https://demo.xiaohuochai.site/js/svg/text/t9.html" frameborder="0" width="230" height="240"></iframe>

&emsp;&emsp;textPath 只有一个 startOffset 属性，用来确定排列起始位置

<iframe style="width: 100%; height: 320px;" src="https://demo.xiaohuochai.site/js/svg/text/t10.html" frameborder="0" width="230" height="240"></iframe> 


&nbsp;

### 波浪文字

&emsp;&emsp;下面使用 SVG，来实现波浪文字的效果。由于`<text>`标签的 dx、dy 属性可以控制文本间的间距。因此，可以通过定时器动态的修改他们的值，将其呈现出动态波浪文字的效果

```
<svg version="1.1" width="300" height="100" xmlns="http://www.w3.org/2000/svg">
  <text id="sinText" x="10" y="50">的蓝色理想的蓝色理想</text>
</svg>
<br>
<button id="btn1">开始运动</button>
<button id="btn2">暂停运动</button>
<script>
//n为文本的数量
var n = sinText.innerHTML.length;
//x和y分别储存dx和dy的值
var x = [],y = [];
//设置x的值
for(var i = 0; i < n; i++){
  x.push(2*Math.PI/n);
}
function arrange(t){
  //清空数组
  y = [];
  var ly = 0,cy;
  for(i = 0; i < n; i++){
    //计算当前的曲线的cy值
    cy = -20*Math.sin(0.5*i+t);
    //将y的差值保存到数组中
    y.push(cy-ly);
    //保存上一个y的值
    ly = cy;
  }
}
function render(){
  //将x、y数组中的值渲染到dx、dy中
  sinText.setAttribute('dx',x.join(' '));
  sinText.setAttribute('dy',y.join(' '));
}
(function init(){
  arrange(0);
  render();
})();
var t = 0;
var oTimer = null;
function frame(){
  t +=0.1;
  arrange(t);
  render();
  oTimer =  requestAnimationFrame(frame);
}
btn1.onclick = function(){
  cancelAnimationFrame(oTimer);
  oTimer =  requestAnimationFrame(frame);
}
btn2.onclick = function(){
  cancelAnimationFrame(oTimer);
}
</script>
```

<iframe style="width: 100%; height: 150px;" src="https://demo.xiaohuochai.site/js/svg/text/t11.html" frameborder="0" width="230" height="240"></iframe>
