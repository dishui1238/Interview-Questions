// const arr = [1, 2, 3];
// arr.reduce((p, x) => {
//   return p.then(() => {
//     return new Promise((r) => {
//       setTimeout(() => r(console.log(x)), 1000);
//     });
//   });
// }, Promise.resolve());

const request = new Promise((resolve, reject) => {
  setTimeout(() => {
    // console.log("执行成功");
    resolve('执行成功');
  }, 2000);
});

const timeout = new Promise((resolve, reject) => {
  setTimeout(() => {
    // console.log("超时了");
    reject('超时了');
  }, 3000);
});

Promise.race([request, timeout]).then((val) => {
  console.log("value", val);
});
