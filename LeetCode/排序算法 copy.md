<!--
 * @Author: your name
 * @Date: 2020-11-26 10:43:00
 * @LastEditTime: 2020-12-09 08:43:42
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \0dailyUpdateNotes\Notes\LeetCode\排序算法.md
-->

# 十大排序算法

1. 冒泡排序
2. 选择排序
3. 插入排序
4. 希尔排序
5. 归并排序
6. 快速排序
7. 堆排序
8. 计数排序
9. 桶排序

10. 基数排序

基数排序是一种非比较型整数排序算法，其原理是将整数按位数切割成不同的数字，然后按每个位数分别比较。由于整数也可以表达字符串（比如名字或日期）和特定格式的浮点数，所以基数排序也不是只能使用于整数。基数排序法是属于稳定性的排序，其时间复杂度为 O (nlog(r)m)，其中 r 为所采取的基数，而 m 为堆数.

最高位优先 简称 MSD 法

最低位优先 简称 LSD 法

```js
// LSD
function radixSort(arr) {
  // 取最大值，最大值的位数就是要循环遍历的次数
  const max = Math.max(...arr);
  // 定义长度为 10 的桶
  const buckets = Array.from({ length: 10 }, () => []);
  // 定义当前遍历的位数 个位、十位、百位....
  let m = 1;
  while (m < max) {
    arr.forEach((num) => {
      // digit 为某位上的值  ~~ 向下取整
      const digit = ~~((num % (m * 10)) / m);
      buckets[digit].push(num);
    });

    // 完成一次排序
    // 从 buckets 中取值
    let ind = 0;
    buckets.forEach((bucket) => {
      while (bucket.length > 0) {
        // shift 从头部取值，保证队列先入先出
        arr[ind++] = bucket.shift();
      }
    });
    // 判断下一位
    m *= 10;
  }
  return arr;
}
```

```js
//LSD Radix Sort
var counter = [];
function radixSort(arr, maxDigit) {
  var mod = 10;
  var dev = 1;
  for (var i = 0; i < maxDigit; i++, dev *= 10, mod *= 10) {
    for (var j = 0; j < arr.length; j++) {
      var bucket = parseInt((arr[j] % mod) / dev);
      if (counter[bucket] == null) {
        counter[bucket] = [];
      }
      counter[bucket].push(arr[j]);
    }
    var pos = 0;
    for (var j = 0; j < counter.length; j++) {
      var value = null;
      if (counter[j] != null) {
        while ((value = counter[j].shift()) != null) {
          arr[pos++] = value;
        }
      }
    }
  }
  return arr;
}
```
