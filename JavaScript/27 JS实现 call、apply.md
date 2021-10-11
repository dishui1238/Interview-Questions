## 实现 call、apply、bind

> this 永远指向最后调用它的那个对象

```js
func.apply(thisArg, [argsArray]);
```

- call、apply、bind 都是**改变函数的 this 指向为第一个参数 thisArg**。
- 其中 call 和 apply 的区别在于传参的写法不同： call 是一个一个参数传，而 apply 是以数组的形式传入
- bind 与这两者的区别在于：bind 函数不会马上执行，而（call 与 apply）是在改变了函数的 this 指向后立马执行

```js
Function.prototype.call = function (context, ...args) {
  var context = context || window;
  context.fn = this; // this 就是 func
  // context 是最后调用 fn 的对象，所以 this 指向 context
  var res = eval("context.fn(...args)");
  delete context.fn;
  return res;
};
```

```js
Function.prototype.apply = function (context, args) {
  let context = context || window;
  context.fn = this;
  let res = eval("context.fn(...args)");
  delete context.fn;
  return res;
};
```

```js
Function.prototype.bind = function (context) {
  if (typeof this !== "function") {
    throw TypeError("error");
  }
  // 缓存this
  const self = this;
  const args = [...arguments].slice(1);
  //返回一个函数
  return function fn() {
    // 判断调用方式
    if (this instanceof fn) {
      return new self(...args, ...arguments);
    }
    return self.apply(context, args.concat(...arguments));
  };
};
```
