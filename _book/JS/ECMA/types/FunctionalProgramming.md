# 函数式编程

&emsp;&emsp;和Lisp、Haskell不同，javascript并非函数式编程语言，但在javascript中可以操控对象一样操控函数，也就是说可以在javascript中应用函数式编程技术。ES5中的数组方法(如map()和reduce())就可以非常适合用于函数式编程风格。本文将详细介绍函数式编程

&nbsp;

### 函数处理数组

&emsp;&emsp;假设有一个数组，数组元素都是数字，想要计算这些元素的平均值和标准差。若使用非函数式编程风格的话，如下所示

<div>
<pre>var data = [1,1,3,5,5];
var total = 0;
for(var i = 0 ; i &lt; data.length; i++){
    total += data[i];
}
var mean = total/data.length;
total = 0;
for(var i = 0; i &lt; data.length; i++){
    var deviation = data[i] - mean;
    total += deviation * deviation;
}
var stddev = Math.sqrt(total/(data.length-1));</pre>
</div>

&emsp;&emsp;可以使用数组方法map()和reduce()实现同样的计算，这种实现极其简洁

<div>
<pre>var sum = function(x,y){
    return x+y;
}
var square = function(x){
    return x*x;
}
var data = [1,1,3,5,5];
var mean = data.reduce(sum)/data.length;
var deviations = data.map(function(x){
    return x - mean;
});
var stddev = Math.sqrt(deviations.map(square).reduce(sum)/(data.length-1));</pre>
</div>

&emsp;&emsp;在ES3中，并不包含这些数组方法，需要自定义map()和reduce()函数

<div>
<pre>//对于每个数组元素调用函数f()，并返回一个结果数组
//如果Array.prototype.map定义了的话，就使用这个方法
var map = Array.prototype.map ? function(a,f){return a.map(f);}
          : function (a,f){
                var results = [];
                for(var i = 0,len=a.length; i &lt; len; i++){
                    if(i in a){
                        results[i] = f.call(null,a[i],i,a);
                    }
                }
                return results;
            }</pre>
</div>
<div>
<pre>//使用函数f()和可选的初始值将数组a减到一个值
//如果Array.prototype.reduce存在的话，就使用这个方法
var reduce = Array.prototype.reduce 
            ? function(a,f,initial){
                if(arguments.length &gt; 2){
                    return a.reduce(f,initial);                    
                }else{
                    return a.reduce(f);
                }
            }
            : function(a,f,initial){
                var i = 0, len = a.length ,accumulator;
                if(argument.length &gt; 2){
                    accumulator = initial;
                }else{
                    if(len == 0){
                        throw TypeError();
                    }
                    while(i &lt; len){
                        if(i in a){
                            accumulator = a[i++];
                            break;
                        }else{
                            i++;
                        }
                    }
                    if(i == len){
                        throw TypeError();
                    }
                }
                while(i &lt; len){
                    if(i in a){
                        accumulator = f.call(undefined,accumulator,a[i],i,a);
                    }
                    i++;
                }
                return accumulator;
            }</pre>
</div>

&nbsp;


### 不完全函数

&emsp;&emsp;不完全函数是一种函数变换技巧，即把一次完整的函数调用拆成多次函数调用，每次传入的实参都是完整实参的一部分，每个拆分开的函数叫做不完全函数，每次函数调用叫做不完全调用。这种函数变换的特点是每次调用都返回一个函数，直到得到最终运行结果为止

&emsp;&emsp;函数f()的bind()方法返回一个新函数，给新函数传入特定的上下文和一组指定的参数，然后调用函数f()。bind()方法只是将实参放在完整实参列表的左侧，也就是说传入bind()的实参都是放在传入原始函数的实参列表开始的位置，但有时希望将传入bind()的实参放在完整实参列表的右侧

<div>
<pre>//实现一个工具函数将类数组对象(或对象)转换为真正的数组
function array(a,n){
    return Array.prototype.slice.call(a,n||0);
}
//这个函数的实参传递到左侧
function partialLeft(f){
    var args = arguments;
    return function(){
        var a = array(args,1);
        a = a.concat(array(arguments));
        return f.apply(this,a);
    };
}
//这个函数的实参传递到右侧
function partialRight(f){
    var args = arguments;
    return function(){
        var a = array(arguments);
        a = a.concat(array(args,1));
        return f.apply(this,a);
    };
}
//这个函数的实参被用作模板，实参列表中的undefined值都被填充
function partial(f){
    var args = arguments;
    return function(){
        var a = array(args,1);
        var i = 0, j = 0;
        //遍历args，从内部实参填充undefined值
        for(;i&lt;a.length;i++){
            if(a[i] === undefined){
                a[i] = arguments[j++];
            }
            //现在将剩下的内部实参都追加进去
        };
        a = a.concat(array(arguments,j));
        return f.apply(this,a);
    }
}
//这个函数有三个实参
var f = function(x,y,z){
    return x*(y - z);
}
//注意这三个不完全调用之间的区别
partialLeft(f,2)(3,4);//2*(3-4)=-2
partialRight(f,2)(3,4);//3*(4-2)=6
partial(f,undefined,2)(3,4);//3*(2-4)=-6</pre>
</div>

&emsp;&emsp;利用这种不完全函数的编程技巧，可以编写一些有意思的代码，利用已有的函数来定义新的函数

<div>
<pre>var increment = partialLeft(sum,1);
var cuberoot = partialRight(Math.pow,1/3);
String.prototype.first = partial(String.prototype.charAt,0);
String.prototype.last = partial(String.prototype.substr,-1,1);</pre>
</div>

&emsp;&emsp;当将不完全调用和其他高阶函数整合在一起时，事件就变得格外有趣了。比如，下例定义了not()函数

<div>
<pre>var not = partialLeft(compose,function(x){
    return !x;
});
var even = function(x){
    return x % 2 === 0;
};
var odd = not(even);
var isNumber = not(isNaN);</pre>
</div>

&emsp;&emsp;可以使用不完全调用的组合来重新组织求平均数和标准差的代码，这种编码风格是非常纯粹的函数式编程

<div>
<pre>var data = [1,1,3,5,5];
var sum = function(x,y){return x+y;}
var product = function(x,y){return x*y;}
var neg = partial(product,-1);
var square = partial(Math.pow,undefined,2);
var sqrt = partial(Math.pow,undefined,.5);
var reciprocal = partial(Math.pow,undefined,-1);
var mean = product(reduce(data,sum),reciprocal(data.length));
var stddev = sqrt(product(reduce(map(data,compose(square,partial(sum,neg(mean)))),sum),reciprocal(sum(data.length,-1))));</pre>
</div>

&nbsp;

### 记忆

&emsp;&emsp;将上次的计算结果缓存起来，在函数式编程中，这种缓存技巧叫做记忆(memorization)。记忆只是一种编程技巧，本质上是牺牲算法的空间复杂度以换取更优的时间复杂度，在客户端javascript中代码的执行时间复杂度往往成为瓶颈，因此在大多数场景下，这种牺牲空间换取时间的做法以提升程序执行效率的做法是非常可取的

<div>
<pre>//返回f()的带有记忆功能的版本
//只有当f()的实参的字符串表示都不相同时它才会工作
function memorize(f){
    var cache = {};//将值保存到闭包内
    return function(){
        //将实参转换为字符串形式，并将其用做缓存的键
        var key = arguments.length + Array.prototype.join.call(arguments ,",");
        if(key in cache){
            return cache[key];
        }else{
            return cache[key] = f.apply(this,arguments);
        }
    }
}</pre>
</div>

&emsp;&emsp;memorize()函数创建一个新的对象，这个对象被当作缓存的宿主，并赋值给一个局部变量，因此对于返回的函数来说它是私有的。所返回的函数将它的实参数组转换成字符串，并将字符串用做缓存对象的属性名。如果在缓存中存在这个值，则直接返回它；否则，就调用既定的函数对实参进行计算，将计算结果缓存起来并返回

<div>
<pre>//返回两个整数的最大公约数
function gcd(a,b){
    var t;
    if(a &lt; b){
        t = b, b = a, a = t; 
    }
    while(b != 0){
        t = b, b = a % b, a = t;
    }
    return a;
}
var gcdmemo = memorize(gcd);
gcdmemo(85,187);//17</pre>
</div>

&emsp;&emsp;写一个递归函数时，往往需要实现记忆功能，我们更希望调用实现了记忆功能的递归函数，而不是原递归函数

<div>
<pre>var factorial = memorize(function(n){
    return (n&lt;=1) ? 1 : n*factorial(n-1);
});
factorial(5);//120</pre>
</div>

&nbsp;

### 连续调用单参函数

&emsp;&emsp;下面利用连续调用单参函数来实现一个简易的加法运算

<div>
<pre>add(num1)(num2)(num3)&hellip;; 
add(10)(10) = 20
add(10)(20)(50) = 80
add(10)(20)(50)(100) = 180</pre>
</div>

&emsp;&emsp;如果完全按照上面实现，则无法实现，因为add(1)(2)如果返回3，add(1)(2)(3)必然报错。于是，有以下两种变形方法

&emsp;&emsp;第一种变形如下：

<div>
<pre>add(num1)(num2)(num3)&hellip;; 
add(10)(10)() = 20
add(10)(20)(50)() = 80
add(10)(20)(50)(100)() = 180</pre>
</div>
<div>
<pre>function add(n){
    return function f(m){  
        if(m === undefined){
            return n;
        }else{
            n += m;
            return f;
        }
    }
}
console.log(add(10)());//10
console.log(add(10)(10)());//20
console.log(add(10)(10)(10)());//30</pre>
</div>

&emsp;&emsp;第二种变形如下：

<div>
<pre>add(num1)(num2)(num3)&hellip;; 
+add(10)(10) = 20
+add(10)(20)(50) = 80
+add(10)(20)(50)(100) = 180</pre>
</div>
<div>
<pre>function add(n) {
    function f(m){
        n += m;
        return f;
    };
    f.toString = f.valueOf = function () {return n}
    return f;
}
console.log(+add(10));//10
console.log(+add(10)(10));//20
console.log(+add(10)(10)(10));//30</pre>
</div>

