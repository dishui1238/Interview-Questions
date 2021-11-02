// // 股票买卖最佳时机
// function maxProfit(prices) {
//   if (prices.length < 2) return 0;

//   let minPrice = prices[0];
//   let maxProfit = 0;

//   for (let i = 0; i < prices.length; i++) {
//     if (prices[i] < minPrice) {
//       minPrice = prices[i];
//     } else if (prices[i] - minPrice > maxProfit) {
//       maxProfit = prices[i] - minPrice;
//     }
//   }
//   return maxProfit;
// }

// // 判断是否是回文数
// /**
//  * @param {number} x
//  * @return {boolean}
//  */
// function isPalindrome(num) {
//   if (num < 0) return false;
//   const str = num.toString();

//   const middle = Math.floor(str.length / 2);
//   let right = str.length - 1;
//   let res = true;
//   for (let left = 0; left < middle; left++) {
//     if (str[left] === str[right]) {
//       right--;
//     } else {
//       res = false;
//       break;
//     }
//   }
//   return res;
// }

// // 两数之和
// /** 哈希表
//  * @param {number[]} nums
//  * @param {number} target
//  * @return {number[]}
//  */
// function twoSum(nums, target) {
//   let hashMap = {}; //

//   for (let i = 0; i < nums.length; i++) {
//     if (hashMap[target - nums[i]]) {
//       return [hashMap[target - nums[i]], i];
//     } else {
//       hashMap[nums[i]] = i;
//     }
//   }
// }

// /**
//  * Definition for singly-linked list.
//  * function ListNode(val, next) {
//  *     this.val = (val===undefined ? 0 : val)
//  *     this.next = (next===undefined ? null : next)
//  * }
//  */

// function ListNode(val, next) {
//   this.val = val === undefined ? 0 : val;
//   this.next = next === undefined ? null : next;
// }
// const head = {
//   val: 1,
//   next: new ListNode(2, new ListNode(3, new ListNode(4, null))),
// };
// /**
//  * @param {ListNode} head
//  * @param {number} n
//  * @return {ListNode}
//  */

// const getLength = (head) => {
//   let length = 0;
//   while (head) {
//     head = head.next;
//     ++length;
//   }
//   return length;
// };
// // 0--->1--->2--->3--->4
// var removeNthFromEnd = function (head, n) {
//   const dummy = new ListNode(0, head); // 哑节点
//   const length = getLength(head);
//   let currentNode = dummy;
//   for (i = 1; i < length - n + 1; i++) {
//     currentNode = currentNode.next;
//   }
//   currentNode.next = currentNode.next.next;
//   return dummy.next;
// };

// console.log(removeNthFromEnd(head, 2))

// function ListNode(val, next) {
//   this.val = val === undefined ? 0 : val;
//   this.next = next === undefined ? null : next;
// }
// /**
//  * @param {ListNode} l1
//  * @param {ListNode} l2
//  * @return {ListNode}
//  */
// var mergeTwoLists = function (l1, l2) {
//   const preHead = new ListNode(-1);

//   const pre = preHead;
//   while (l1 && l2) {
//     if (l1.val <= l2.val) {
//       pre.next = l1;
//       l1 = l1.next;
//     } else {
//       pre.next = l2;
//       l2 = l2.next;
//     }
//     pre = pre.next;
//   }
//   pre.next = l1 === null ? l2 : l1;
//   return preHead.next;
// };

function TreeNode(val, left, right) {
  this.val = val === undefined ? 0 : val;
  this.left = left === undefined ? null : left;
  this.right = right === undefined ? null : right;
}

var levelOrder = function (root) {
  if (!root) return [];
  const stack = [root]; // 存储当前层级的节点
  const res = [];

  while (stack.length) {
    const currentSize = stack.length;
    res.push([]);
    for (let i = 0; i < currentSize; i++) {
      const node = stack.shift();
      res[res.length - 1].push(node.val);
      if (node.left) stack.push(node.left);
      if (node.right) stack.push(node.right);
    }
  }
  return res;
};

const root = {
  val: 3,
  left: new TreeNode(9),
  right: new TreeNode(20, new TreeNode(15), new TreeNode(7)),
};

console.log(levelOrder(root));
