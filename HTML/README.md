<!--
 * @Author: your name
 * @Date: 2020-12-30 10:40:49
 * @LastEditTime: 2021-01-06 11:14:37
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \Github-Repositories\Interview-Questions\HTML\README.md
-->

# HTML 篇

## 1. 页面导入样式时，使用 link 和 @import 有什么区别

- @import 只能导入样式表，link 除了加载 CSS 外， 还可以定义 RSS、rel 连接属性、引入网站图标等
- 加载顺序：link 引用 CSS 时，在页面载入时同时加载；@import 需要页面网页完全载入以后加载
- 兼容性：link 是 XHTML 标签，无兼容问题；@import 是在 CSS2.1 提出的，低版本的浏览器不支持
- 修改问题：link 支持使用 Javascript 控制 DOM 去改变样式；而@import 不支持。
