## 为什么 React 会引入 JSX

1. JSX 是什么

```js
const element = <h1>Hello, world!</h1>;
```

- JSX 是一个 JavaScript 的语法扩展，可以很好地描述 UI 应该呈现出它应有交互的本质形式
- JSX 其实是一个 React.createElement 的语法糖，Babel 会把 JSX 转译成一个名为 React.createElement() 函数调用

```js
const element = <h1 className="greeting">Hello, world!</h1>;
// 等价于
const element = React.createElement(
  "h1",
  { className: "greeting" },
  "Hello, world!"
);
```

2. 目的

- 需要实现声名式
- 代码结构清晰简洁，可读性强
- 结构、样式、事件等能够实现高内聚、低耦合，方便重用和组合
- 不想引入新的概念和语法，只写 javaScript
