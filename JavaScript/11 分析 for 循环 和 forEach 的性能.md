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
