Object.create()方法创建一个新对象，使用现有的对象来提供新创建的对象的\_\_proto\_\_。

```js
let a = { name: "zqq", age: 10 };
let b = Object.create(a);
a.age = 12;
console.log(a); // { name: 'zqq', age: 12 }
console.log(b.__proto__); // { name: 'zqq', age: 12 }
```

创建一个空对象，没有任何的原型方法`Object.create(null)`
