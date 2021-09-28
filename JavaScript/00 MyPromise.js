const PENDING = "PENDING";
const FULFILLED = "FULFILLED";
const REJECTED = "REJECTED";

// 处理 x 和 promise 的关系
const resolvePromise = (x, promise2, resolve, reject) => {
  if (promise2 === x) {
    return reject(new TypeError("不能自己等待自己完成，出错了"));
  }
  if ((typeof x === "object" && x !== null) || typeof x === "function") {
    // 有可能是一个 promise
    let called = false;
    try {
      const then = x.then;
      if (typeof then === "function") {
        then.call(
          x,
          (y) => {
            // 成功的回调
            if (called) return;
            called = true;
            resolvePromise(y, promise2, resolve, reject); // 不停的解析直到是一个普通的值为止
          },
          (r) => {
            if (called) return;
            called = true;
            reject(r);
          }
        );
      } else {
        resolve(x);
      }
    } catch (e) {
      if (called) return;
      called = true;
      reject(e);
    }
  } else {
    resolve(x); // 是一个普通值，直接 resolve
  }
};

class Promise {
  constructor(executor) {
    this.value = undefined;
    this.reason = undefined;
    this.status = PENDING;
    this.onFulfilledCallbacks = []; // 存储成功的回调
    this.onRejectedCallbacks = []; // 存储失败的回调
    // executor 是一个函数，立即执行
    try {
      executor(this.resolve, this.reject);
    } catch (err) {
      this.reject(err);
    }
  }

  resolve = (value) => {
    if (value instanceof Promise) {
      return value.then(this.resolve, this.reject); // 递归解析
    }
    if (this.status === PENDING) {
      this.value = value;
      this.status = FULFILLED;
      // 调用成功的回调
      this.onFulfilledCallbacks.forEach((fn) => fn());
    }
  };
  reject = (reason) => {
    if (this.status === PENDING) {
      this.reason = reason;
      this.status = REJECTED;
      // 调用失败的回调
      this.onRejectedCallbacks.forEach((fn) => fn());
    }
  };

  /**
   * then 方法内部做的事情就是状态判断
   *  如果状态是成功，调用成功回调函数
   *  如果状态是失败，调用失败回调函数
   *
   * 如果 executor 是个异步函数，then 方法立即调用，其状态为 pending
   * 因此需要等待状态的修改
   *
   * then 方法需要返回的一个 promise，使其可以链式调用
   */
  then = (onFulfilled, onRejected) => {
    // 可选参数的含义就是用户不给 就用默认的
    onFulfilled = typeof onFulfilled === "function" ? onFulfilled : (v) => v;
    onRejected =
      typeof onRejected === "function"
        ? onRejected
        : (err) => {
            throw err;
          };

    let promise2 = new Promise((resolve, reject) => {
      if (this.status === FULFILLED) {
        /**
         * x 是 成功的回调返回的参数，需要将 x 透传给下一个 then，即调用 promise2 的成功的回调
         * 需要区别 x 是普通值还是 promise
         */
        // Cannot access 'promise2' before initialization
        setTimeout(() => {
          try {
            const x = onFulfilled(this.value);
            // resolve(x);
            resolvePromise(x, promise2, resolve, reject);
          } catch (e) {
            reject(e);
          }
        }, 0);
      }
      if (this.status === REJECTED) {
        setTimeout(() => {
          try {
            const x = onRejected(this.reason);
            // reject(x);
            resolvePromise(x, promise2, resolve, reject);
          } catch (e) {
            reject(e);
          }
        }, 0);
      }
      // 说明是异步，需要将回调存储起来
      if (this.status === PENDING) {
        this.onFulfilledCallbacks.push(() => {
          setTimeout(() => {
            try {
              const x = onFulfilled(this.value);
              // resolve(x);
              resolvePromise(x, promise2, resolve, reject);
            } catch (e) {
              reject(e);
            }
          }, 0);
        });
        this.onRejectedCallbacks.push(() => {
          setTimeout(() => {
            try {
              const x = onRejected(this.reason);
              // reject(x);
              resolvePromise(x, promise2, resolve, reject);
            } catch (e) {
              reject(e);
            }
          }, 0);
        });
      }
    });
    return promise2;
  };

  catch(onRejected) {
    return this.then(null, onRejected);
  }
  static resolve(value) {
    // 有等待效果 就用Promise.resolve方法
    return new Promise((resolve, reject) => {
      resolve(value);
    });
  }
  static reject(reason) {
    // Promise.reject不具备等待效果
    return new Promise((resolve, reject) => {
      reject(reason);
    });
  }
}

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

// Promise.all的特点 就是全成功才成功，有一个失败就是失败。 执行结果是有顺序的
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

// 默认测试的时候会调用此方法 会检测这个方法返回的对象是否符合规范 这个对象上需要有promise实例 resolve和reject
Promise.deferred = function () {
  let dfd = {};
  dfd.promise = new Promise((resolve, reject) => {
    dfd.resolve = resolve;
    dfd.reject = reject;
  });
  return dfd;
};

module.exports = Promise;
// npm install promises-aplus-tests -g
// promises-aplus-tests

// +++++++++++++++++++++++++++++++++++++++++++++++
let promise2 = new Promise((resolve, reject) => {
  resolve(100);
}).then((data) => {
  return data;
});
promise2.then(
  (data) => {
    console.log("22", data);
  },
  (err) => {
    console.log(err);
  }
);
