## 面试题：请说一下 React 中的渲染流程

### 总结

1. react 渲染主要分为初始化渲染和更新
2. 对于初始化渲染

- 使用 React.createElement 或 JSX 编写 React 组件，最后都会转换成 `React.createElement(...)`， Babel 帮助我们完成了这个转换的过程，生成 vdom
- react 主要就是将 render 接收到的 vdom 转化为 fiber 树。fiber 树是一个链表结构，通过 child、sibling、return 三个属性记录了树形结构中的子节点、兄弟节点、父节点的信息，从而可以是实现从任一节点都可以访问其它的节点。
- 当整颗树遍历完成后，进入 commit 阶段，此阶段就是将 effectList 收集的 DOM 操作应用到屏幕上。
- commit 完成将 current 替换为 WIP 树。

3. 对于更新

- Fiber 树已经存在于内存中了，所以 React 更关心的是计算出 Fiber 树中的各个节点的差异，并将变化更新到屏幕中

### 1. 设计理念

- 跨平台渲染 => 虚拟 dom
- 快速响应 => 异步可中断 + 增量更新

### 2. 性能瓶颈

- JS 执行任务时间过长
  - 浏览器的刷新频率为 60Hz，大概 16.6 ms 渲染一次，而 JS 线程和渲染线程时互斥的，所以如果 JS 线程任务时间超过 16.6 ms 的话，就会导致掉帧，导致卡顿，解决方案就是 react 利用空闲的时间进行更新，不影响渲染
  - 把一个耗时的任务分成一个个小任务，分布在每一帧里的方式叫时间切片

### 3. 案例

```js
import React from "react";
import ReactDOM from "react-dom";

class App extends React.Component {
  state = { list: new Array(10000).fill(0) };

  add = () => {
    this.setState({ list: [...this.state.list, 1] });
  };

  render() {
    return (
      <ul>
        <input />
        <button onClick={this.add}>add</button>
        {this.state.list.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    );
  }
}
ReactDOM.render(<App />, document.getElementById("root"));
```

### 4. 屏幕刷新频率

- 目前大多数设备的屏幕刷新率为 60 次/s
- 浏览器渲染动画或者页面的每一帧的速率也需要跟设备的刷新率保持一致
- 页面是一帧帧绘制出来的，当每秒的绘制帧数(FPS)达到 60 时，页面是流畅的，小于这个值时，用户会感觉到卡顿
- 每个帧的预算时间是 16.6ms(1 秒/60)，所以我们书写代码时，尽量不要让一帧的工作量超过 16ms

#### 帧

- 每个帧的开头包括样式计算、布局和绘制
- JS 引擎和页面渲染引擎是在同一个渲染线程，GUI 渲染和 JS 执行两者是互斥的
- 某个任务执行时间过长，浏览器会推迟渲染

<img src="./imgs/帧.jpg" />

### 5. requestIdleCallback

- 我们希望用户快速响应用户，让用户觉得够快，不能阻塞用户的交互
- requestIdleCallback 使开发者能够在主事件循环上执行后台和低优先级工作，而不会延迟关键事件，如动画、输入响应
- 正常帧任务完成后没超过 16ms，说明有时间富余，此时会执行 requestIdleCallback 里注册的任务

<img src="./imgs/requestIdleCallback.jpg"/>

_注意：_ requestIdleCallback 只有 chrome 浏览器支持，react 为了兼容性，使用了 MessageChannel+requestAnimationFrame 模拟一个 requestIdleCallback；
_注意：_ componentWillMount、componentWillUpdate、componentWillReceiveProps 为了异步可中断操作让步，把这三个生命周期被废弃了

例子：

```js
function sleep(delay) {
  for (var ts = Date.now(); Date.now() - ts <= delay; ) {}
}
const works = [
  () => {
    console.log("任务1 start");
    sleep(20);
    console.log("任务1 end");
  },
  () => {
    console.log("任务2 start");
    sleep(20);
    console.log("任务2 end");
  },
  () => {
    console.log("任务3 start");
    sleep(20);
    console.log("任务3 end");
  },
];
requestIdleCallback(workLoop);
//刚才
function workLoop(deadline) {
  console.log(`本帧的剩余时间是${parseInt(deadline.timeRemaining())}`);
  while (deadline.timeRemaining() > 1 && works.length > 0) {
    performUnitOfWork();
  }
  //如果本帧没有剩余时间了，或者任务已经 全干完了
  if (works.length > 0) {
    ///如果说还工作要干，则说明任务还没干活，需要再次申请时间片
    requestIdleCallback(workLoop);
  }
  ///workLoop的退出代表让出控制权
}

function performUnitOfWork() {
  let work = works.shift(); //取出数组的第一个元素
  work();
}
```

### 6. React16+ 的渲染流程

- scheduler 选取高优先级任务进入 reconciler
- reconciler 计算变更的内容
- react-dom 把变更的内容渲染到页面上

### 7. 实现渲染

绿色线是 beginWork，红色线是 completeWork
<img src="./imgs/react渲染-01.jpg" />

render 三个阶段

- scheduler 选择高优先级的任务进入 reconciler
- reconciler 计算变更的内容
- react-dom 把变更的内容渲染到页面上
