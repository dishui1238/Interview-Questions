## 为什么不能在条件和循环中使用 Hooks

1. Hook 的更新流程是通过链表完成的
2. 不能在条件和循环中使用，执行更新的时候可能会造成链表顺序结构的改变，current 树的 memoizedState 缓存 hooks 信息，和当前 workInProgress 不一致，如果涉及到读取 state 等操作，就会发生异常
3. 如果真的需要在条件判断中使用 hook，可以将相关逻辑单独抽离成一个组件
