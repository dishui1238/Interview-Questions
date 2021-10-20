var arr = [1, 2, 3];
arr.a = 123;
Array.prototype.a = 123;

for (let value of arr) {
  console.log(value); // 1 2 3
}
for (let value in arr) {
  console.log(value); // 0 1 2 a
}
