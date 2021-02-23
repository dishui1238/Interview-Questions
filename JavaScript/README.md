<!--
 * @Author: your name
 * @Date: 2020-12-30 10:40:55
 * @LastEditTime: 2021-02-21 19:12:56
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \Github-Repositories\Interview-Questions\JavaScript\README.md
-->

# JavaScript 篇

## 1. 讲讲 JS 的数据类型？

最新的 ECMAScript 标准定义了 8 种数据类型: 7 种原始类型 和 Object

原始数据类型：数字（number）、字符串（string）、布尔值（boolean）、undefined、null、Symbol、BigInt

对象类型包括：数组（Array）、函数（Function）、正则（RegExp）和日期（Date）

## 2. 介绍下 Set、Map、WeakSet 和 WeakMap 的区别？

Map:

- Map 是一组键值对的结构，具有极快的查找速度。
- 初始化 Map 需要一个二维数组，或者直接初始化一个空 Map。`var m = new Map([['Michael', 95], ['Bob', 75], ['Tracy', 85]]);`
- 一个 key 只能对应一个 value，所以，多次对一个 key 放入 value，后面的值会把前面的值冲掉
- Map 方法：set、get、delete、has、keys、values 等
- 可遍历(iterable 类型) for...of / forEach (forEach 是 iterable 内置的方法)

---

Set:

- 是一组 key 的集合，不存储 value，key 不能重复
- 创建一个 Set，需要提供一个 Array 作为输入，或者直接创建一个空 Set
  `js var s1 = new Set(); var s2 = new Set([1, 2, 3]); `
- 方法： add、delete、has、size、clear
- 可遍历(iterable 类型) for...of / forEach (forEach 是 iterable 内置的方法)

---

WeakMap：

- WeakMap 对象是一组键/值对的集合，其中的键是弱引用的。其键必须是对象，而值可以是任意的；
- 不可遍历

WeakSet:

- 成员都是对象（引用）；
- 成员都是弱引用，随时可以消失
- 不能遍历

---

_备注：_

1.  forEach 遍历
    普通数组：

    ```js
    var a = ["A", "B", "C"];
    a.forEach(function (element, index, array) {
      // element: 指向当前元素的值
      // index: 指向当前索引
      // array: 指向Array对象本身
      console.log(element);
    });
    ```

    Set: Set 与 Array 类似，但 Set 没有索引，因此回调函数的前两个参数都是元素本身
    Set 可用于数组去重

    ```js
    var s = new Set(["A", "B", "C"]);
    s.forEach(function (element, sameElement, set) {
      console.log(element);
    });
    ```

    Set 与 Array 的联系

    ```js
    var myArray = ["value1", "value2", "value3"];

    // 用Set构造器将Array转换为Set
    var mySet = new Set(myArray);

    mySet.has("value1"); // returns true

    // 用...(展开操作符)操作符将Set转换为Array
    console.log([...mySet]); // 与myArray完全一致
    ```

    Map: Map 的回调函数参数依次为 value、key 和 map 本身

    ```js
    var m = new Map([
      [1, "x"],
      [2, "y"],
      [3, "z"],
    ]);
    m.forEach(function (value, key, map) {
      console.log(value);
    });
    ```

    弱引用：

    > 在计算机程序设计中，弱引用与强引用相对，是指不能确保其引用的对象不会被垃圾回收器回收的引用。 一个对象若只被弱引用所引用，则被认为是不可访问（或弱可访问）的，并因此可能在任何时刻被回收。
    > 由于这样的弱引用，WeakMap 的 key 是不可枚举的

## 3. `['1', '2', '3'].map(parseInt)` what & why ?

**what:** [1, NaN, NaN]

**why:**

对于每个迭代 map, parseInt()传递两个参数: 字符串和基数。 所以实际执行的的代码是：

```js
["1", "2", "3"].map((item, index) => {
  return parseInt(item, index);
});
```

返回值分别为：

```js
parseInt("1", 0); // 1，基数为 10
parseInt("2", 1); // NaN，不存在一进制，任何值都为 NaN
parseInt("3", 2); // NaN, 3 不是二进制
```

**parseInt(string[, radix])**

_注意：_ 在 radix 为 undefined，或者 radix 为 0 或者没有指定的情况下，JavaScript 作如下处理：

- 如果字符串 string 以"0x"或者"0X"开头, 则基数是 16 (16 进制).
- 如果字符串 string 以"0"开头, 基数是 8（八进制）或者 10（十进制），那么具体是哪个基数由实现环境决定。ECMAScript 5 规定使用 10，但是并不是所有的浏览器都遵循这个规定。因此，永远都要明确给出 radix 参数的值。
- 如果字符串 string 以其它任何值开头，则基数是 10 (十进制)。

**如果您实际上想要循环访问字符串数组, 该怎么办？**

`['10','10','10','10','10'].map(Number);`

**变形题：**

```js
let unary = (fn) => (val) => fn(val);
let parse = unary(parseInt); // (val) => parseInt(val)
console.log(["1.1", "2", "0.3"].map(parse)); // [1,2,0]
```

## 4. 什么是防抖和节流？有什么区别？如何实现？

1. 防抖、

> 在事件被触发 n 秒后再执行回调，如果在这 n 秒内又被触发，则重新计时。

思路：

每次触发事件时都取消之前的延时调用方法

```js
<input id="input" />;

function debounce(fun, delay = 500) {
  let timeId = null;
  return function () {
    clearTimeout(timeId);
    timeId = setTimeout(() => {
      fun.apply(this, arguments);
    }, delay);
  };
}

// 使用
function logValue(value) {
  console.log(value);
}
let inputb = document.getElementById("input");
let debounceFunc = debounce(logValue, 500); // (e.target.value) => {...}

inputb.addEventListener("keyup", function (e) {
  debounceFunc(e.target.value);
});
```

2. 节流

> 高频事件触发，但在 n 秒内只会执行一次，所以节流会稀释函数的执行频率

思路：

每次触发事件时都判断当前是否有等待执行的延时函数

```js
function throttle(fn, delay) {
  let canRun = true;
  return function (...args) {
    if (!canRun) return;
    canRun = false;
    setTimeout(() => {
      fn.call(this, args);
      canRun = true;
    }, delay);
  };
}
```

## 5. 下面的代码打印什么内容，为什么？

```js
var b = 10;
(function b() {
  b = 20;
  console.log(b);
})();
```

输出:

```js
ƒ b() {
    b = 20;
    console.log(b);
  }
```

解释：IIFE（立即调用函数表达式）的函数无法进行赋值（内部机制，类似 const 定义的常量），所以无效。**非匿名自执行函数，函数名只读。**

```js
var b = 10;
(function b() {
  // 内部作用域，会先去查找是有已有变量b的声明，有就直接赋值20，确实有了呀。发现了具名函数 function b(){}，拿此b做赋值；
  // IIFE（立即调用函数表达式）的函数无法进行赋值（内部机制，类似const定义的常量），所以无效。
  // （这里说的“内部机制”，想搞清楚，需要去查阅一些资料，弄明白IIFE在JS引擎的工作方式，堆栈存储IIFE的方式等）
  b = 20;
  console.log(b); // [Function b]
  console.log(window.b); // 10，不是20
})();
```

严格模式下可以看到错误：

```js
var b = 10;
(function b() {
  "use strict";
  b = 20;
  console.log(b);
})(); // "Uncaught TypeError: Assignment to constant variable."
```

其他变形：

```js
var b = 10;
(function b() {
  var b = 20; // IIFE内部变量
  console.log(b); // 20
  console.log(window.b); // 10
})();
```

## 6. 简单改造下面的代码，使之分别打印 10 和 20

```JS
var b = 10;
(function b(){
    b = 20;
    console.log(b);
})();
```

方法一：

```JS
var b = 10;
(function b(){
  //  b = 20;
    console.log(b); // 打印出 10
})(b);
```

```js
var b = 10;
(function b() {
  var b = 20;
  console.log(b); // 打印出 20
})();
```

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

## 8. 有以下 3 个判断数组的方法，请分别介绍它们之间的区别和优劣

`Object.prototype.toString.call() 、 instanceof 以及 Array.isArray()`

1. Object.prototype.toString.call()

每一个继承 Object 的对象都有 toString 方法，如果 toString 方法没有重写的话，会返回 [Object type]，其中 type 为对象的类型。

但当除了 Object 类型的对象外，其他类型直接使用 toString 方法时，会直接返回都是内容的字符串，所以我们需要使用 call 或者 apply 方法来改变 toString 方法的执行上下文。

```js
const an = ["Hello", "An"];
an.toString(); // "Hello,An"
Object.prototype.toString.call(an); // "[object Array]"
```

这种方法对于所有基本的数据类型都能进行判断，即使是 null 和 undefined 。

```js
// 判断基本类型
Object.prototype.toString.call("An"); // "[object String]"
Object.prototype.toString.call(1); // "[object Number]"
Object.prototype.toString.call(Symbol(1)); // "[object Symbol]"
Object.prototype.toString.call(null); // "[object Null]"
Object.prototype.toString.call(undefined); // "[object Undefined]"
Object.prototype.toString.call(true); // "[object Boolean]"

// 判断引用类型
Object.prototype.toString.call(function () {}); // "[object Function]"
Object.prototype.toString.call(new Date()); // "[object Date]"
Object.prototype.toString.call([1, 2, 3]); // "[object Array]"
Object.prototype.toString.call(/^abc/); // "[object RegExp]"
Object.prototype.toString.call({ name: "An" }); // "[object Object]"

// 判断原生 JSON 对象
Object.prototype.toString.call(JSON); // "[object JSON]"
```

这种方法不能准确判断自定义类型，如下例：

```js
function Person(name, age) {
  this.name = name;
  this.age = age;
}
var person = new Person("Rose", 18);
Object.prototype.toString.call(person); // "[object Object]"
```

只能用 instanceof 操作符来进行判断

```js
console.log(person instanceof Person); // true
```

2. instanceof

`instanceof` 的内部机制是通过判断对象的原型链中是不是能找到类型的 prototype。

使用 instanceof 判断一个对象是否为数组，instanceof 会判断这个对象的原型链上是否会找到对应的 Array 的原型，找到返回 true，否则返回 false。

```js
[] instanceof Array; // true
```

但 instanceof 只能用来判断对象类型，原始类型不可以。并且所有对象类型 instanceof Object 都是 true。

```js
[] instanceof Object; // true
```

3. Array.isArray()

用来判断对象是否为数组，是 ES5 新增的方法

## 9. 为 Array 对象添加一个去除重复项的方法

```js
// input
[false, true, undefined, null, NaN, 0, 1, {}, {}, "a", "a", NaN].uniq();
// output
[false, true, undefined, null, NaN, 0, 1, {}, {}, "a"];
```

方法：

需要注意，NaN === NaN 为 false，{} === {} 为 false。

```js
Array.prototype.uniq = function () {
  return [...new Set(this)]; // this 指 调用 uniq 方法的 Array
  // return Array.from(new Set(this)); // 这个也可以
};
```

## 10. JS 如何跳出循环

| 序号 | 方法            | break  | continue     | return       | return true  | return false | 结论 |
| ---- | --------------- | ------ | ------------ | ------------ | ------------ | ------------ | ---- |
| 1    | for 循环        | 成功   | 跳出本次循环 | 不合法       | 不合法       | 不合法       | √    |
| 2    | Array.forEach() | 不合法 | 不合法       | 跳出本次循环 | 跳出本次循环 | 跳出本次循环 | ×    |
| 3    | for...in        | 成功   | 跳出本次循环 | 不合法       | 不合法       | 不合法       | √    |
| 4    | Array.map()     | 不合法 | 不合法       | 跳出本次循环 | 跳出本次循环 | 跳出本次循环 | ×    |
| 5    | Array.some()    | 不合法 | 不合法       | 跳出本次循环 | 成功         | 跳出本次循环 | √    |
| 6    | Array.every()   | 不合法 | 不合法       | 成功         | 跳出本次循环 | 成功         | √    |
| 7    | Array.filter()  | 不合法 | 不合法       | 跳出本次循环 | 跳出本次循环 | 跳出本次循环 | ×    |

## 11. 分析 for 循环 和 forEach 的性能

代码测试 for 、forEach 执行时间：

```js
let arrs = new Array(100000);

console.time("for");
for (let i = 0; i < arrs.length; i++) {}
console.timeEnd("for");

console.time("forEach");
arrs.forEach((arr) => {});
console.timeEnd("forEach");
```

10 万级别下：forEach 性能高于 for

```
for: 3.2060546875 ms
forEach: 0.361083984375 ms
```

百万 级别下：性能基本一致

```
for: 3.97021484375 ms
forEach: 3.897705078125 ms
```

千万 级别下：for 性能远高于 forEach

```
for: 8.347900390625 ms
forEach: 29.922119140625 ms
```

## 12. ES6 代码转成 ES5 代码的实现思路是什么

- 将代码字符串解析成抽象语法树，即所谓的 AST
- 对 AST 进行处理，在这个阶段可以对 ES6 代码进行相应转换，即转成 ES5 代码
- 根据处理后的 AST 再生成代码字符串

## 13. 数组里面有 10 万个数据，取第一个元素和第 10 万个元素的时间相差多少

JavaScript 没有真正意义上的数组，所有的数组其实是对象，其“索引”看起来是数字，其实会被转换成字符串，作为属性名（对象的 key）来使用。所以无论是取第 1 个还是取第 10 万个元素，都是用 key 精确查找哈希表的过程，其消耗时间大致相同。

## 14. 输出以下代码的执行结果并解释为什么

```js
var a = { n: 1 };
var b = a;
a.x = a = { n: 2 };

console.log(a.x);
console.log(b.x);
```

结果： `undefined {n: 2} `
知识点：多项赋值顺序，对象引用

思路点击 https://juejin.cn/post/6844903649399799815
