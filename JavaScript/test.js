// 防抖
function debounce(fn, delay) {
  let timeId;
  return function (...args) {
    clearTimeout(timeId);
    timeId = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}

// 节流
function throttle(fn, delay) {
  let canRun = true;
  return function (...args) {
    if (!canRun) return;
    canRun = false;
    setTimeout(() => {
      fn.apply(this, args);
      canRun = true;
    }, delay);
  };
}

// 实现简单的EventEmiter，包含事件绑定，事件触发以及移除
class EventEmiter {
  constructor() {
    this.events = {};
  }

  on(event, fn) {
    if (this.events[event]) {
      this.events[event].push(fn);
    } else {
      this.events[event] = [fn];
    }
  }

  emit(event, ...args) {
    this.events[event].forEach((fn) => {
      fn.apply(this, args);
    });
  }

  remove(event) {
    delete this.events[event];
  }
}

// 合并两个有序数组
var merge = function (nums1, nums2) {
  let p1 = 0, // nums1 队列的头部指针
    p2 = 0; // nums2 队列的头部指针

  const temp = [];
  while (p1 < nums1.length && p2 < nums2.length) {
    if (nums1[p1] > nums2[p2]) {
      temp.push(nums2[p2]);
      p2++;
    } else {
      temp.push(nums1[p1]);
      p1++;
    }
  }

  while (p1 < nums1.length) {
    temp.push(nums1[p1]);
    p1++;
  }

  while (p2 < nums2.length) {
    temp.push(nums2[p2]);
    p2++;
  }
  return temp;
};

// 爬楼梯
// 假设你正在爬楼梯。需要 n 阶你才能到达楼顶, 每次你可以爬 1 或 2 个台阶。你有多少种不同的方法可以爬到楼顶呢
function climbStairs(n) {
  if (n <= 3) return n;
  let p = 1, // 第一级
    q = 2, // 第二级
    next = 3; // 第三级
  for (let i = 4; i <= n; i++) {
    p = q;
    q = next;
    next = p + q;
  }
  return next;
}

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
