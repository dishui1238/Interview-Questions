# 浏览器篇

## 1. 简述浏览器缓存读取规则

浏览器缓存可以优化性能，比如直接使用缓存而不发起请求，或者发起了请求但后端存储的数据和前端一致，则使用缓存从而减少响应数据。

普通刷新时 优先使用 Memory Cache，其次才是 Disk Cache

强制刷新时，浏览器不使用缓存

地址栏输入地址时，查找 Disk Cache 中是否有匹配。

强缓存优先于协商缓存，协商缓存就是强制缓存失效后，浏览器携带缓存标识向服务器发起请求，由服务器根据缓存标识决定是否使用缓存的过程。

---

**缓存位置**

**Service Worker**

Service Worker 实现缓存功能一般分为三个步骤：首先需要先注册 Service Worker，然后监听到 install 事件以后就可以缓存需要的文件，那么在下次用户访问的时候就可以通过拦截请求的方式查询是否存在缓存，存在缓存的话就可以直接读取缓存文件，否则就去请求数据。

当 Service Worker 没有命中缓存的时候，我们需要去调用 fetch 函数获取数据。也就是说，如果我们没有在 Service Worker 命中缓存的话，会根据缓存查找优先级去查找数据。但是不管我们是从 Memory Cache 中还是从网络请求中获取的数据，浏览器都会显示我们是从 Service Worker 中获取的内容。

Service Worker 是运行在浏览器背后的独立线程，一般可以用来实现缓存功能。使用 Service Worker 的话，传输协议必须为 HTTPS。Service Worker 的缓存与浏览器其他内建的缓存机制不同，它可以让我们自由缓存哪些文件、如何匹配缓存、如何读取缓存，而缓存是可持续性的。Service Worker 也是 PWA(Progressive Web App 渐进式 Web 应用) 的核心技术。

**Memory Cache**
Memory Cache 也就是内存中的缓存，主要包含的是当前页面中已经抓取到的资源，例如页面上已经下载的样式、脚本、图片等。读取内存中的数据很高效，但是缓存持续性很短，会随着进程的释放而释放。一旦我们关闭 Tab 页面，内存中的缓存也就被释放了。

**Disk Cache**
Disk Cache 也就是存储在硬盘中的缓存，读取速度慢点，但是什么都能存储到磁盘中，比之 Memory Cache 胜在容量和存储时效性上。

在所有浏览器缓存中，Disk Cache 覆盖面基本上是最大的。它会根据 HTTP Header 中的字段判断哪些资源需要缓存，哪些资源可以不请求直接使用，哪些资源已经过期需要重新请求。并且即使在跨站点的情况下，相同地址的资源一旦被硬盘缓存下来，就不会再次去请求数据。绝大部分的缓存都来自 Disk Cache。

**Push Cache**
Push Cache（推送缓存）是 HTTP/2 中的内容，当以上三种缓存都没有命中时，它才会被时候用。它只在会话（Session）中存在，一旦会话结束就被释放，并且缓存时间也很短暂（大约 5 分钟）。

---

**缓存过程分析**

浏览器与服务器通信的方式为应答模式，即是：浏览器发起 HTTP 请求 - 服务器响应该请求。浏览器第一次向服务器发起该请求后拿到请求结果后，将请求结果和缓存表示存入浏览器缓存，浏览器对于缓存的处理是根据第一次请求资源返回的响应头来确定的。

- 浏览器每次发起请求，都会先在浏览器缓存中查找该请求的结果以及缓存标识；
- 浏览器每次拿到返回的请求结果都会将该结果和缓存表示存入浏览器缓存中；

---

**浏览器会把哪些文件丢进内存中？哪些丢进硬盘中？**
关于这点，网上说法不一，不过以下观点比较靠得住：

对于大文件来说，大概率是不存储在内存中的，反之优先
当前系统内存使用率高的话，文件优先存储进硬盘

## 2. 常见浏览器内核

| 内核     | 浏览器        | 备注                                                                                                                         |
| -------- | ------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| Trident  | IE            | IE、猎豹安全、360 极速浏览器、百度浏览器                                                                                     |
| Gecko    | firefox       | Firefox 浏览器                                                                                                               |
| webkit   | Safari        | 旧版的 Chrome 也是使用 webkit                                                                                                |
| Blink    | Chrome、Opera | 谷歌浏览器内核，属于 Webkit 的一个分支，与 Opera 一起在研发                                                                  |
| Chromium |               | 这个比较特殊，Chromium 是谷歌的开源项目是一款浏览器，Chrome 是 Chromium 的稳定版。国内的大部分双核浏览器都采用 Chromium 内核 |

## 3.介绍下重绘和回流（Repaint & Reflow），以及如何进行优化

### 减少回流和重绘方式

https://muyiy.cn/question/browser/22.html

1. 最小化重绘和重排

> 合并多次对 DOM 和样式的修改，然后一次处理掉

    例子：

    ```js
    const el = document.getElementById("test");

    el.style.padding = "5px";
    el.style.borderLeft = "1px";
    el.style.borderRight = "2px";
    ```

    例子中，有三个样式属性被修改了，每一个都会影响元素的几何结构，引起回流。当然，大部分现代浏览器都对其做了优化，因此，只会触发一次重排。但是如果在旧版的浏览器或者在上面代码执行的时候，有其他代码访问了布局信息(上文中的会触发回流的布局信息)，那么就会导致三次重排。

    可以使用如下方式：

    - 使用 cssText

      ```js
      const el = document.getElementById("test");
      el.style.cssText += "border-left: 1px; border-right: 2px; padding: 5px;";
      ```

    - 修改 CSS 的 class

      ```js
      const el = document.getElementById("test");
      el.className += " active";
      ```

2. 批量修改 DOM

当我们需要对 DOM 对一系列修改的时候，可以通过以下步骤减少回流重绘次数：

- 使元素脱离文档流
- 对其进行多次修改
- 将元素带回到文档中。

该过程的第一步和第三步可能会引起回流，但是经过第一步之后，对 DOM 的所有修改都不会引起回流重绘，因为它已经不在渲染树了。

## 4. 什么是 CORS，怎么解决跨域问题？

CORS 是一个 W3C 标准，全称是"跨域资源共享"（Cross-origin resource sharing），是一种基于 HTTP 头的机制。它允许浏览器向跨源服务器，发出 XMLHttpRequest 请求，从而克服了 AJAX 只能同源使用的限制。所谓同源是指"协议+域名+端口"三者相同。

### 跨域解决方案

1. JSONP 实现跨域

jsonp 的原理就是利用`<script>`标签没有跨域限制，通过`<script>`标签 src 属性，发送带有 callback 参数的 GET 请求，服务端将接口返回数据拼凑到 callback 函数中，返回给浏览器，浏览器解析执行，从而前端拿到 callback 函数返回的数据。

```html
<script>
  var script = document.createElement("script");
  script.type = "text/javascript";

  // 传参一个回调函数名给后端，方便后端返回时执行这个在前端定义的回调函数
  script.src =
    "http://www.domain2.com:8080/login?user=admin&callback=handleCallback";
  document.head.appendChild(script);

  // 回调执行函数
  function handleCallback(res) {
    alert(JSON.stringify(res));
  }
</script>
```

服务端处理如下：

```js
handleCallback({ success: true, user: "admin" });
```

2. CORS

浏览器将 CORS 跨域请求分为简单请求和非简单请求
