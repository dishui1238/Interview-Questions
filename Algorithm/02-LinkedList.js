/**
 * 实现单项链表
 * 数据添加、删除、获取、更新、翻转
 */
class Node {
  constructor(element, next) {
    this.element = element;
    this.next = next;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.size = 0;
  }

  findNode(index) {
    let current = this.head; // 从头节点开始找
    for (let i = 0; i < index; i++) {
      current = current.next;
    }
    return current;
  }

  add(index, element) {
    if (arguments.length === 1) {
      element = index;
      index = this.size;
    }
    if (index === 0) {
      const oldHead = this.head;
      this.head = new Node(element, oldHead);
    } else {
      const prevNode = this.findNode(index - 1);
      prevNode.next = new Node(element, prevNode.next);
    }
    this.size++;
  }
  remove(index) {
    let node;
    if (index == 0) {
      node = this.head;
      if (!node) return;
      this.head = this.head.next;
    } else {
      let prevNode = this.findNode(index - 1);
      node = prevNode.next;
      prevNode.next = prevNode.next.next;
    }
    this.size--;
    return node;
  }
  get(index) {
    return this.findNode(index);
  }
  set(index, el) {
    const node = this.findNode(index);
    node.element = el;
  }
  reverse() {
    let head = this.head;
    if (head == null || head.next == null) return head;
    // 将链表从前往后依次移动到新的链表上
    let newHead = null;
    while (head !== null) {
      // console.log("head", head);
      const next = head.next;
      head.next = newHead;
      newHead = head;

      head = next;
    }
    return newHead;
  }
}

const ll = new LinkedList();

ll.add("0");
ll.add("1");
ll.add("2");
ll.add("3");
// ll.remove(3);
console.dir(ll, { depth: 100 });
const res = ll.reverse();
console.dir(res, { depth: 100 });

// LinkedList {
//   head: Node {
//     element: '0',
//     next: Node { element: '1', next: Node { element: '2', next: null } }
//   },
//   size: 3
// }
