## 一、手写 Promise 核心逻辑

参考文章：https://juejin.cn/post/6945319439772434469

### Promise 基本使用

```js
const p = new Promise((resolve, reject) => {
  resolve("success");
  reject("err");
});

promise.then(
  (value) => {
    console.log("resolve", value);
  },
  (reason) => {
    console.log("reject", reason);
  }
);

// 输出 resolve success
```

### 分析 Promise 基本原理

- Promise 是一个类，在执行这个类的时候会传入一个执行器，这个执行器会立即执行
- Promise 会有三种状态
  - Pending 等待
  - Fulfilled 完成
  - Rejected 失败
- 状态只能由 Pending --> Fulfilled 或者 Pending --> Rejected，且一但发生改变便不可二次修改；
- Promise 中使用 resolve 和 reject 两个函数来更改状态
- then 方法内部做但事情就是状态判断
  - 如果状态是成功，调用成功回调函数
  - 如果状态是失败，调用失败回调函数

### 核心逻辑实现

```js
const FULFILLED = "fulfilled";
const PENDING = "pending";
const REJECT = "reject";

class MyPromise {
  constructor(executor) {
    // executor 是一个函数，立即执行
    executor(this.resolve, this.reject);
  }

  status = PENDING;
  value = null;
  reason = null;

  // 更改成功后的状态
  resolve = (value) => {
    if (this.status === PENDING) {
      this.status = FULFILLED;
      this.value = value;
    }
  };

  // 更改失败后的状态
  reject = (reason) => {
    if (this.status === PENDING) {
      this.status = REJECT;
      this.reason = reason;
    }
  };

  then = (onFulfilled, onRejected) => {
    if (this.status === FULFILLED) {
      onFulfilled(this.value);
    } else if (this.status === REJECT) {
      onRejected(this.reson);
    }
  };
}
```

## 二、在 Promise 类中加入异步逻辑

上面还没有经过异步处理，如果有异步逻辑加如来会带来一些问题，例如：

```js
// test.js

const MyPromise = require("./MyPromise");
const promise = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve("success");
  }, 2000);
});

promise.then(
  (value) => {
    console.log("resolve", value);
  },
  (reason) => {
    console.log("reject", reason);
  }
);

// 没有打印信息！！！
```

**分析原因：**

> 主线程代码立即执行，setTimeout 是异步代码，then 会马上执行，这个时候判断 Promise 状态，状态是 Pending，然而之前并没有判断等待这个状态

```js
const FULFILLED = "fulfilled";
const PENDING = "pending";
const REJECT = "reject";

class MyPromise {
  constructor(executor) {
    // executor 是一个函数，立即执行
    executor(this.resolve, this.reject);
  }

  status = PENDING;
  value = null;
  reason = null;
  // 存储成功回调函数
  onFulfilledCallback = null;
  // 存储失败回调函数
  onRejectedCallback = null;

  // 更改成功后的状态
  resolve = (value) => {
    if (this.status === PENDING) {
      this.status = FULFILLED;
      this.value = value;
      // ++++++++++++++新增+++++++++++++++++++
      this.onFulfilledCallback && this.onFulfilledCallback(value);
    }
  };

  // 更改失败后的状态
  reject = (reason) => {
    if (this.status === PENDING) {
      this.status = REJECT;
      this.reason = reason;
      // ++++++++++++++新增+++++++++++++++++++
      this.onRejectedCallback && this.onRejectedCallback(reason);
    }
  };

  then = (onFulfilled, onRejected) => {
    if (this.status === FULFILLED) {
      onFulfilled(this.value);
    } else if (this.status === REJECT) {
      onRejected(this.reson);
    } else if (this.status === PENDING) {
      // ++++++++++++++新增+++++++++++++++++++
      // 因为不知道后面状态的变化情况，所以将成功回调和失败回调存储起来
      // 等到执行成功失败函数的时候再传递
      this.onFulfilledCallback = onFulfilled;
      this.onRejectedCallback = onRejected;
    }
  };
}
```

## 三、实现 then 方法多次调用添加多个处理函数

> Promise 的 then 方法是可以被多次调用的。这里如果有三个 then 的调用，如果是同步回调，那么直接返回当前的值就行；如果是异步回调，那么保存的成功失败的回调，需要用不同的值保存，因为都互不相同。之前的代码需要改进。

🌰 一个：

```js
const promise = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve("success");
  }, 2000);
});

promise.then((value) => {
  console.log(1);
  console.log("resolve", value);
});

promise.then((value) => {
  console.log(2);
  console.log("resolve", value);
});

promise.then((value) => {
  console.log(3);
  console.log("resolve", value);
});

// 3
// resolve success
```

原因：后面的回调函数会覆盖掉前面的回调函数

```js
const FULFILLED = "fulfilled";
const PENDING = "pending";
const REJECT = "reject";

class MyPromise {
  constructor(executor) {
    // executor 是一个函数，立即执行
    executor(this.resolve, this.reject);
  }

  status = PENDING;
  value = null;
  reason = null;
  // 存储成功回调函数
  onFulfilledCallback = [];
  // 存储失败回调函数
  onRejectedCallback = [];

  // 更改成功后的状态
  resolve = (value) => {
    if (this.status === PENDING) {
      this.status = FULFILLED;
      this.value = value;

      // 调用所有成功的回调
      while (this.onFulfilledCallback.length) {
        // Array.shift() 取出数组第一个元素，然后（）调用，shift不是纯函数，取出后，数组将失去该元素，直到数组为空
        this.onFulfilledCallback.shift()(value);
      }
    }
  };

  // 更改失败后的状态
  reject = (reason) => {
    if (this.status === PENDING) {
      this.status = REJECT;
      this.reason = reason;

      // 调用所有失败的回调
      while (this.onRejectedCallback.length) {
        // Array.shift() 取出数组第一个元素，然后（）调用，shift不是纯函数，取出后，数组将失去该元素，直到数组为空
        this.onRejectedCallback.shift()(value);
      }
    }
  };

  then = (onFulfilled, onRejected) => {
    if (this.status === FULFILLED) {
      onFulfilled(this.value);
    } else if (this.status === REJECT) {
      onRejected(this.reson);
    } else if (this.status === PENDING) {
      // 因为不知道后面状态的变化情况，所以将成功回调和失败回调存储起来
      // 等到执行成功失败函数的时候再传递
      this.onFulfilledCallback.push(onFulfilled);
      this.onRejectedCallback.push(onRejected);
    }
  };
}
```

## 四、实现 then 方法的链式调用

```js
// MyPromise.js

class MyPromise {
  ......
  then(onFulfilled, onRejected) {
    // ==== 新增 ====
    // 为了链式调用这里直接创建一个 MyPromise，并在后面 return 出去
    const promise2 = new MyPromise((resolve, reject) => {
      // 这里的内容在执行器中，会立即执行
      if (this.status === FULFILLED) {
        // 获取成功回调函数的执行结果
        const x = onFulfilled(this.value);
        // 传入 resolvePromise 集中处理
        resolvePromise(x, resolve, reject);
      } else if (this.status === REJECTED) {
        onRejected(this.reason);
      } else if (this.status === PENDING) {
        this.onFulfilledCallbacks.push(onFulfilled);
        this.onRejectedCallbacks.push(onRejected);
      }
    })

    return promise2;
  }
}

function resolvePromise(x, resolve, reject) {
  
  // 如果相等了，说明return的是自己，抛出类型错误并返回
  if (promise2 === x) {
    return reject(new TypeError('Chaining cycle detected for promise #<Promise>'))
  }
  // 判断x是不是 MyPromise 实例对象
  if(x instanceof MyPromise) {
    // 执行 x，调用 then 方法，目的是将其状态变为 fulfilled 或者 rejected
    // x.then(value => resolve(value), reason => reject(reason))
    // 简化之后
    x.then(resolve, reject)
  } else{
    // 普通值
    resolve(x)
  }
}

```
