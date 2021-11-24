# javascript运算符——算术运算符

&emsp;&emsp;javascript中的算术操作主要通过算术运算符来实现，本文将介绍算术运算符的内容。算术运算符包括一元算术运算符和二元算术运算符两种

&nbsp;

## 一元算术运算符

&emsp;&emsp;一元算术运算符用于一个单独的操作数，并产生一个新值。在javascript中，一元运算符具有很高的优先级，而且都是右结合(right-associative)

&emsp;&emsp;一元算术运算符包括一元加法(+)、一元减法(-)、递增(++)和递减(--)

&nbsp;

### 一元加(+)

&emsp;&emsp;一元加运算符以一个加号(+)表示，放在数值前面，对数值不会产生任何影响

<div>
<pre>var num = 25;
num = +num; //25</pre>
</div>

&emsp;&emsp;在对非数值应用一元加运算符时，会调用Number()转型函数对这个值进行转换

<div>
<pre>var s1 = '01';
var s2 = '1.1';
var s3 = 'z';
var b = false;
var f = 1.1;
var o = {
    valueOf:function(){
        return -1;
    }
};

s1 = +s1;//1
s2 = +s2;//1.1
s3 = +s3;//NaN
b = +b;//0
f = +f;//1.1
o = +o;//-1</pre>
</div>

&emsp;&emsp;注意：在new Date()前面使用一元加符号，可以把日期字符串，转换为日期毫秒数

<div>
<pre>console.log(new Date());//on Jul 11 2016 20:25:54 GMT+0800 (中国标准时间)
console.log(+new Date());//1468239954076</pre>
</div>

&nbsp;

### 一元减(-)

&emsp;&emsp;一元减运算符主要用于表示负数

<div>
<pre>var num = 25;
num = -num;//-25</pre>
</div>

&emsp;&emsp;当一元减运算符用于非数值时，会对该值使用Number()转型函数进行转换，再将得到的数值转换成负数

<div>
<pre>var s1 = '01';
var s2 = '1.1';
var s3 = 'z';
var b = false;
var f = 1.1;
var o = {
    valueOf:function(){
        return -1;
    }
};

s1 = -s1;//-1
s2 = -s2;//-1.1
s3 = -s3;//NaN
b = -b;//0
f = -f;//-1.1
o = -o;//1</pre>
</div>

&emsp;&emsp;注意：一元加和一元减运算符主要用于基本的算术运算，也可以用于转换数据类型

&nbsp;

### 递增(++)

&emsp;&emsp;递增++运算符对其操作数进行增量(加1)操作，操作数是一个左值(lvalue)(变量、数组元素或对象属性)。运算符通过Number()转型函数将操作数转换为数字，然后给数字加1，并将加1后的数值重新赋值给变量、数字元素或者对象属性

<div>
<pre>var age = 29;
++age;
//相当于
var age = 29;
age = age +1;</pre>
&emsp;&emsp;递增++运算符的返回值依赖于它相对于操作数的位置。当运算符在操作数之前，称为前增量(pre-increment)运算符，它对操作数进行增量计算，并返回计算后的值。当运算符在操作数之后，称为后增量(post-increment)运算符，它对操作数进行增量计算，但返回未做增量计算的(unincremented)值

&emsp;&emsp;不管是前增量还是后增量，这个运算符通常用在for循环中，用于控制循环内的计数器

<div>
<pre>var i = 1, j = ++i;//i=2 j=2
var i = 1, j = i++;//i=2 j=1</pre>
</div>

&emsp;&emsp;注意：++x并不总是和x = x+1完全一样，++运算符从不进行字符串连接操作，它总是会将操作数转换为数字并增1

<div>
<pre>var x = '1';
++x;//2
var x = '1';
x = x + 1;//'11'</pre>
</div>

&nbsp;

### 递减(--)

&emsp;&emsp;递减--运算符的操作数也是一个左值，它通过Number()转型函数把操作数转换为数字，然后减1，并将计算后的值重新赋值给操作数

&emsp;&emsp;和递增++运算符一样，递减--运算符的返回值依赖于它相对操作数的位置，当递减运算符在操作数之前，操作数减1并返回减1之后的值。当递减运算符在操作数之后，操作数减1并返回减1之前的值

<div>
<pre>var age = 29;
--age;
//相当于
var age = 29;
age = age - 1;</pre>
</div>

&emsp;&emsp;前增量操作符与执行语句优先级相同，整个语句会从左向右求值

<div>
<pre>var num1 = 2;
var num2 = 20;
var num3 = --num1 + num2;//21
var num4 = num1 + num2;//21</pre>
</div>

&emsp;&emsp;后增量操作符在包含它们的语句被求值之后才执行

<div>
<pre>var num1 = 2;
var num2 = 20;
var num3 = num1-- + num2;//22
var num4 = num1 + num2;//21</pre>
</div>

&emsp;&emsp;在涉及++和--运算符时，如果将其用作后缀表达式，它和表达式应该同一行。否则，行尾将填补分号，同时++或--将作为下一行代码的前缀操作符并与之一起解析

<div>
<pre>x
--
y</pre>
</div>

&emsp;&emsp;javascript将其解析为:

<div>
<pre>x;--y;</pre>
</div>

&emsp;&emsp;而代码的本意是:

<div>
<pre>x--;y;</pre>
</div>

&nbsp;

## 二元算术运算符

&emsp;&emsp;二元算术运算符包括加法(+)、减法(-)、乘法(*)、除法(/)和求余(%)

&nbsp;

### 加法(+)

&emsp;&emsp;在多数程序设计语言中，加法通常是简单的数字运算符，但在ECMAScript中，加法运算有大量的特殊行为，不仅可以进行数值加法运算，也可以进行字符串连接

&emsp;&emsp;加法运算遵循如下规则：

&emsp;&emsp;【1】如果其中一个操作数是对象，则对象会转换为原始值：日期对象通过toString()方法执行转换，其他对象通过valueOf()方法执行转换。由于多数对象valueOf()方法无法返回一个原始值，于是会通过toString()方法来执行转换

&emsp;&emsp;注意：除了单数值数组会转换为数字外，其他原生对象都会通过toString()方法转换为字符串形式

&emsp;&emsp;【2】在进行了对象到原始值的转换后，如果其中一个操作数是字符串的话，另一个操作数也会转换成字符串，进行字符串连接

&emsp;&emsp;【3】否则，两个操作数都将转换成数字或NaN，进行加法操作

<div>
<pre>//单数值数组和valueOf()返回值为数值的自定义对象会转换为数值
console.log(1 + []);//1
var o = {
    valueOf: function(){
        return -1;
    }
}
console.log(1 + o);//0</pre>
</div>
<div>
<pre>//其他原生对象则转换为字符串
console.log(1 + {});//'1[object Object]'
console.log(1 + [1,2]);//'11,2'
console.log(1 + new Date());//'1Thu Jun 16 2016 10:27:13 GMT+0800 (中国标准时间)'
console.log(1 + /0/);//'1/0/'</pre>
</div>

&emsp;&emsp;如果进行算术加法运算，undefined转换为NaN，null转换为0，false转换为0，true转换为1

<div>
<pre>console.log(undefined + undefined);//NaN
console.log(null + null);//0
console.log(false + false);//0
console.log(true + true);//2</pre>
</div>

&emsp;&emsp;如果进行字符串连接，undefined转换为'undefined'，null转换为'null'，false转换为'false'，true转换为'true'

<div>
<pre>console.log('' + undefined);//'undefined'
console.log('' + null);//'null'
console.log('' + false);//'false'
console.log('' + true);//'true'</pre>
</div>

&emsp;&emsp;因此，利用加号运算符的特性，可以利用''+任意类型值转换为字符串

&emsp;&emsp;在数字加法运算中，Infinity和带符号的0的处理较为特殊

<div>
<pre>Number.MAX_VALUE + Number.MAX_VALUE === Infinity;//true
Infinity + (-Infinity);//NaN
+0 + (-0) === +0;//true</pre>
</div>

&nbsp;

### 减法(-)

&emsp;&emsp;相对于加法，减法就简单的多，只涉及到数字的减法运算。使用Number()转型函数将非数值类型转换为数值或NaN

<div>
<pre>console.log(1 - {});//NaN
console.log(1 - [1,2]);//NaN
console.log(1 - /0/);//NaN
console.log(1 - []);//1</pre>
</div>

&emsp;&emsp;加法有一个特殊之处，在于时间Date对象进行加法运算时使用toString()转换为字符串，而在其他数学运算，包括减法、乘法、除法、求余等运算中，都是使用Number()转换函数将时间Date对象使用valueOf()转换为数字

<div>
<pre>console.log(new Date() + 1);//'Thu Jun 16 2016 11:11:49 GMT+0800 (中国标准时间)1'
console.log(new Date() - 1);//1466046941641</pre>
</div>

&emsp;&emsp;undefined转换为NaN，null转换为0，false转换为0，true转换为1

<div>
<pre>console.log(1 - undefined);//NaN
console.log(1 - null);//1
console.log(1 - false);//1
console.log(1 - true);//0</pre>
</div>

&nbsp;

### 乘法(*)

&emsp;&emsp;乘法操作符由一个星号(*)表示，用于计算两个数值的乘积，会通过Number()转型函数将非数值类型转换为数值或NaN

<div>
<pre>+ Infinity * 0;//NaN
- Infinity * 0;//NaN
Infinity * 非0数值;//Infinity或-Infinity
Infinity * Infinity;//Infinity</pre>
</div>

&nbsp;

### 除法(/)

&emsp;&emsp;除法操作符由一个斜线(/)表示，执行第一个操作数除以第二个操作数的运算，也会通过Number()转型函数将非数值类型转换为数值或NaN

<div>
<pre>Infinity / Infinity;//NaN
0 / 0;//NaN
非0数值 / 0;//Infinity或-Infinity
Infinity / 0;//Infinity
Infinity / 非0数值;//Infinity</pre>
</div>

&nbsp;

### 求模(%)

&emsp;&emsp;求模(余数)操作符是由一个百分号(%)表示，是第一个操作数除以第二个操作数的余数

<div>
<pre>//r是余数，n是被除数，d是除数，
//q是整数，在n/d为负时为负，在n/d为正时为正，它应该在不超过n和d的商的前提下尽可能大
r = n - (d * q)</pre>
</div>

&emsp;&emsp;求模结果与第一个操作数的符号保持一致

<div>
<pre>console.log(5 % 2);//1
console.log(5 % -2);//1
console.log(-5 % 2);//-1
console.log(-5 % -2);//-1</pre>
</div>

&emsp;&emsp;被除数是Infinity，或除数是0，则求模结果是NaN

<div>
<pre>Infinity % 0 = NaN
Infinity % Infinity = NaN
Infinity % 非0数值 = NaN
非0数值 % 0 = NaN</pre>
</div>

&emsp;&emsp;在多数编程语言中，求模运算符只接受整数为操作数，而在ECMAScript中，还接受浮点操作数，但由于浮点数不是精确的值，无法得到完全准确的结果

<div>
<pre>console.log(6.5 % 2.1);//0.19999999999999973</pre>
</div>

&nbsp;

## 参考资料

【1】 ES5/表达式 [https://www.w3.org/html/ig/zh/wiki/ES5/expressions](https://www.w3.org/html/ig/zh/wiki/ES5/expressions)

【2】 阮一峰Javascript标准参考教程&mdash;&mdash;基本语法之运算符 [http://javascript.ruanyifeng.com](http://javascript.ruanyifeng.com/grammar/operator.html)

【3】 W3School-Javascript高级教程&mdash;&mdash;ECMAScript运算符 [http://www.w3school.com.cn](http://www.w3school.com.cn/js/pro_js_operators_multiplicative.asp)

【4】《javascript权威指南(第6版)》第4章 表达式和运算符

【5】《javascript高级程序设计(第3版)》第3章 基本概念

【6】《javascript语言精粹(修订版)》第2章 语法

