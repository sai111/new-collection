# Cookie

&emsp;&emsp;cookie 是一种早期的客户端存储机制，起初是针对服务器端脚本设计使用的，只适合存储少量文本数据。从最底层来看，作为 HTTP 协议的一种扩展实现它。cookie 数据会自动在 Web 浏览器和 Web 服务器之间传输，因此服务端脚本就可以读、写存储在客户端的 cookie 的值。任何以 cookie 形式存储的数据，不论服务器端是否需要，每一次 HTTP 请求都会把这些数据传输到服务器端。cookie 目前仍然被客户端程序员大量使用的一个重要原因是：所有新旧浏览器都支持它。但是，随着 WebStorage 的普及，cookie 终将会回归到最初的形态：作为一种被服务端脚本使用的客户端存储机制。本文将详细介绍 Cookie

&nbsp;

### 概述

&emsp;&emsp;&ldquo;cookie&rdquo;这个名字没有太多的含义，但是在计算机历史上其实很早就用到它了。&ldquo;cookie&rdquo;和&ldquo;magic cookie&rdquo;用于代表少量数据，特别是指类似密码这种用于识别身份或者许可访问的保密数据。在 javascript 中，cookie 用于保存状态以及能够为 Web 浏览器提供一种身份识别机制。但是，javascript 中使用 cookie 不会采用任何加密机制，因此它们是不安全的。但是，通过 https 来传输 cookie 数据是安全的，不过这和 cookie 本身无关，而和 https 协议相关

&emsp;&emsp;HTTP Cookie，通常直接叫做 cookie，最初是在客户端用于存储会话信息的。该标准要求服务器对任意 HTTP 请求发送 Set-Cookie HTTP 头作为响应的一部分，其中包含会话信息。例如，这种服务器响应的头可能如下

<div>
<pre>HTTP/1.1 200 OK
Content-type: Text/html
Set-Cookie: name=value
Other-header: other-header-value</pre>
</div>

&emsp;&emsp;这个 HTTP 响应设置以 name 为名称、以 value 为值的一个 cookie，名称和值在传送时都必须是 URL 编码的。浏览器会存储这样的会话信息，并在这之后，通过为每个请求添加 Cookie HTTP 头将信息发送回服务器，如下所示：

<div>
<pre>GET /index.html HTTP/1.1
Cookie: name=value
Other-header: other-header-value</pre>
</div>

&emsp;&emsp;发送回服务器的额外信息可以用于唯一验证客户来自于发送的哪个请求

&nbsp;

### 标识

&emsp;&emsp;浏览器默认打开 Cookie 功能。window.navigator.cookieEnabled 属性返回一个布尔值，表示浏览器是否打开 Cookie 功能

<div>
<pre>console.log(window.navigator.cookieEnabled);//true</pre>
</div>

&emsp;&emsp;可以通过浏览器的一些设置将 cookie 功能关闭

![](https://pic.xiaohuochai.site/blog/js_storage_cookie1.png)

<div>
<pre>console.log(window.navigator.cookieEnabled);//false</pre>
</div>

&emsp;&emsp;此时，客户端本地将不再存储任何 cookie

&nbsp;

### 限制

&emsp;&emsp;cookie 在性质上是绑定在特定的域名下的。当设定了一个 cookie 后，再给创建它的域名发送请求时，都会包含这个 cookie。这个限制确保了储存在 cookie 中的信息只能让批准的接受者访问，而无法被其他域访问

&emsp;&emsp;注意：不同的浏览器存入的 cookie 位置不一样，不能通用

&emsp;&emsp;由于 cookie 是存在客户端计算机上的，还加入了一些限制确保 cookie 不会被恶意使用，同时不会占据太多磁盘空间。每个域的 cookie 总数是有限的，不过浏览器之间各有不同。如下所示

&emsp;&emsp;IE6-浏览器限制每个域名最多 20 个 cookie

&emsp;&emsp;IE7+浏览器限制每个域名最多 50 个。IE7 最初是支持每个域名最大 20 个 cookie，之后被微软的一个补丁所更新

&emsp;&emsp;Firefox 限制每个域最多 50 个 cookie

&emsp;&emsp;Opera 限制每个域最多 30 个 cookie

&emsp;&emsp;Safari 和 Chrome 对于每个域的 cookie 数量限制没有硬性规定

&emsp;&emsp;当超过单个域名限制之后还要再设置 cookie，浏览器就会清除以前设置的 cookie。IE 和 Opera 会删除最近最少使用过的(LRU, LeastRecentlyUsed)cookie，腾出空间给新设置的 cookie。Firefox 看上去好像是随机决定要清除哪个 cookie，所以考虑 cookie 限制非常重要，以免出现不可预期的后果

&emsp;&emsp;浏览器中对于 cookie 的尺寸也有限制。大多数浏览器都有大约 4096B(加减 1)的长度限制。为了最佳的浏览器兼容性，最好将整个 cookie 长度限制在 4095B(含 4095)以内。尺寸限制影响到一个域下所有的 cookie，而并非每个 cookie 单独限制

&emsp;&emsp;如果尝试创建超过最大尺寸限制的 cookie，那么该 cookie 会被悄无声息地丢掉。注意，虽然一个字符串常占用一字节，但是多字节情况则有不同

【同源】

&emsp;&emsp;两个网址只要域名相同和端口相同，就可以共享 Cookie。注意，这里不要求协议相同

&emsp;&emsp;也就是说，`http://example.com`设置的 Cookie，可以被`https://example.com`读取

&nbsp;

### 组成

&emsp;&emsp;cookie 由浏览器保存的以下 7 块信息构成

<div>
<pre>Set-Cookie: name=value[; expires=date][; max-age=secondes][; domain=domain][; path=path][; secure]</pre>
</div>

&emsp;&emsp;1、名称：唯一确定 cookie 的名称。cookie 名称是不区分大小写的，所以 myCookie 和 MyCookie 被认为是同一个 cookie。然而，实践中最好将 cookie 名称看作是区分大小写的，因为某些服务器会这样处理 cookie。cookie 的名称必须是经过 URL 编码的

&emsp;&emsp;2、值：储存在 cookie 中的字符串值。值必须被 URL 编码

&emsp;&emsp;3、域：cookie 对于哪个域是有效的。所有向该域发送的请求中都会包含这个 cookie 信息。这个值可以包含子域(subdomain，如`www.wrox.com`)，也可以不包含它(如`.wrox.com`，则对于`wrox.com`的所有子域都有效)。如果没有明确设定，那么这个域会被认作来自设置 cookie 的那个域

&emsp;&emsp;4、路径：对于指定域中的路径，必须是绝对路径（比如/、/books），如果未指定，默认为请求该 Cookie 的网页路径。例如，可以指定 cookie 只有从"`http://www.wrox.com/books/`"中才能访问，那么`http://www.wrox.com`的页面就不会发送 cookie 信息，即使请求都是来自同一个域的

&emsp;&emsp;注意：这里的匹配不是绝对匹配，而是从根路径开始，只要`path`属性匹配发送路径的一部分，就可以发送。比如，`path`属性等于`/blog`，则发送路径是`/blog`或者`/blogroll`，Cookie 都会发送。`path`属性生效的前提是`domain`属性匹配

&emsp;&emsp;5、失效时间(expires)：表示 cookie 何时应该被删除的时间戳(也就是，何时应该停止向服务器发送这个 cookie)。默认情况下，浏览器会话结束时即将所有 cookie 删除；不过也可以自己设置删除时间。这个值是个 GMT 格式的日期(Wdy,DD-Mon-YYYY HH:MM:SS GMT)，用于指定应该删除 cookie 的准确时间。因此，cookie 可在浏览器关闭后依然保存在用户的机器上。如果设置的失效日期是个以前的时间，则 cookie 会被立刻删除

<div>
<pre>document.cookie = "a = 2; expires = " + (new Date( +new Date() + 4000*60*60*24 )).toUTCString();</pre>
</div>

&emsp;&emsp;注意 1：必须使用 toUTCString()或者 toGMTString()，如果使用 toString()会因为时区问题，导致时间设置错误

&emsp;&emsp;注意 2：浏览器根据本地时间，决定 Cookie 是否过期，由于本地时间是不精确的，所以没有办法保证 Cookie 一定会在服务器指定的时间过期

&emsp;&emsp;6、有效期(max-age)：表示 cookie 有效期为多久，单位为秒(s)

<div>
<pre>document.cookie = "b = 3; max-age=60";</pre>
</div>

&emsp;&emsp;7、安全标志：指定后，cookie 只有在使用 SSL 连接的时候才发送到服务器。例如，cookie 信息只能发送给"https:www.wrox.com"，而"http:www.wrox.com"的请求则不能发送cookie

&emsp;&emsp;每一段信息都作为 Set-Cookie 头的一部分，使用分号加空格分隔每一段，如下所示

<div>
<pre>HTTP/1.1 200 0K
Content-type: text/html
Set-Cookie: name=value; expires=Mon, 22-Jan-17 07:10:24 GMT; domains=.wrox.com
Other-header: other-header-value</pre>
</div>

&emsp;&emsp;该头信息指定了一个叫做 name 的 cookie，它会在格林威治时间 2017 年 1 月 22 日 7:10:24 失效，同时对于www.wrox.com和wrox.com的任何子域(如`p2p.wrox.com`)都有效

&emsp;&emsp;secure 标志是 cookie 中唯一一个非名值对儿的部分，直接包含一个 secure 单词。如下所示

<div>
<pre>HTTP/1.1 200 0K
Content-type: text/html
Set-Cookie: name=value; domain=.wrox.com; path=/; secure
Other-header: other-header-value</pre>
</div>

&emsp;&emsp;这里，创建了一个对于所有 wrox.com 的子域和域名下(由 path 参数指定的)所有页面都有效的 cookie。因为设置了 secure 标志，这个 cookie 只能通过 SSL 连接才能传输

&emsp;&emsp;注意：域、路径、失效时间、有效期和安全标志都是服务器给浏览器的指示，以指定何时应该发送 cookie。这些参数并不会作为发送到服务器的 cookie 信息的一部分，只有名值对儿才会被发送

&nbsp;

### 读取

&emsp;&emsp;通过 document.cookie 属性可以获取 cookie 的值，其返回值是一个字符串，该字符串都是由一系列名值对儿组成，不同名/值对之间通过&ldquo;分号和空格&rdquo;分开，其内容包含了所有作用在当前文档的 cookie。但是，它并不包含其他设置的 cookie 属性

<div>
<pre>document.cookie = "name=match; domain=127.0.0.1; path=/test";
console.log(document.cookie);//'age=32; name=match'</pre>
</div>

&emsp;&emsp;但是为了更好地査看 cookie 的值，一般会采用 split()方法将 cookie 值中的名/值对都分离出来

&emsp;&emsp;把 cookie 的值从 cookie 属性分离出来之后，必须要采用相应的解码方式(取决于之前存储 cookie 值时采用的编码方式)，把值还原出来。比如，先采用 decodeURIComponent()方法把 cookie 值解码出来，之后再利用 JSON.parse()方法转化成 json 对象

&emsp;&emsp;下面定义了一个 getCookie()函数，该函数将 document.cookie 属性的值解析出来

<div>
<pre>function getCookie(key){
    var arr1 = document.cookie.split("; ");
    for(var i = 0; i &lt; arr1.length; i++){
        var arr2 = arr1[i].split("=");
        if(arr2[0] == key){
            return decodeURIComponent(arr2[1]);
        }
    }
}

console.log(getCookie('name'));//'match'
console.log(getCookie('age'));//'32'</pre>

</div>

&nbsp;

### 设置

&emsp;&emsp;当用于设置值的时候，document.cookie 属性可以设置为一个新的 cookie 字符串。这个 cookie 字符串会被解释并添加到现有的 cookie 集合中。设置 document.cookie 并不会覆盖 cookie，除非设置的 cookie 的名称已经存在。设置 cookie 的格式如下，和 Set-Cookie 头中使用的格式一样

<div>
<pre>name=value;expires=expiration_time;path=domain_path; domain=domain_name;secure </pre>
</div>

&emsp;&emsp;这些参数中，只有 cookie 的名字和值是必需的。这段代码创建了一个叫 name 的 cookie，值为 Nicholas。当客户端每次向服务器端发送请求的时候，都会发送这个 cookie; 当浏览器关闭的时候，它就会被删除

<div>
<pre>document.cookie = "name=Nicholas";</pre>
</div>

&emsp;&emsp;以简单的名/值对形式存储的 cookie 数据有效期只在当前 Web 浏览器的会话内，一旦用户关闭浏览器，cookie 数据就丢失了。如果想要延长 cookie 的有效期，就需要设置 max-age 属性来指定 cookie 的有效期(单位是秒)。按照如下的字符串形式设置 cookie 属性即可：

<div>
<pre>name=value;max-age=seconds</pre>
</div>

&emsp;&emsp;由于 cookie 的名/值中的值是不允许包含分号、逗号和空白符，因此，在存储前一般可以采用 encodeURIComponent()对值进行编码。相应的，读取 cookie 值的时候需要采用 decodeURIComponent()函数解码

&emsp;&emsp;注意：与这两个函数相当于的 PHP 的编解码函数是 urlencode()和 urldecode()

<div>
<pre>document.cookie = encodeURIComponent("name") + "=" + encodeURIComponent("Nicholas");</pre>
</div>

&emsp;&emsp;要给被创建的 cookie 指定额外的信息，只要将参数追加到该字符串，和 Set-Cookie 头中的格式一样，如下所示

<div>
<pre>document.cookie = encodeURIComponent("name")+"="+encodeURIComponent("Nicholas") + ";domain=.wrox.com;path=/";</pre>
</div>

&emsp;&emsp;下面的函数用来设置一个 cookie 的值，同时提供一个可选的 max-age 属性

<div>
<pre>function setCookie(key,value,d){
    if(d === undefined){
        document.cookie = encodeURIComponent(key) + "=" + encodeURIComponent(value);
    }else{
        document.cookie = encodeURIComponent(key) + "=" + encodeURIComponent(value) + ";max-age=" + (d*60*60*24);        
    }
}
setCookie('name','');
console.log(getCookie('name'));//''</pre>
</div>

【改变】

&emsp;&emsp;要改变 cookie 的值，需要使用相同的名字、路径和域，但是新的值重新设置 cookie 的值。同样地，设置新 max-age 属性就可以改变原来的 cookie 的有效期

<div>
<pre>function setCookie(key,value,d){
    if(d === undefined){
        document.cookie = encodeURIComponent(key) + "=" + encodeURIComponent(value);
    }else{
        document.cookie = encodeURIComponent(key) + "=" + encodeURIComponent(value) + ";max-age=" + (d*60*60*24);        
    }

}
setCookie('name','');
console.log(getCookie('name'));//''
setCookie('name','火柴');
console.log(getCookie('name'));//'火柴'</pre>

</div>

【删除】

&emsp;&emsp;要删除一个 cookie，需要使用相同的名字、路径和域，然后指定一个任意(非空)的值，并且将 max-age 属性指定为 0，再次设置 cookie

<div>
<pre>function setCookie(key,value,d){
    if(d === undefined){
        document.cookie = encodeURIComponent(key) + "=" + encodeURIComponent(value);
    }else{
        document.cookie = encodeURIComponent(key) + "=" + encodeURIComponent(value) + ";max-age=" + (d*60*60*24);        
    }

}
setCookie('name','');
console.log(getCookie('name'));//''
setCookie('name','',0);
console.log(getCookie('name'));//undefined</pre>

</div>

&nbsp;

### 读写差异

&emsp;&emsp;document.cookie 属性一次可以读出全部 Cookie，但是只能写入一个 Cookie，与服务器与浏览器之间的 Cookie 通信格式有关。浏览器向服务器发送 Cookie 的时候，是一行将所有 Cookie 全部发送

<div>
<pre>GET /sample_page.html HTTP/1.1
Host: www.example.org
Cookie: cookie_name1=cookie_value1; cookie_name2=cookie_value2
Accept: */*</pre>
</div>

&emsp;&emsp;上面的头信息中，Cookie 字段是浏览器向服务器发送的 Cookie

&emsp;&emsp;服务器告诉浏览器需要储存 Cookie 的时候，则是分行指定

<div>
<pre>HTTP/1.0 200 OK
Content-type: text/html
Set-Cookie: cookie_name1=cookie_value1
Set-Cookie: cookie_name2=cookie_value2; expires=Sun, 16 Jul 3567 06:23:41 GMT</pre>
</div>

&emsp;&emsp;上面的头信息中，Set-Cookie 字段是服务器写入浏览器的 Cookie，一行一个

&nbsp;

### 子 cookie

&emsp;&emsp;为了绕开浏览器的单域名下的 cookie 数限制，一些开发人员使用了一种称为子 cookie(subcookie)的概念。子 cookie 是存放在单个 cookie 中的更小段的数据。也就是使用 cookie 值来存储多个名称值对儿。子 cookie 最常见的格式如下所示

<div>
<pre>name=name1=value1&amp;name2=value2&amp;name3=value3&amp;name4=value4&amp;name5=value5</pre>
</div>

&emsp;&emsp;子 cookie 一般也以査询字符串的格式进行格式化。然后这些值可以使用单个 cookie 进行存储和访问，而非对每个名称&mdash;&mdash;值对儿使用不同的 cookie 存储。最后网站或者 Web 应用程序可以无需达到单域名 cookie 上限也可以存储更加结构化的数据

&emsp;&emsp;为了更好地操作子 cookie，必须建立一系列新方法。子 cookie 的解析和序列化会因子 cookie 的期望用途而略有不同并更加复杂些

&nbsp;

### PHP

&emsp;&emsp;虽然在客户端可以使用 javascript 读写 Cookie，但更常用的是在服务器端来读写 Cookie，然后再将 Cookie 返回，并保存到客户端

【设置】

&emsp;&emsp;PHP 使用 setcookie()函数来设置 Cookie

<div>
<pre>bool setcookie ( string $name [, string $value = "" [, int $expire = 0 [, string $path = "" [, string $domain = "" [, bool $secure = false [, bool $httponly = false ]]]]]] )</pre>
</div>

![](https://pic.xiaohuochai.site/blog/js_storage_cookie2.png)

&emsp;&emsp;可以看出前 6 个参数，与 document.cookie 中的参数相同，只是新增了一个 httponly 参数，稍后介绍

<div>
<pre>//向客户端发送一个Cookie，将变量username设置为''，保存时间为一天
setcookie('username','',time()+60*60*24);</pre>
</div>

![](https://pic.xiaohuochai.site/blog/js_storage_cookie3.png)

<div>
<pre>function getCookie(key){
    var arr1 = document.cookie.split("; ");
    for(var i = 0; i &lt; arr1.length; i++){
        var arr2 = arr1[i].split("=");
        if(arr2[0] == key){
            return decodeURIComponent(arr2[1]);
        }
    }
}
console.log(getCookie('username'));//''</pre>
</div>

&emsp;&emsp;也可以利用多维数组的形式，将多个内容值存储在相同 Cookie 名称标识符下

<div>
<pre>setcookie("user[username]", "");            //$_COOKIE["user"]["username"] 
setcookie("user[password]", md5("123456"));   //$_COOKIE["user"]["password"] </pre>
</div>
<div>
<pre>//遍历$_COOKIE["user"]数组
foreach($_COOKIE["user"] as $key =&gt; $value){ 
  //输出Cookie数组中二维的键值对 
  echo $key.":".$value."\n";
}</pre>
</div>

【HTTP 专有】

&emsp;&emsp;设置 Cookie 的时候，如果服务器加上了 HttpOnly 属性，则这个 Cookie 无法被 javascript 读取(即 document.cookie 不会返回这个 Cookie 的值)，只能从服务器端读取。进行 AJAX 操作时，XMLHttpRequest 对象也无法包括这个 Cookie。这主要是为了防止 XSS 攻击盗取 Cookie

&emsp;&emsp;注意：cookie 依然保存在客户端中，只是无法被 document.cookie 读取

<div>
<pre>setcookie('username','',time()+60*60*24,'','','',true);</pre>
</div>

![](https://pic.xiaohuochai.site/blog/js_storage_cookie4.png)

<div>
<pre>function getCookie(key){
    var arr1 = document.cookie.split("; ");
    for(var i = 0; i &lt; arr1.length; i++){
        var arr2 = arr1[i].split("=");
        if(arr2[0] == key){
            return decodeURIComponent(arr2[1]);
        }
    }
}
console.log(getCookie('username'));//undefined</pre>
</div>

【删除】

&emsp;&emsp;设置 Cookie 在当前时间过期，因此系统会自动删除识别该名称的 Cookie

<div>
<pre>setCookie("username", "" , time()-1);  </pre>
</div>

【读取】

&emsp;&emsp;在 PHP 中读取 Cookie 信息很简单，使用超全局数组$\_COOKIE['名称']即可获取 cookie 中的内容

<div>
<pre>//输出Cookie中保存的所有用户信息 
print_r($_COOKIE); 
//输出Cookie中'username'的值 
print_r($_COOKIE['username']); </pre>
</div>

&nbsp;

### 登录

&emsp;&emsp;大部分页面都有登录模块，这是为了维护系统安全，确保只有通过身份验证的用户才能访问该系统，采用 Cookie 保存用户登录信息，在每个 PHP 脚本中，都能跟踪登录的用户

&emsp;&emsp;下面是一个使用原生 js+php+mysql 制作的一个简易的登录框

【数据库】

&emsp;&emsp;数据表格式如下

<div>
<pre>CREATE TABLE user(
    id int not null auto_increment,
    username varchar(50) not null default '',
    password char(32) not null default '',
    primary key(id)
);</pre>
</div>

&emsp;&emsp;插入数据用户名为 admin，密码为 123456

![](https://pic.xiaohuochai.site/blog/js_storage_cookie5.png)

【PHP】

&emsp;&emsp;查询数据库，如果用户存在，则返回登录成功，否则返回登录失败

<div>
<pre>&lt;?php
    header("Content-Type:text/html;charset=utf-8");
    try {
        //创建对象
        $pdo = new PDO("mysql:host=localhost;dbname=cookie1", "root", "*****");
        $stmt = $pdo -&gt; prepare("select id, username, password from user where username=? and password=?");
        $stmt -&gt; execute(array($_POST['username'],$_POST['password']));
        //如果查出数据，说明这个用户是存在的
        if($stmt-&gt;rowCount() &gt; 0) {
            //表示用户存在
            echo '登录成功';
            $time = time()+24*60*60;
            setCookie('username',urlencode($_POST['username']),$time);
            setCookie('password',urlencode($_POST['password']),$time);
            //设置一个登录判断的标记isLogin
            setCookie("isLogin", 1, $time);
        } else {
            //表示用户不存在 
            echo '登录失败';
        }
    }catch(PDOException $e) {
        echo "数据库连接失败：".$e-&gt;getMessage();
        exit;
    }
?&gt;</pre>
</div>

【前端】

&emsp;&emsp;将要发送的数据通过 md5 加密后通过 ajax 发送给服务器

<div>
<pre>&lt;div id="box"&gt;
    &lt;label for="username"&gt;用户名：&lt;/label&gt;&lt;input id="username" name="username"&gt;
    &lt;label for="password"&gt;密码：&lt;/label&gt;&lt;input id="password" name="password"&gt;
    &lt;input type="button" id="btn" value="登录"&gt;
&lt;/div&gt;  
&lt;div id="result"&gt;&lt;/div&gt;
&lt;script src="md5.js"&gt;&lt;/script&gt;
&lt;script&gt;
btn.onclick = function(){
    //创建xhr对象
    var xhr = new XMLHttpRequest();
    //异步接受响应
    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4){
            if(xhr.status == 200){
                result.innerHTML = xhr.responseText;            
            }
        }
    }
    //发送请求
    xhr.open('post','cookie1.php',true);
    xhr.setRequestHeader("content-type","application/x-www-form-urlencoded");
    xhr.send('username=' + hex_md5(username.value)+ '&amp;password=' + hex_md5(password.value));    
} 
&lt;/script&gt;</pre>
</div>

&emsp;&emsp;下列示例中，只有用户名为'admin'，密码为'123456'时，才能成功

<iframe src="https://www.xiaohuochai.site/test/cookie/c1.html" frameborder="0" width="520" height="80"></iframe>
