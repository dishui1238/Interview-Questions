## 使用 css3 动画代替 js 的动画有什么好处？

- 不占用 JS 主线程
- 可以利用硬件加速
- 浏览器可对动画做优化（元素不可见时不动画，减少对 FPS 的影响）

### css3 创建动画

@keyframes 规则是创建动画。

@keyframes 规则内指定一个 CSS 样式和动画将逐步从目前的样式更改为新的样式。

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>菜鸟教程(runoob.com)</title>
    <style>
      div {
        width: 100px;
        height: 100px;
        background: red;
        animation: myfirst 5s;
        -webkit-animation: myfirst 5s; /* Safari and Chrome */
      }

      @keyframes myfirst {
        from {
          background: red;
        }
        to {
          background: yellow;
        }
      }

      @-webkit-keyframes myfirst /* Safari and Chrome */ {
        from {
          background: red;
        }
        to {
          background: yellow;
        }
      }
    </style>
  </head>
  <body>
    <p><b>注意:</b> 该实例在 Internet Explorer 9 及更早 IE 版本是无效的。</p>

    <div></div>
  </body>
</html>
```
