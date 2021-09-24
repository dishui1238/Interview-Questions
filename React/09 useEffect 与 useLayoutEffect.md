## useEffect 与 useLayoutEffect

调用时机不同

1. useEffect

   - 与 componentDidMount、componentDidUpdate 不同的是，传给 useEffect 的函数会在浏览器完成布局与绘制之后，在一个延迟事件中被调用
   - 不会阻塞浏览器对屏幕的更新

2. useLayoutEffect
   - useLayoutEffect 与 componentDidMount、componentDidUpdate 的调用阶段是一样的
   - 浏览器执行下一次绘制前被同步执行
   - 会阻塞浏览器对屏幕的更新
