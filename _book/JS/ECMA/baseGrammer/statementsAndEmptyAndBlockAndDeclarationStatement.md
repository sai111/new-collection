# javascript语句——表达式语句、块语句、空语句和声明语句

&emsp;&emsp;如果[表达式](http://www.cnblogs.com/xiaohuochai/p/5564401.html)在javascript中是短语，那么语句(statement)就是javascript整句或命令。表达式计算出一个值，语句用来执行以使某件事发生。javascript程序无非就是一系列可执行语句的集合，javascript解释器依照语句的编写顺序依次执行。本文将介绍javascript语句中的四类语句&mdash;&mdash;表达式语句、块语句、空语句和声明语句

&nbsp;

### 表达式语句

&emsp;&emsp;表达式语句(expression statement)是javascript中最简单的语句，赋值、delete、函数调用这三类即是表达式，又是语句，所以叫做表达式语句

```
//赋值语句
greeting = 'hello ' + name;
i* = 3;

//递增运算符(++)和递减运算符(--)和赋值语句有关，它们的作用是改变一个变量的值，就像执行一条赋值语句一样
counter++;

//delete运算符
delete o.x;

//函数调用
alert(greeting);
window.close();
cs = Math.cos(x);
```

&emsp;&emsp;javascript语句以分号结束，但表达式不需要分号结尾。一旦在表达式后面添加分号，则javascript引擎就将表达式视为语句，这样会产生一些没有任何意义的语句(表达式语句除外)

```
1 + 3;
'abc';
```

&nbsp;

### 块语句

&emsp;&emsp;块语句又叫复合语句，javascript将多条语句联合在一起，形成一条复合语句(compound statement)

&emsp;&emsp;复合语句只须用花括号将多条语句括起来即可

```
{
    x = Math.PI;
    cx = Math.cos(x);
    console.log(cx);
}
```

&emsp;&emsp;关于块语句，有以下几点注意事项：

&emsp;&emsp;【1】语句块的结尾不需要分号。块中的原始语句必须以分号结束，但语句块不需要

&emsp;&emsp;【2】语句块中的行都有缩进，这不是必须的，但整齐的缩进能让代码可读性更强，更容易理解

&emsp;&emsp;【3】javascript中没有块级作用域，在语句块中声明的变量并不是语句块私有的(不包括es6)

```
{
    var i = 0;
    console.log(i++);//0
}
console.log(i++);//1
```

&nbsp;

### 空语句

&emsp;&emsp;在javascript中，当希望多条语句被当做一条语句使用时，使用复合语句来替代。空语句(empty statement)则恰好相反，它允许包含0条语句

```
;
```

&emsp;&emsp;javascript解释器执行空语句时不会执行任何动作。但当创建一个具有空循环体的循环时，空语句是有用的

&emsp;&emsp;在下面这个循环中，所有的操作都在表达式a[i++]=0中完成，这里并不需要任何循环体。然而javascript需要循环体中至少包含一条语句，因此，这里只使用了一个单独的分号来表示一条空语句

```
//初始化一个数组a
for(i = 0; i &lt; a.length; a[i++] = 0);
```

&emsp;&emsp;在for、while循环或if语句的右圆括号后的分号很不起眼，这可能造成一些bug，而这些bug很难定位到

```
//因为;的多余，造成与预想不同的结果
if((a == 0) || (b == 0));
o = null;
```

&emsp;&emsp;如果有特殊目的需要使用空语句，最好在代码中添加注释，这样可以更清楚地说明这条空语句是有用的

```
for(i = 0; i &lt; a.length; a[i++] = 0)/*empty*/;
```

&nbsp;

### 声明语句

&emsp;&emsp;声明语句包括变量声明和函数声明，分别使用var和function关键字

&emsp;&emsp;var语句用来声明一个或者多个变量，关键字var之后跟随的是要声明的变量列表，列表中的每一个变量都可以带有初始化表达式，用于指定它的初始值

```
var name_1 [ = value_1] [,...,name_n[=value_n]]
```
```
var i ;
var j = 0;
var p,q;
var x = 2, y = r;
```

&emsp;&emsp;关键字function用来定义函数，funcname是要声明的函数的名称的标识符，函数名之后的圆括号中是参数列表，参数之间使用逗号分隔。当调用函数时，这些标识符则指代传入函数的实参

&emsp;&emsp;函数体是由javascript语句组成的，语句的数量不限，且用花括号括起来。在定义函数时，并不执行函数体内的语句，它和调用函数时待执行的新函数对象相关联

```
function funcname([arg1 [,arg2 [...,argn]]]){statement}
```

&emsp;&emsp;function语句里的花括号是必需的，这和while循环和其他一些语句所使用的语句块是不同的，即使函数体内只包含一条语句，仍然必须使用花括号将其括起来

```
//正确
function hypotenuse(x,y){
    return Math.sqrt(x*x + y*y);
}
//错误
function hypotenuse(x,y)
    return Math.sqrt(x*x + y*y);
```

&emsp;&emsp;函数声明语句和函数定义表达式包含相同的函数名，但二者有所不同

```
//表达式
var f = function(x){return x+1;}
//语句
function f(x){return x+1;}
```

&emsp;&emsp;函数定义表达式只有变量声明提前了，变量的初始化代码仍然在原来的位置；而函数声明语句的函数名称和函数体均提前，脚本中的所有函数和函数中所有嵌套的函数都会在当前上下文中其他代码之前声明，也就是说，可以在声明一个javascript函数之前调用它

```
console.log(f1(0));//Uncaught TypeError: f1 is not a function
var f1 = function(x){return x+1;}

console.log(f2(0));//1
function f2(x){return x+1;}
```

&emsp;&emsp;变量声明语句和函数声明语句有几点相似之处

&emsp;&emsp;【1】变量声明语句和函数声明语句都会提前

```
console.log(a);//undefined
var a = 0;
console.log(a);//0

console.log(f(0));//1
function f(x){return x+1;}
console.log(f(0));//1
```

&emsp;&emsp;【2】变量声明语句和函数声明语句创建的变量都无法删除

```
var a = 0;
delete a;
console.log(a);//0

function f(x){return x+1;}
delete f;
console.log(f(0));//1
```

&nbsp;

## 参考资料

【1】 ES5/语句 [https://www.w3.org/html/ig/zh/wiki/ES5/statements](https://www.w3.org/html/ig/zh/wiki/ES5/statements)

【2】 阮一峰Javascript标准参考教程&mdash;&mdash;语法概述 [http://javascript.ruanyifeng.com/grammar/basic.html#toc12](http://javascript.ruanyifeng.com/grammar/basic.html#toc12)

【3】《javascript权威指南(第6版)》第5章 语句

