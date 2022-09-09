# 栈

数组可以在任意位置上删除和添加元素。然后有时候还需要一种能在添加或删除时
进行更多控制的数据结构。

有两种**类似于数组**的数据结构在添加和删除元素时更为可控，它们就是栈和队列。

栈是一种遵从**后进先出**（LIFO）原则的有序集合。

新增加或待删除的元素都保持在栈的顶部，称为栈顶，另一端叫做栈底。

栈在现实生活中有许多例子。

例如一摞书、或叠放的盘子。

栈也用在编程语言的编译器和内存中保存变量、方法调用等，

用于浏览器历史记录（浏览器的返回按钮）

## 创建一个基于数组的栈

```js
class Stack {
    constructor () {
        this.items = []
    }
}
```
创建一些栈的方法
+ push(): 添加一个或多个新元素到栈顶。
+ pop(): 移除栈顶的元素，同时返回被移除的元素。
+ peek(): 返回栈顶的元素，不对栈坐任何修改。
+ isEmpty(): 如果栈里没有元素就返回false
+ clear(): 清除元素
+ size(): 元素个数

```js
class Stack {
    #items;
    constructor() {
        this.#items = [] // {1}
    }
    push(element) {
        this.#items.push(element);
    }
    
    pop() {
        return this.#items.pop();
    }
    
    peek() {
        return this.#items[this.#items.length - 1]
    }
    
    isEmpty() {
        return this.#items.length === 0;
    }
    
    size() {
        return this.#items.length;
    }
    
    clear() {
        this.#items = []
    }

    toString() {
        return this.#items.toString()
    }
}

const stack = new Stack();

console.log(stack.isEmpty()) // true

stack.push(5)
stack.push(8)

console.log(stack.peek()) // 8

stack.push(11)

console.log(stack.size()) // 3
console.log(stack.isEmpty()) // false

stack.push(15)

stack.pop()
stack.pop()

console.log(stack.size()) // 2
```

## 创建一个基于JavaScript对象的Stack


```js
class Stack {
    #items;
    #count;
    constructor() {
        this.#count = 0;
        this.#items = {};
    }
    push(element) {
        this.#items[this.#count] = element;
        this.#count++;
    }
    pop() {
        if(this.isEmpty()) {
            return undefined
        }
        this.#count--;
        const result = this.#items[this.#count];
        delete this.#items[this.#count];
        return result;
    }
    peek() {
        if(this.isEmpty()) {
            return undefined
        }
        return this.#items[this.#count - 1]
    }
    size() {
        return this.#count;
    }
    isEmpty() {
        return this.#count === 0;
    }
    clear() {
        this.#items = [];
        this.#count = 0;
    }
    toString() {
        if(this.isEmpty()) {
            return ''
        }
        let objString = `${this.#items[0]}`;
        for(let i = 1; i < this.#count; i++) {
            objString = `${objString},${this.#items[i]}`
        }
        return objString;
    }
}

const stack = new Stack();
stack.push(5);
stack.push(8);
const string = stack.toString()
console.log(string)
```

## 用栈解决问题
十进制转其他进制

```js
class Stack {
    #items;
    #count;
    constructor() {
        this.#count = 0;
        this.#items = {};
    }
    push(element) {
        this.#items[this.#count] = element;
        this.#count++;
    }
    pop() {
        if(this.isEmpty()) {
            return undefined
        }
        this.#count--;
        const result = this.#items[this.#count];
        delete this.#items[this.#count];
        return result;
    }
    peek() {
        if(this.isEmpty()) {
            return undefined
        }
        return this.#items[this.#count - 1]
    }
    size() {
        return this.#count;
    }
    isEmpty() {
        return this.#count === 0;
    }
    clear() {
        this.#items = [];
        this.#count = 0;
    }
    toString() {
        if(this.isEmpty()) {
            return ''
        }
        let objString = `${this.#items[0]}`;
        for(let i = 1; i < this.#count; i++) {
            objString = `${objString},${this.#items[i]}`
        }
        return objString;
    }
}
function baseConverter(num, base) {
    const stack = new Stack();
    const digits = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    let number = num;
    let yuShu;
    let string = '';
    if (base < 2 || base > 36) {
        return '';
    }

    while(number > 0) {
        yuShu = Math.floor(number % base);
        stack.push(yuShu);
        number = Math.floor(number / base);
    }
    while(!stack.isEmpty()) {
        string += digits[stack.pop()]
    }
    return string;
}
console.log(baseConverter(100233, 2))
console.log(baseConverter(634, 8))
console.log(baseConverter(100345, 16))
```
