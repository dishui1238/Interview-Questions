## Vue vs React

### 相同点

- 都用到了虚拟 dom
- 都提倡组件化开发

### 不同点

1. 框架层面

- vue 是 MVVM 框架，当数据发生变化的时候会自动渲染页面，当页面操作数据的时候 DOM 和 Model 也会发生相应的变化
- React 是 View 框架，单向数据流，状态驱动视图，更新数据是手动调用 setstate

2. 语法层面

- React 是使用 JSX 语法，all in js，将 html 与 css 全都融入 javaScript，jsx 语法相对来说更加灵活，感觉写 react 应用感觉就像是在写 javaScript
- Vue 是通过扩展的 HTML 来进行模板的渲染，html(结构)+css(表现)+js(行为)的形式，vue 鼓励开发者使用 template 模板，并提供指令供开发者使用(v-if、v-show、v-for 等等)，因此在开发 vue 应用的时候会有一种在写经典 web 应用（结构、表现、行为分离）的感觉

3. 数据更新层面

- vue2.0 通过 Object.defineProperty 对数据做到了更细致的监听，精准实现组件级别的更新
- react 当组件调用 setState 或 props 变化的时候，组件内部 render 会重新渲染，子组件也会随之重新渲染，可以通过 shouldComponentUpdate 或者 PureComponent 可以避免不必要的重新渲染（个人感觉这一点上不如 vue 做的好）。

4. diff 算法

相同点:

- 都是同层 diff,复杂度都为 O(n);

不同点:

- React 首位是除删除外是固定不动的,然后依次遍历对比;
- Vue 的 compile 阶段的 optimize 标记了 static 点,可以减少 diff 次数,而且是采用双向遍历方法;
