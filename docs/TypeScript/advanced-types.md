# 高级类型

## 交叉类型

交叉类型就是将很多个类型合并在一起。例如 OneProps & TwoProps & ThreeProps;

在js的混入（minxins）或者 其他一些不是面向对象模型的地方会看到交叉类型。举个例子：

```ts
  function extend<T, U>(first: T, second: U): T & U {
      let result = <T & U>{};
      for (let id in first) {
          (<any>result)[id] = (<any>first)[id];
      }
      for (let id in second) {
          if (!result.hasOwnProperty(id)) {
              (<any>result)[id] = (<any>second)[id];
          }
      }
      console.log(result)
      return result;
  }

  class Person {
      constructor(public name: string) { }
  }
  interface Loggable {
      log(): void;
  }
  class ConsoleLogger implements Loggable {
      log() {
          // ...
          console.log(this)
      }
  }
  var jim = extend(new Person("Jim"), new ConsoleLogger());
  var n = jim.name;
  jim.log();
```

## 联合类型

联合类型和交叉类型有关系，但是使用上却完全不同。偶尔你会遇到下面的情况：


```ts
function padLeft (value: srting, paddingLeft: any) {
  if (typeof padding === "number") {
    return Array(padding + 1).join(" ") + value;
  };

  if (typeof padding === "string") {
        return padding + value;
  }

  throw new Error(`Expected string or number, got '${padding}'.`);
}

padLeft("Hello world", 4); // returns "    Hello world"

```

padLeft有一个问个就是，paddingLeft被指定为了any，也就是说我们可以传入number或者string之外的参数。
比如说：

```ts
padLeft("Hello world", true); // 编译阶段通过，运行时报错

```
代替 any， 我们可以使用 联合类型做为 padding的参数：

```ts
function padLeft (value: string, padding: string | number) {

}

padLeft("Hello world", true) // 编译阶段错误
```
联合类型就是指一个值可以是几种类型。

如果一个值是联合类型，我们只能访问这个联合类型的 所有类型的 共有的成员。

```ts
interface Bird {
    fly();
    layEggs();
}

interface Fish {
    swim();
    layEggs();
}

function getSmallPet(): Fish | Bird {
    // ...
}


let a = getSmallPet();
a.layEggs(); // okey
a.swim() // error
```

## 类型保护与区分类型（Type Guards and Differentiating Types）

联合类型是用来检查那些有多种可能的值，但是我们要是想确切的知道是否是Fish时怎么办？js经常用来判断两个可能值的方法是检查成员是否存在。如之前提及的，
我们只能访问联合类型。

```ts
let pet = getSmallPet();
// 每一个成员访问都会报错
if (pet.swim) {
    pet.swim();
} else if (pet.fly) {
    pet.fly();
}
```

为了让这段代码工作，我们要使用类型断言：

```ts
let pet = getSmallPet();

if ((<Fish>pet).swim) {
    (<Fish>pet).swim();
}
else {
    (<Bird>pet).fly();
}
```

### 用户自定义的类型保护

这里对每个属性进行检查。假若我们一旦检查过类型，就能在之后的分支里清楚地知道pet的类型就好了。

TS的里面的保护类型机制使这成为了现实。类型保护就是一些表达式，它们会在运行时对某个作用域类型进行检查。

要定义一个类型保护就是定义一个函数，它的返回值就是一个类型谓词。

```ts
function isFish(pet: Fish | Bird): pet is Fish {
    return (<Fish>pet).swim !== undefined;
}
```

在这个例子中 pet is Fish 就是 类型谓词；每当使用一些变量调用 isFish时，TypeScript会将变量缩减为那个具体的类型，只要这个类型与变量的原始类型是兼容的。

```ts
// 'swim' 和 'fly' 调用都没有问题了

if (isFish(pet)) {
    pet.swim();
}
else {
    pet.fly();
}
```

### typeof类型保护

现在我们回过头来看看怎么使用联合类型书写 padLeft代码。 我们可以像下面这样利用类型断言来写：

```ts
function padLeft (value: srting, paddingLeft: string | number) {
  if (typeof padding === "number") {
    return Array(padding + 1).join(" ") + value;
  };

  if (typeof padding === "string") {
        return padding + value;
  }

  throw new Error(`Expected string or number, got '${padding}'.`);
}

padLeft("Hello world", 4); // returns "    Hello world"

```

### instanceof类型保护

instanceof类型保护是通过构造函数来细化类型的一种方式。 比如，我们借鉴一下之前字符串填充的例子：

```ts
interface Padder {
    getPaddingString(): string
}

class SpaceRepeatingPadder implements Padder {
    constructor(private numSpaces: number) { }
    getPaddingString() {
        return Array(this.numSpaces + 1).join(" ");
    }
}

class StringPadder implements Padder {
    constructor(private value: string) { }
    getPaddingString() {
        return this.value;
    }
}

function getRandomPadder() {
    return Math.random() < 0.5 ?
        new SpaceRepeatingPadder(4) :
        new StringPadder("  ");
}

// 类型为SpaceRepeatingPadder | StringPadder
let padder: Padder = getRandomPadder();

if (padder instanceof SpaceRepeatingPadder) {
    padder; // 类型细化为'SpaceRepeatingPadder'
}
if (padder instanceof StringPadder) {
    padder; // 类型细化为'StringPadder'
}
```
instanceof的右侧要求是一个构造函数，TypeScript将细化为：

  1. 此构造函数的 prototype属性的类型，如果它的类型不为 any的话
  2. 构造签名所返回的类型的联合

以此顺序。

## 类型别名

类型别名就是给类型起一个新的名字。类型别名有时候和接口很像，但是可以作用于与原始值、联合类型、元组以及其他任何你想手动写的类型。

```ts
type Name = string;
type Namea = () => string;
type Namec =  Name | Namea;
function getName(n: Namec): Name {
    if (typeof n === 'string') {
        return n;
    }
    else {
        return n();
    }
}
```
同接口一样，类型别名也可以是泛型 - 我们可以添加类型参数并且在别名声明的右侧传入：

```ts
type a<T> = { value: T };
```

我们也可以使用类型别名来在属性里引用自己：

```ts
type Tree<T> = {
    value: T;
    left: Tree<T>;
    right: Tree<T>;
}
```

与交叉类型一起使用，我们可以创建出一些十分稀奇古怪的类型。

```ts
type LinkedList<T> = T & { next: LinkedList<T> };

interface Person {
    name: string;
}

var people: LinkedList<Person>;
var s = people.name;
var s = people.next.name;
var s = people.next.next.name;
var s = people.next.next.next.name;
```

然而，类型别名不能出现在声明右侧的任何地方。

```ts
type Yikes = Array<Yikes>; // error
```

### 接口 vs. 类型别名

接口和类型别名细微的差别。

1. 接口创建一个新的名字，可以在任何地方使用。类型别名并不会创建一个新名字。
2. 类型别名不能被extends和 implements，
3. 如果你无法通过接口来描述一个类型并且需要使用联合类型或元组类型，这时通常会使用类型别名。

## 字符串字面量类型

字符串字面量可以指定字符串必须的固定值。
在实际应用中，可以和联合类型，类型别名一起使用。
通过这些特性，能够构造出类似枚举值的字符串。

```ts
type Easing  = "ease-in" |  "ease-out" | "ease-in-out";
class UIElement { 
    animate(dx: number, dy: number, easing: Easing) {
        if (easing === "ease-in") {
            // ...
        }
        else if (easing === "ease-out") {
        }
        else if (easing === "ease-in-out") {
        }
        else {
            // error! should not pass null or undefined.
        }
    }
}
let button = new UIElement();
button.animate(0, 0, "ease-in");
button.animate(0, 0, "uneasy"); // error: "uneasy" is not allowed here
```
你只能从三种允许的字符中选择其一来做为参数传递，传入其它值则会产生错误。

字符串字面量类型还可以用于区分函数重载：

```ts
function createElement(tagName: "img"): HTMLImageElement;
function createElement(tagName: "input"): HTMLInputElement;
// ... more overloads ...
function createElement(tagName: string): Element {
    // ... code goes here ...
}
```

## 数字字面量类型
TypeScript还具有数字字面量类型。


```ts
function rollDie(): 1 | 2 | 3 | 4 | 5 | 6 {
    // ...
}
```
我们很少直接这样使用，但它们可以用在缩小范围调试bug的时候：

```ts
function foo(x: number) {
    if (x !== 1 || x !== 2) {
        //         ~~~~~~~
        // Operator '!==' cannot be applied to types '1' and '2'.
    }
}
```
换句话说，当 x与 2进行比较的时候，它的值必须为 1，这就意味着上面的比较检查是非法的。

## 枚举成员类型

“单例类型” 多数是指枚举成员类型和数字/字符串字面量类型，尽管大多数用户会互换使用“单例类型”和“字面量类型”。

## 可辨识联合

你可以合并单例类型、联合类型、类型保护、类型别名创建一个叫做可辨识联合的高级模式。它也可以叫做``标签联合``或者``代数数据类型``。
它具有3个要素：
1. 具有普通单例类型的特点 ———— ``可辨识的特征``
2. 一个类型别名包含了那些类型的联合 ——— ``联合``。
3. 此属性上的类型保护

```ts
interface Square {
    kind: "square";
    size: number;
}
interface Rectangle {
    kind: "rectangle";
    width: number;
    height: number;
}
interface Circle {
    kind: "circle";
    radius: number;
}
// 首先我们定义了三个接口，每个接口中都有一个相同的kind属性但有不同字符串字面量，
// kind属性可以称作特征或者标签

type Shape = Square | Rectangle | Circle;

// 现在我们使用可辨识联合:

function area(s: Shape) {
    switch (s.kind) {
        case "square": return s.size * s.size;
        case "rectangle": return s.height * s.width;
        case "circle": return Math.PI * s.radius ** 2;
    }
}
```

### 完整性检查

使用 never类型，编译器用它来进行完整性检查：

```ts
function throwError (x: never) : never{
    throw new Error("Unexpected object: " + x);
}

function area(s: Shape) {
    switch (s.kind) {
        case "square": return s.size * s.size;
        case "rectangle": return s.height * s.width;
        case "circle": return Math.PI * s.radius ** 2;
        default: return assertNever(s); // error here if there are missing cases
    }
}
```

## 多态的 this类型

```ts
class BasicCalculator {
    public constructor(protected value: number = 0) { }
    public currentValue(): number {
        return this.value;
    }
    public c(o: number): this {
        this.value += o;
        return this
    }
    public m(o: number): this {
        this.value *= o; 
        return this;
    }
}
```

## 索引类型（Index types）

下面是如何在TypeScript里使用此函数，通过 索引类型查询和 索引访问操作符：

```ts
function p<T, K extends keyof T>(o: T, names: K): T[K][] {
    return names.map(n => o[n])
}

interface Person {
    name: string;
    age: number
}

let person: Person = {
    name: 'wzcx',
    age: 26
}

let a = p(person, ['name'])

```
``keyof T`` 是索引类型查询操作符， T[K]是索引访问操作符；

### 索引类型和字符串索引签名

```ts
interface Map<T> {
    [key: string]: T;
}
```

### 映射类型


