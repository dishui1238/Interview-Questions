function insertSort(arr) {
  const len = arr.length;
  for (let i = 1; i < len; i++) {
    let target = i;
    for (let j = i - 1; j >= 0; j--) {
      if (arr[target] < arr[j]) {
        [arr[j], arr[target]] = [arr[target], arr[j]];
        target--;
      }
    }
  }
  return arr;
}

console.log(insertSort([2, 3, 1, 4, 5, 1]));
