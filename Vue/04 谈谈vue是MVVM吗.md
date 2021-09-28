## 谈谈你对 MVVM 的理解 Vue 是 MVVM 框架吗

1. MVVM 是指 model-view-viewModel，其中 model 是数据层，view 是视图层，viewModel 是业务逻辑前两者的桥梁
2. MVVM 不需要用户手动操作页面元素，将数据绑定到 viewModel 层上，会自动将数据更新到页面中，视图变化会通知 viewModel 层更新数据
3. Vue 是 MVVM 框架， vue 的实例就是 viewModel，实现数据的双向绑定

### MVC 与 MVVM 的区别

1. MVC 是指，是模型(model)－视图(view)－控制器(controller)，Controller 负责将 Model 的数据用 View 显示出来
2. MVVM 实现了数据的双向绑定，当数据发生变化的时候会自动渲染页面，当页面操作数据的时候 DOM 和 Model 也会发生相应的变化
3. MVC 只实现了 Model 和 View 的单向绑定
   **其它：**

Vue 并没有完全遵循 MVVM 模型，严格的 MVVM 模式中,View 层不能直接和 Model 层通信,只能通过 ViewModel 来进行通信(ref 可以操作组件数据)。
