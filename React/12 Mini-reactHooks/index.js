import React from "react";
import { IndeterminateComponent } from "./ReactWorkTags";
import { render } from "./ReactFiberWorkLoop";
import { useReducer } from "./ReactFiberHooks";

const reducer = (state, action) => {
  if (action.type === "add") {
    return state + 1;
  } else {
    return state;
  }
};

function Counter() {
  debugger;
  const [number, setNumber] = useReducer(reducer, 0);
  const [number1, setNumber1] = useReducer(reducer, 1);
  const [number2, setNumber2] = useReducer(reducer, 2);

  return (
    <>
      <div onClick={() => setNumber({ type: "add" })}>{number}</div>
      <div onClick={() => setNumber1({ type: "add" })}>{number1}</div>
      <div onClick={() => setNumber2({ type: "add" })}>{number2}</div>
    </>
  );
}

// 正常来说我们需要从根节点一直向下构建 fiber
let workInprogress = {
  tag: IndeterminateComponent, // 函数组件在初次渲染时
  type: Counter, // 此组件的具体类型是哪个组件
  alternate: null, // 上一次渲染的 fiber
};

render(workInprogress);

// window.counter.props.children[0].props.onClick() 触发更新

// ReactDOM.render(<Counter />, document.getElementById("root"));
