# 深入理解javascript函数系列第一篇——函数概述

&emsp;&emsp;函数对任何一门语言来说都是核心的概念。通过函数可以封装任意多条语句，而且可以在任何地方、任何时候调用执行。在javascript里，函数即对象，程序可以随意操控它们。函数可以嵌套在其他函数中定义，这样它们就可以访问它们被定义时所处的作用域中的任何变量，它给javascript带来了非常强劲的编程能力。本文是深入理解javascript函数系列第一篇&mdash;&mdash;函数概述

&nbsp;

### 函数定义

&emsp;&emsp;总共有三种函数定义的方式

【1】函数声明语句

&emsp;&emsp;使用function关键字，后跟一组参数以及函数体

```
function funcname([arg1 [,arg2 [...,argn]]]){
    statement;
}
```

&emsp;&emsp;funcname是要声明的函数名称的标识符。函数名之后的圆括号中是参数列表，参数之间使用逗号分隔。当调用函数时，这些标识符则指代传入函数的实参

&emsp;&emsp;注意:function语句里的花括号是必需的，这和while循环和其他一些语句所使用的语句块是不同的，即使函数体内只包含一条语句，仍然必须使用花括号将其括起来

```
function test()//SyntaxError: Unexpected end of input
function test(){};//不报错
while(true);//不报错
```

**提升**

&emsp;&emsp;在作用域系列博文的[第三篇](http://www.cnblogs.com/xiaohuochai/p/5700590.html)中，提到过函数声明提升(hoisting)，函数名称和函数体都提升

```
foo();
function foo(){
    console.log(1);//1
}
```

&emsp;&emsp;上面这个代码片段之所以能够在控制台输出1，就是因为foo()函数声明进行了提升，如下所示：

```
function foo(){
    console.log(1);
}
foo();
```

**重复**

&emsp;&emsp;变量的重复声明是无用的，但函数的重复声明会覆盖前面的声明(无论是变量还是函数声明)

```
//变量的重复声明无用
var a = 1;
var a;
console.log(a);//1
```
```
//由于函数声明提升优先于变量声明提升，所以变量的声明无作用
var a;
function a(){
    console.log(1);
}
a();//1
```
```
//后面的函数声明会覆盖前面的函数声明
a();//2
function a(){
    console.log(1);
}
function a(){
    console.log(2);
}
```

&emsp;&emsp;所以，应该避免在同一作用域中重复声明

**删除**

&emsp;&emsp;和变量声明一样，函数声明语句创建的变量无法删除

```
function foo(){
    console.log(1);
}
delete foo;//false
console.log(foo());//1
```

【2】函数定义表达式

&emsp;&emsp;以表达式方式定义的函数，函数的名称是可选的

```
var functionName = function([arg1 [,arg2 [...,argn]]]){
    statement;
}

var functionName = function funcName([arg1 [,arg2 [...,argn]]]){
    statement;
}
```

&emsp;&emsp;匿名函数(anonymous function)也叫拉姆达函数，是function关键字后面没有标识符的函数

&emsp;&emsp;通常而言，以表达式方式定义函数时都不需要名称，这会让定义它们的代码更加紧凑。函数定义表达式特别适合用来定义那些只会使用一次的函数

```
var tensquared = (function(x) {return x*x;}(10));
```

&emsp;&emsp;而一个函数定义表达式包含名称，函数的局部作用域将会包含一个绑定到函数对象的名称。实际上，函数的名称将成为函数内部的一个局部变量

```
var test = function fn(){
   return fn;
}
console.log(test);//fn(){return fn;}
console.log(test());//fn(){return fn;}
console.log(test()());//fn(){return fn;}
```

&emsp;&emsp;个人理解，对于具名的函数表达式来说，函数名称相当于函数对象的形参，只能在函数内部使用；而变量名称相当于函数对象的实参，在函数内部和函数外部都可以使用

```
var test = function fn(){
   return fn === test;
}
console.log(test());//true
console.log(test === fn);//ReferenceError: fn is not defined
```

&emsp;&emsp;函数定义了一个非标准的name属性，通过这个属性可以访问到给定函数指定的名字，这个属性的值永远等于跟在function关键字后面的标识符，匿名函数的name属性为空

```
//IE11-浏览器无效，均输出undefined
//chrome在处理匿名函数的name属性时有问题，会显示函数表达式的名字
function fn(){};
console.log(fn.name);//'fn'
var fn = function(){};
console.log(fn.name);//''，在chrome浏览器中会显示'fn'
var fn = function abc(){};
console.log(fn.name);//'abc'
```

【3】Function构造函数

&emsp;&emsp;Function构造函数接收任意数量的参数，但最后一个参数始终都被看成是函数体，而前面的参数则枚举出了新函数的参数

```
var functionName = new Function(['arg1' [,'arg2' [...,'argn']]],'statement;');
```

&emsp;&emsp;注意:Function构造函数无法指定函数名称，它创建的是一个匿名函数

&emsp;&emsp;从技术上讲，这是一个函数表达式。但，不推荐使用，因为这种语法会导致解析两次代码。第一次是解析常规javascript代码，第二次解析传入构造函数中的字符串，影响性能

```
var sum = new Function('num1','num2','return num1 + num2');
//等价于
var sum = function(num1,num2){
    return num1+num2;
}
```

&emsp;&emsp;Function()构造函数创建的函数，其函数体的编译总是会在全局作用域中执行。于是，Function()构造函数类似于在全局作用域中执行的eval()

```
var test = 0;
function fn(){
    var test = 1;
    return new Function('return test');
}
console.log(fn()());//0
```

&emsp;&emsp;注意:并不是所有的函数都可以成为构造函数

```
var o = new Math.min();//Uncaught TypeError: Math.min is not a constructor
```

&nbsp;

### 函数返回值

&emsp;&emsp;函数中的return语句用来返回函数调用后的返回值

```
return expression;
```

&emsp;&emsp;return语句只能出现在函数体内，如果不是会报语法错误

```
return 1;//SyntaxError: Illegal return statement
```

&emsp;&emsp;如果没有return语句，则函数调用仅仅依次执行函数体内的每一条语句直到函数结束，最后返回调用程序。这种情况下，调用表达式的结果是undefined

```
var test = function fn(){}
console.log(test());//undefined
```

&emsp;&emsp;当执行到return语句时，函数终止执行，并返回expression的值给调用程序

```
var test = function fn(){
    return 2;
};
console.log(test());//2
```

&emsp;&emsp;注意:并不是函数中return语句后的所有语句都不执行，[finally语句](http://www.cnblogs.com/xiaohuochai/p/5677490.html#anchor5)是例外，return语句不会阻止finally子句的执行

```
function testFinnally(){
    try{
        return 2;
    }catch(error){
        return 1;
    }finally{
        return 0;
    }
}
testFinnally();//0
```

&emsp;&emsp;注意:由于javascript可以[自动插入分号](http://www.cnblogs.com/xiaohuochai/p/5543930.html#anchor7)，因此在return关键字和它后面的表达式之间不能有换行

```
var test = function fn(){
    return
    2;
};
console.log(test());//undefined
```

&emsp;&emsp;一个函数中可以有多个return语句

```
function diff(iNum1, iNum2) {
  if (iNum1 &gt; iNum2) {
    return iNum1 - iNum2;
  } else {
    return iNum2 - iNum1;
  }
}
```

&emsp;&emsp;return语句可以单独使用而不必带有expression，这样的话也会向调用程序返回undefined

```
var test = function fn(){
    return;
};
console.log(test());//undefined
```

&emsp;&emsp;return语句经常作为函数内的最后一条语句出现，这是因为return语句可用来使函数提前返回。当return被执行时，函数立即返回而不再执行余下的语句

```
//并没有弹出1
var test = function fn(){
    return;
    alert(1);
};
console.log(test());//undefined
```

&emsp;&emsp;如果函数调用时在前面加上了new前缀，且返回值不是一个对象，则返回this(该新对象)

```
function fn(){
    this.a = 2;
    return 1;
}
var test = new fn();
console.log(test);//{a:2}
console.log(test.constructor);//fn(){this.a = 2;return 1;}
```

&emsp;&emsp;如果返回值是一个对象，则返回该对象

```
function fn(){
    this.a = 2;
    return {a:1};
}
var test = new fn();
console.log(test);//{a:1}
console.log(test.constructor);//Object() { [native code] }
```

&nbsp;

### 函数调用

&emsp;&emsp;只有函数被调用时，才会执行。调用运算符是跟在任何产生一个函数值的表达式之后的一对圆括号，圆括号内可包含零个或多个用逗号隔开的表达式。每个表达式产生一个参数值，每个参数值被赋予函数声明时定义的形参名

&emsp;&emsp;javascript一共有4种调用模式：函数调用模式、方法调用模式、构造器调用模式和间接调用模式

【1】函数调用模式

&emsp;&emsp;当一个函数并非一个对象的属性时，那么它就是被当做一个函数来调用的。对于普通的函数调用来说，函数的返回值就是调用表达式的值

```
function add(x,y){
    return x+y;
}
var sum = add(3,4);
console.log(sum)//7
```

&emsp;&emsp;使用函数调用模式调用函数时，非严格模式下，this被绑定到全局对象；在严格模式下，this是undefined

```
function add(x,y){
    console.log(this);//window
}    
add();
```
```
function add(x,y){
    'use strict';
    console.log(this);//undefined
}    
add();//window
```

&emsp;&emsp;因此，'this'可以用来判断当前是否是严格模式

```
var strict = (function(){return !this;}());
```

**重写**

&emsp;&emsp;因为函数调用模式的函数中的this绑定到全局对象，所以会发生全局属性被重写的现象

```
var a = 0;
function fn(){
    this.a = 1;
}
fn();
console.log(this,this.a,a);//window 1 1
```

【2】方法调用模式

&emsp;&emsp;当一个函数被保存为对象的一个属性时，我们称它为一个方法。当一个方法被调用时，this被绑定到该对象。如果调用表达式包含一个提取属性的动作，那么它就是被当做一个方法来调用

```
var o = {
    m: function(){
        console.log(1);
    }
};
o.m();//1
```

&emsp;&emsp;方法可以使用this访问自己所属的对象，所以它能从对象中取值或对对象进行修改。this到对象的绑定发生在调用的时候。通过this可取得它们所属对象的上下文的方法称为公共方法

```
var o = {
    a: 1,
    m: function(){
        return this;
    },
    n: function(){
        this.a = 2;
    }
};
console.log(o.m().a);//1
o.n();
console.log(o.m().a);//2
```

&emsp;&emsp;任何函数只要作为方法调用实际上都会传入一个隐式的实参&mdash;&mdash;这个实参是一个对象，方法调用的母体就是这个对象，通常来讲，基于那个对象的方法可以执行多种操作，方法调用的语法已经很清晰地表明了函数将基于一个对象进行操作

```
rect.setSize(width,height);
setRectSize(rect,width,height);
```

&emsp;&emsp;假设上面两行代码的功能完全一样，它们都作用于一个假定的对象rect。可以看出，第一行的方法调用语法非常清晰地表明这个函数执行的载体是rect对象，函数中的所有操作都将基于这个对象

&emsp;&emsp;和变量不同，关键字this没有作用域的限制，嵌套的函数不会从调用它的函数中继承this。如果嵌套函数作为方法调用，其this的值指向调用它的对象。如果嵌套函数作为函数调用，其this值不是全局对象(非严格模式下)就是undefined(严格模式下)

```
var o = {
    m: function(){
         function n(){
             return this;
         }
         return n();
    }
}
console.log(o.m());//window
```
```
var o = {
    m: function(){
         function n(){
             'use strict';
             return this;
         }
         return n();
    }
}
console.log(o.m());//undefined
```

&emsp;&emsp;如果想访问这个外部函数的this值，需要将this的值保存在一个变量里，这个变量和内部函数都同在一个作用域内。通常使用变量self或that来保存this

```
var o = {
    m: function(){
        var self = this;
        console.log(this === o);//true
         function n(){
             console.log(this === o);//false
             console.log(self === o);//true
             return self;
         }
         return n();
    }
}
console.log(o.m() === o);//true
```

【3】构造函数调用模式

&emsp;&emsp;如果函数或者方法调用之前带有关键字new，它就构成构造函数调用

```
function fn(){
    this.a = 1;
};
var obj = new fn();
console.log(obj.a);//1
```

&emsp;&emsp;如果构造函数调用在圆括号内包含一组实参列表，先计算这些实参表达式，然后传入函数内

```
function fn(x){
    this.a = x;
};
var obj = new fn(2);
console.log(obj.a);//2
```

&emsp;&emsp;如果构造函数没有形参，javascript构造函数调用的语法是允许省略实参列表和圆括号的。凡是没有形参的构造函数调用都可以省略圆括号

```
var o = new Object();
//等价于
var o = new Object;
```

&emsp;&emsp;注意:尽管构造函数看起来像一个方法调用，它依然会使用这个新对象作为调用上下文。也就是说，在表达式new o.m()中，调用上下文并不是o

```
var o = {
    m: function(){
        return this;
    }
}
var obj = new o.m();
console.log(obj,obj === o);//{} false
console.log(obj.constructor === o.m);//true
```

&emsp;&emsp;构造函数通常不使用return关键字，它们通常初始化新对象，当构造函数的函数体执行完毕时，它会显式返回。在这种情况下，构造函数调用表达式的计算结果就是这个新对象的值

```
function fn(){
    this.a = 2;
}
var test = new fn();
console.log(test);//{a:2}
```

&emsp;&emsp;如果构造函数使用return语句但没有指定返回值，或者返回一个原始值，那么这时将忽略返回值，同时使用这个新对象作为调用结果

```
function fn(){
    this.a = 2;
    return;
}
var test = new fn();
console.log(test);//{a:2}
```

&emsp;&emsp;如果构造函数显式地使用return语句返回一个对象，那么调用表达式的值就是这个对象

```
var obj = {a:1};
function fn(){
    this.a = 2;
    return obj;
}
var test = new fn();
console.log(test);//{a:1}
```

【4】间接调用模式

&emsp;&emsp;javascript中函数也是对象，函数对象也可以包含方法。call()和apply()方法可以用来间接地调用函数

&emsp;&emsp;这两个方法都允许显式指定调用所需的this值，也就是说，任何函数可以作为任何对象的方法来调用，哪怕这个函数不是那个对象的方法。两个方法都可以指定调用的实参。call()方法使用它自有的实参列表作为函数的实参，apply()方法则要求以数组的形式传入参数

```
var obj = {};
function sum(x,y){
    return x+y;
}
console.log(sum.call(obj,1,2));//3
console.log(sum.apply(obj,[1,2]));//3
```

&nbsp;

## 参考资料

【1】 &nbsp;W3School-Javascript高级教程&mdash;&mdash;函数概述 [http://www.w3school.com.cn/js/pro_js_functions.asp](http://www.w3school.com.cn/js/pro_js_functions.asp)

【2】 &nbsp;阮一峰Javascript标准参考教程&mdash;&mdash;函数概述 [http://javascript.ruanyifeng.com/grammar/function.html](http://javascript.ruanyifeng.com/grammar/function.html#toc0)

【3】《javascript权威指南(第6版)》第8章 函数

【4】《javascript高级程序设计(第3版)》第3章 基本概念

【5】《javascript DOM编程艺术(第2版)》第2章 javascript语法

【6】《javascript语句精粹》第4章 函数
