## 7. const 和 let 声明的变量不在 window 上，那到底在哪里

用 let 和 const 声明的全局变量并没有在全局对象中，只是一个块级作用域（Script）中。

在 ES5 中，顶层对象的属性和全局变量是等价的，var 命令和 function 命令声明的全局变量，自然也是顶层对象。

但 ES6 规定，var 命令和 function 命令声明的全局变量，依旧是顶层对象的属性，但 let 命令、const 命令、class 命令声明的全局变量，不属于顶层对象的属性。

```js
let a = 1;
const b = 2;
var c = 3;

console.log(window.a); // undefined
console.log(window.b); // undefined
console.log(a); // 1,  通过块作用域访问到的
console.log(b); // 2， 通过块作用域访问到的
```

<img src=".\imgs\21fff5e62228547b137be158168baf3.png" />

### 拓展

1. const 声明的不可改变性
   **const 实际上保证的，并不是变量的值不得改动，而是变量指向的那个内存地址所保存的数据不得改动。**

   对于**基本类型数据（数值、字符串、布尔值）**，**值就保存在变量指向的那个内存地址**，因此等同于常量。

   对于**引用类型的数据（主要是对象和数组）**，**变量指向的内存地址，保存的只是一个指向实际数据的指针**，const 只能保证这个指针是固定的（即总是指向另一个固定的地址），至于它指向的数据结构是不是可变的，就完全不能控制了

   ```js
   const a = [];
   a.push("Hello"); // 可执行
   a.length = 0; // 可执行
   a = ["Dave"]; // 报错
   ```
