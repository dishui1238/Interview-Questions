1. then 的实现原理

2. all 的实现原理：就是全成功才成功，有一个失败就是失败。 执行结果是有顺序的

3. finally 的实现原理

```js
/**
 * 无论成功还是失败都会执行
 * 即调用 then 方法
 */

Promise.prototype.finally = function(cb){
  return this.then()
}
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
