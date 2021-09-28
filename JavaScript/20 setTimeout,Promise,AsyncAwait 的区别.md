## 21. setTimeout、Promise、Async/Await 的区别

1. setTimeout
   settimeout 的回调函数放到宏任务队列里，等到执行栈清空以后执行

2. Promise
   Promise 本身是同步的立即执行函数，回调函数会被放到 微任务队列 中

3. Async/Await
   async 函数返回一个 Promise 对象，当函数执行的时候，一旦遇到 await 就会先返回，等到触发的异步操作完成，再执行函数体内后面的语句。可以理解为，是让出了线程，跳出了 async 函数体。
