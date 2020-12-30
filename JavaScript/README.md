<!--
 * @Author: your name
 * @Date: 2020-12-30 10:40:55
 * @LastEditTime: 2020-12-30 10:41:55
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
