/**
 * 1. 定义 JSX
 * 2. 开启工作循环
 * 3. 构建 fiber 树
 */

 let style = { color: "green", border: "1px solid red", margin: "5px" };
 let A = {
   type: "div",
   key: "A",
   props: {
     style,
     children: [
       { type: "div", key: "B1", props: { style, children: [] } },
       { type: "div", key: "B2", props: { style, children: [] } },
     ],
   },
 };
 
 const TAG_ROOT = "TAG_ROOT"; // fiber 根节点
 const TAG_HOST = "TAG_HOST"; // 原生 dom 节点 div span p
 const Placement = "Placement";
 
 // 开始工作循环
 let workInProgress;
 
 function workLoop() {
   // 如果有任务就执行:执行当前任务，返回下一个任务
   while (workInProgress) {
     workInProgress = performUnitOfWork(workInProgress);
   }
   console.log("rootFiber", rootFiber); // 查看 effectList
   commitRoot(rootFiber);
 }
 
 function commitRoot(rootFiber) {
   let currentEffect = rootFiber.firstEffect;
   while (currentEffect) {
     const flags = currentEffect.flags;
     switch (flags) {
       case Placement: // 插入
         commitPlacement(currentEffect);
     }
     currentEffect = currentEffect.nextEffect;
   }
 }
 
 function commitPlacement(currentEffect) {
   debugger;
   const parent = currentEffect.return.stateNode; // 父节点 dom
   parent.appendChild(currentEffect.stateNode);
 }
 
 // 需要返回下一个 fiber 任务
 function performUnitOfWork(workInProgress) {
   beginWork(workInProgress);
   if (workInProgress.child) {
     return workInProgress.child; // 返回大儿子，下一个 fiber 任务
   }
   // 没有儿子，处理弟弟
   while (workInProgress) {
     // 没有儿子，自己就结束了，结束一个fiber 工作单元
     completeUnitOfWork(workInProgress);
     if (workInProgress.sibling) {
       return workInProgress.sibling;
     }
     // 如果没有弟弟，找叔叔
     workInProgress = workInProgress.return; // return 父亲，进入 while 循环，找到 root 结束
   }
 }
 
 /**
  * 一个 fiber 节点在结束的时候需要创建真实的 dom 元素
  */
 function completeUnitOfWork(workInProgress) {
   console.log("completeUnitOfWork", workInProgress.key);
   let stateNode;
   switch (workInProgress.tag) {
     case TAG_HOST:
       stateNode = createStateNode(workInProgress);
       break;
   }
   // 在完成工作单元的时候判断当前的 fiber 节点有没有对应的 dom 操作
   makeEffectList(workInProgress);
 }
 
 /**
  * effectList副作用链 - 单项链表
  * 并不是包含所有的节点，而是包括有副作用的 fiber 节点
  *
  */
 function makeEffectList(completeWork) {
   let returnFiber = completeWork.return;
   if (returnFiber) {
     if (!returnFiber.firstEffect) {
       returnFiber.firstEffect = completeWork.firstEffect;
     }
     if (completeWork.lastEffect) {
       if (returnFiber.lastEffect) {
         returnFiber.nextEffect = completeWork.firstEffect;
       }
       returnFiber.lastEffect = completeWork.lastEffect;
     }
 
     if (completeWork.flags) {
       if (returnFiber.lastEffect) {
         returnFiber.lastEffect.nextEffect = completeWork;
       } else {
         returnFiber.firstEffect = completeWork;
       }
       returnFiber.lastEffect = completeWork;
     }
   }
 }
 
 // 创建真实的 dom 节点
 function createStateNode(fiber) {
   if (fiber.tag === TAG_HOST) {
     let stateNode = document.createElement(fiber.type);
     fiber.stateNode = stateNode;
   }
   return fiber.stateNode;
 }
 
 // 构建 fiber 树
 function beginWork(workInProgress) {
   console.log(workInProgress.key);
   const children = workInProgress.props.children; // 儿子
   return reconcileChildren(workInProgress, children); //workInProgress-父亲， children-儿子
 }
 
 /**
  * @description: 根据父 fiber 和虚拟 dom 数组，构建 fiber 树, 构建一层 fiber 父-子 树
  * @param {*} returnFiber 父 fiber
  * @param {*} children vdom 子元素
  * @return {*}
  */
 function reconcileChildren(returnFiber, children) {
   let previousFiber; // 上一个 fiber 儿子
   let firstChildFiber; // 大儿子
   for (let index = 0; index < children.length; index++) {
     const element = children[index];
     const newFiber = createFiber(element);
     newFiber.flags = Placement; // 这是一个新节点，需要插入到 dom 中去，做一个标识
     newFiber.return = returnFiber;
     if (!previousFiber) {
       // 第一个元素 大儿子
       firstChildFiber = newFiber;
     } else {
       previousFiber.sibling = newFiber; // 上一个 fiber 的 sibling 指向当前 fiber
     }
     previousFiber = newFiber;
   }
   returnFiber.child = firstChildFiber;
   return firstChildFiber; // 构建完子 fiber 后会返回大儿子
 }
 
 function createFiber(element) {
   return {
     tag: TAG_HOST,
     key: element.key,
     type: element.type,
     props: element.props,
   };
 }
 
 let root = document.getElementById("root");
 let rootFiber = {
   tag: TAG_ROOT, // fiber 的类型
   key: "ROOT", // 唯一标签
   stateNode: root, // Fiber 对应的真实 dom 节点
   props: { children: [A] },
 };
 
 workInProgress = rootFiber;
 // 1. 开启工作循环
 workLoop();
 