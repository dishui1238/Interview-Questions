## Vue 中如何检测数组变化

- 通过重写数组原型上的 7 个方法（push,shift,pop,splice,unshift,sort,reverse），使其在操作数组数据的同时通知更新
- 数组中如果是对象，也会通过 defineProperty 递归对数据进行劫持
- 数组的索引和长度变化时无法监控的
