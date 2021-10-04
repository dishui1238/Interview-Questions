## 为什么不能在条件和循环中使用 Hooks

1. Hook 的更新流程是通过链表完成的
2. 不能在条件和循环中使用，执行更新的时候可能会造成链表顺序结构的改变，current 树的 memoizedState 缓存 hooks 信息，和当前 workInProgress 不一致，如果涉及到读取 state 等操作，就会发生异常
3. 如果真的需要在条件判断中使用 hook，可以将相关逻辑单独抽离成一个组件

```js
//初次渲染的时候
// hook1 --next--> hook2 --next--> hook3
let hook1 = { memoizedState: "1", next: null };
let hook2 = { memoizedState: "2", next: null };
hook1.next = hook2;
let hook3 = { memoizedState: "3", next: null };
hook2.next = hook3;
let oldHooks = hook1;

//老链表
let newHook1 = { memoizedState: hook1.memoizedState, next: null };
let newHook2 = { memoizedState: hook2.memoizedState, next: null };
newHook1.next = newHook2;
let newHook3 = { memoizedState: hook3.memoizedState, next: null };
newHook2.next = newHook3;
let newHooks = newHook1;
```
