import { renderWithHooks } from "./ReactFiberHooks";
import {
  FunctionComponent,
  HostComponent,
  IndeterminateComponent,
} from "./ReactWorkTags";

/**
 * @param {*} current 上一次的 fiber，初次挂载的时候为 null
 * @param {*} workInprogress 这一次正在构建中的 fiber
 */
export function beginWork(current, workInProgress) {
  if (current) {
    // 更新
    switch (workInProgress.tag) {
      case FunctionComponent:
        return updateFunctionComponent(
          current,
          workInProgress,
          workInProgress.type
        );

      default:
        break;
    }
  } else { // 初次挂载
    switch (workInProgress.tag) {
      case IndeterminateComponent:
        return mountIndeterminateComponent(
          current,
          workInProgress,
          workInProgress.type
        );

      default:
        break;
    }
  }
}

// 更新函数组件
function updateFunctionComponent(current, workInProgress, Component) {
  let newChildren = renderWithHooks(current, workInProgress, Component);
  console.log("newChildren", newChildren);
  window.counter = newChildren;
  // 处理子节点
  reconcileChildren(current, workInProgress, newChildren);
  return workInProgress.child;
}

// 挂载组件
/**
 * @description: 挂载组件，组件挂载时会调用里面的 hooks 方法 
 * @param {*} current
 * @param {*} workInProgress
 * @param {*} Component
 * @return {*}
 */
function mountIndeterminateComponent(current, workInProgress, Component) {
  let children = renderWithHooks(null, workInProgress, Component);
  console.log("children", children);
  window.counter = children;
  workInProgress.tag = FunctionComponent;
  // 处理子节点
  reconcileChildren(current, workInProgress, children);
  return workInProgress.child;
}

// 根据组件返回的虚拟 dom 构建子 fiber 链条的过程
function reconcileChildren(current, workInProgress, children) {
  let childFiber = {
    tag: HostComponent,
    type: children.type,
  };
  workInProgress.child = childFiber;
}
