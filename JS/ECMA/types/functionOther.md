# 深入理解javascript函数系列第三篇——属性和方法

&emsp;&emsp;函数是javascript中特殊的对象，可以拥有属性和方法，就像普通的对象拥有属性和方法一样。甚至可以用Function()构造函数来创建新的函数对象。本文是深入理解javascript函数系列第三篇&mdash;&mdash;属性和方法

&nbsp;

### 属性

**【length属性】**

&emsp;&emsp;函数系列[第二篇](http://www.cnblogs.com/xiaohuochai/p/5706289.html)中介绍过，[arguments对象](http://www.cnblogs.com/xiaohuochai/p/5706289.html#anchor1)的length属性表示实参个数，而函数的length属性则表示形参个数

```
function add(x,y){
    console.log(arguments.length)//3
    console.log(add.length);//2
}
add(1,2,3);
```

**【name属性】**

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

&emsp;&emsp;注意:name属性早就被浏览器广泛支持，但是直到ES6才将其写入了标准

&emsp;&emsp;ES6对这个属性的行为做出了一些修改。如果将一个匿名函数赋值给一个变量，ES5的name属性，会返回空字符串，而ES6的name属性会返回实际的函数名

```
var func1 = function () {};
func1.name //ES5:  ""
func1.name //ES6: "func1"
```

&emsp;&emsp;如果将一个具名函数赋值给一个变量，则ES5和ES6的name属性都返回这个具名函数原本的名字

```
var bar = function baz() {};
bar.name //ES5: "baz"
bar.name //ES6: "baz"
```

&emsp;&emsp;Function构造函数返回的函数实例，name属性的值为&ldquo;anonymous&rdquo;

```
(new Function).name // "anonymous"
```

&emsp;&emsp;bind返回的函数，name属性值会加上&ldquo;bound &rdquo;前缀

```
function foo() {};
foo.bind({}).name // "bound foo"
(function(){}).bind({}).name // "bound "
```

**【prototype属性】**

&emsp;&emsp;每一个函数都有一个prototype属性，这个属性指向一个对象的引用，这个对象称做原型对象(prototype object)。每一个函数都包含不同的原型对象。将函数用做构造函数时，新创建的对象会从原型对象上继承属性

```
function fn(){};
var obj = new fn;
fn.prototype.a = 1;
console.log(obj.a);//1
```

&nbsp;

### 方法

**【apply()和call()】**

&emsp;&emsp;每个函数都包含两个非继承而来的方法：apply()和call()。这两个方法的用途都是在特定的作用域中调用函数，实际上等于函数体内this对象的值

&emsp;&emsp;要想以对象o的方法来调用函数f()，可以这样使用call()和apply()

```
f.call(o);
f.apply(o);
```

&emsp;&emsp;假设o中不存在m方法，则等价于:

```
o.m = f; //将f存储为o的临时方法
o.m(); //调用它，不传入参数
delete o.m; //将临时方法删除
```

&emsp;&emsp;下面是一个实际的例子

```
window.color = "red";
var o = {color: "blue"};
function sayColor(){
    console.log(this.color);
}
sayColor();            //red
sayColor.call(this);   //red
sayColor.call(window); //red
sayColor.call(o);      //blue
```
```
//sayColor.call(o)等价于:
o.sayColor = sayColor;
o.sayColor();   //blue
delete o.sayColor;
```

&emsp;&emsp;apply()方法接收两个参数：一个是在其中运行函数的作用域(或者可以说成是要调用函数的母对象，它是调用上下文，在函数体内通过this来获得对它的引用)，另一个是参数数组。其中，第二个参数可以是Array的实例，也可以是arguments对象

```
function sum(num1, num2){
    return num1 + num2;
}
//因为运行函数的作用域是全局作用域，所以this代表的是window对象
function callSum1(num1, num2){
    return sum.apply(this, arguments);
}
function callSum2(num1, num2){
    return sum.apply(this, [num1, num2]);
}
console.log(callSum1(10,10));//20
console.log(callSum2(10,10));//20
```

&emsp;&emsp;call()方法与apply()方法的作用相同，它们的区别仅仅在于接收参数的方式不同。对于call()方法而言，第一个参数是this值没有变化，变化的是其余参数都直接传递给函数。换句话说，在使用call()方法时，传递给函数的参数必须逐个列举出来

```
function sum(num1, num2){
    return num1 + num2;
}
function callSum(num1, num2){
    return sum.call(this, num1, num2);
}
console.log(callSum(10,10));   //20
```

&emsp;&emsp;至于是使用apply()还是call()，完全取决于采取哪种函数传递参数的方式最方便。如果打算直接传入arguments对象，或者包含函数中先接收到的也是一个数组，那么使用apply()肯定更方便；否则，选择call()可能更合适

&emsp;&emsp;在非严格模式下，使用函数的call()或apply()方法时，null或undefined值会被转换为全局对象。而在严格模式下，函数的this值始终是指定的值

```
var color = 'red';
function displayColor(){
    console.log(this.color);
}
displayColor.call(null);//red
```
```
var color = 'red';
function displayColor(){
    'use strict';
    console.log(this.color);
}
displayColor.call(null);//TypeError: Cannot read property 'color' of null
```

**应用&nbsp;**

【1】调用对象的原生方法

```
var obj = {};
obj.hasOwnProperty('toString');// false
obj.hasOwnProperty = function (){
  return true;
};
obj.hasOwnProperty('toString');// true
Object.prototype.hasOwnProperty.call(obj, 'toString');// false
```

【2】找出数组最大元素

&emsp;&emsp;javascript不提供找出数组最大元素的函数。结合使用apply方法和Math.max方法，就可以返回数组的最大元素

```
var a = [10, 2, 4, 15, 9];
Math.max.apply(null, a);//15
```

【3】将类数组对象转换成真正的数组

```
Array.prototype.slice.apply({0:1,length:1});//[1]
```

&emsp;&emsp;或者

```
[].prototype.slice.apply({0:1,length:1});//[1]
```

【4】将一个数组的值push到另一个数组中

```
var a = [];
Array.prototype.push.apply(a,[1,2,3]);
console.log(a);//[1,2,3]
Array.prototype.push.apply(a,[2,3,4]);
console.log(a);//[1,2,3,2,3,4]
```

&emsp;&emsp;如果使用[ES6中的不定参数](http://www.cnblogs.com/xiaohuochai/p/7235658.html#anchor2)则非常简单

```
var a  = [...[1,2,3],...[2,3,4]];
console.log(a);//[1,2,3,2,3,4]
```

【5】绑定回调函数的对象

&emsp;&emsp;由于apply方法（或者call方法）不仅绑定函数执行时所在的对象，还会立即执行函数，因此不得不把绑定语句写在一个函数体内。更简洁的写法是采用下面介绍的bind方法

```
var o = {};
o.f = function () {
  console.log(this === o);
}
var f = function (){
  o.f.apply(o);
};
$('#button').on('click', f);
```

**【bind()】**

&emsp;&emsp;bind()是ES5新增的方法，这个方法的主要作用就是将函数绑定到某个对象&nbsp;

&emsp;&emsp;当在函数f()上调用bind()方法并传入一个对象o作为参数，这个方法将返回一个新的函数。以函数调用的方式调用新的函数将会把原始的函数f()当做o的方法来调用，传入新函数的任何实参都将传入原始函数

&emsp;&emsp;注意:IE8-浏览器不支持

```
function f(y){
    return this.x + y; //这个是待绑定的函数
}
var o = {x:1};//将要绑定的对象
var g = f.bind(o); //通过调用g(x)来调用o.f(x)
g(2);//3
```

**兼容代码**
```
Function.prototype.bind = function(context){
  var self = this;
  return function(){
    return self.apply(context,arguments);
  }
}
```
&emsp;&emsp;通常，会把它实现得稍微复杂一点，使得可以填入一些参数
```
Function.prototype.bind = function(context){
  var self = this,
      context = [].shift.call(arguments),
      args = [].slice.call(arguments);
  return function(){
    return self.apply(context,[].concat.call(args,[].slice.call(arguments)));
  }
}
```

&emsp;&emsp;bind()方法不仅是将函数绑定到一个对象，它还附带一些其他应用：除了第一个实参之外，传入bind()的实参也会绑定到this，这个附带的应用是一种常见的函数式编程技术，有时也被称为'柯里化'(currying)

```
var sum = function(x,y){
    return x+y;
}
var succ = sum.bind(null,1);
succ(2); //3，x绑定到1，并传入2作为实参y
```
```
function f(y,z){
    return this.x + y + z;
}
var g = f.bind({x:1},2);
g(3); //6，this.x绑定到1，y绑定到2，z绑定到3
```

&emsp;&emsp;使用bind()方法实现柯里化可以对函数参数进行拆分

```
function getConfig(colors,size,otherOptions){
    console.log(colors,size,otherOptions);
}
var defaultConfig = getConfig.bind(null,'#c00','1024*768');
defaultConfig('123');//'#c00 1024*768 123'
defaultConfig('456');//'#c00 1024*768 456'
```

**【toString()】**

&emsp;&emsp;函数的toString()实例方法返回函数代码的字符串，而静态toString()方法返回一个类似'[native code]'的字符串作为函数体

```
function test(){
    alert(1);//test
}
test.toString();/*"function test(){
                    alert(1);//test
                  }"*/
Function.toString();//"function Function() { [native code] }"
```

**【toLocaleString()】**

&emsp;&emsp;函数的toLocaleString()方法和toString()方法返回的结果相同

```
function test(){
    alert(1);//test
}
test.toLocaleString();/*"function test(){
                    alert(1);//test
                  }"*/
Function.toLocaleString();//"function Function() { [native code] }"
```

**【valueOf()】**

&emsp;&emsp;函数的valueOf()方法返回函数本身

```
function test(){
    alert(1);//test
}
test.valueOf();/*function test(){
                    alert(1);//test
                  }*/
typeof test.valueOf();//'function'
Function.valueOf();//Function() { [native code] }
```

&nbsp;

## 参考资料

【1】 &nbsp;W3School-Javascript高级教程&mdash;&mdash;Function对象 [http://www.w3school.com.cn/js/](http://www.w3school.com.cn/js/pro_js_functions_function_object.asp)

【2】 &nbsp;阮一峰Javascript标准参考教程&mdash;&mdash;函数的属性和方法 [http://javascript.ruanyifeng.com/grammar/](http://javascript.ruanyifeng.com/grammar/function.html#toc7)

【3】《javascript权威指南(第6版)》第8章 函数

【4】《javascript高级程序设计(第3版)》第5章 引用类型

【5】《javascript DOM编程艺术(第2版)》第2章 javascript语法

【6】《javascript语句精粹》第4章 函数

