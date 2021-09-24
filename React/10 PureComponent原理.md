## PureComponent 与 memo 优化原理

- pureComponent 与 memo 使用浅比较新老 props 和 state，如果相等就不更新
- 浅比较就是只比较第一级，对于基本数据类型，只比较值；对于引用数据类型值，直接比较地址是否相同，不管里面内容变不变，只要地址一样，我们就认为没变
- PureComponent/memo 可以搭配

**缺点:** 对于引用数据类型，直接比较地址是否相同，可能造成：

1. 地址没变内容改变也不进行更新，比如一个数组 push 进去一个新的数据
2. 地址改变了，内容没变，没有必要更新也会进行更新

**进一步优化：**采用`ImmutableJs`

ImmutableJs 是 Facebook 出的持久性数据结构的库，持久性指的是数据一旦创建，就不能再被更改，任何修改或添加删除操作都会返回一个新的 Immutable 对象

```js
function shallowEqual(obj1, obj2) {
  if (obj1 === obj2) {
    return true;
  }
  if (
    typeof obj1 !== "object" ||
    obj1 === null ||
    typeof obj2 !== "object" ||
    obj2 === null
  ) {
    return false;
  }
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  if (keys1.length !== keys2.length) {
    return false;
  }
  for (let key in keys1) {
    if (!obj2.hasOwnProperty(key) || obj1[key] !== obj2[key]) {
      return false;
    }
  }
  return true;
}
class PureComponent extends React.Component {
  shouldComponentUpdate(newProps, newState) {
    return (
      !shallowEqual(this.props, newProps) && !shallowEqual(this.state, newState)
    );
  }
}
```
