### typeof

- typeof 一般被用于判断一个变量的类型，我们可以利用 typeof 来判断 `number, string, object, boolean, function, undefined, symbol`这七种类型
- typeof 在判断一个 object 的数据的时候只能告诉我们这个数据是 object, 而不能细致的具体到是哪一种 object

```js
typeof "a"; // "string"
typeof null; //! "object" 有问题
typeof undefined; //"undefined"
typeof 1; //"number"
typeof Symbol(); // "symbol"
typeof function () {}; // "function"
typeof true; // "boolean"
```

### instanceof

- instanceof 主要的作用就是判断一个实例是否属于某种类型
- instanceof 主要的实现原理就是只要右边变量的 prototype 在左边变量的原型链上即可。因此，instanceof 在查找的过程中会遍历左边变量的原型链，直到找到右边变量的 prototype，如果查找失败，则会返回 false

```js
let person = function () {};
let programmer = function () {};
programmer.prototype = new person();
let nicole = new programmer();
nicole instanceof person; // true
nicole instanceof programmer; // true
```
