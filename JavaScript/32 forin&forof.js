// var arr = [1, 2, 3];
// arr.a = 123;
// Array.prototype.a = 123;

// for (let value of arr) {
//   console.log(value); // 1 2 3
// }
// for (let value in arr) {
//   console.log(value); // 0 1 2 a
// }

function* createIterator() {
  yield 1;
  yield 2;
  yield 3;
}
// generators可以像正常函数一样被调用，不同的是会返回一个 iterator
let iterator = createIterator();
// console.log(iterator.next().value); // 1
// console.log(iterator.next().value); // 2
// console.log(iterator.next().value); // 3

for (const i of iterator) {
  console.log(i);
}
