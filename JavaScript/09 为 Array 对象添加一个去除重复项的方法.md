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
