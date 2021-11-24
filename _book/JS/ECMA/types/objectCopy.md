# 对象拷贝

&emsp;&emsp;对象拷贝分为浅拷贝(shallow)和深拷贝(deep)两种。浅拷贝只复制一层对象的属性，并不会进行递归复制，而javascript存储对象都是存地址的，所以浅拷贝会导致对象中的子对象指向同一块内存地址；而深拷贝则不同，它不仅将原对象的各个属性逐个复制出去，而且将原对象各个属性所包含的对象也依次采用深拷贝的方法递归复制到新对象上，拷贝了所有层级。本文将详细介绍对象拷贝



<p>&nbsp;</p>


### 浅拷贝

【方法一】简单拷贝

&emsp;&emsp;新建一个空对象，使用for-in循环，将对象的所有属性复制到新建的空对象中

    function simpleClone1(obj){
        if(typeof obj != 'object'){
            return false;
        }
        var cloneObj = {};
        for(var i in obj){
            cloneObj[i] = obj[i];
        }
        return cloneObj;
    }

    var obj1={a:1,b:2,c:[1,2,3]};
    var obj2=simpleClone1(obj1);
    console.log(obj1.c); //[1,2,3]
    console.log(obj2.c); //[1,2,3]
    obj2.c.push(4);
    console.log(obj2.c); //[1,2,3,4]
    console.log(obj1.c); //[1,2,3,4]


【方法二】使用属性描述符

&emsp;&emsp;通过对象的原型，建立一个空的实例对象。通过forEach语句，获取到对象的所有属性的属性描述符，将其作为参数，设置到新建的空实例对象中

    function simpleClone2(orig){
        var copy = Object.create(Object.getPrototypeOf(orig));
        Object.getOwnPropertyNames(orig).forEach(function(propKey){
            var desc = Object.getOwnPropertyDescriptor(orig,propKey);
            Object.defineProperty(copy,propKey,desc);
        });
        return copy;
    }

    var obj1={a:1,b:2,c:[1,2,3]};
    var obj2=simpleClone1(obj1);
    console.log(obj1.c); //[1,2,3]
    console.log(obj2.c); //[1,2,3]
    obj2.c.push(4);
    console.log(obj2.c); //[1,2,3,4]
    console.log(obj1.c); //[1,2,3,4]

【方法三】使用jquery的extend()方法

    var obj1={a:1,b:2,c:[1,2,3]};
    var obj2=$.extend({},obj1);
    console.log(obj1.c); //[1,2,3]
    console.log(obj2.c); //[1,2,3]
    obj2.c.push(4);
    console.log(obj2.c); //[1,2,3,4]
    console.log(obj1.c); //[1,2,3,4]

<p>&nbsp;</p>


### 深拷贝

【方法一】遍历复制

&emsp;&emsp;复制对象的属性时，对其进行判断，如果是数组或对象，则再次调用拷贝函数；否则，直接复制对象属性

    function deepClone1(obj,cloneObj){
        if(typeof obj != 'object'){
            return false;
        }
        var cloneObj = cloneObj || {};
        for(var i in obj){
            if(typeof obj[i] === 'object'){
                cloneObj[i] = (obj[i] instanceof Array) ? [] : {};
                arguments.callee(obj[i],cloneObj[i]);
            }else{
                cloneObj[i] = obj[i]; 
            }  
        }
        return cloneObj;
    }

    var obj1={a:1,b:2,c:[1,2,3]};
    var obj2=deepClone1(obj1);
    console.log(obj1.c); //[1,2,3]
    console.log(obj2.c); //[1,2,3]
    obj2.c.push(4);
    console.log(obj2.c); //[1,2,3,4]
    console.log(obj1.c); //[1,2,3]

【方法二】json

&emsp;&emsp;用JSON全局对象的parse和stringify方法来实现深复制算是一个简单讨巧的方法，它能正确处理的对象只有Number、String、Boolean、Array、扁平对象，即那些能够被json直接表示的数据结构

    function jsonClone(obj){
        return JSON.parse(JSON.stringify(obj));
    }

    var obj1={a:1,b:2,c:[1,2,3]};
    var obj2=jsonClone(obj1);
    console.log(obj1.c); //[1,2,3]
    console.log(obj2.c); //[1,2,3]
    obj2.c.push(4);
    console.log(obj2.c); //[1,2,3,4]
    console.log(obj1.c); //[1,2,3]

【方法三】使用jquery的extend()方法


    var obj1={a:1,b:2,c:[1,2,3]};
    var obj2=$.extend(true,{},obj1);
    console.log(obj1.c); //[1,2,3]
    console.log(obj2.c); //[1,2,3]
    obj2.c.push(4);
    console.log(obj2.c); //[1,2,3,4]
    console.log(obj1.c); //[1,2,3]

