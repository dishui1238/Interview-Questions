## 16. var、let 和 const 区别的实现原理是什么

> 变量生命周期：声明（作用域注册一个变量）、初始化（分配内存，初始化为 undefined）、赋值 （[进一步了解可点击这里](https://github.com/dishui1238/Notes/blob/master/JS/03%E5%8F%98%E9%87%8F%E5%AF%B9%E8%B1%A1.md)）

- var：遇到有 var 的作用域，在任何语句执行前都已经完成了声明和初始化，也就是变量提升而且拿到 undefined 的原因由来，因为 javaScript 引擎，在代码预编译时，javaScript 引擎会自动将所有代码里面的 var 关键字声明的语句都会提升到`当前作用域`的顶端,
- function： 声明、初始化、赋值一开始就全部完成，所以函数的变量提升优先级更高
- let：解析器进入一个块级作用域，发现 let 关键字，变量只是先完成声明，并没有到初始化那一步。此时如果在此作用域提前访问，则报错 xx is not defined，这就是暂时性死区的由来。等到解析到有 let 那一行的时候，才会进入初始化阶段。如果 let 的那一行是赋值操作，则初始化和赋值同时进行
- const、class 都是同 let 一样的道理

```js
console.log(a); // Uncaught ReferenceError: a is not defined #暂时性死区的表现

let a = 1;
```

```js
console.log(b); // undefined
console.log(c); // ƒ c() {}

var b = 2;
function c() {}
```

对比于 var，let、const 只是解耦了声明和初始化的过程，var 是在任何语句执行前都已经完成了声明和初始化，let、const 仅仅是在任何语句执行前只完成了声明

区别：

- var 有变量提升的效果，可以重复声明，可以重新赋值
- let 没有变量提升，不可以重复声明，可以重新赋值
- const 没有变量提升，不能重复声明，不可重新赋值（不能修改指针，但是可以修改值，比如对象、数组）
