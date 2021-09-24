## React-router 路由模式

- hash 模式（HashRouter）
  通 过 监 听 hashchange 事 件 ， 在 回 调 里 拿 到 window.location.hash 的值，来保持 UI 和 URL 的同步。 hash 就是指 url 尾巴后的 # 号以及后面的字符。

- history 模式（BrowserRouter）
  BrowserRouter 使用 HTML5 history API: pushState，replaceState 和 popstate 事件，让页面的 UI 与 URL 同步

## BrowserRouter 与 HashRouter 对比

1. HashRouter 最简单，不需要服务器端渲染，靠浏览器的 # 的来区分 path 就可以，BrowserRouter 需要服务器端对不同的 URL 返回不同的 HTML，后端配置。

2. BrowserRouter 使用 HTML5 history API: pushState，replaceState 和 popstate 事件，让页面的 UI 与 URL 同步。

3. HashRouter 不支持 location.key 和 location.state，动态路由跳转需要通过?传递参数。

4. Hash history 不需要服务器任何配置就可以运行，如果你刚刚入门，那就使用它吧。但是我们不推荐在实际线上环境中用到它，因为每一个 web 应用都应该渴望使用 browserHistory 。

_注意_
Route 渲染内容的三种方式: Route 渲染优先级：children > component > render

