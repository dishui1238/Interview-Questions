### new 做了什么

> 执行一个构造函数、然后返回一个实例对像

- 创建了一个全新的对象
- 这个对象会被执行`__proto__`会链接到构造函数的 protytype 对象上
- 生成的新对象会绑定到函数调用的 this
- 如果函数没有返回对象类型 Object(包含 Functoin, Array, Date, RegExg, Error)，那么 new 表达式中的函数调用会自动返回这个新的对象

```js
function Student(name) {
  this.name = name;
}
var student = new Student("张三");
console.log(student); // Student {name: "张三"}

new Number(1); // Number(1)
new Boolean(true); // Boolean(true)
new String("a"); // String("a")
```

### 实现一个 new

1. 创建一个空对象
2. 空对象的`__proto__`指向构造函数的`prototype`, 为这个新对象添加属性
3. 构造函数的作用域赋给新对象
4. 如果函数没有返回对象类型 Object，那么 new 表达式中的函数调用会自动返回这个新的对象

```js
function _new(constructor, ...arg) {
  if (typeof constructor !== "function") {
    throw "constructor must be a function";
  }
  // 创建一个空对象
  var obj = {};
  // 空对象的`__proto__`指向构造函数的`prototype`, 为这个新对象添加属性
  obj.__proto__ = constructor.prototype;
  // 构造函数的作用域赋给新对象
  var res = constructor.apply(obj, arg);
  // 判断是否是 Object，如果不是直接返回新对象
  return Object.prototype.toString.call(res) === "[object Object]" ||
    Object.prototype.toString.call(res) === "[object Function]"
    ? res
    : obj;
}
```
