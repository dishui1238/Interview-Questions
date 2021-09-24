## Route 渲染方式

Route 渲染内容的三种方式: Route 渲染优先级：children > component > render

当你用 component 的时候，Route 会用你指定的组件和 React.createElement 创建一个新的[Reactelement]。这意味着当你提供的是一个内联函数的时候，每次 render 都会创建一个新的组件。这会导致不再更新已经现有组件，而是直接卸载然后再去挂载一个新的组件。因此，当用到内联函数的内联渲染时，请使用 render 或者 children。

`<Route path="/user2" component={() => <UserPage />} />`
