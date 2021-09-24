## 当你调用 setState 的时候，发生了什么事？

1.  首先调用 enqueueSetState，会把更新后的 state 和对应的组件放入队列
    ```js
    Component.prototype.setState = function (partialState, callback) {
      this.updater.enqueueSetState(this, partialState, callback, "setState");
    };
    ```

当调用 setState 时，React 会做的第一件事情是将传递给 setState 的对象合并到组件的当前状态。这将启动一个称为和解（reconciliation）的过程。和解（reconciliation）的最终目标是以最有效的方式，根据这个新的状态来更新 UI。 为此，React 将构建一个新的 React vdom 树，将这个新 vdom 树与上老的 vdom 树相比较（ diff ），进行最小化重渲染。

判断组件是否处于批量更新模式，如果是，不进行 state 的更新操作，而是将需要更新的任务放入同步任务之后的微任务中
如果不是处于批量更新模式，则对所有队列中的更新执行 flushSyncCallbackQueue 方法

isBatchingUpdates 是在同步代码中变化的，而 setTimeout 的逻辑是异步执行的。当 this.setState 调用真正发生的时候，isBatchingUpdates 早已经被重置为 false，这就使得 setTimeout 里面的 setState 具备了立刻发起同步更新的能力。
