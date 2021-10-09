## DNS Prefetching

浏览器根据自定义的规则，提前去解析后面可能用到的域名，来加速网站的访问速度。简单来讲就是提前解析域名，以免延迟

### 使用方式

```HTML
<link rel="dns-prefetch" href="https://cdn.bootcss.com">
```

这个功能有个默认加载条件，所有的 a 标签的 href 都会自动去启用 DNS Prefetching，也就是说，你网页的 a 标签 href 带的域名，是不需要在 head 里面加上 link 手动设置的。但 a 标签的默认启动在 HTTPS 不起作用。
这时要使用 meta 里面 http-equiv 来强制启动功能。

```HTML
<meta http-equiv="x-dns-prefetch-control" content="on">
```

这个对于什么样的网站更有作用呢，类似 taobao 这种网站，你的网页引用了大量很多其他域名的资源，如果你的网站，基本所有的资源都在你本域名下，那么这个基本没有什么作用
