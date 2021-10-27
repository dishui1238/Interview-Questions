## 实现一个接口请求时间大于 3s 就报错

```js
const request = new Promise((resolve, reject) => {
  setTimeout(() => {
    // console.log("执行成功");
    resolve("执行成功");
  }, 2000);
});

const timeout = new Promise((resolve, reject) => {
  setTimeout(() => {
    // console.log("超时了");
    reject("超时了");
  }, 3000);
});

Promise.race([request, timeout]).then((val) => {
  console.log("value", val);
});
```
