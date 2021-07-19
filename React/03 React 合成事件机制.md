## React 合成事件机制

- 是什么？

  React 中自己的事件系统模式，通常被称为 React 合成事件。

- 为什么采用合成事件？

  1. 抹平浏览器的兼容性差异，使开发者不用再去关注浏览器的兼容性问题

  2. 为了统一管理事件
     - react 不会把事件处理函数直接绑定在真实的节点上，而是把所有的事件绑定到结构的最外层 rootContainer 上(注意 react16/17 的区别)，使用一个统一的事件监听和处理函数。
     - 简化了事件处理和回收机制。效率也有很大的提升

**深入部分**

参考链接：https://segmentfault.com/a/1190000039108951

- react 是怎么将事件绑定到 rootContainer 上的？（事件注册的过程）

  1. 比如`<div onClick={() => {/*do something*/}}>React</div>`，div 对应一个 fiber 节点，onClick 是它 props 中的一个属性
  2. 在 fiber 进入 commit 阶段时，onClick 会被识别成事件进行处理(有个映射表存储了所有 React 事件对应的原生 DOM 事件的集合);
  3. 根据 React 的事件名称寻找该事件依赖，例如 onMouseEnter 事件依赖了 mouseout 和 mouseover 两个原生事件，onClick 只依赖了 click 一个原生事件，最终会循环这些依赖，在 root 上绑定对应的事件
  4. 依据组件中写的事件名识别其属于哪个阶段的事件（冒泡或捕获），例如 onClickCapture 这样的 React 事件名称就代表是需要事件在捕获阶段触发，而 onClick 代表事件需要在冒泡阶段触发
  5. 根据 React 事件名，找出对应的原生事件名，例如 click，并根据上一步来判断是否需要在捕获阶段触发，调用 addEventListener，将事件绑定到 root 元素上
  6. 若事件需要更新，那么先移除事件监听，再重新绑定，绑定过程重复以上 3、4、5。

- 事件触发过程
  TODO:

### React 17 事件系统变更

1. 更改事件委托

- react17 将事件委托绑定的节点修改到 rootContainer 上
- react16 中将事件绑定到 document 元素上，

2. 去除事件池

注意：

1. event.stopPropagation 阻止事件向上冒泡，但是本元素剩下的监听函数还是会执行
2. event.stopImmediatePropagation 阻止事件向上冒泡，但是本元素剩下的监听函数不会执行

<img src="./imgs/react16 问题 example.jpg" />
