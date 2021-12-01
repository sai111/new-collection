# CSS 以图换字的 9 种方法

&emsp;&emsp;CSS 以图换字的技术，很久都没人提起了。它是一种在 h1 标签内，使用图像替换文本元素的技术，使页面在设计和可访问性之间达到平衡。本文将详细介绍 CSS 以图换字的 9 种方法

&nbsp;

### 文字隐藏

&emsp;&emsp;在 h1 标签中，新增 span 标签来保存标题内容，然后将其样式设置为 display:none

<div>
<pre>  &lt;style&gt;
    h1 {
      width: 64px;
      height: 64px;
      background: url(https://static.xiaohuochai.site/icon/icon_64.ico);
      font: 12px/1 '微软雅黑';
    }
    span {
      display: none;
    }
  &lt;/style&gt;
  &lt;h1&gt;
    &lt;span&gt;的蓝色理想&lt;/span&gt;
  &lt;/h1&gt;</pre>
</div>

<iframe src="https://demo.xiaohuochai.site/CSS/imageReplacement/i1.html" width="80" height="80"></iframe>

&nbsp;

### 负缩进

&emsp;&emsp;通过使用 text-index:-9999px，这样一个比较大的负缩进，使文本移到页面以外的区域

<div>
<pre>  &lt;style&gt;
    h1 {
      width: 64px;
      height: 64px;
      background: url(https://static.xiaohuochai.site/icon/icon_64.ico);
      font: 12px/1 '微软雅黑';
      text-indent:-9999px;
    }
  &lt;/style&gt;
  &lt;h1&gt;的蓝色理想&lt;/h1&gt;</pre>
</div>

<iframe src="https://demo.xiaohuochai.site/CSS/imageReplacement/i2.html" width="80" height="80"></iframe>

&nbsp;

### 负 margin

&emsp;&emsp;通过使用 margin-left:-2000px，使盒模型向左偏移 2000px，然后将宽度设置为 2064px，从而页面中只显示 2064px 中 64px 的部分。将图片的背景设置为右对齐，且不重复

<div>
<pre>  &lt;style&gt;
    h1 {
      width: 2064px;
      height: 64px;
      background: url(https://static.xiaohuochai.site/icon/icon_64.ico) right no-repeat;
      font: 12px/1 '微软雅黑';
      margin-left:-2000px;
    }
  &lt;/style&gt;
  &lt;h1&gt;的蓝色理想&lt;/h1&gt;</pre>
</div>

<iframe src="https://demo.xiaohuochai.site/CSS/imageReplacement/i3.html" width="80" height="80"></iframe>

&nbsp;

### 上 padding

&emsp;&emsp;因为背景是显示在 padding-box 区域中的，而文本是显示在 content-box 区域中。所以，将 height 设置为 0，用 padding-top 来替代 height，并设置 overflow:hidden。则，可以只显示背景不显示文本

<div>
<pre>  &lt;style&gt;
    h1 {
      width: 64px;
      padding-top: 64px;
      height:0;
      overflow:hidden;
      background: url(https://static.xiaohuochai.site/icon/icon_64.ico);
      font: 12px/1 '微软雅黑';
    }
  &lt;/style&gt;
  &lt;h1&gt;的蓝色理想&lt;/h1&gt;</pre>
</div>

<iframe src="https://demo.xiaohuochai.site/CSS/imageReplacement/i4.html" width="80" height="80"></iframe>

&nbsp;

### 0 宽高

&emsp;&emsp;通过新增一个 span 标签来保存文本内容，并将该标签的宽高设置为 0，再设置溢出隐藏即可

<div>
<pre>  &lt;style&gt;
    h1 {
      width: 64px;
      height: 64px;
      background: url(https://static.xiaohuochai.site/icon/icon_64.ico);
      font: 12px/1 '微软雅黑';
    }
    span{display:block;width: 0;height:0;overflow:hidden;}
  &lt;/style&gt;
  &lt;h1&gt;&lt;span&gt;的蓝色理想&lt;/span&gt;&lt;/h1&gt;</pre>
</div>

<iframe src="https://demo.xiaohuochai.site/CSS/imageReplacement/i5.html" width="80" height="80"></iframe>

&nbsp;

### 文本透明

&emsp;&emsp;设置文本的颜色为 transparent，并设置 font-size 为 1px，即减少行高的影响

<div>
<pre>  &lt;style&gt;
    h1 {
      width: 64px;
      height: 64px;
      background: url(https://static.xiaohuochai.site/icon/icon_64.ico);
      color:transparent;
      font-size:1px;
      }
  &lt;/style&gt;
  &lt;h1&gt;的蓝色理想&lt;/h1&gt;</pre>
</div>

<iframe src="https://demo.xiaohuochai.site/CSS/imageReplacement/i6.html" width="80" height="80"></iframe>

&nbsp;

### 伪元素

&emsp;&emsp;使用 before 伪元素，content 设置为图片的 URL，在 h1 元素上设置溢出隐藏

<div>
<pre>  &lt;style&gt;
    h1 {
      width: 64px;
      height: 64px;
      overflow: hidden;
      font: 12px/1 '微软雅黑';
    }
    h1:before {
      content: url(https://static.xiaohuochai.site/icon/icon_64.ico);
      display: block;
    }
  &lt;/style&gt;
  &lt;h1&gt;的蓝色理想&lt;/h1&gt;</pre>
</div>

<iframe src="https://demo.xiaohuochai.site/CSS/imageReplacement/i7.html" width="80" height="80"></iframe>

&nbsp;

### 正缩进

&emsp;&emsp;设置 text-indent:100%，使文本缩进到父元素宽度区域的右侧。然后配合设置 white-space:nowrap 和 overflow:hidden，使文本不换行，并溢出隐藏。从而隐藏文本内容

<div>
<pre>  &lt;style&gt;
    h1 {
      width: 64px;
      height: 64px;
      background: url(https://static.xiaohuochai.site/icon/icon_64.ico);
      text-indent: 100%;
      white-space: nowrap;
      overflow: hidden;
      font: 12px/1 '微软雅黑';
    }
  &lt;/style&gt;
  &lt;h1&gt;的蓝色理想&lt;/h1&gt;</pre>
</div>

<iframe src="https://demo.xiaohuochai.site/CSS/imageReplacement/i8.html" width="80" height="80"></iframe>

&nbsp;

### 字体大小

&emsp;&emsp;通过设置 font-size:0，可以将字体大小设置为 0

<div>
<pre>  &lt;style&gt;
    h1 {
      width: 64px;
      height: 64px;
      background: url(https://static.xiaohuochai.site/icon/icon_64.ico);
      font-size:0;
    }
  &lt;/style&gt;
  &lt;h1&gt;的蓝色理想&lt;/h1&gt;</pre>
</div>

<iframe src="https://demo.xiaohuochai.site/CSS/imageReplacement/i9.html" width="80" height="80"></iframe>
