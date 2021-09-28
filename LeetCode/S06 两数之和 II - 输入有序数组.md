### 6. 两数之和 II - 输入有序数组

给定一个已按照升序排列的有序数组，找到两个数使得它们相加之和等于目标数。

函数应该返回这两个下标值 index1 和 index2，其中 index1  必须小于  index2。

说明:

返回的下标值（index1 和 index2）不是从零开始的。
你可以假设每个输入只对应唯一的答案，而且你不可以重复使用相同的元素。

```
输入: numbers = [2, 7, 11, 15], target = 9
输出: [1,2]
解释: 2 与 7 之和等于目标数 9 。因此 index1 = 1, index2 = 2 。
```

```js
/**
 * @param {number[]} numbers
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function (numbers, target) {
  // i < j , numbers[i]+numbers[j] = target, 返回[i+1, j+1]
  for (let i = 0; i < numbers.length - 1; i++) {
    for (let j = i + 1; j < numbers.length; j++) {
      if (numbers[i] + numbers[j] === target) {
        return [i + 1, j + 1];
      }
    }
  }
};
```

二分查找：

- 从 numbers 取出一个元素 numbers[i]，在 numbers 中 i 之后的元素中查找 target - numbers[i]
- 查找到之间返回，不然依次从 numbers 中取后面一个元素

```js
/**
 * @param {number[]} numbers
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function (numbers, target) {
  let len = numbers.length;

  for (let i = 0; i < len; i++) {
    // number[i] + targetNum = target
    const targetNum = target - numbers[i];
    // left=i+1, right=len-1
    let left = i + 1,
      right = len - 1;

    while (left <= right) {
      let mid = parseInt((right - left) / 2) + left; // mid 需要放在 while 循环里面，每次重新计算
      if (numbers[mid] === targetNum) {
        return [i + 1, mid + 1];
      } else if (numbers[mid] > targetNum) {
        right = mid - 1;
      } else {
        left = mid + 1;
      }
    }
  }
  return [-1, -1];
};
```

双指针：

```
初始时两个指针分别指向第一个元素位置和最后一个元素的位置。每次计算两个指针指向的两个元素之和，并和目标值比较。如果两个元素之和等于目标值，则发现了唯一解。如果两个元素之和小于目标值，则将左侧指针右移一位。如果两个元素之和大于目标值，则将右侧指针左移一位。移动指针之后，重复上述操作，直到找到答案。
```

```js
/**
 * @param {number[]} numbers
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function (numbers, target) {
  let left = 0,
    right = numbers.length - 1;
  while (left < right) {
    if (numbers[left] + numbers[right] === target) {
      return [left + 1, right + 1];
    } else if (numbers[left] + numbers[right] < target) {
      left++;
    } else {
      right--;
    }
  }
};
```

