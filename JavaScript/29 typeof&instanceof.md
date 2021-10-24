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

typeof 一般被用于判断一个变量的类型，我们可以利用 typeof 来判断 number, string, object, boolean,function, undefined, symbol 这七种类型，这种判断能帮助我们搞定一些问题，js 在底层存储变量的时候会在变量的机器码的低位 1-3 位存储其类型信息(000：对象，010：浮点数，100：字符串，110：布尔，1：整数)，但是 null 所有机器码均为 0，直接被当做了对象来看待。
那么有没有更好的办法区分类型呢，一般使用 Object.prototype.toString.call()，

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
