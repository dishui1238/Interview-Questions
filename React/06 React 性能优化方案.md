## React 性能优化方案

1. 使用纯组件，减少不必要渲染，如用 PureComponent、

   PureComponents 对状态和 props 数据进行浅层比较。浅层比较将检查它们的基本元素是否有相同的值，还会检查更复杂的 JavaScript 值（如对象和数组）之间的引用是否相同，如果先前的状态和 props 数据与下一个 props 或状态相同，则组件不会重新渲染

2. React.memo
   和纯组件类似，如果 props 相同则跳过组件渲染，从而提升组件性能。

3. shouldComponentUpdate
   利用此事件来决定何时需要重新渲染组件，减少不必要的渲染

4. ImmutablJS

5. 懒加载组件
   Suspense 和 lazy

   ```jsx
   import React, { Suspense } from "react";

   const OtherComponent = React.lazy(() => import("./OtherComponent"));
   const AnotherComponent = React.lazy(() => import("./AnotherComponent"));

   function MyComponent() {
     return (
       <div>
         <Suspense fallback={<div>Loading...</div>}>
           <section>
             <OtherComponent />
             <AnotherComponent />
           </section>
         </Suspense>
       </div>
     );
   }
   ```

   优点：

   - 主包体积变小，消耗的网络传输时间更少。
   - 动态单独加载的包比较小，可以迅速加载完成。

6. 使用 React Fragments 避免额外标记
   没有额外的标记，因此节省了渲染器渲染额外元素的工作量。

7. 不要使用内联函数定义
   如果我们使用内联函数，则每次调用“render”函数时都会创建一个新的函数实例

   当 React 进行虚拟 DOM diffing 时，它每次都会找到一个新的函数实例；因此在渲染阶段它会会绑定新函数并将旧实例扔给垃圾回收。

8. 避免使用内联样式属性
   使用内联样式时浏览器需要花费更多时间来处理脚本和渲染，因为它必须映射传递给实际 CSS 属性的所有样式规则

9. 使用唯一键 key 迭代

10. 事件节流和防抖

### 代码分割

1. 是什么？
   代码分割是由诸如 Webpack，Rollup 这类打包器支持的一项技术，能够创建多个包并在运行时动态加载。

2. 为什么？
   现在前端项目基本都采用打包技术，比如 Webpack，JS 逻辑代码打包后会产生一个 bundle.js 文件，而随着我们引用的第三方库越来越多或业务逻辑代码越来越复杂，相应打包好的 bundle.js 文件体积就会越来越大，因为需要先请求加载资源之后，才会渲染页面，这就会严重影响到页面的首屏加载。

   对你的应用进行代码分割能够帮助你“懒加载”当前用户所需要的内容，能够显著地提高你的应用性能。尽管并没有减少应用整体的代码体积，但你可以避免加载用户永远不需要的代码，并在初始加载的时候减少所需加载的代码量

3. 怎么做？

   - **import()**，当 Webpack 解析到该语法时，会自动进行代码分割
   - **React.lazy**函数能让你像渲染常规组件一样处理动态引入（的组件）。

     ```js
     import React, { Suspense } from "react";

     const OtherComponent = React.lazy(() => import("./OtherComponent"));

     function MyComponent() {
       return (
         <div>
           <Suspense fallback={<div>Loading...</div>}>
             <OtherComponent />
           </Suspense>
         </div>
       );
     }
     ```

_注意：_

1. 浅层比较与深层比较的区别

   - 浅层比较检查对象，你必须获取两个对象的属性列表（使用 Object.keys()），然后检查它们的属性值是否相等。
   - 深层比较：不同之处在于，当属性中包含对象时，将对嵌套对象执行递归浅层比较

参考文章：https://www.infoq.cn/article/kve8xtrs-upphptq5luz
