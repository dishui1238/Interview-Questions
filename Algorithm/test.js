function maxSum(nums, target) {
  const hashMap = new Map();
  for (let i = 0; i < nums.length; i++) {
    if (hashMap.has(target - nums[i])) {
      return [hashMap.get(target - nums[i]), i];
    } else {
      hashMap.set(nums[i], i);
    }
  }
}
