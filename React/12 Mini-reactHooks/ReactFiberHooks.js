import { scheduleUpdateOnFiber } from "./ReactFiberWorkLoop";

let ReactCurrentDispatcher = { current: null };
let workInProgressHook = null; // 当前正在工作的 hook
let currentHook = null; // 当前的老 hook
let currentlyRenderingFiber = null; // 当前正在渲染的 fiber

const HooksDispatcherOnMount = {
  useReducer: mountReducer, // 不同的阶段 useReducer 有不同的实现
  useState: mountState,
};
const HooksDispatcherOnUpdate = {
  useReducer: updateReducer, // 不同的阶段 useReducer 有不同的实现
  useState: updateState,
};

/**
 * 1. 置空即将调和渲染的 workInProgress 树的 memoizedState 和 updateQueue
 * 函数组件的执行
 * 2. 根据当前函数组件是否是第一次渲染，赋予ReactCurrentDispatcher.current 不同的 hooks
 * 3. 调用 Component() 执行函数组件，hooks 会依次被执行
 * @param {*} current 当前渲染中的  current fiber树，初始化时没有值
 * @param {*} workInProgress 工作中的 fiber
 * @param {*} Component 组件
 * @return {*}
 */
export function renderWithHooks(current, workInProgress, Component) {
  currentlyRenderingFiber = workInProgress;
  currentlyRenderingFiber.memoizedState = null; // 清空 hook 单向链表
  currentlyRenderingFiber.updateQueue = null;
  if (current !== null) {
    ReactCurrentDispatcher.current = HooksDispatcherOnUpdate;
  } else {
    ReactCurrentDispatcher.current = HooksDispatcherOnMount;
  }
  let children = Component(); // 组件渲染方法，此方法会调用组件内的 hooks
  currentlyRenderingFiber = null;
  workInProgressHook = null;
  currentHook = null;
  return children;
}

/**
 * 挂载 Reducer
 * @param {*} reducer
 * @param {*} initialArg 初始值
 */
function mountReducer(reducer, initialArg) {
  // 构建 hooks 单项链表
  let hook = mountWorkInProgressHook();
  hook.memoizedState = initialArg;
  const queue = (hook.queue = { pending: null }); // 更新队列
  // 每次绑定都会返回一份新的函数
  const dispatch = dispatchAction.bind(null, currentlyRenderingFiber, queue);
  return [hook.memoizedState, dispatch];
}

/**
 * 挂载 state
 * @param {*} initialState 初始值
 */
function mountState(initialState) {
  let hook = mountWorkInProgressHook(); //获取当前的hook
  hook.memoizedState = initialState; //0
  const queue = (hook.queue = {
    pending: null,
    lastRenderedReducer: basicStateReducer,
    lastRenderedState: initialState,
  });
  const dispatch = dispatchAction.bind(null, currentlyRenderingFiber, queue);
  return [hook.memoizedState, dispatch];
}

/**
 * 每次执行一个 hook 函数，都产生一个 hook 对象，保存当前 hook 信息
 * 函数组件用 memoizedState 保存 hooks 链表
 *
 * @description: 初始化时构建 hooks 单向链表 hook1--next-->hook2--next-->hook3
 * @param {*}
 * @return {*}
 */
function mountWorkInProgressHook() {
  let hook = {
    memoizedState: null, // 自己的状态
    queue: null, // 自己的更新队列 环形链表
    next: null, // 下一个更新
  };
  // 说明这是第一个 hook
  if (workInProgressHook == null) {
    currentlyRenderingFiber.memoizedState = workInProgressHook = hook;
  } else {
    workInProgressHook = workInProgressHook.next = hook;
  }
  return workInProgressHook;
}

/**
 * 更新 reducer
 * @param {*} reducer
 * @param {*} initialArg 初始值
 */
function updateReducer(reducer, initialArg) {
  // 构建 hooks 单项链表
  let hook = updateWorkInProgressHook();
  console.log("新的hook", hook);
  const queue = hook.queue; // 新 hook 的更新队列
  let current = currentHook; // 老的 hook
  const pendingQueue = queue.pending; // update 的环状链表最后一个节点
  if (pendingQueue !== null) {
    // 根据老的状态和更新队列里的更新对象计算新的状态
    let first = pendingQueue.next; // pendingQueue 指向最后一个节点，它的 next 指向第一个节点
    let newState = current.memoizedState; // 老状态
    let update = first;
    do {
      const action = update.action; // action 对象 {type: 'ADD'}
      newState = reducer(newState, action);
      update = update.next;
    } while (update !== null && update !== first);
    queue.pending = null; // 更新过了可以清空更新环形链表
    hook.memoizedState = newState; // 让新的 hook memoizedState 对象等于计算的新状态
  }
  const dispatch = dispatchAction.bind(null, currentlyRenderingFiber, queue);
  return [hook.memoizedState, dispatch];
}

function basicStateReducer(state, action) {
  return typeof action === "function" ? action(state) : action;
}
function updateState(initialState) {
  debugger;
  return updateReducer(basicStateReducer, initialState);
}

/**
 * 1. 第一次执行 hooks 函数，那么从 current 树上取出 memoizedState ，也就是旧的 hooks
 * 2. 不是第一次执行 hooks 函数，就取 currentHook.next
 */
function updateWorkInProgressHook() {
  let nextCurrentHook;
  if (currentHook == null) {
    // 第一个 hook
    let current = currentlyRenderingFiber.alternate; // 新 fiber 的 alternate 指向老的 fiber
    nextCurrentHook = current.memoizedState; // 老的 hook 链表的第一个节点
  } else {
    nextCurrentHook = currentHook.next;
  }
  currentHook = nextCurrentHook;

  const newHook = {
    memoizedState: currentHook.memoizedState,
    queue: currentHook.queue, // 初始化完成后 queue = {pending: null}
    next: null,
  };

  if (workInProgressHook == null) {
    // 第一个 hook
    currentlyRenderingFiber.memoizedState = workInProgressHook = newHook;
  } else {
    workInProgressHook = workInProgressHook.next = newHook;
    // workInProgressHook.next = newHook // 当前 hook 的 next 指针指向下一个 hook
    // workInProgressHook = newHook // workInProgressHook 指向最新的 hook
  }
  return workInProgressHook;
}

export function useReducer(reducer, initialArg) {
  return ReactCurrentDispatcher.current.useReducer(reducer, initialArg);
}

export function useState(initialState) {
  return ReactCurrentDispatcher.current.useState(initialState);
}

/**
 * 1. update 对象记录此次更新的信息
 * 2. 调用函数组件 dispatchAction，会产生一个 update 对象，将 update 放入待更新的 pending 队列中
 * 源码中还会做如下判断--------
 *  3. 判断当前函数组件的fiber对象是否处于渲染阶段，
 *     处于更新阶段：那么不需要我们再更新当前函数组件
 *     不处于更新阶段：调用 lastRenderedReducer 获取最新的 state,和上一次的 currentState，进行浅比较，
 *                   如果相等，就退出，这就证实了为什么 useState，两次值相等的时候，组件不渲染的原因了
 *      ---------------------
 * 4. 如果两次state不相等，那么调用scheduleUpdateOnFiber调度渲染当前fiber
 *
 * @description:
 * @param {*} currentlyRenderingFiber
 * 初始化完成后 queue={pending: null}, 调用 hooks 函数之后，pending={action, next: pending} 的环状链表
 * @param {*} queue
 * @param {*} action
 * @return {*}
 */
function dispatchAction(currentlyRenderingFiber, queue, action) {
  const update = { action, next: null }; // 创建一个新的 update 对象
  const pending = queue.pending;
  if (pending == null) {
    update.next = update; // 让自己和自己构建成一个循环链表
  } else {
    update.next = pending.next;
    pending.next = update;
  }
  queue.pending = update;
  const lastRenderedReducer = queue.lastRenderedReducer; //获取上一个的reducer
  const lastRenderedState = queue.lastRenderedState; //获取上一个state
  //不需要等到再次重新调试到Counter组件计算
  let eagerState = lastRenderedReducer(lastRenderedState, action);
  update.eagerReducer = lastRenderedReducer;
  update.eagerState = eagerState;
  if (Object.is(eagerState, lastRenderedState)) {
    return;
  }
  // 调度更新
  scheduleUpdateOnFiber(currentlyRenderingFiber);
}
