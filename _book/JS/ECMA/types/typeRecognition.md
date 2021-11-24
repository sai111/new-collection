# javascript四种类型识别的方法

&emsp;&emsp;javascript有复杂的类型系统，类型识别则是基本的功能。javascript总共提供了四种类型识别的方法，本文将对这四种方法进行详细说明

&nbsp;

### typeof运算符

&emsp;&emsp;typeof是一元[运算符](http://www.cnblogs.com/xiaohuochai/p/5666530.html)，放在单个操作数的前面，返回值为表示操作数类型的首字母小写的字符串

&emsp;&emsp;注意：typeof运算符后面带不带圆括号都可以

```
console.log(typeof 'a');//'string'
console.log(typeof ('a'));//'string'
```

**识别**

&emsp;&emsp;【1】可以识别标准类型(将Null识别为'object')　

&emsp;&emsp;【2】不能识别具体的对象类型(Function除外)

```
console.log(typeof "jerry");//"string"
console.log(typeof 12);//"number"
console.log(typeof true);//"boolean"
console.log(typeof undefined);//"undefined"
console.log(typeof null);//"object"
console.log(typeof {name: "jerry"});//"object"

console.log(typeof function(){});//"function"
console.log(typeof []);//"object"
console.log(typeof new Date);//"object"
console.log(typeof /\d/);//"object"
function Person(){};
console.log(typeof new Person);//"object"
```

&emsp;&emsp;注意：判断一个值是否为[null](http://www.cnblogs.com/xiaohuochai/p/5665637.html#anchor3)类型的最佳方法是直接和null进行恒等比较

```
console.log(typeof null);//'object'
console.log(null === null);//true
console.log(undefined === null);//false
console.log('null' === null);//false
```

&nbsp;

### instanceof运算符

&emsp;&emsp;instanceof是一个二元运算符，左操作数是一个对象，右操作数是一个构造函数。如果左侧的对象是右侧构造函数的实例对象，则表达式返回true；否则返回false

&emsp;&emsp;如果左操作数不是对象，返回false，如果右操作数不是函数，则抛出一个类型[错误异常](http://www.cnblogs.com/xiaohuochai/p/5677490.html)TypeError

```
console.log(123 instanceof function(){});//false
//Uncaught TypeError: Right-hand side of 'instanceof' is not an object
console.log({} instanceof 123);
```

&emsp;&emsp;注意：所有的对象都是Object的实例

**识别**

&emsp;&emsp;【1】可以识别内置对象类型、自定义类型及其父类型

&emsp;&emsp;【2】不能识别标准类型，会返回false

&emsp;&emsp;【3】不能识别undefined、null，会报错

```
console.log("jerry" instanceof String);//false
console.log(12 instanceof Number);//false
console.log(true instanceof Boolean);//false
console.log(undefined instanceof Undefined);//报错
console.log(null instanceof Null);//报错
console.log({name: "jerry"} instanceof Object);//true

console.log(function(){} instanceof Function);//true
console.log([] instanceof Array);//true
console.log(new Date instanceof Date);//true
console.log(/\d/ instanceof RegExp);//true
function Person(){};
console.log(new Person instanceof Person);//true
console.log(new Person instanceof Object);//true
```

&nbsp;

### constructor属性

&emsp;&emsp;实例对象的[constructor属性](http://www.cnblogs.com/xiaohuochai/p/5721552.html)指向其构造函数。如果是内置类型，则输出`function 数据类型(){[native code]}`；如果是自定义类型，则输出`function 数据类型(){}`

**识别**

&emsp;&emsp;【1】可以识别标准类型、内置对象类型及自定义类型

&emsp;&emsp;【2】不能识别undefined、null，会报错，因为它俩没有构造函数

```
console.log(("jerry").constructor);//function String(){[native code]}
console.log((12).constructor);//function Number(){[native code]}
console.log((true).constructor);//function Boolean(){[native code]}
console.log((undefined).constructor);//报错
console.log((null).constructor);//报错
console.log(({name: "jerry"}).constructor);//function Object(){[native code]}

console.log((function(){}).constructor);//function Function(){[native code]}
console.log(([]).constructor);//function Array(){[native code]}
console.log((new Date).constructor);//function Date(){[native code]}
console.log((/\d/).constructor);//function RegExp(){[native code]}
function Person(){};
console.log((new Person).constructor);//function Person(){}
```

&emsp;&emsp;可以将constructor属性封装成一个类型识别方法

```
function type(obj){
    var temp = obj.constructor.toString();
    return temp.replace(/^function (\w+)\(\).+$/,'$1');
}
```
```
function type(obj){
    var temp = obj.constructor.toString().toLowerCase();
    return temp.replace(/^function (\w+)\(\).+$/,'$1');
}
console.log(type("jerry"));//"string"
console.log(type(12));//"number"
console.log(type(true));//"boolean"
console.log(type(undefined));//错误
console.log(type(null));//错误
console.log(type({name: "jerry"}));//"object"

console.log(type(function(){}));//"function"
console.log(type([]));//"array"
console.log(type(new Date));//"date"
console.log(type(/\d/));//"regexp"
function Person(){};
console.log(type(new Person));//"person"
```

&nbsp;

### Object.prototype.toString()方法

&emsp;&emsp;对象的类属性是一个[字符串](http://www.cnblogs.com/xiaohuochai/p/5599529.html)，用以表示对象的类型信息。javascript没有提供设置这个属性的方法，但有一种间接方法可以查询它

&emsp;&emsp;Object.prototype.toString()方法返回了如下格式的字符串：[object 数据类型]

**识别**

&emsp;&emsp;【1】可以识别标准类型及内置对象类型

&emsp;&emsp;【2】不能识别自定义类型

```
console.log(Object.prototype.toString.call("jerry"));//[object String]
console.log(Object.prototype.toString.call(12));//[object Number]
console.log(Object.prototype.toString.call(true));//[object Boolean]
console.log(Object.prototype.toString.call(undefined));//[object Undefined]
console.log(Object.prototype.toString.call(null));//[object Null]
console.log(Object.prototype.toString.call({name: "jerry"}));//[object Object]

console.log(Object.prototype.toString.call(function(){}));//[object Function]
console.log(Object.prototype.toString.call([]));//[object Array]
console.log(Object.prototype.toString.call(new Date));//[object Date]
console.log(Object.prototype.toString.call(/\d/));//[object RegExp]
function Person(){};
console.log(Object.prototype.toString.call(new Person));//[object Object]
```

&emsp;&emsp;可以将Object.prototype.toString()方法封装成一个类型识别方法

```
function type(obj){
    return Object.prototype.toString.call(obj).slice(8,-1).toLowerCase();
}
console.log(type("jerry"));//"string"
console.log(type(12));//"number"
console.log(type(true));//"boolean"
console.log(type(undefined));//"undefined"
console.log(type(null));//"null"
console.log(type({name: "jerry"}));//"object"

console.log(type(function(){}));//"function"
console.log(type([]));//"array"
console.log(type(new Date));//"date"
console.log(type(/\d/));//"regexp"
function Person(){};
console.log(type(new Person));//"object"
```

&emsp;&emsp;注意：如果是包装对象，Object.prototype.toString()方法将返回其原始类型

```
console.log(Object.prototype.toString.call(new Number(123)));//[object Number]
console.log(Object.prototype.toString.call(123));//[object Number]
console.log(Object.prototype.toString.call(new String('abc')));//[object String]
console.log(Object.prototype.toString.call('abc'));//[object String]
console.log(Object.prototype.toString.call(new Boolean(true)));//[object Boolean]
console.log(Object.prototype.toString.call(true));//[object Boolean]
```

