# JavaScript语言编码规范(ES6)

## 类型

+ 1.1 基本类型: 直接存取基本类型。

  - string
  - number
  - boolean
  - null
  - undefined
  - symbol

  ```js
  const foo = 1;
  let bar = foo;

  bar = 9;

  console.log(foo, bar); // => 1, 9
  ```
+ 1.2 复杂类型: 通过引用的方式存取复杂类型。

  - object
  - array
  - function
  ```js
  const foo = {
    a: 1,
    b: 2,
  };
  const bar = foo;

  bar.a = 9;

  console.log(foo.a, bar.a); // => 9, 9
  ```

## 引用
+ 2.1 对所有的引用使用 `const` ；不要使用 `var`。[eslint：no-var](https://github.com/airbnb/javascript/issues/40)
::: tip
为什么？这能确保你无法对引用重新赋值，也不会导致出现 `bug` 或难以理解。
:::
```js
// bad
var a = 1;
var b = 2;

// good
const a = 1;
const b = 2;
```
+ 2.2 如果你一定需要可变动的引用，使用 `let` 代替 `var`。const声明的变量是不允许修改的。eslint：no-const-assign
::: tip
为什么？因为 `let` 是块级作用域，而 `var` 是函数作用域。
:::
```js
// bad
var count = 1;
if (true) {
  count += 1;
}

// good, use the let.
let count = 1;
if (true) {
  count += 1;
}
```
+ 2.3 `let`和`const`不允许一次声明多个变量/常量，用逗号隔开。
```js
// bad
const bar = 1, baz = 'test';
let a, b;

// good
const bar = 1;
const baz = 'test';
let a;
let b;
```
+2.4 注意 `let` 和 `const` 都是块级作用域。
```js
// const 和 let 只存在于它们被定义的区块内。
{
  let a = 1;
  const b = 1;
}
console.log(a); // ReferenceError
console.log(b); // ReferenceError
```
## 对象
+ 3.1 使用字面语法创建对象。eslint: [no-new-object](https://eslint.org/docs/latest/rules/no-new-object)
```js
// bad
const item = new Object();

// good
const item = {};
```
+ 3.2 如果你的代码在浏览器环境下执行，别使用 [保留字](http://es5.github.io/#x7.6.1) 作为键值。这样的话在 IE8 不会运行。 [更多信息](https://github.com/airbnb/javascript/issues/61)。 但在 ES6 模块和服务器端中使用没有问题。
```js
// bad
const superman = {
  default: { clark: 'kent' },
  private: true,
};

// good
const superman = {
  defaults: { clark: 'kent' },
  hidden: true,
};
```
+ 3.3 使用同义词替换需要使用的保留字。
```js
// bad
const superman = {
  class: 'alien',
};

// bad
const superman = {
  klass: 'alien',
};

// good
const superman = {
  type: 'alien',
};
```
+ 3.4 创建有动态属性名的对象时，使用可被计算的属性名称。
::: tip
为什么？因为这样可以让你在一个地方定义所有的对象属性。
:::
```js
  function getKey(k) {
    return `a key named ${k}`;
  }

  // bad
  const obj = {
    id: 5,
    name: 'San Francisco',
  };
  obj[getKey('enabled')] = true;

  // good
  const obj = {
    id: 5,
    name: 'San Francisco',
    [getKey('enabled')]: true,
  };
```
+ 3.5 使用对象属性值和方法的简写。eslint：[object-shorthand](https://eslint.org/docs/latest/rules/object-shorthand)
::: tip
为什么？因为这样更短更有描述性。
:::
```js
const lukeSkywalker = 'Luke Skywalker';

// bad
const obj = {
  lukeSkywalker: lukeSkywalker,
  addValue: function (value) {
    return atom.value + value;
  },
};

// good
const obj = {
  lukeSkywalker,
  addValue(value) {
    return atom.value + value;
  },
};
```

+ 3.6 如果对象的键是字符串，请使用长格式语法。
```js
// bad
const foo = {
  'bar-baz'() {},
};

// good
const foo = {
  'bar-baz': function () {},
};
```
+ 3.7 在对象属性声明前把简写的属性分组。
::: tip
为什么？因为这样能清楚地看出哪些属性使用了简写。
:::
```js
const anakinSkywalker = 'Anakin Skywalker';
const lukeSkywalker = 'Luke Skywalker';

// bad
const obj = {
  episodeOne: 1,
  twoJedisWalkIntoACantina: 2,
  lukeSkywalker,
  episodeThree: 3,
  mayTheFourth: 4,
  anakinSkywalker,
};

// good
const obj = {
  lukeSkywalker,
  anakinSkywalker,
  episodeOne: 1,
  twoJedisWalkIntoACantina: 2,
  episodeThree: 3,
  mayTheFourth: 4,
};
```

+ 3.8 不允许在使用对象字面量申明对象时使用相同的键名。
```js
// bad
const foo = {
  bar: 'baz',
  bar: 'qux',
};

// good
const foo = {
  bar: 'baz',
  quxx: 'qux',
};
```
+ 3.9 禁止将全局对象（Math和JSON)作为函数调用。

```js
// bad
const math = Math();
const json = JSON();
const reflect = Reflect();

// good
function area(r) {
    return Math.PI * r * r;
}
const object = JSON.parse("{}");
const value = Reflect.get({ x: 1, y: 2 }, "x");
```

+ 3.10 禁止在对象中使用不必要的计算属性。

```js
// bad
const a = { ['0']: 0 };
const a = { ['0+1,234']: 0 };
const a = { [0]: 0 };
const a = { ['x']: 0 };
const a = { ['x']() {} };

// good
const c = { a: 0 };
const c = { 0: 0 };
const a = { x() {} };
const c = { a: 0 };
const c = { '0+1,234': 0 };
```

+ 3.11 只允许引号标注无效标识符的属性。eslint：[no-useless-computed-key](https://eslint.org/docs/latest/rules/no-useless-computed-key#rule-details)
```js
// bad
const bad = {
  'foo': 3,
  'bar': 4,
  'data-blah': 5,
};

// good
const good = {
  foo: 3,
  bar: 4,
  'data-blah': 5,
};
```

## 数组
+ 4.1 使用字面值创建数组。禁止使用new创建包装实例，如 new String、new Number，这样会变成初始化一个对象，而不是对应的初始类型。eslint: [no-new-wrappers](https://eslint.org/docs/latest/rules/no-new-wrappers#rule-details) [no-array-constructor](https://eslint.org/docs/latest/rules/no-array-constructor#rule-details)
```js
// bad
const items = new Array();

// good
const items = [];
```
+ 4.2 向数组添加元素时使用 Arrary#push 替代直接赋值。
```js

const someStack = [];

// bad
someStack[someStack.length] = 'abracadabra';

// good
someStack.push('abracadabra');
```

+ 4.3 使用数组展开方法`...`来拷贝数组。

```js
// bad
const len = items.length;
const itemsCopy = [];
let i;

for (let i = 0; i < len; i += 1) {
  itemsCopy[i] = items[i];
}
// good
const itemsCopy = [...items];
```
+ 4.4 将一个类数组对象转换成一个数组， 使用展开方法`...`代替Array.from。
```js
const foo = document.querySelectorAll('.foo');

// good
const nodes = Array.from(foo);

// best
const nodes = [...foo];
```

+ 4.5 在数组回调方法中使用 `return` 语句。 如果函数体由一个返回无副作用的表达式的单个语句组成，那么可以省略返回值, 具体查看8.3
```js
// bad - 没有返回值，意味着在第一次迭代后 `acc` 没有被定义
[[0, 1], [2, 3], [4, 5]].reduce((acc, item, index) => {
  const flatten = acc.concat(item);
  acc[index] = flatten;
});

// bad
inbox.filter( msg => {
  const { subject, author } = msg;
  if (subject === 'Mockingbird') {
    return author === 'Harper Lee';
  } else {
    return false;
  }
});

// good
inbox.filter( msg => {
  const { subject, author } = msg;
  if (subject === 'Mockingbird') {
    return author === 'Harper Lee';
  }

  return false;
});

// good
[1, 2, 3].map(x => x + 1);
```
## 解构
+ 5.1 在访问和使用对象的多个属性的时候使用对象的解构。eslint: [prefer-destructuring](https://eslint.org/docs/latest/rules/prefer-destructuring#rule-details)
::: tip
为什么？解构可以避免为这些属性创建临时引用。
:::
```js
// bad
function getFullName(user) {
  const firstName = user.firstName;
  const lastName = user.lastName;

  return `${firstName} ${lastName}`;
}

// good
function getFullName(obj) {
  const { firstName, lastName } = obj;
  return `${firstName} ${lastName}`;
}

// best
function getFullName({ firstName, lastName }) {
  return `${firstName} ${lastName}`;
}
```
+ 5.2 对数组使用解构赋值。 eslint: [prefer-destructuring](https://eslint.org/docs/latest/rules/prefer-destructuring#rule-details)
```js
const arr = [1, 2, 3, 4];

// bad
const first = arr[0];
const second = arr[1];

// good
const [first, second] = arr; // first = 1  second = 2
const [, first, second] = arr;
```
+ 5.3 对于多个返回值使用对象解构，而不是数组解构。
::: tip
为什么？你可以随时添加新的属性或者改变属性的顺序，而不用修改调用方。
:::
```js
// bad
function processInput(input) {
  // then a miracle occurs
  return [left, right, top, bottom];
}

// 调用时需要考虑回调数据的顺序。
const [left, __, top] = processInput(input);

// good
function processInput(input) {
  // then a miracle occurs
  return { left, right, top, bottom };
}

// 调用时只选择需要的数据
const { left, right } = processInput(input);
```
## 字符串
+ 6.1 静态字符串一律使用单引号 '' 。（如果不是引号嵌套，不要使用双引号）eslint: [quotes](https://eslint.org/docs/latest/rules/quotes#rule-details)
```js
// bad
const name = "Capt. Janeway";

// bad - 模板文字应该包含插值或换行。
const name = `Capt. Janeway`;

// good
const name = 'Capt. Janeway';
```
+ 6.2 使行超过100个字符的字符串不应使用字符串连接跨多行写入。

注：过度使用字串连接符号可能会对性能造成影响。
```js
// bad
const errorMessage = 'This is a super long error that was thrown because \
of Batman. When you stop to think about how Batman had anything to do \
with this, you would get nowhere \
fast.';

// good
const errorMessage = 'This is a super long error that was thrown because ' +
  'of Batman. When you stop to think about how Batman had anything to do ' +
  'with this, you would get nowhere fast.';

// good
const errorMessage = 'This is a super long error that was thrown because of Batman. When you stop to think about how Batman had anything to do with this, you would get nowhere fast.';
```
+ 6.3 建议使用模板。eslint: [prefer-template](https://eslint.org/docs/latest/rules/prefer-template#rule-details)

::: tip
为什么？字符串模板为您提供了一种可读的、简洁的语法，具有正确的换行和字符串插值特性。
:::

```js
// bad
function sayHi(name) {
  return 'How are you, ' + name + '?';
}

// bad
function sayHi(name) {
  return ['How are you, ', name, '?'].join();
}

// good
function sayHi(name) {
  return `How are you, ${name}?`;
}
```
+ 6.4 模板字符串中的嵌入表达式两端不要存在空格。eslint: [prefer-template](https://eslint.org/docs/latest/rules/prefer-template#rule-details)
```js
// bad
`hello, ${ name}!`;
`hello, ${name }!`;
`hello, ${ name }!`;

// good
`hello, ${name}!`;
`hello, ${
    name
}!`;
```
+ 6.5 不要在转义字符串中不必要的字符: [no-useless-escape](https://eslint.org/docs/latest/rules/no-useless-escape#rule-details)
::: tip
为什么？反斜杠损害了可读性，因此只有在必要的时候才会出现。
:::
```js

// bad
const foo = '\'this\' \i\s \"quoted\"';

// good
const foo = '\'this\' is "quoted"';
const foo = `my name is '${name}'`;
```
## 函数
+ 7.1 使用函数声明代替函数表达式。
::: tip
为什么？因为函数声明是可命名的，所以他们在调用栈中更容易被识别。此外，函数声明会把整个函数提升（hoisted），而函数表达式只会把函数的引用变量名提升。这条规则使得箭头函数可以取代函数表达式。
:::
```js
// bad
const foo = function () {
};

// good
const short = function test() {
  // ...
};
const foo = () => {};

// best
function foo() {
}
```
+ 7.2 函数表达式:
```js
// 立即调用的函数表达式 (IIFE)
(() => {
  console.log('Welcome to the Internet. Please follow me.');
})();
```
+ 7.3 永远不要在一个非函数代码块（if、while 等）中声明一个函数，把那个函数赋给一个变量。浏览器允许你这么做，但它们的解析表现不一致。eslint: [no-inner-declarations](https://eslint.org/docs/latest/rules/no-useless-escape#rule-details)

+ 7.4 注意: ECMA-262 把 `block` 定义为一组语句。函数声明不是语句。阅读 [ECMA-262](http://www.ecma-international.org/publications/files/ECMA-ST/Ecma-262.pdf#page=97) 关于这个问题的说明。
```js
// bad
if (currentUser) {
  function test() {
    console.log('Nope.');
  }
}

// good
let test;
if (currentUser) {
  test = () => {
    console.log('Yup.');
  };
}
```
+ 7.5 永远不要把参数命名为 arguments。这将取代原来函数作用域内的 arguments 对象。eslint: [no-shadow-restricted-names](https://eslint.org/docs/latest/rules/no-shadow-restricted-names#rule-details)

:::tip
为什么？arguments对象是所有(非箭头)函数中都可用的局部变量，不可当做参数。
:::
```js
// bad
function nope(name, options, arguments) {
  // ...stuff...
}

// good
function yup(name, options, args) {
  // ...stuff...
}
```
+ 7.6 不要使用 arguments。可以选择 rest 语法 ... 替代。eslint: [prefer-rest-params](https://eslint.org/docs/latest/rules/prefer-rest-params#rule-details)
:::tip
为什么？使用 `...` 能明确你要传入的参数。另外 rest 参数是一个真正的数组，而 arguments 是一个类数组。
:::
```js
// bad
function concatenateAll() {
  const args = Array.prototype.slice.call(arguments);
  return args.join('');
}

// good
function concatenateAll(...args) {
  return args.join('');
}
```
+ 7.7 使用默认的参数语法，而不是改变函数参数。eslint: [no-param-reassign](https://eslint.org/docs/latest/rules/no-param-reassign#rule-details)
```js
// really bad
function handleThings(opts) {
  // 不！我们不应该改变函数参数。
  // 更加糟糕: 如果参数 opts 是 false 的话，它就会被设定为一个对象。
  // 但这样的写法会造成一些 Bugs。
  //（译注：例如当 opts 被赋值为空字符串，opts 仍然会被下一行代码设定为一个空对象。）
  opts = opts || {};
  // ...
}

// still bad
function handleThings(opts) {
  if (opts === void 0) {
    opts = {};
  }
  // ...
}

// good
function handleThings(opts = {}) {
  // ...
}
```
+ 7.8 直接给函数参数赋值时需要避免副作用。
::: tip
为什么？因为这样的写法很容易混淆。
:::
```js
var b = 1;
// bad
function count(a = b++) {
  console.log(a);
}
count();  // 1
count();  // 2
count(3); // 3
count();  // 3
```
+ 7.9 在函数中有分支时，保证所有的return 语句必须指定返回值。 eslint: [consistent-return no-useless-return](https://eslint.org/docs/latest/rules/no-useless-return#rule-details)
```js
// bad
function doSomething(condition) {
  if (condition) {
    return true;
  }
  return;
}

function doSomething(condition) {
  if (condition) {
    return true;
  }
}

// good
function doSomething(condition) {
  if (condition) {
    return true;
  }
  return false;
}

function Foo() {
  if (!(this instanceof Foo)) {
    return new Foo();
  }

  this.a = 0;
}
```
+ 7.10 数组方法的回调函数中要有 `return` 语句。以下方法的回调函数必须最终有return语句。 eslint: [array-callback-return](https://eslint.org/docs/latest/rules/array-callback-return#rule-details)
```js
Array.from
Array.prototype.every
Array.prototype.filter
Array.prototype.find
Array.prototype.findIndex
Array.prototype.map
Array.prototype.reduce
Array.prototype.reduceRight
Array.prototype.some
Array.prototype.sort
// bad
const indexMap = myArray.reduce(function(memo, item, index) {
  memo[item] = index;
}, {});

const foo = Array.from(nodes, function(node) {
  if (node.tagName === "DIV") {
    return true;
  }
});

const bar = foo.filter(function(x) {
  if (x) {
    return true;
  }
  return;
});

// good
const indexMap = myArray.reduce((memo, item, index) => {
  memo[item] = index;
  return memo;
}, {});

const foo = Array.from(nodes, node => {
  if (node.tagName === 'DIV') {
    return true;
  }
  return false;
});
const bar = foo.map(node => node.getAttribute('id'));
```
+ 7.11 调用无参构造函数时必须带括号。eslint：[new-parens](https://eslint.org/docs/latest/rules/new-parens#rule-details)
```js
// bad
const person = new Person;
const person = new (Person);

// good
const person = new Person();
const person = new (Person)();
```
+ 7.12 函数签名中的间距。eslint：[space-before-function-paren](https://eslint.org/docs/latest/rules/space-before-function-paren#rule-details) [space-before-blocks](https://eslint.org/docs/latest/rules/space-before-blocks#rule-details)
::: tip
为什么？因为一致性很好，在删除或添加名称时不需要添加或删除空格。
:::
```js
// bad
const f = function(){};
const g = function (){};
const h = function() {};

// good
const x = function () {};
const y = function a() {};
```
+ 7.13 不要变异参数和再分配参数。eslint：[no-param-reassign](https://eslint.org/docs/latest/rules/no-param-reassign#rule-details)
::: tip
为什么？将传入的对象作为参数进行操作可能会在原始调用程序中造成不必要的变量副作用。重新分配参数会导致意外的行为。
:::
```js
// bad
function f1(obj) {
  obj.key = 1;
}

// bad
function f1(a) {
  a = 1;
  // ...
}

// bad
function f2(a) {
  if (!a) { a = 1; }
  // ...
}

// good
function f3(a) {
  const b = a || 1;
  // ...
}

// good
function f4(a = 1) {
  // ...
}
```
+ 7.14 `Generator` 函数是 ES6 提供的一种异步编程解决方案.

为什么需要`Generator`？为了解决javascript异步回调层层嵌套的问题，`Generator` 函数提供了异步编程解决方案。他有以下几个特征：

`function`关键字后面会带一个`*`号;函数体内部会使用`yield`表达式
`Generator`函数是分段执行的，`yield`表达式是暂停执行的标记，而`next`方法可以恢复执行
```js
function* helloWorldGenerator() {
  yield 'hello';
  yield 'world';
  return 'ending';
}
const hw = helloWorldGenerator();

hw.next();
// { value: 'hello', done: false }

hw.next();
// { value: 'world', done: false }

hw.next();
// { value: 'ending', done: true }

hw.next();
// { value: undefined, done: true }
```
+ 7.15 `Generator` 函数内一定要有`yield`。eslint：[require-yield](https://eslint.org/docs/latest/rules/require-yield#rule-details)
```js
// bad
function* foo() {
  return 10;
}

// good
function* foo() {
  yield 5;
  return 10;
}
```
## 箭头函数
+ 8.1 当你必须使用函数表达式（或传递一个匿名函数）时，使用箭头函数符号。
::: tip
为什么？因为箭头函数创造了新的一个 this 执行环境（译注：参考 [Arrow functions - JavaScript | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions) 和 [ES6 arrow functions, syntax and lexical scoping](http://toddmotto.com/es6-arrow-functions-syntaxes-and-lexical-scoping/)），通常情况下都能满足你的需求，而且这样的写法更为简洁。
:::

```js
// bad
[1, 2, 3].map(function (x) {
  const y = x + 1;
  return x * y;
});

// good
[1, 2, 3].map(x => {
  const y = x + 1;
  return x * y;
});

// best
[1, 2, 3].map(x => x * (x + 1));
```
+ 8.2 要求使用箭头函数作为回调。eslint：[prefer-arrow-callback](https://eslint.org/docs/latest/rules/prefer-arrow-callback#rule-details)
::: tip
为什么？箭头函数自动绑定到其周围作用域/上下文，可以替代显式绑定函数表达式
:::
```js
// good
[1, 2, 3].reduce((total, n) => {
  return total + n;
}, 0);
```
+ 8.3 如果一个函数适合用一行写出并且只有一个参数，那就把花括号、圆括号和 `return` 都省略掉。如果不是，那就不要省略。eslint：[arrow-parens](https://eslint.org/docs/latest/rules/arrow-parens#rule-details)。eslint：[arrow-body-style](https://eslint.org/docs/latest/rules/arrow-body-style#rule-details)
::: tip
为什么？语法糖。多个函数被链接在一起时，提高可读性。
:::
::: tip
什么时候不？当你打算回传一个对象的时候。
:::
```js
// good
[1, 2, 3].map(x => x * x);

// good
[1, 2, 3].reduce((total, n) => total + n, 0);

// good
[1, 2, 3].map(x => (
  {
    x: x + 1,
  }
));
```
## 构造函数
+ 9.1 总是使用 `class`。避免直接操作 `prototype` 。
::: tip
为什么? 因为 `class` 语法更为简洁更易读。ES6的类class只是一个语法糖，完全可以看作构造函数的另一种写法。新的class写法只是让对象原型的写法更加清晰、更像面向对象编程的语法而已。
:::
```js
// bad
function Queue(contents = []) {
  this._queue = [...contents];
}
Queue.prototype.pop = function() {
  const value = this._queue[0];
  this._queue.splice(0, 1);
  return value;
}

// good
class Queue {
  constructor(contents = []) {
    this._queue = [...contents];
  }

  pop() {
    const value = this._queue[0];
    this._queue.splice(0, 1);
    return value;
  }
}
```
+ 9.2 使用 `extends` 继承。
::: tip
为什么？因为 `extends` 是一个内建的原型继承方法并且可以在不破坏 `instanceof` 的情况下继承原型功能。这比ES5的通过修改原型链实现继承，要清晰和方便很多
:::
```js
// bad
const inherits = require('inherits');
function PeekableQueue(contents) {
  Queue.apply(this, contents);
}
inherits(PeekableQueue, Queue);
PeekableQueue.prototype.peek = function() {
  return this._queue[0];
}

// good
class PeekableQueue extends Queue {
  peek() {
    return this._queue[0];
  }
}
```
+ 9.3 方法可以返回 `this` 来供其内部方法调用。
```js
// bad
Jedi.prototype.jump = function() {
  this.jumping = true;
  return true;
};

Jedi.prototype.setHeight = function(height) {
  this.height = height;
};

const luke = new Jedi();
luke.jump(); // => true
luke.setHeight(20); // => undefined

// good
class Jedi {
  jump() {
    this.jumping = true;
    return this;
  }

  setHeight(height) {
    this.height = height;
    return this;
  }
}

const luke = new Jedi();

luke.jump()
  .setHeight(20);
```
+ 9.4 可以写一个自定义的 `toString()` 方法，但要确保它能正常运行并且不会引起副作用。
```js
class Jedi {
  constructor(options = {}) {
    this.name = options.name || 'no name';
  }

  getName() {
    return this.name;
  }

  toString() {
    return `Jedi - ${this.getName()}`;
  }
}
```
+ 9.5 构造函数中禁止在`super()`调用之前使用`this`或`super`。eslint：[no-this-before-super](https://eslint.org/docs/latest/rules/no-this-before-super#rule-details)
```js
// bad
class A extends B {
  constructor() {
    this.foo();
    super();
  }
}

class A extends B {
  constructor() {
    super.foo();
    super();
  }
}

// good
class A {
  constructor() {
    this.a = 0;
  }
}

class A extends B {
  constructor() {
    super();
    this.a = 0;
  }
}
```
+ 9.6 如果没有指定类，则类具有默认的构造器。 一个空的构造器或是一个代表父类的函数是没有必要的。eslint：[no-useless-constructor](https://eslint.org/docs/latest/rules/no-useless-constructor#rule-details)
::: tip
为什么？es6为没有指定构造函数的类提供了默认构造函数。因此，没有必要提供一个空的构造函数或只是简单的调用父类这样的构造函数
:::
```js
// bad
class Jedi {
  constructor() {}

  getName() {
    return this.name;
  }
}

// bad
class Rey extends Jedi {
  constructor(...args) {
    super(...args);
  }
}

// good
class Rey extends Jedi {
  constructor(...args) {
    super(...args);
    this.name = 'Rey';
  }
}
```
+ 9.7 构造函数类成员中不允许出现重复名称。eslint：[no-dupe-class-members](https://eslint.org/docs/latest/rules/no-dupe-class-members#rule-details)
```js
// bad
class Foo {
  bar() {}
  bar() {}
}

// good
class Foo {
  bar() {}
  qux() {}
}

// bad
class Foo {
  bar() {}
  get bar() {}
}

// good
class Foo {
  get bar() {}
  set bar(value) {}
}

// bad
class Foo {
  static bar() {}
  static bar() {}
}

// good
class Foo {
  static bar() {}
  bar() {}
}
```
## 模块
10.1 总是使用模组 `(import/export)` 而不是其他非标准模块系统。
::: tip
为什么？模块就是未来，让我们开始迈向未来吧。
:::
```js
// bad
const AirbnbStyleGuide = require('./AirbnbStyleGuide');
module.exports = AirbnbStyleGuide.es6;

// ok
import AirbnbStyleGuide from './AirbnbStyleGuide';
export default AirbnbStyleGuide.es6;

// best
import { es6 } from './AirbnbStyleGuide';
export default es6;
```
+ 10.2 不要使用通配符导入。
::: tip
为什么？这样能确保你只有一个默认 `export`。
:::
```js
// bad 不报错
import * as AirbnbStyleGuide from './AirbnbStyleGuide';

// good
import AirbnbStyleGuide from './AirbnbStyleGuide';
```
+ 10.3 不要从 `import` 中直接 `export`。
::: tip
为什么？虽然一行代码简洁明了，但让 `import` 和 `export` 各司其职让事情能保持一致。
:::
```js
// bad
// filename es6.js
export { es6 as default } from './airbnbStyleGuide';

// good
// filename es6.js
import { es6 } from './AirbnbStyleGuide';
export default es6;
```
+ 10.4 确保import和export命名匹配。
```js
// ./foo.js
export const foo = "I'm so foo";

// bad
// ./baz.js
import { notFoo } from './foo'

// good
// ./bar.js
import { foo } from './foo'
```
+ 10.5 模块导入顺序优先级注意。并且import优先级一定高于require。模块导入按照以下顺序：
- node模块(fs等)
- 外部模块(lodash等)
- 全局模块
- 父目录模块
- 当前目录模块
```js

// bad
import _ from 'lodash';
import path from 'path'; // `path` import should occur before import of `lodash`

// -----

const _ = require('lodash');
const path = require('path'); // `path` import should occur before import of `lodash`

// -----

const path = require('path');
import foo from './foo'; // `import` statements must be before `require` statement

// good
// filename es6.js
import { es6 } from './AirbnbStyleGuide';
export default es6;

// good
import path from 'path';
import _ from 'lodash';

// -----

const path = require('path');
const _ = require('lodash');

// -----

// Allowed as ̀`babel-register` is not assigned.
require('babel-register');
const path = require('path');

// -----

// Allowed as `import` must be before `require`
import foo from './foo';
const path = require('path');
```
+ 10.6 如果一个模块仅有一个导出，请加上`export default`。同样的，一个模块内只能出现一个默认导出`export default`。
```js
// bad
export const foo = 'foo';

// good
// example1
export const foo = 'foo';
const bar = 'bar';
export default 'bar';

// example2
export const foo = 'foo';
export const bar = 'bar';

// example3
const foo = 'foo';
const bar = 'bar';
export default { foo, bar }

// example4
const foo = 'foo';
export { foo as default }
```
+ 10.7 禁止使用`default`作为导入变量名，因为会与export default冲突发生错误。
```js
// foo.js
export default 'foo';
export const bar = 'baz';

// bad
import { default as foo } from './foo.js';
import { default as foo, bar } from './foo.js';

// good
import foo from './foo.js';
import foo, { bar } from './foo.js';
```
+ 10.8 禁止使用绝对路径导入。
```js
// bad
import f from '/foo';
import f from '/some/path';

const f = require('/foo');
const f = require('/some/path');

// good
import _ from 'lodash';
import foo from 'foo';
import foo from './foo';

const _ = require('lodash');
const foo = require('foo');
const foo = require('./foo');
```
+ 10.9 禁止使用AMD `require/define`。

为什么？因为ES6已经具备模块化，不需要再使用AMD规范了。
```js
// bad
define(["a", "b"], function (a, b) { /* ... */ });

require(["b", "c"], function (b, c) { /* ... */ });
```
+ 10.10 禁止在 import 和 export 和解构赋值时将引用重命名为相同的名字。eslint：[no-useless-rename](https://eslint.org/docs/latest/rules/no-useless-rename#rule-details)
```js
// bad
import { foo as foo } from "bar";

export { foo as foo };
export { foo as foo } from "bar";

let { foo: foo } = bar;
let { 'foo': foo } = bar;
function foo({ bar: bar }) {}
({ foo: foo }) => {}

// good
import * as foo from "foo";
import { foo } from "bar";
import { foo as bar } from "baz";

export { foo };
export { foo as bar };
export { foo as bar } from "foo";

let { foo } = bar;
let { foo: bar } = baz;
let { [foo]: foo } = bar;

function foo({ bar }) {}
function foo({ bar: baz }) {}

({ foo }) => {}
({ foo: bar }) => {}
```
## 迭代器和生成器
+ 11.1 不要使用 `iterators`。使用高阶函数例如 `map()` 和 `reduce()` 替代 `for-of`。

为什么？这加强了我们不变的规则。处理纯函数的回调值更易读，这比它带来的副作用更重要。 使用map()/every()/filter()/find()/findIndex()/reduce()/some()/...遍历数组， 和使用Object.keys()/Object.values()/Object.entries()迭代你的对象生成数组。
```js
const numbers = [1, 2, 3, 4, 5];

// bad
let sum = 0;
for (let num of numbers) {
  sum += num;
}

sum === 15;

// good
let sum = 0;
numbers.forEach((num) => sum += num);
sum === 15;

// best (use the functional force)
const sum = numbers.reduce((total, num) => total + num, 0);
sum === 15;
```
## 属性
+ 12.1 使用 . 来访问对象的属性。eslint：[dot-notation](https://eslint.org/docs/latest/rules/dot-notation#rule-details)
```js
const luke = {
  jedi: true,
  age: 28,
};

// bad
const isJedi = luke['jedi'];

// good
const isJedi = luke.jedi;
```
+ 12.2 当通过变量访问属性时使用中括号 []。
```js
const luke = {
  jedi: true,
  age: 28,
};

function getProp(prop) {
  return luke[prop];
}

const isJedi = getProp('jedi');
```
+ 12.3 规定声明对象的属性时只能一行声明所有的属性或者每行声明一个属性。 eslint: [object-property-newline](https://eslint.org/docs/latest/rules/object-property-newline#rule-details)
```js
// bad
const obj1 = { foo: 'foo', bar: 'bar',
  baz: 'baz',
};

// good
const obj1 = { foo: 'foo', bar: 'bar', baz: 'baz' };
const obj2 = {
  foo: 'foo',
  bar: 'bar',
  baz: 'baz',
};
```
+ 12.4 禁止使用`__proto__`属性，`__proto__`属性已从ECMAScript 3.1开始弃用，不应在代码中使用，改用`getPrototypeOf`方法。 eslint: [no-proto](https://eslint.org/docs/latest/rules/no-proto#rule-details)
```js
// bad
const a = obj.__proto__;
const a = obj['__proto__'];

// good
const a = Object.getPrototypeOf(obj);
```
## 变量
+ 13.1 变量的名称采用小驼峰法则，首字母小写，后续单词的首字母大写。变量的属性名不需要遵循该规则。 eslint: [camelcase](https://eslint.org/docs/latest/rules/camelcase#rule-details)
```js
// bad
const Is_Editable = false;

// good
const isEditable = false;
const obj = {
  my_pref: 1,
  'my-pref': 2,
};
```
+ 13.2 一直使用 `const` 来声明变量，如果不这样做就会产生全局变量。我们需要避免全局命名空间的污染。eslint：[no-undef](https://eslint.org/docs/latest/rules/no-undef#rule-details)
```js
// bad
superPower = new SuperPower();

// good
const superPower = new SuperPower();
```
+ 13.3 使用 const 声明每一个变量。eslint：[prefer-const](https://eslint.org/docs/latest/rules/prefer-const#rule-details) [one-var](https://eslint.org/docs/latest/rules/one-var#rule-details)
::: tip
为什么？这样更容易添加新的变量声明，而且你不必担心是使用 ; 还是使用 , 或引入标点符号的差别。 你可以通过 `debugger` 逐步查看每个声明，而不是立即跳过所有声明。
:::
```js
// bad
const items = getItems(),
    goSportsTeam = true,
    dragonball = 'z';

// bad
// (compare to above, and try to spot the mistake)
const items = getItems(),
    goSportsTeam = true;
    dragonball = 'z';

// good
const items = getItems();
const goSportsTeam = true;
const dragonball = 'z';
```
+ 13.4 将所有的 `const` 和 `let` 分组
::: tip
为什么？这在后边如果需要根据前边的赋值变量指定一个变量时很有用。
:::
```js
// bad
let i, len, dragonball,
    items = getItems(),
    goSportsTeam = true;

// bad
let i;
const items = getItems();
let dragonball;
const goSportsTeam = true;
let len;

// good
const goSportsTeam = true;
const items = getItems();
let dragonball;
let i;
let length;
```
+ 13.5 在你需要的地方给变量赋值，但请把它们放在一个合理的位置。
::: tip
为什么？`let` 和 `const` 是块级作用域而不是函数作用域。
:::
```js
// good
function() {
  test();
  console.log('doing stuff..');

  //..other stuff..

  const name = getName();

  if (name === 'test') {
    return false;
  }

  return name;
}

// bad - unnecessary function call
function(hasName) {
  const name = getName();

  if (!hasName) {
    return false;
  }

  this.setFirstName(name);

  return true;
}

// good
function(hasName) {
  if (!hasName) {
    return false;
  }

  const name = getName();
  this.setFirstName(name);

  return true;
}
```
+ 13.6 禁止重新声明变量。eslint：[no-redeclare](https://eslint.org/docs/latest/rules/no-redeclare#rule-details)
```js
// bad
let a = 3;
let a = 10;

// good
let a = 3;
a = 10;
```
+ 13.7 避免使用不必要的递增和递减 (++, --)。eslint：[no-plusplus](https://eslint.org/docs/latest/rules/no-plusplus#rule-details)
::: tip
为什么？在`eslint`文档中，一元递增和递减语句以自动分号插入为主题，并且在应用程序中可能会导致默认值的递增或递减。你可以使用`num += 1`这样的语句来改变您的值，而不是使用`num++`或`num ++`。不允许不必要的增量和减量语句也会使您无法预先递增/预递减值，这也会导致程序中的意外行为
:::
```js
// bad

const array = [1, 2, 3];
let num = 1;
num++;
--num;

let sum = 0;
let truthyCount = 0;
for (let i = 0; i < array.length; i++) {
  let value = array[i];
  sum += value;
  if (value) {
    truthyCount++;
  }
}

// good

const array = [1, 2, 3];
let num = 1;
num += 1;
num -= 1;

const sum = array.reduce((a, b) => a + b, 0);
const truthyCount = array.filter(Boolean).length;
```
+ 13.8 禁止声明的变量与外层作用域的变量同名。eslint：[no-shadow](https://eslint.org/docs/latest/rules/no-shadow#rule-details)
```js
// bad
const a = 3;
function b() {
    const a = 10;
}

// good
const a = 3;
function b() {
    const c = 10;
}
```
+ 13.9 禁止使用没有定义的变量。禁止在变量定义之前使用它们。 eslint: [no-undef](https://eslint.org/docs/latest/rules/no-undef#rule-details) eslint: [no-use-before-define](https://eslint.org/docs/latest/rules/no-use-before-define#rule-details)
```js
// bad
const a = 5;
b = 10;
f();
function f() {}

// good
let a = 5;
a = 10;
function f() {}
f();
```
+ 13.10 不允许初始化变量值为 undefined。 eslint: [no-undef-init](https://eslint.org/docs/latest/rules/no-undef-init#rule-details)
```js
// bad
let bar = undefined;

// good
let bar;
const baz = undefined; // const声明的常量必须要首先赋值
```
+ 13.11 不允许定义了的变量但是在后面的代码中没有被使用到。 eslint: [no-unused-vars](https://eslint.org/docs/latest/rules/no-unused-vars#rule-details)
```js
// bad
function foo(d) {
  const y = 10;
  const z = 0;
  console.log(z);
}

// good
function foo(d) {
  console.log(d);
}
```
+ 13.12 禁止使用链式赋值的表达式。 eslint: [no-multi-assign](https://eslint.org/docs/latest/rules/no-multi-assign#rule-details)
```js
// bad
const a = b = c = 5;
const foo = bar = 'baz';

// good
const a = 5;
const b = 5;
const c = 5;
const foo = 'baz';
const bar = 'baz';
```
+ 13.13 把变量的使用限制在其定义的作用域范围内。 eslint: [block-scoped-var](https://eslint.org/docs/latest/rules/block-scoped-var#rule-details)
```js
// bad
function doIf() {
  if (true) {
      var build = true;
  }

  console.log(build);
}

function doIfElse() {
    if (true) {
        var build = true;
    } else {
        var build = false;
    }
}

function doTryCatch() {
    try {
        var build = 1;
    } catch (e) {
        var f = build;
    }
}

// good
function doIf() {
let build;

if (true) {
    build = true;
}

console.log(build);
}

function doIfElse() {
    let build;

    if (true) {
        build = true;
    } else {
        build = false;
    }
}

function doTryCatch() {
    let build;
    let f;

    try {
        build = 1;
    } catch (e) {
        f = build;
    }
}
```
+ 13.14 禁止修改类声明的变量。 eslint: [no-class-assign](https://eslint.org/docs/latest/rules/no-class-assign#rule-details)
```js
// bad
let A = class A {
  b() {
    A = 0;
  }
}

// good
class A {
  b(A) {
    A = 0; // A is a parameter.
  }
}
```
## 提升
+ 14.1 `var` 声明会被提升至该作用域的顶部，但它们赋值不会提升。`let` 和 `const` 被赋予了一种称为`「暂时性死区（Temporal Dead Zones, TDZ）」`的概念。这对于了解为什么 type of 不再安全相当重要。
```js
// 我们知道这样运行不了
// （假设 notDefined 不是全局变量）
function example() {
  console.log(notDefined); // => throws a ReferenceError
}

// 由于变量提升的原因，
// 在引用变量后再声明变量是可以运行的。
// 注：变量的赋值 `true` 不会被提升。
function example() {
  console.log(declaredButNotAssigned); // => undefined
  var declaredButNotAssigned = true;
}

// 编译器会把函数声明提升到作用域的顶层，
// 这意味着我们的例子可以改写成这样：
function example() {
  let declaredButNotAssigned;
  console.log(declaredButNotAssigned); // => undefined
  declaredButNotAssigned = true;
}

// 使用 const 和 let
function example() {
  console.log(declaredButNotAssigned); // => throws a ReferenceError
  console.log(typeof declaredButNotAssigned); // => throws a ReferenceError
  const declaredButNotAssigned = true;
}
```
+ 14.2 匿名函数表达式的变量名会被提升，但函数内容并不会。
```js
function example() {
  console.log(anonymous); // => undefined

  anonymous(); // => TypeError anonymous is not a function

  const anonymous = function() {
    console.log('anonymous function expression');
  };
}
```
+ 14.3 命名的函数表达式的变量名会被提升，但函数名和函数内容并不会。
```js
function example() {
  console.log(named); // => undefined

  named(); // => TypeError named is not a function

  superPower(); // => ReferenceError superPower is not defined

  const named = function superPower() {
    console.log('Flying');
  };
}

// the same is true when the function name
// is the same as the variable name.
function example() {
  console.log(named); // => undefined

  named(); // => TypeError named is not a function

  const named = function named() {
    console.log('named');
  }
}
```
+ 14.4 函数声明的名称和函数体都会被提升。
```js
function example() {
  superPower(); // => Flying

  function superPower() {
    console.log('Flying');
  }
}
```
## 比较运算符和等号
+ 15.1 优先使用 === 和 !== 而不是 == 和 !=. eslint：[eqeqeq](https://eslint.org/docs/latest/rules/eqeqeq#rule-details)

+ 15.2 条件表达式例如 `if` 语句通过抽象方法 `ToBoolean` 强制计算它们的表达式并且总是遵守下面的规则：

- **对象** 被计算为 **true**
- **Undefined** 被计算为 **false**
- **Null** 被计算为 **false**
- **布尔值** 被计算为 **布尔的值**
- **数字** 如果是 **+0、-0、或 NaN** 被计算为 **false**, 否则为 **true**
- **字符串** 如果是空字符串 `''` 被计算为 **false**，否则为 **true**
```js
if ([0]) {
  // true
  // An array is an object, objects evaluate to true
}
```
+ 15.3 对于布尔值使用简写，但是对于字符串和数字进行显式比较。
```js
// bad
if (isValid === true) {
  // ...
}

// good
if (isValid) {
  // ...
}

// bad
if (name) {
  // ...
}

// good
if (name !== '') {
  // ...
}

// bad
if (collection.length) {
  // ...
}

// good
if (collection.length > 0) {
  // ...
}
```
+ 15.4 对于绝大多数的使用情况下，结果typeof操作是下列字符串常量之一：`"undefined"`，`"object"`，`"boolean"`，`"number"`，`"string"`，`"function"`和`"symbol"`。将typeof运算符的结果与其他字符串文字进行比较通常是代码编写出现错误。 eslint: [valid-typeof](https://eslint.org/docs/latest/rules/valid-typeof#rule-details)
```js
//bad
typeof foo === undefined;
typeof bar == Object;
typeof baz === 'strnig';
typeof qux === 'some invalid type';
typeof baz === anotherVariable;
typeof foo == 5;

//good
typeof foo === 'undefined';
typeof bar == 'object';
typeof baz === 'string';
typeof bar === typeof qux;
```
+ 15.5 禁止出现与本身作比较的语句。 eslint: [no-self-compare](https://eslint.org/docs/latest/rules/no-self-compare#rule-details)
```js
//bad
let x = 10;
if (x === x) {
    x = 20;
}

//good
let x = 10;
const y = 10;
if (x === y) {
    x = 20;
}
```
+ 15.6 禁止条件表达式中出现赋值操作符。eslint: [no-cond-assign](https://eslint.org/docs/latest/rules/no-cond-assign#rule-details)
```js
// bad
let x;
if (x = 0) {
    const b = 1;
}

// Practical example that is similar to an error
function setHeight(someNode) {
    "use strict";
    do {
        someNode.height = "100px";
    } while (someNode = someNode.parentNode);
}

// good
const x;
if (x === 0) {
    const b = 1;
}
```
+ 15.7 禁止对关系运算符的左操作数使用否定运算符。 eslint: [no-unsafe-negation](https://eslint.org/docs/latest/rules/no-unsafe-negation#rule-details)
```js
// bad
if (!key in object) {
    // operator precedence makes it equivalent to (!key) in object
    // and type conversion makes it equivalent to (key ? "false" : "true") in object
}
if (!obj instanceof Ctor) {
    // operator precedence makes it equivalent to (!obj) instanceof Ctor
    // and it equivalent to always false since boolean values are not objects.
}

// good
if (!(key in object)) {
    // key is not in object
}
if (!(obj instanceof Ctor)) {
    // obj is not an instance of Ctor
}
if(('' + !key) in object) {
    // make operator precedence and type conversion explicit
    // in a rare situation when that is the intended meaning
}
```
+ 15.8 建议使用扩展运算符而非.apply()。 eslint: [prefer-spread](https://eslint.org/docs/latest/rules/prefer-spread#rule-details)
```js
// bad
foo.apply(undefined, args);
foo.apply(null, args);
obj.foo.apply(obj, args);

// good
foo(...args);
obj.foo(...args);
```
+ 15.9 三目表达式不应该嵌套，通常是单行表达式。 eslint: [no-nested-ternary](https://eslint.org/docs/latest/rules/no-nested-ternary#rule-details)
```js
// bad
const foo = maybe1 > maybe2
  ? "bar"
  : value1 > value2 ? "baz" : null;

// good
// 分离为两个三目表达式
const maybeNull = value1 > value2 ? 'baz' : null;
const foo = maybe1 > maybe2
  ? 'bar'
  : maybeNull;

// best
const foo = maybe1 > maybe2 ? 'bar' : maybeNull;
```
## 代码块
+ 16.1 使用大括号包裹所有的多行代码块。eslint：[curly](https://eslint.org/docs/latest/rules/curly#rule-details)
```js
// bad
if (test)
  return false;

// good
if (test) return false;

// good
if (test) {
  return false;
}

// bad
function example() { return false; }

// good
function example() {
  return false;
}
```
+ 16.2 如果通过 `if` 和 `else` 使用多行代码块，把 `else` 放在 `if` 代码块关闭括号的同一行。eslint：[brace-style](https://eslint.org/docs/latest/rules/brace-style#rule-details)
```js
// bad
if (test) {
  thing1();
  thing2();
}
else {
  thing3();
}

// good
if (test) {
  thing1();
  thing2();
} else {
  thing3();
}
```
## 注释
+ 17.1 使用` /** ... */` 作为多行注释。包含描述、指定所有参数和返回值的类型和值。并且多行注释与上一个代码块之间要空一行。
```js
// bad
// make() returns a new element
// based on the passed in tag name
//
// @param {String} tag
// @return {Element} element
function make(tag) {

  // ...stuff...

  return element;
}

// good
/**
 * make() returns a new element
 * based on the passed in tag name
 *
 * @param {String} tag
 * @return {Element} element
 */
function make(tag) {

  // ...stuff...

  return element;
}
```
+ 17.2 使用 // 作为单行注释。在评论对象上面另起一行使用单行注释。在注释前插入空行。eslint: [lines-around-comment](https://eslint.org/docs/latest/rules/lines-around-comment#rule-details)
```js
// bad 不报错，但不推荐这么使用
const active = true;  // is current tab

// good
// is current tab
const active = true;

// bad
function getType() {
  console.log('fetching type...');
  // set the default type to 'no type'
  const type = this._type || 'no type';

  return type;
}

// good
function getType() {
  console.log('fetching type...');

  // set the default type to 'no type'
  const type = this._type || 'no type';

  return type;
}
```
+ 17.3 给注释增加 `FIXME` 或 `TODO` 的前缀可以帮助其他开发者快速了解这是一个需要复查的问题，或是给需要实现的功能提供一个解决方式。这将有别于常见的注释，因为它们是可操作的。使用 `FIXME -- need to figure this out` 或者 `TODO -- need to implement`。eslint: [no-warning-comments](https://eslint.org/docs/latest/rules/no-warning-comments#rule-details)

+ 17.4 使用 // FIXME: 标注问题。
```js
class Calculator {
  constructor() {
    // FIXME: shouldn't use a global here
    total = 0;
  }
}
```
17.5 使用 // TODO: 标注问题的解决方式。
```js
class Calculator {
  constructor() {
    // TODO: total should be configurable by an options param
    this.total = 0;
  }
}
```
## 空白
+ 18.1 使用 2 个空格作为缩进。
```js
// bad
function() {
∙∙∙∙const name;
}

// bad
function() {
∙const name;
}

// good
function() {
∙∙const name;
}
```
+ 18.2 在逗号后面需要有一个空格，提高列表项的可读性。eslint: [comma-spacing](https://eslint.org/docs/latest/rules/space-before-blocks#rule-details)
```js
// bad
const arr = [1 , 2];
const obj = { foo: 'bar' ,baz: 'qur' };
foo(a ,b);
new Foo(a ,b);
function foo(a ,b){}

// good
const arr = [1, 2];
const obj = { foo: 'bar', baz: 'qur' };
foo(a, b);
new Foo(a, b);
function foo(a, b){}
```
+ 18.3 在花括号前放一个空格。eslint：[space-before-blocks](https://eslint.org/docs/latest/rules/space-before-blocks#rule-details)
```js
// bad
function test(){
  console.log('test');
}

// good
function test() {
  console.log('test');
}

// bad
dog.set('attr',{
  age: '1 year',
  breed: 'Bernese Mountain Dog',
});

// good
dog.set('attr', {
  age: '1 year',
  breed: 'Bernese Mountain Dog',
});
```
+ 18.4 单行对象代码块中，块中代码行前后需要加空格。数组不需要。 eslint: [object-curly-spacing](https://eslint.org/docs/latest/rules/object-curly-spacing#rule-details)
```js
// bad
const obj = {foo: 'bar'};
const test = {foo: 'bar' };
const item = { baz: {foo: 'qux'}};

// good
const obj = {};
const test = { foo: 'bar' };
const item = { foo: { bar: 'baz' }, qux: 'quxx' };
```
+ 18.5 在函数表达式、匿名函数和箭头函数的左括号之前放一个空格。而函数声明的`function`的左括号之前不需要空格。eslint：[space-before-function-paren](https://eslint.org/docs/latest/rules/space-before-function-paren#rule-details)
```js
// bad
function foo () {
  // ...
}
const bar = function() {
  // ...
};
class Foo {
  constructor () {
    // ...
  }
}
const foo = {
  bar () {
    // ...
  }
};
const foo = async(a) => await a

// good
function foo() {
  // ...
}
const bar = function () {
  // ...
};
class Foo {
  constructor() {
    // ...
  }
}
const foo = {
  bar() {
    // ...
  }
};
const foo = async (a) => await a
```
+ 18.6 箭头函数箭头前后都必须要有空格。eslint：[arrow-spacing](https://eslint.org/docs/latest/rules/arrow-spacing#rule-details)
```js
// bad
()=> {};
() =>{};
(a)=> {};
(a) =>{};
a =>a;
a=> a;
()=> {'\n'};
() =>{'\n'};

// good
() => {};
(a) => {};
a => a;
() => {'\n'};
```
+ 18.7 在控制语句（if、while 等）的小括号前放一个空格。在函数调用及声明中，不在函数的参数列表前加空格。eslint：[keyword-spacing](https://eslint.org/docs/latest/rules/keyword-spacing#rule-details)

一些关键字yield,typeof等后面需要一个空格
```js
// bad
if(isJedi) {
  fight ();
}

// good
if (isJedi) {
  fight();
}

// bad
function fight () {
  console.log ('Swooosh!');
}

// good
function fight() {
  console.log('Swooosh!');
}
```
+ 18.8 在对象的属性中，要求键名与冒号之间没有空格，冒号与值之间有一个空格。 eslint：[key-spacing](https://eslint.org/docs/latest/rules/key-spacing#rule-details)
```js
// bad
const obj = { 'foo':42 };

//good
const obj = { 'foo': 42 };
```
+ 18.9 使用空格把运算符隔开。eslint：[space-infix-ops](https://eslint.org/docs/latest/rules/space-infix-ops#rule-details)
```js
// bad
const x=y+5;

// good
const x = y + 5;
```
+ 18.10 一元字母操作符前后需要加空格，如：`new`，`delete`，`typeof`，`void`，`yield`。一元运算符如`-`，`+`，`--`，`++`，`!`，`!!`前后不用加空格。 eslint：[space-unary-ops](https://eslint.org/docs/latest/rules/space-unary-ops#rule-details)
```js
// bad
typeof!foo;
void{foo:0};
new[foo][0];
delete(foo.bar);
++ foo;
foo --;
- foo;
+ '3';

//good
delete foo.bar;
new Foo;
void 0;
++foo;
foo--;
-foo;
+'3';
```
+ 18.11 代码注释符号后面要加一个空格。 eslint: [spaced-comment](https://eslint.org/docs/latest/rules/spaced-comment#rule-details)
```js
// bad
//This is a comment with no whitespace at the beginning

/*This is a comment with no whitespace at the beginning */

// good
// This is a comment with a whitespace at the beginning

/* This is a comment with a whitespace at the beginning */
```
+ 18.12 禁止剩余和扩展运算符及其表达式之间有空格。 eslint: [rest-spread-spacing](https://eslint.org/docs/latest/rules/rest-spread-spacing#rule-details)
```js
// bad
fn(... args)
[... arr, 4, 5, 6]
let [a, b, ... arr] = [1, 2, 3, 4, 5];
function fn(... args) { console.log(args); }
let { x, y, ... z } = { x: 1, y: 2, a: 3, b: 4 };
let n = { x, y, ... z };

// good
fn(...args)
[...arr, 4, 5, 6]
let [a, b, ...arr] = [1, 2, 3, 4, 5];
function fn(...args) { console.log(args); }
let { x, y, ...z } = { x: 1, y: 2, a: 3, b: 4 };
let n = { x, y, ...z };
```
+ 18.13 避免在正则表达式中使用多个空格。 eslint：[no-regex-spaces](https://eslint.org/docs/latest/rules/no-regex-spaces#rule-details)
```js
  // bad
  const re = /foo   bar/;
  const re = new RegExp('foo   bar');

  //good
  const re = /foo {3}bar/;
  const re = new RegExp('foo {3}bar');
```
+ 18.14 避免在逻辑表达式、条件表达式、声明语句、数组元素、对象属性、序列、函数参数中使用多个空格，除了连续使用多个空格用于缩进以外，其他情况下连续使用多个空格通常是错误的。 eslint：[no-multi-spaces](https://eslint.org/docs/latest/rules/array-bracket-spacing#rule-details)
```js
// bad
const a =  1;
if(foo   === 'bar') {}
a <<  b;
const arr = [1,  2];
a ?  b: c;

// good
const a = 1;
if(foo === 'bar') {}
a << b
const arr = [1, 2];
a ? b : c
```
+ 18.15 禁止在数组的左右方括号之间有空格。 eslint：[array-bracket-spacing](https://eslint.org/docs/latest/rules/array-bracket-spacing#rule-details)
```js
// bad
const arr = [ 'foo', 'bar' ];
const arr = ['foo', 'bar' ];
const arr = [ ['foo'], 'bar'];
const arr = [[ 'foo' ], 'bar'];
const arr = [ 'foo',
  'bar',
];

// good
const arr = [];
const arr = ['foo', 'bar', 'baz'];
const arr = [['foo'], 'bar', 'baz'];
const arr = [
  'foo',
  'bar',
  'baz',
];
const arr = ['foo',
  'bar',
];
```
+ 18.16 分号前面不应该有空格，分号后面有空格。 eslint: [semi-spacing](https://eslint.org/docs/latest/rules/semi-spacing#rule-details)
```js
// bad
const foo ;
throw new Error("error") ;
while (a) { break ; }
for (i = 0 ; i < 10 ; i += 1) {}
for (i = 0;i < 10;i += 1) {}

// good
const foo;
throw new Error("error");
while (a) { break; }
for (i = 0; i < 10; i += 1) {}
```
+ 18.17 计算属性的[]内不允许使用空格。 eslint: [computed-property-spacing](https://eslint.org/docs/latest/rules/computed-property-spacing#rule-details)
```js
// bad
obj[foo ];
obj[ 'foo'];
obj[foo[ bar ]];

// good
obj[foo];
obj['foo'];
obj[foo[bar]];
```
+ 18.18 禁止行末尾有空格。 eslint: [no-trailing-spaces](https://eslint.org/docs/latest/rules/no-trailing-spaces#rule-details)
```js
// bad
const foo = 0;∙∙∙∙
const baz = 5;∙
∙∙∙∙

// good
const foo = 0;
const baz = 5;
```
+ 18.19 禁止左右圆括号()与它内部的元素之间有空格。 eslint: [space-in-parens](https://eslint.org/docs/latest/rules/space-in-parens#rule-details)
```js
// bad
foo( 'bar');
foo('bar' );
foo( 'bar' );
const foo = ( 1 + 2 ) * 3;
( function () { return 'bar'; }() );

// good
foo();
foo('bar');
const foo = (1 + 2) * 3;
(function () { return 'bar'; }());
```
+ 18.20 禁止在函数标识符和其调用之间有空格。 eslint: [func-call-spacing](https://eslint.org/docs/latest/rules/func-call-spacing#rule-details)
```js
// bad
fn ();
fn
();

// good
fn();
```
+ 18.21 如果对象的属性位于同一行，不允许在点周围或开始括号之前的空格。当对象和属性位于不同的行时，则允许使用空格，因为通常将新行添加到较长的属性链。 eslint: [no-whitespace-before-property](https://eslint.org/docs/latest/rules/no-whitespace-before-property#rule-details)
```js
// bad
foo [bar];
foo. bar;
foo .bar;
foo. bar. baz;

// good
foo.bar;
foo[bar];
foo.bar.baz;
foo
.bar()
.baz();
```
+ 18.22 禁止使用tab键。eslint: [no-tabs](https://eslint.org/docs/latest/rules/no-tabs#rule-details)

+ 18.23 在使用长方法链时进行缩进。使用前面的点 `.` 强调这是方法调用而不是新语句。.号调用对象属性时，应保持`.`号与属性在同一行。eslint：[dot-location](https://eslint.org/docs/latest/rules/dot-location#rule-details)

- 单行链式调用， 应保持`.`号与属性在同一行
- 最多只允许4个在同一行；多行链式调用，应保持`.`号与属性在同一行
```js
// bad
const foo = object.
        property;

// good
const foo = object
        .property;
const bar = object.property;

// bad
$('#items').find('.selected').highlight().end().find('.open').updateCount();

// bad
$('#items').
    find('.selected').
    highlight().
    end().
    find('.open').
    updateCount();

    // good
$('#items')
    .find('.selected')
    .highlight()
    .end()
    .find('.open')
    .updateCount();

// bad
const leds = stage.selectAll('.led').data(data).enter().append('svg:svg').class('led', true)
    .attr('width', (radius + margin) * 2).append('svg:g')
    .attr('transform', 'translate(' + (radius + margin) + ',' + (radius + margin) + ')')
    .call(tron.led);

// good
const leds = stage.selectAll('.led')
    .data(data)
    .enter().append('svg:svg')
    .classed('led', true)
    .attr('width', (radius + margin) * 2)
    .append('svg:g')
    .attr('transform', 'translate(' + (radius + margin) + ',' + (radius + margin) + ')')
    .call(tron.led);
```
+ 18.24 类成员之间需要有空行。eslint：[lines-between-class-members](https://eslint.org/docs/latest/rules/lines-between-class-members#rule-details)
```js
// bad
class MyClass {
  foo() {
    //...
  }
  bar() {
    //...
  }
}

// good
class MyClass {
  foo() {
    //...
  }

  bar() {
    //...
  }
}
```
+ 18.25 在块末和新语句前插入空行。eslint：[space-before-blocks](https://eslint.org/docs/latest/rules/space-before-blocks#rule-details)
```js
// bad
if (foo) {
  return bar;
}
return baz;

// good
if (foo) {
  return bar;
}

return baz;

// bad
const obj = {
  foo() {
  },
  bar() {
  },
};
return obj;

// good
const obj = {
  foo() {
  },

  bar() {
  },
};

return obj;
```
+ 18.26 代码中最多连续使用两行空行。 eslint: [no-multiple-empty-lines](https://eslint.org/docs/latest/rules/no-multiple-empty-lines#rule-details)
```js
// bad 三行空行
const foo = 5;
∙∙∙∙
∙∙∙∙
∙∙∙∙
const bar = 3;

// good 一行空行 或两行空行
const foo = 5;
∙∙∙∙
const bar = 3;
```
+ 18.27 在文件末尾插入一个空行。eslint：[eol-last](https://eslint.org/docs/latest/rules/eol-last#rule-details)
```js
// bad
(function(global) {
  // ...stuff...
})(this);
// bad
(function(global) {
  // ...stuff...
})(this);↵
↵
// good
(function(global) {
  // ...stuff...
})(this);↵
```
+ 18.28 在最后一组import和require后要插入一个空行。
```js
// bad
import * as foo from 'foo';
const FOO = 'BAR';
import * as foo from 'foo';
const FOO = 'BAR';

import { bar }  from 'bar-lib';
const FOO = require('./foo');
const BAZ = 1;
const BAR = require('./bar');

// good
import defaultExport from './foo';

const FOO = 'BAR';
import defaultExport from './foo';
import { bar }  from 'bar-lib';

const FOO = 'BAR';
const FOO = require('./foo');
const BAR = require('./bar');

const BAZ = 1;
```
## 逗号
+ 19.1 行首逗号：不需要。eslint：[comma-style](https://eslint.org/docs/latest/rules/comma-style#rule-details)
```js
// bad
const story = [
    once
  , upon
  , aTime
];

// good
const story = [
  once,
  upon,
  aTime,
];

// bad
const hero = {
    firstName: 'Ada'
  , lastName: 'Lovelace'
  , birthYear: 1815
  , superPower: 'computers'
};

// good
const hero = {
  firstName: 'Ada',
  lastName: 'Lovelace',
  birthYear: 1815,
  superPower: 'computers',
};
```
+ 19.2 增加结尾的逗号: 需要。eslint：[comma-dangle](https://eslint.org/docs/latest/rules/comma-dangle#rule-details)

为什么? 这会让 `git diffs` 更干净。另外，像 `babel` 这样的转译器会移除结尾多余的逗号，也就是说你不必担心老旧浏览器的尾逗号问题
```js
// bad - git diff without trailing comma
const hero = {
     firstName: 'Florence',
     lastName: 'Nightingale'
     lastName: 'Nightingale',
     inventorOf: ['coxcomb graph', 'modern nursing']
}

// good - git diff with trailing comma
const hero = {
     firstName: 'Florence',
     lastName: 'Nightingale',
     inventorOf: ['coxcomb chart', 'modern nursing'],
}

// bad
const hero = {
  firstName: 'Dana',
  lastName: 'Scully'
};

const heroes = [
  'Batman',
  'Superman'
];

// good
const hero = {
  firstName: 'Dana',
  lastName: 'Scully',
};

const heroes = [
  'Batman',
  'Superman',
];
```
+ 19.3 避免使用逗号操作符,在for语句的初始化或更新部分或如果表达式序列明确地包含在括号中时可以使用逗号运算符。 eslint: [no-sequences](https://eslint.org/docs/latest/rules/no-sequences#rule-details)
```js
// bad
var testA = 5;
var testB = 0;
testA = testB += 5, testA + testB;
while (testA = next(), testA && testA.length) {}

// good
foo = (doSomething(), val);
(0, eval)("doSomething();");
do {} while ((doSomething(), !!test));
for (i = 0, j = 10; i < j; i++, j--) {}
```
+ 19.4 禁止使用多个逗号来声明一个空数组。 eslint: [no-sparse-arrays](https://eslint.org/docs/latest/rules/semi#rule-details)
```js
// bad
const items = [,];
const colors = ['red',, 'blue'];

// good
const items = [];
const colors = ['red', 'blue'];
```
## 分号
+ 20.1 使用分号 不允许省略。eslint: [semi](https://eslint.org/docs/latest/rules/semi#rule-details) eslint: [no-unexpected-multiline](https://eslint.org/docs/latest/rules/no-unexpected-multiline#rule-details)
```js
// bad
(function() {
  const name = 'Skywalker'
  return name
})()

// good
(() => {
  const name = 'Skywalker';
  return name;
})();

// good (防止函数在两个 IIFE 合并时被当成一个参数)
;(() => {
  const name = 'Skywalker';
  return name;
})();
```
+ 20.2 分号一定出现在句末。 eslint: [semi-style](https://eslint.org/docs/latest/rules/semi-style#rule-details)
```js
// bad
foo()
;[1, 2, 3].forEach(bar)

for (
    let i = 0
    ; i < 10
    ; i += 1
) {
    foo()
}

// good
foo();
[1, 2, 3].forEach(bar);

for (
    let i = 0;
    i < 10;
    i += 1
) {
    foo();
}
```
+ 20.3 不允许使用多余的分号。 eslint: [no-extra-semi](https://eslint.org/docs/latest/rules/no-extra-semi#rule-details)
```js
// bad
const x = 5;;
function foo() {
    // code
};

// good
const x = 5;
const foo = function () {
    // code
};
function bar () {
    // code
}
Read more.
```
## 类型转换
+ 21.1 在语句开始时执行类型转换。

+ 21.2 字符串：
```js
//  => this.reviewScore = 9;

// bad
const totalScore = new String(this.reviewScore); // typeof totalScore is "object" not "string"

// bad
const totalScore = this.reviewScore + ''; // invokes this.reviewScore.valueOf()

// bad
const totalScore = this.reviewScore.toString(); // isn’t guaranteed to return a string

// good
const totalScore = String(this.reviewScore);
```
+ 21.3 对数字使用 parseInt 转换，并带上类型转换的基数。eslint: [radix](https://eslint.org/docs/latest/rules/radix#rule-details)
```js
const inputValue = '4';

// bad
const val = new Number(inputValue);

// bad
const val = +inputValue;

// bad
const val = inputValue >> 0;

// bad
const val = parseInt(inputValue);

// good
const val = Number(inputValue);

// good
const val = parseInt(inputValue, 10);
```
+ 21.5 禁止使用位操作运算符. eslint: [no-bitwise](https://eslint.org/docs/rules/no-bitwise)

当你使用位运算的时候要小心。 数字总是被以 `64-bit` 值 的形式表示，但是位运算总是返回一个 `32-bit`的整数。 对于大于 `32` 位的整数值，位运算可能会导致意外行为。 最大的 `32` 位整数是： `2,147,483,647`。
```js
// bad
var test = y | z;
var test = y & z;
x |= y;
x &= y;
var test = y ^ z;
var test = ~ z;
var test = y << z;
var test = y >> z;

// good
var test = y || z;
var test = y && z;
var test = y > z;
var test = y < z;
test += y;
```
+ 21.6 布尔:
```js
const age = 0;

// bad
const hasAge = new Boolean(age);

// good
const hasAge = Boolean(age);

// good
const hasAge = !!age;
```
## 命名规则
+ 22.1 避免单字母命名。命名应具备描述性。
```js
// bad 不报错但不推荐使用
function q() {
  // ...stuff...
}

// good
function query() {
  // ..stuff..
}
```
+ 22.2 使用小驼峰式命名对象、函数和实例。eslint: [camelcase](https://eslint.org/docs/latest/rules/camelcase#rule-details)
```js
// bad
const OBJEcttsssss = {};
const this_is_my_object = {};
function c() {}

// good
const thisIsMyObject = {};
function thisIsMyFunction() {}
```
+ 22.3 使用帕斯卡式命名构造函数或类。
```js
// bad
function user(options) {
  this.name = options.name;
}

const bad = new user({
  name: 'nope',
});

// good
class User {
  constructor(options) {
    this.name = options.name;
  }
}

const good = new User({
  name: 'yup',
});
```
+ 22.4 别保存 `this` 的引用。使用箭头函数或 Function#bind。
```js
// bad
function foo() {
  const self = this;
  return function() {
    console.log(self);
  };
}

// bad
function foo() {
  const that = this;
  return function() {
    console.log(that);
  };
}

// good
function foo() {
  return () => {
    console.log(this);
  };
}
```
+ 22.5 如果你的文件只输出一个类，那你的文件名必须和类名完全保持一致。
```js
// file contents
class CheckBox {
  // ...
}
export default CheckBox;

// in some other file
// bad
import CheckBox from './checkBox';

// bad
import CheckBox from './check_box';

// good
import CheckBox from './CheckBox';
```
+ 22.6 当你导出默认的函数时使用驼峰式命名。你的文件名必须和函数名完全保持一致。
```js
function makeStyleGuide() {
}

export default makeStyleGuide;
```
+ 22.7 当你导出单例、函数库、空对象时使用帕斯卡式命名。
```js
const AirbnbStyleGuide = {
  es6: {
  }
};

export default AirbnbStyleGuide;
```
## 存取器
+ 23.1 对于属性的存取函数不是必须的。

+ 23.2 如果你需要存取函数时使用 `getVal()` 和 `setVal('hello')`。

不要使用 `JavaScript` 的 `getters/setters` 方法，因为它们会导致意外的副作用，并且更加难以测试、维护和推敲。
```js
// bad
dragon.age();

// good
dragon.getAge();

// bad
dragon.age(25);

// good
dragon.setAge(25);
```
+ 23.3 如果属性是布尔值，使用 isVal() 或 hasVal()。
```js
// bad
if (!dragon.age()) {
  return false;
}

// good
if (!dragon.hasAge()) {
  return false;
}
```
+ 23.4 创建 get() 和 set() 函数是可以的，但要保持一致。
```js
class Jedi {
  constructor(options = {}) {
    const lightsaber = options.lightsaber || 'blue';
    this.set('lightsaber', lightsaber);
  }

  set(key, val) {
    this[key] = val;
  }

  get(key) {
    return this[key];
  }
}
```
