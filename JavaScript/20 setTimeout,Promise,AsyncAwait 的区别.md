## 21. setTimeout、Promise、Async/Await 的区别

1. setTimeout
   settimeout 的回调函数放到宏任务队列里，等到执行栈清空以后执行

2. Promise
   Promise 本身是同步的立即执行函数，回调函数会被放到 微任务队列 中

3. Async/Await
   async 函数返回一个 Promise 对象，当函数执行的时候，一旦遇到 await 会让出线程，阻塞 async 内后续的代码，先去执行 async 外的代码。等外面的同步代码执行完毕，才会执行里面的后续代码。就算 await 的不是 promise 对象，是一个同步函数，也会让出线程

4. 输出顺序

```js
async function async1() {
  console.log("async1 start");
  await async2();
  console.log("asnyc1 end");
}
function async2() {
  setTimeout(() => console.log("async2"));
}
console.log("script start");
setTimeout(() => {
  console.log("setTimeOut");
}, 0);
async1();
new Promise(function (reslove) {
  console.log("promise1");
  reslove();
}).then(function () {
  console.log("promise2");
});
console.log("script end");
```

```
script start
async1 start
promise1
script end
asnyc1 end
promise2
setTimeOut
async2
```