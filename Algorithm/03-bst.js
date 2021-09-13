/**
 * 二叉搜索树
 *
 * 树的遍历方式 ：  4种 先序遍历 中序遍历 后续遍历 层序遍历  数据的扁平化
 *
 * 前序遍历 Preorder Traversal(先访问根节点、前序遍历左子树、前序遍历右子树)
 * 中序遍历 Inorder Traversal(中序遍历左子树、根节点、中序遍历右子树)
 * 后续遍历 Postorder Traversal(后序遍历左子树、后续遍历右子树、根节点)
 * 层序遍历 Level Order Traversal (从上到下，从左到右依次访问每一个节点)
 *
 * 1.在处理类似的dom节点的时候 我希望遇到节点 就处理节点 可以采用先序遍历
 * 2.我希望处理二叉搜素树按照顺序处理 可以采用中序方式
 * 3.dom树  我不能遍历到这个节点就处理 我期望的是先处理儿子 在处理自己  (如果用非递归方式 实现 先序 后续 中序)
 * 4.层序就是按照层级顺序来遍历这棵树
 *
 * 实现反转二叉树
 */

class Node {
  constructor(element, parent) {
    this.element = element;
    this.parent = parent;
    this.left = null;
    this.right = null;
  }
}

class BST {
  constructor(compare) {
    this.root = null;
    this.tempCompare = this.compare;
    this.compare = compare || this.tempCompare;
  }
  compare(n1, n2) {
    return n1 < n2;
  }

  add(element) {
    if (!this.root) {
      this.root = new Node(element);
    } else {
      // 从根节点开始遍历
      let current = this.root;
      let compare;
      let parent;
      while (current) {
        parent = current;
        compare = this.compare(element, current.element);
        if (compare) {
          // 小于，左边
          current = current.left;
        } else {
          // 大于，右边
          current = current.right;
        }
      }
      const node = new Node(element, parent);
      if (compare) {
        parent.left = node;
      } else {
        parent.right = node;
      }
    }
  }

  // 前序遍历
  preorderTranversal(callback) {
    function traversal(node) {
      if (node === null) return;
      callback(node);
      traversal(node.left); // 先访问左子树
      traversal(node.right); // 再访问右子树
    }
    traversal(this.root);
  }

  // 中序遍历 左子树、根节点、中序遍历右子树
  inorderTraversal(callback) {
    function traversal(node) {
      if (node === null) return;
      traversal(node.left); // 先访问左子树
      callback(node);
      traversal(node.right); // 再访问右子树
    }
    traversal(this.root);
  }
  // 后序遍历
  postorderTraversal(callback) {
    function traversal(node) {
      if (node === null) return;
      traversal(node.left); // 先访问左子树
      traversal(node.right); // 再访问右子树
      callback(node);
    }
    traversal(this.root);
  }
  // 层序遍历
  levelOrderTraversal(callback) {
    let stack = [this.root];
    let i = 0;
    let current;
    while ((current = stack[i++])) {
      callback(current);
      if (current.left) stack.push(current.left);
      if (current.right) stack.push(current.right);
    }
  }
}

let bst = new BST((a, b) => {
  return a.age - b.age < 0;
}); // sort排序

bst.add({ age: 10 });
bst.add({ age: 12 });
bst.add({ age: 5 });
bst.add({ age: 6 });

bst.inorderTraversal((node) => {
  // 都可以遍历树中的每一个节点
  console.log(node.element);
});
