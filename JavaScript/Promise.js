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
