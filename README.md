<!--
 * @Author: your name
 * @Date: 2020-12-28 14:56:36
 * @LastEditTime: 2020-12-28 16:51:00
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \Github-Repositories\Interview-Questions\README.md
-->
[TOC]

# HTML 篇

1. **页面导入样式时，使用 link 和 @import 有什么区别**

   - @import 只能导入样式表，link 除了加载 CSS 外， 还可以定义 RSS、rel 连接属性、引入网站图标等
   - 加载顺序：link 引用 CSS 时，在页面载入时同时加载；@import 需要页面网页完全载入以后加载
   - 兼容性：link 是 XHTML 标签，无兼容问题；@import 是在 CSS2.1 提出的，低版本的浏览器不支持
   - 修改问题：link 支持使用 Javascript 控制 DOM 去改变样式；而@import 不支持。

# JavaScript 篇

1. **讲讲 JS 的数据类型？**

   最新的 ECMAScript 标准定义了 8 种数据类型: 7 种原始类型 和 Object
   原始数据类型：数字（number）、字符串（string）、布尔值（boolean）、undefined、null、Symbol、BigInt
   对象类型包括：数组（Array）、函数（Function）、正则（RegExp）和日期（Date）

2. **介绍下 Set、Map、WeakSet 和 WeakMap 的区别？**

   Map:

   - Map 是一组键值对的结构，具有极快的查找速度。
   - 初始化 Map 需要一个二维数组，或者直接初始化一个空 Map。`var m = new Map([['Michael', 95], ['Bob', 75], ['Tracy', 85]]);`
   - 一个 key 只能对应一个 value，所以，多次对一个 key 放入 value，后面的值会把前面的值冲掉
   - Map 方法：set、get、delete、has、keys、values 等
   - 可遍历(iterable 类型) for...of / forEach (forEach 是 iterable 内置的方法)

   ***

   Set:

   - 是一组 key 的集合，不存储 value，key 不能重复
   - 创建一个 Set，需要提供一个 Array 作为输入，或者直接创建一个空 Set
     `js var s1 = new Set(); var s2 = new Set([1, 2, 3]); `
   - 方法： add、delete、has
   - 可遍历(iterable 类型) for...of / forEach (forEach 是 iterable 内置的方法)

   ***

   WeakMap：

   - WeakMap 对象是一组键/值对的集合，其中的键是弱引用的。其键必须是对象，而值可以是任意的；
   - 成员都是弱引用，随时可以消失（不计入垃圾回收机制）。可以用来保存 DOM 节点，不容易造成内存泄露；
   - 不可遍历

   ***

   _备注：_

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

   ```js
   var s = new Set(["A", "B", "C"]);
   s.forEach(function (element, sameElement, set) {
     console.log(element);
   });
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
