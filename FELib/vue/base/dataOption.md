# Vue 实例对象的数据选项

&emsp;&emsp;一般地，当模板内容较简单时，使用 data 选项配合表达式即可。涉及到复杂逻辑时，则需要用到 methods、computed、watch 等方法。本文将详细介绍 Vue 实例对象的数据选项

&nbsp;

### data

&emsp;&emsp;data 是 Vue 实例的数据对象。Vue 将会递归将 data 的属性转换为 getter/setter，从而让 data 属性能响应数据变化

&emsp;&emsp;注意：不应该对`data`属性使用箭头函数

<!-- {% raw %} -->

```
<div id="app">
  {{ message }}
</div>
```

<!-- {% endraw %} -->

```
<script>
var values = {message: 'Hello Vue!'}
var vm = new Vue({
  el: '#app',
  data: values
})
console.log(vm);
</script>
```

![vue_base_dataOption1](https://pic.xiaohuochai.site/blog/vue_base_dataOptions1.png)

&emsp;&emsp;Vue 实例创建之后，可以通过`vm.$data`访问原始数据对象

```
console.log(vm.$data);
```

![vue_base_dataOption2](https://pic.xiaohuochai.site/blog/vue_base_dataOptions2.png)

&emsp;&emsp;Vue 实例也代理了 data 对象上所有的属性

```
<script>
var values = {message: 'Hello Vue!'}
var vm = new Vue({
  el: '#app',
  data: values
})
console.log(vm.$data === values);//true
console.log(vm.message);//'Hello Vue!'
console.log(vm.$data.message);//'Hello Vue!'
</script>
```

&emsp;&emsp;被代理的属性是响应的，也就是说值的任何改变都是触发视图的重新渲染。设置属性也会影响到原始数据，反之亦然

![vue_base_dataOption3](https://pic.xiaohuochai.site/blog/vue_base_dataOption3.gif)

&emsp;&emsp;但是，以`_`或`$`开头的属性不会被 Vue 实例代理，因为它们可能和 Vue 内置的属性或方法冲突。可以使用例如`vm.$data._property`的方式访问这些属性

```
<script>
var values = {
  message: 'Hello Vue!',
  _name: ''
}
var vm = new Vue({
  el: '#app',
  data: values
})
console.log(vm._name);//undefined
console.log(vm.$data._name);//''
</script>
```

&nbsp;

### computed

&emsp;&emsp;计算属性函数 computed 将被混入到 Vue 实例中。所有 getter 和 setter 的 this 上下文自动地绑定为 Vue 实例

&emsp;&emsp;注意：不应该使用箭头函数来定义计算属性函数

&emsp;&emsp;下面是关于 computed 的一个例子

<!-- {% raw %} -->

```
<div id="example">
  <p>原始字符串: "{{ message }}"</p>
  <p>反向字符串: "{{ reversedMessage }}"</p>
</div>
```

<!-- {% endraw %} -->

```
<script>
var vm = new Vue({
  el: '#example',
  data: {
    message: ''
  },
  computed: {
    reversedMessage: function () {
      return this.message.split('').reverse().join('')
    }
  }
})
</script>
```

&emsp;&emsp;结果如下

![vue_base_dataOption4](https://pic.xiaohuochai.site/blog/vue_base_dataOptions4.png)

&emsp;&emsp;这里声明了一个计算属性&nbsp;`reversedMessage`&nbsp;。提供的函数将用作属性&nbsp;`vm.reversedMessage`&nbsp;的 getter&nbsp;

```
console.log(vm.reversedMessage) // -> '柴火小'
vm.message = 'Goodbye'
console.log(vm.reversedMessage) // -> 'eybdooG'
```

&emsp;&emsp;`vm.reversedMessage`&nbsp;的值始终取决于&nbsp;`vm.message`&nbsp;的值。可以像绑定普通属性一样在模板中绑定计算属性。当&nbsp;`vm.message`&nbsp;发生改变时，所有依赖于&nbsp;`vm.reversedMessage`&nbsp;的绑定也会更新

&emsp;&emsp;结果如下图所示，vm.reversedMessage 依赖于 vm.message 的值，vm.reversedMessage 本身并不能被赋值

![vue_base_dataOption5](https://pic.xiaohuochai.site/blog/vue_base_dataOption5.gif)

【setter】

&emsp;&emsp;计算属性默认只有 getter ，不过在需要时也可以提供一个 setter

```
<script>
var vm = new Vue({
  data: { a: 1 },
  computed: {
    // 仅读取，值只须为函数
    aDouble: function () {
      return this.a * 2
    },
    // 读取和设置
    aPlus: {
      get: function () {
        return this.a + 1
      },
      set: function (v) {
        this.a = v - 1
      }
    }
  }
})
console.log(vm.aPlus);//2
vm.aPlus = 3
console.log(vm.a);//2
console.log(vm.aDouble);//4
</script>
```

&nbsp;

### methods

&emsp;&emsp;通过调用表达式中的 methods 也可以达到同样的效果

&emsp;&emsp;注意：不应该使用箭头函数来定义 methods 函数

<!-- {% raw %} -->

```
<div id="example">
  <!-- fdf -->
  <p>原始字符串: "{{ message }}"</p>
  <p>反向字符串: "{{ reversedMessage() }}"</p>
</div>
```

<!-- {% endraw %} -->

```
<script>
var vm = new Vue({
  el: '#example',
  data: {
    message: ''
  },
  methods: {
    reversedMessage: function () {
      return this.message.split('').reverse().join('')
    }
  }
})
</script>
```

【缓存】

&emsp;&emsp;对于最终的结果，两种方式确实是相同的

&emsp;&emsp;然而，不同的是计算属性是基于它们的依赖进行缓存的。计算属性只有在它的相关依赖发生改变时才会重新求值。这就意味着只要&nbsp;`message`&nbsp;还没有发生改变，多次访问&nbsp;`reversedMessage`&nbsp;计算属性会立即返回之前的计算结果，而不必再次执行函数

&emsp;&emsp;相比而言，只要发生重新渲染，method 调用总会执行该函数。如下所示

<!-- {% raw %} -->

```
<div id="example">
  <p>计算属性: "{{ time1 }}"</p>
  <p>methods方法: "{{ time2() }}"</p>
</div>
```

<!-- {% endraw %} -->

```
<script>
var vm = new Vue({
  el: '#example',
  computed:{
    time1: function () {
        return (new Date()).toLocaleTimeString()
    }
  },
  methods: {
    time2: function () {
      return (new Date()).toLocaleTimeString()
    }
  }
})
</script>
```

![vue_base_dataOption6](https://pic.xiaohuochai.site/blog/vue_base_dataOption6.gif)

&emsp;&emsp;假设有一个性能开销比较大的的计算属性 A，它需要遍历一个极大的数组和做大量的计算。可能有其他的计算属性依赖于&nbsp;A&nbsp;。如果没有缓存，将不可避免的多次执行 A 的 getter！如果不希望有缓存，则用 method 替代

&nbsp;

### watch

&emsp;&emsp;Vue 提供了一种通用的方式来观察和响应 Vue 实例上的数据变动：watch 属性。watch 属性是一个对象，键是需要观察的表达式，值是对应回调函数，回调函数得到的参数为新值和旧值。值也可以是方法名，或者包含选项的对象。Vue 实例将会在实例化时调用`$watch()`，遍历 watch 对象的每一个属性

&emsp;&emsp;注意：不应该使用箭头函数来定义 watch 函数

<!-- {% raw %} -->

```
<div id="app">
  <button @click="a++">a加1</button>
  <p>{{ message }}</p>
</div>
```

<!-- {% endraw %} -->

```
<script>
var vm = new Vue({
  el: '#app',
  data: {
    a: 1,
    message:''
  },
  watch: {
    a: function (val, oldVal) {
      this.message = 'a的旧值为' + oldVal + '，新值为' + val;
    }
  }
})
</script>
```

&emsp;&emsp;上面代码中，当 a 的值发生变化时， 通过 watch 的监控，使 message 输出相应的内容

<iframe src="https://demo.xiaohuochai.site/vue/base/b1.html" frameborder="0" width="320" height="100"></iframe>

【$watch】

&emsp;&emsp;除了使用数据选项中的 watch 方法以外，还可以使用实例对象的$watch 方法，&nbsp;该方法的返回值是一个取消观察函数，用来停止触发回调

<!-- {% raw %} -->

```
<div id="app">
  <button @click="a++">a加1</button>
  <p>{{ message }}</p>
</div>
```

<!-- {% endraw %} -->

```
<script>
var vm = new Vue({
  el: '#app',
  data: {
    a: 1,
    message:''
  }
})
var unwatch = vm.$watch('a',function(val, oldVal){
  if(val === 10){
    unwatch();
  }
  this.message = 'a的旧值为' + oldVal + '，新值为' + val;
})
</script>
```

&emsp;&emsp;上面的代码中，当 a 的值更新到 10 时，触发 unwatch()，来取消观察。点击按钮时，a 的值仍然会变化，但是不再触发 watch 的回调函数

![vue_base_dataOption7](https://pic.xiaohuochai.site/blog/vue_base_dataOption7.gif)
