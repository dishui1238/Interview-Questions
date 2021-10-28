// 股票买卖最佳时机
function maxProfit(prices) {
  if (prices.length < 2) return 0;

  let minPrice = prices[0];
  let maxProfit = 0;

  for (let i = 0; i < prices.length; i++) {
    if (prices[i] < minPrice) {
      minPrice = prices[i];
    } else if (prices[i] - minPrice > maxProfit) {
      maxProfit = prices[i] - minPrice;
    }
  }
  return maxProfit;
}

// 判断是否是回文数
/**
 * @param {number} x
 * @return {boolean}
 */
function isPalindrome(num) {
  if (num < 0) return false;
  const str = num.toString();

  const middle = Math.floor(str.length / 2);
  let right = str.length - 1;
  let res = true;
  for (let left = 0; left < middle; left++) {
    if (str[left] === str[right]) {
      right--;
    } else {
      res = false;
      break;
    }
  }
  return res;
}

// 两数之和
/** 哈希表
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
function twoSum(nums, target) {
  let hashMap = {}; //

  for (let i = 0; i < nums.length; i++) {
    if (hashMap[target - nums[i]]) {
      return [hashMap[target - nums[i]], i];
    } else {
      hashMap[nums[i]] = i;
    }
  }
}
