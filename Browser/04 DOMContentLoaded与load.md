- DOMContentLoaded: 是 dom 内容加载完毕（即 HTML 文档被加载和解析完毕）触发的事件
- load: 页面上所有的资源（图片、音频、视频）被加载以后才会触发 load 事件。load 事件会在 DOMContentLoaded 事件触发之后才触发

load 事件会在 DOMContentLoaded 事件触发之后才触发。

相关问题：

1. 我们常说的将 css 文件放在头部，将 js 文件放在尾部，这样有利于页面的性能优化，为什么呢

   将 css 放在头部，js 放在尾部原因:避免 js 阻塞浏览器对 HTML 文档的解析，影响页面的渲染，从而影响用户体验。
