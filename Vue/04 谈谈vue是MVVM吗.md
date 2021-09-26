## 谈谈你对 MVVM 的理解 Vue 是 MVVM 框架吗

1. MVVM 是指 model-view-viewModel，其中 model 是数据层，view 是视图层，viewModel 是业务逻辑前两者的桥梁
2. MVVM 不需要用户手动操作页面元素，将数据绑定到 viewModel 层上，会自动将数据更新到页面中，视图变化会通知 viewModel 层更新数据
3. Vue 是 MVVM 框架， vue 的实例就是 viewModel，实现数据的双向绑定
