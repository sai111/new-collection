# javascript基础语法——变量和标识符

&emsp;&emsp;关于javascript，第一个比较重要的概念是变量，变量的工作机制是javascript的基本特性。实际上，变量是标识符的一种。本文将详细介绍变量和标识符

&nbsp;

### 定义

&emsp;&emsp;标识符(Identifier)就是一个名字，用来对变量、函数、属性、参数进行命名，或者用做某些循环语句中的跳转位置的标记

<div>
<pre>//变量
var Identifier = 123;
//属性
(new Object).Identifier = 'test';
//函数及参数
function IdentifierName(Identifier1){};
//跳转标记
Identifier:
for(var i = 0; i &lt; 5; i++){
    if(i == 3){
        break Identifier;
    }
}</pre>
</div>

&emsp;&emsp;在日常生活中，有些东西是固定不变的，有些东西则会发生变化。例如，人的姓名和生日是固定不变的，但心情和年龄却会随着时间变化而变化。人们把那些会发生变化的东西称为变量

&emsp;&emsp;当程序需要将值保存起来以备将来使用时，便将其赋值给一个变量。变量(variable)是一个用于保存值的占位符，可以通过变量名称来获得对值的引用

![variable](https://pic.xiaohuochai.site/blog/JS_ECMA_grammer_variable.jpg)

### 命名规则

&emsp;&emsp;在[词法结构](http://www.cnblogs.com/xiaohuochai/p/5543930.html)一文中，我们介绍到javascript是一门区分字母大小写的语言，且和其他任何编程语言一样，javascript保留了一些标识符为自己所用，[保留字](http://www.cnblogs.com/xiaohuochai/p/5543930.html#anchor4)不能用做普通的标识符

&emsp;&emsp;注意：保留字包括关键字、未来保留字、空字面量和布尔值字面量

<div>
<pre>保留字 ReservedWord ::
   Keyword
   FutureReservedWord
   NullLiteral
   BooleanLiteral</pre>
</div>

&emsp;&emsp;此外，javascript预定义了很多全局变量和函数，应该避免把它们的名字用做标识符名

<div>
<pre>arguments Array Boolean Date decodeURI decodeURIComponent encodeURI
encodeURIComponent Error eval EvalError Function Infinity isFinite
isNaN JSON Math NaN Number Object parseFloat parseInt RangeError
ReferenceError RegExp String SyntaxError TypeError undefined URIError</pre>
</div>

&emsp;&emsp;javascript标识符名允许包含字母、数字、美元符号和下划线(但第一个字符不允许是数字)

<div>
<pre>//错误示范
  6num  //开头不能用数字
  %sum //开头不能用除(_ $)外特殊符号,如(%  + /等)
  sum+num //开头中间不能使用除(_ $)外特殊符号，如(%  + /等)</pre>
</div>

&emsp;&emsp;javascript允许标识符中出现Unicode字符全集中的字母和数字(包括中文)。因此，程序员也可以使用非英语语言或数学符号来书写标识符

<div>
<pre>var 测试文字 = 'test';</pre>
</div>

&emsp;&emsp;注意：出于可移植性和易于书写的考虑，通常我们不使用扩展的ASCII或Unicode字符

&emsp;&emsp;通常驼峰格式是标识符命名的首选格式，第一个字母小写，剩下的每个单词的首字母大写

<div>
<pre>var myMoodToday = 'happy';</pre>
</div>

&emsp;&emsp;对于不同的数据类型，javascript有约定俗成的标识符名命名规则

<div>
<pre>
类型                    前缀            示例        
数组(Array) 　 　     a 　 　     aItems
布尔值(Boolean)    　　   b 　 　 　　    bIsComplete
浮点数(Float)    　　     f 　　  　　    fPrice
函数(Function)　　　 　   fn 　   　　    fnHandler
整数(Integer) 　　　 　   i 　　  　　    iItemCount
对象(Object) 　　　　     o 　　  　　    oDIv1
正则表达式(RegExp)        re 　   　　    reEmailCheck
字符串(String) 　　       s 　　  　　    sUserName
变量(Variant)　　 　 　   v 　　  　　    vAnything </pre>
</div>

&emsp;&emsp;上面这种命名方法，叫匈牙利命名法。当前主流的编程规范都不推荐这种命名法，但我个人认为可以将匈牙利命名法和当前编程规范结合起来使用

&emsp;&emsp;一般来说，变量的命名要使用名词，而函数应该是动词+名称的形式

```
var count = 10;
var myName="xiaohuochai";
var found = true;
function getName(){
  return 123;  
}
```
&emsp;&emsp;对于变量命名来说，尽量要在变量名中体现出值的数据类型

&emsp;&emsp;比如，命名count、length和size表明数据类型是数字，而命名name、title和message表明数据类型是字符串。用单个字符命名的变量诸如i、j、k通常在循环中使用

&emsp;&emsp;在变量命名中，对于初始类型和对象是不容易区分的，因为它们都是名词。所以，对于这种情况来说，可以使用匈牙利命名法进行区分

&emsp;&emsp;而对于函数和方法命名来说，第一个单词应该是动词，下面是一些使用动词常见的约定

```
can    函数返回一个布尔值
has    函数返回一个布尔值
is    函数返回一个布尔值
get    函数返回一个非布尔值
set    函数用来保存一个值
```

&nbsp;

### 变量声明

**声明**

&emsp;&emsp;在javascript中，使用一个变量之前应当先声明(declare)，变量是使用关键字var(variable的缩写)来声明的

<div>
<pre>var i;
var sum;</pre>
</div>

&emsp;&emsp;也可以通过一个var关键字来声明多个变量

<div>
<pre>var i ,sum;</pre>
</div>

**赋值**

&emsp;&emsp;把值存入变量的操作称为赋值(assignment)。一个变量被赋值以后，我们就说该变量包含这个值

&emsp;&emsp;给变量第一次赋值的过程，叫初始化

&emsp;&emsp;我们可以将变量的初始赋值和变量声明合写在一起

<div>
<pre>var message = 'hello';
var i=0,j=0,k=0;</pre>
</div>

&emsp;&emsp;如果未在var声明语句中给变量指定初始值，那么虽然声明了这个变量，但在给它存入一个值之前，它的初始值就是undefined

![init](https://pic.xiaohuochai.site/blog/JS_ECMA_grammer_init.jpg)

&emsp;&emsp;在for循环和for-in循环中同样可以使用var语句，这样可以更简洁地声明在循环语法内中使用的循环变量

<div>
<pre>for(var i=0; i&lt;10; i++)console.log(i);</pre>
</div>

&emsp;&emsp;变量可以在声明时赋值，但不能有其他操作，如+=、-=等

<div>
<pre>var a = 2;//是正确的
var a += 2;//是错误的
var a = 2++;//是错误的，++只能用于变量，不能用于常量</pre>
</div>

**重复声明**

 &emsp;&emsp;使用var语句重复声明变量是合法且无害的，如果重复声明且带有赋值操作，相当于重新赋值

![duplicateDeclaration](https://pic.xiaohuochai.site/blog/JS_ECMA_grammer_duplicateDeclaration.jpg)

**遗漏声明**

&emsp;&emsp;如果试图读取一个没有声明的变量的值，javascript会报错

![missDeclaration](https://pic.xiaohuochai.site/blog/JS_ECMA_grammer_missDeclaration.jpg)
&emsp;&emsp;javascript允许遗漏声明，即直接对变量赋值而无需事先声明，赋值操作将自动声明该变量

![allowMissDeclaration](https://pic.xiaohuochai.site/blog/JS_ECMA_grammer_allowMissDeclaration.jpg)

&emsp;&emsp;但是，在ECMAScript5严格模式中，给一个没有声明的变量赋值会报错
<div>
<pre>&lt;script&gt;
'use strict';
a = 5;
console.log(a);
&lt;/script&gt;</pre>
</div>

![notAllowMissDeclaration](https://pic.xiaohuochai.site/blog/JS_ECMA_grammer_notAllowMissDeclaration.jpg)

<div>&nbsp;</div>

### 变量特性

&emsp;&emsp;javascript变量是弱类型(也叫松散类型)的，所谓松散类型就是可以用来保存任何类型的数据

&emsp;&emsp;编程语言分为动态类型语言和静态类型语言两种。 动态类型语言是指在运行期间才去做数据类型检查的语言，也就是说，在用动态类型的语言编程时，不用给任何变量指定数据类型，该语言会在第一次赋值给变量时，在内部将数据类型记录下来。javascript就是动态类型语言的代表

&emsp;&emsp;在javascript中，可以在修改变量值的同时修改值的类型

<div>
<pre>var message = 'hi';
message = 100;//有效，但不推荐</pre>
</div>

&emsp;&emsp;变量松散类型的特性总结起来有两点：一是声明时不用给变量指定数据类型；二是赋值时可以修改数据类型

&nbsp;

### 变量作用域

&emsp;&emsp;变量的作用域(scope)是程序源代码中定义这个变量的区域

&emsp;&emsp;作用域分为全局作用域和函数作用域(又叫局部作用域)两种

&emsp;&emsp;全局作用域是最外围的一个执行环境，在web浏览器中，全局执行环境被认为是window对象。所有全局变量和函数都是作为window对象的属性和方法创建的。全局变量拥有全局作用域，在javascript代码中的任何地方都是有定义的。全局作用域直到应用程序退出例如关闭网页或浏览器时才会被销毁

&emsp;&emsp;在函数内声明的变量只在函数体内有定义。它们是局部变量，作用域是局部性的。函数参数也是局部变量，它们只在函数体内有定义。函数作用域中的所有代码执行完毕后，该作用域被销毁，保存在其中的所有变量和函数定义也随之销毁

<div>
<pre>function test(){
    var message  = 'hi';
}
test();
alert(message);//错误</pre>
</div>

&emsp;&emsp;如果省略var操作符，则会创建一个全局变量

<div>
<pre>function test(){
    message  = 'hi';
}
test();
alert(message);//'hi'</pre>
</div>

&emsp;&emsp;虽然省略var操作符可以定义全局变量，但并不推荐。在局部作用域中定义的全局变量很难维护，而且如果有意地忽略了var操作符，也会由于相应变量不会马上就有定义而导致不必要的混乱，给未经声明的变量赋值在严格模式下会导致抛出ReferenceError错误

&emsp;&emsp;在函数体内，局部变量的优先级高于同名的全局变量，如果在函数内声明的一个局部变量或者函数参数中带有的变量和全局变量重名，那么全局变量就被局部变量遮盖

<div>
<pre>var scope = 'global';
function checkscope(){
    var scope = 'local';
    return scope;
};
checkscope();//'local'</pre>
</div>

&nbsp;

### 声明提升(hoisting)

**块级作用域**

&emsp;&emsp;块级作用域是指花括号内的每一段代码都具有各自的作用域，而javascript没有块级作用域。javascript只有函数作用域：变量在声明它们的函数体以及这个函数体嵌套的任意函数体内都是有定义的

&emsp;&emsp;这意味着，变量在声明之前甚至已经可用。javascript这个特性被非正式地称为声明提升(hoisting)，javascript函数里声明的所有变量(不涉及赋值)都被提前到函数体的顶部

&emsp;&emsp;注意：其实除了变量提升，函数也被提升，到[函数部分](http://www.cnblogs.com/xiaohuochai/p/5700590.html)会有详细介绍

<div>
<pre>var scope = 'global';
function f(){
    console.log(scope);//undefined
    var scope = 'local';
    console.log(scope);//'local'
}</pre>
</div>
<div>
<pre>//变量声明提升之后，相当于下面代码
var scope = 'global';
function f(){
    var scope;
    console.log(scope);//undefined
    scope = 'local';
    console.log(scope);//'local'
}</pre>
</div>

&emsp;&emsp;javascript中没有块级作用域，所以一些程序员特意将变量声明放在函数体顶部，这种源代码非常清晰地反映了真实的变量作用域

&nbsp;

### 属性变量

&emsp;&emsp;当声明一个javascript全局变量时，实际上是定义了全局对象window的一个属性

&emsp;&emsp;当使用var声明一个变量时，创建的这个变量是不可配置的，也就是说这个变量无法通过delete运算符删除

<div>
<pre>var truevar = 1;
console.log(truevar,window.truevar);//1 1
delete truevar;//false
console.log(truevar,window.truevar);//1 1</pre>
</div>

&emsp;&emsp;如果没有使用严格模式并给一个未声明的变量赋值的话，javascript会自动创建一个全局变量，以这种方式创建的变量是全局对象的正常的可配置属性，并可以删除它们

&emsp;&emsp;注意：IE8-浏览器下，如果删除window属性时，不论该属性是如何创建的，都会报错

<div>
<pre>window.fakevar1 = 10;
this.fakevar2 = 20;
var fakevar3 = 30;
fakevar4 = 40;

console.log(delete fakevar1);//IE8-浏览器报错，其他浏览器返回true
console.log(delete fakevar2);//IE8-浏览器报错，其他浏览器返回true
console.log(delete fakevar3);//所有浏览器都返回false
console.log(delete fakevar4);//所有浏览器都返回true</pre>
</div>

&emsp;&emsp;javascript全局变量是全局对象的属性，这是在ECMAScript中强制规定的。局部变量当做跟函数调用相关的某个对象的属性。ECMAScript3称为调用对象(call object)，ECMAScript5称为声明上下文对象(declarative environment record)。javascript允许使用this关键字来引用全局对象，却没有办法可以引用局部变量中存放的对象。这种存放局部变量对象的特有性质，是一种对我们不可见的内部实现

&nbsp;

## 参考资料

【1】 ES5/语法 [https://www.w3.org/html/ig/zh/wiki/ES5/lexical](https://www.w3.org/html/ig/zh/wiki/ES5/lexical)

【2】 阮一峰Javascript标准参考教程&mdash;&mdash;语法概述 [http://javascript.ruanyifeng.com/grammar/basic.html](http://javascript.ruanyifeng.com/grammar/basic.html)

【3】 W3School-Javascript高级教程&mdash;&mdash;ECMAScript变量 [http://www.w3school.com.cn/js/pro_js_variables.asp](http://www.w3school.com.cn/js/pro_js_variables.asp)

【4】《javascript权威指南(第6版)》第3章 类型、值和变量

【5】《javascript高级程序设计(第3版)》第3章 基本概念 第4章 变量、作用域和内存问题

【6】《javascript语言精粹(修订版)》第2章 语法

【7】《javascript DOM编程艺术(第2版)》第2章 Javascript语法

