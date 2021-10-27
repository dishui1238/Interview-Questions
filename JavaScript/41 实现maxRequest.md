## 41 实现 maxRequest，成功后 resolve 结果，失败后重试，尝试超过一定次数才真正的 reject

```js
function maxRequest(fn, maxNum) {
  return new Promise((resolve, reject) => {
    function help(num) {
      fn()
        .then((value) => {
          resolve(value);
        })
        .catch((err) => {
          if (num > 0) {
            help(num - 1);
          } else {
            reject(err);
          }
        });
    }
    help(maxNum);
  });
}
```
