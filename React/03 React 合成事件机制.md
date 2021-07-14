## React 合成事件机制

- 抹平浏览器的兼容性差异

### React 17 事件系统变更

1. 更改事件委托

- react17 将事件委托绑定的节点修改到 rootContainer 上
- react16 中将事件绑定到 document 元素上，

2. 去除事件池

注意：

1. event.stopPropagation 阻止事件向上冒泡，但是本元素剩下的监听函数还是会执行
2. event.stopImmediatePropagation 阻止事件向上冒泡，但是本元素剩下的监听函数不会执行

<img src="./imgs/react16 问题 example.jpg" />
