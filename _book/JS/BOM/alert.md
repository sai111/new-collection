# 理解javascript中的对话框

&emsp;&emsp;通常我们调试程序时，如果需要阻塞效果，则要用到alert()。但除了alert()以外，window对象还提供了其他3种对话框。本文将详细介绍window对象中的对话框

&nbsp;

### 定义

&emsp;&emsp;系统对话框与在浏览器中显示的网页没有关系，也不包含HTML。它们的外观由操作系统及浏览器设置决定，而不是由CSS决定。window对象下的常用对话框有alert()、confirm()、prompt()，当然也包含不常用的print()。通过这几个方法打开的对话框都是同步和模态的。也就是说，显示这些对话框的时候代码会停止执行，而关掉这些对话框后代码又会恢复执行

&nbsp;

### alert()

&emsp;&emsp;alert()方法接受一个字符串，并将其显示给用户并等待用户关闭对话框

&emsp;&emsp;注意：该方法包含默认的String()隐式类型转换，非字符串类型会被转换为字符串

<div>
<pre>&lt;div id="myDiv"&gt;点击此处&lt;/div&gt;
&lt;script&gt;
myDiv.onclick = function(){
    alert([1,2,3]);//'1,2,3'
}
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 40px;" src="https://demo.xiaohuochai.site/js/alert/a1.html" frameborder="0" width="320" height="240"></iframe>

&emsp;&emsp;`alert()`方法的参数可以用`\n`指定换行

<div>
<pre>alert('本条提示\n分成两行');</pre>
</div>

<iframe style="width: 100%; height: 40px;" src="https://demo.xiaohuochai.site/js/alert/a2.html" frameborder="0" width="320" height="240"></iframe>

### confirm()

&emsp;&emsp;confirm()方法同样接收一个字符串，并将其显示给用户。返回的布尔值若是true表示单击OK，false表示单击Cancel或者右上角的关闭按钮

<div>
<pre>&lt;div id="myDiv"&gt;点击此处&lt;/div&gt;
&lt;script&gt;
myDiv.onclick = function(){
    if(confirm('是否添加背景颜色？')){
        myDiv.style.backgroundColor = 'pink';
    }else{
        myDiv.style.backgroundColor = 'transparent';
        alert('好吧，那就不加背景颜色了。')
    }
}
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 40px;" src="https://demo.xiaohuochai.site/js/alert/a3.html" frameborder="0" width="320" height="240"></iframe>

### prompt()

&emsp;&emsp;prompt()方法接收两个参数，要显示给用户的文本提示和文本输入域的默认值(可以是一个空字符串)。如果用户单击了OK按钮，则返回文本输入域的值；如果用户单击了Cancel或者右上角的关闭按钮，则该方法返回null

&emsp;&emsp;注意：prompt()方法的第二个参数是可选的，如果不提供的话，IE浏览器会在输入框中显示`undefined`。因此，最好总是提供第二个参数，作为输入框的默认值

<div>
<pre>var result = prompt(text[, default]);</pre>
</div>
<div>
<pre>&lt;div id="myDiv"&gt;点击此处&lt;/div&gt;
&lt;script&gt;
myDiv.onclick = function(){
    var result = prompt("能告诉你叫什么吗?" ,"火柴");
    if(result != null){
        if(result == '火柴'){
            alert('火柴是我的名字哦');
        }else{
            alert("欢迎你,"+result); 
        }
    }else{
        alert('好吧，欢迎你，匿名。我以前一直以为匿名是个作家的名字');
    }
}
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 40px;" src="https://demo.xiaohuochai.site/js/alert/a4.html" frameborder="0" width="320" height="240"></iframe>

### print()

&emsp;&emsp;window.print()方法可以用来显示打印对话框

<div>
<pre>&lt;div id="myDiv"&gt;点击此处&lt;/div&gt;
&lt;script&gt;
myDiv.onclick = function(){
    window.print();
}
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 40px;" src="https://demo.xiaohuochai.site/js/alert/a5.html" frameborder="0" width="320" height="240"></iframe>
