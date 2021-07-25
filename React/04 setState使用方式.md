## setState

第一种是函数形式 `this.setState((state, props) => stateChange)`
第二种是对象形式 `this.setState({value:2})`，会进行批量更新，如果要使用前一次的 state 值，请使用函数形式

1. `setState` 只在合成事件和钩子函数中是“异步”的，在原生事件(addEventListener 直接添加的事件处理函数)和 `setTimeout`和`setInterval` 中都是同步的 (react 为了解决跨平台，兼容性问题，自己封装了一套事件机制，代理了原生的事件，像在 jsx 中常见的 onClick、onChange 这些都是合成事件)。

2. `setState` 的批量更新优化也是建立在“异步”（合成事件、钩子函数）之上的，在原生事件和`setTimeout` 中不会批量更新，在“异步”中如果对同一个值进行多次 `setState` ， `setState` 的批量更新策略会对其进行覆盖，取最后一次的执行，如果是同时 `setState` 多个不同的值，在更新时会对其进行合并批量更新。

3. 另外在其第二个参数回调函数 callback 中和 componentDidUpdate 更新生命周期函数中 也能得到最新的 this.state 值


