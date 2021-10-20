### 区别

1. for in 遍历的是数组、对象的索引，**可以遍历到原型上的属性**
2. for of 适用数组/字符串/map/set 等拥有迭代器对象（iterator）的集合的元素，**不可以遍历到原型上的属性**
   有迭代器的对象包括：
   - 数组
   - Set
   - Map
   - 类数组对象，如 arguments 对象、DOM NodeList 对象
   - Generator 对象
   - 字符串

### 示例

- for in 遍历的是数组/对象的索引（即键名），而 for of 遍历的是数组元素值。for in 可以遍历原型上的属性

```js
// 数组
let a = [1, 2, 3];
for (const i in a) {
  console.log(i); // 0 1 2
}

// 对象
let a = { a: 1, b: 2, c: 3 };
for (const i in a) {
  console.log(i); // a b c
}

// 字符串
let a = "123";
for (const i in a) {
  console.log(i); // 0 1 2
}

var arr = [1, 2, 3];
arr.a = 123;
Array.prototype.a = 123;

for (let value of arr) {
  console.log(value); // 1 2 3
}
for (let value in arr) {
  console.log(value); // 0 1 2 a
}
```

- for of 遍历的只是数组内的元素，而不包括数组的原型属性

```js
var arr = [1, 2, 3];
arr.a = 123;
Array.prototype.a = 123;

for (let value of arr) {
  console.log(value); // 1 2 3
}

// 字符串
let b = "123";
for (const i of a) {
  console.log(i); // 1 2 3
}

// 数组
let a = [{ a: {} }, { b: 12 }];
for (const i of a) {
  console.log(i); // { a: {} } { b: 12 }
}
```

for of 适用数组对象/字符串/map/set 等拥有迭代器对象（iterator）的集合，但是不能遍历对象，因为没有迭代器对象，有迭代器的对象包括：

- 数组
- Set
- Map
- 类数组对象，如 arguments 对象、DOM NodeList 对象
- Generator 对象
- 字符串
