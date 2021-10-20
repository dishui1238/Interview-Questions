1. then 的实现原理

2. all 的实现原理：就是全成功才成功，有一个失败就是失败。 执行结果是有顺序的

```js
Promise.all = function (promises) {
  return new Promise((resolve, reject) => {
    const arr = [];
    let times = 0;
    const processResult = (i, val) => {
      arr[i] = val; // 计数器就是解决异步并发问题
      if (++times === promises.length) {
        resolve(arr);
      }
    };
    for (let i = 0; i < promises.length; i++) {
      let val = promises[i]; // 怎么让一个promise执行？  p.then
      if (typeof val.then === "function") {
        // 是promise
        val.then((val) => processResult(i, val), reject);
      } else {
        processResult(i, val);
      }
    }
  });
};
```

3. finally 的实现原理

```js
/**
 * 无论成功还是失败都会执行
 * 即调用 then 方法
 */
Promise.prototype.finally = function (cb) {
  return this.then(
    (y) => {
      return Promise.resolve(cb()).then(() => y);
    },
    (r) => {
      return Promise.resolve(cb()).then(() => {
        throw r;
      }); // 因为finally的promise执行出错, 会导致不会执行Promise.resolve的正常逻辑 ，所以以finally错误为结果
    }
  );
};
```

4. promise 并行执行
   promise.all

5. promise 串行执行
