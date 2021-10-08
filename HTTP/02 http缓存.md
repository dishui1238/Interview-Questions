## HTTP 缓存

1. 强缓存
   > 浏览器不会像服务器发送任何请求，直接从本地缓存中读取文件并返回。优先级：`cache-control` > `expires`

- **expires** 强制缓存(HTTP1.0 可以使用)：不能让首次访问的页面内容缓存，因为内容存在了浏览器上，拿自己的日期和服务端返回的过期时间做对比，判断是否过期(_用户如果更改了系统时间，可能会导致缓存失效_)

- **cache-control: max-age=xxxx**
  HTTP1.1 中使用，没有了修改系统时间的问题
  `max-age=xxx`: 缓存时间s，_缺陷：缓存时间内服务器文件变化得不到更新_
  `no-store` 压根没缓存 不缓存，这个会让客户端、服务器都不缓存，也就没有所谓的强缓存、协商缓存了
  `no-cache` 有缓存，不使用 跳过设置强缓存，但是不妨碍设置协商缓存；一般如果你做了强缓存，只有在强缓存失效了才走协商缓存的，设置了 no-cache 就不会走强缓存了，每次请求都回询问服务端。

2. 协商缓存
   > 向服务器发送请求，服务器会根据这个请求的 request header 的一些参数来判断是否命中协商缓存，如果命中，则返回 304 状态码并带上新的 response header 通知浏览器从缓存中读取资源；
   > Etag 优先级是高于 Last-Modifed 的，所以服务器会优先验证 Etag

- `Last-Modifed/If-Modified-Since`: 服务器将 if-modified-since 与被请求资源的最后修改时间进行对比，判断资源有无修改，无修改返回 304 状态码，让浏览器从缓存中读取。时间精度是秒

- `Etag / If-none-match`: 如果 `Etag = If-none-match`，返回 304。etag 由响应头的 Last-Modified 与 Content-Length 表示为十六进制组合而成。
