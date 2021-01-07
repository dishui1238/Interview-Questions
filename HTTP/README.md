<!--
 * @Author: your name
 * @Date: 2021-01-06 11:10:35
 * @LastEditTime: 2021-01-06 14:01:07
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \Github-Repositories\Interview-Questions\HTTP\README.md
-->
# 网络篇
## 1. 简单讲解一下 http2 的多路复用

简单来说，就是 在同一个 TCP 连接，同一时刻可以传输多个 HTTP 请求，并且可以做到乱序的传输。

**在 HTTP/2 中，有两个非常重要的概念，分别是 帧（frame）和 流（stream）。**

**帧代表着最小的数据单位，每个帧会标识出该帧属于哪个流，流也就是多个帧组成的数据流。**

**HTTP2 采用二进制数据帧传输，取代了 HTTP1.x 的文本格式，二进制格式解析更高效。**

**多路复用代替了 HTTP1.x 的序列和阻塞机制，所有的相同域名请求都通过同一个 TCP 连接并发完成。同一 Tcp 中可以发送多个请求，对端可以通过帧中的标识知道属于哪个请求。通过这个技术，可以避免 HTTP 旧版本中的队头阻塞问题，极大的提高传输性能。**

_扩展：_

多路复用代替原来的序列和阻塞机制。所有就是请求的都是通过一个 TCP 连接并发完成。因为在多路复用之前所有的传输是基于基础文本的，在多路复用中是基于二进制数据帧的传输、消息、流，所以可以做到乱序的传输。多路复用对同一域名下所有请求都是基于流，所以不存在同域并行的阻塞。

<img src=".\imgs\multiplexing.png" />
