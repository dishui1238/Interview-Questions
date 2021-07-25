## 当你调用 setState 的时候，发生了什么事？

1.  调用 enqueueSetState
    ```js
    Component.prototype.setState = function (partialState, callback) {
      this.updater.enqueueSetState(this, partialState, callback, "setState");
    };
    ```

当调用 setState 时，React 会做的第一件事情是将传递给 setState 的对象合并到组件的当前状态。这将启动一个称为和解（reconciliation）的过程。和解（reconciliation）的最终目标是以最有效的方式，根据这个新的状态来更新 UI。 为此，React 将构建一个新的 React vdom 树，将这个新 vdom 树与上老的 vdom 树相比较（ diff ），进行最小化重渲染。
