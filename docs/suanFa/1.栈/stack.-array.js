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
function baseConverter(num, chúShù) {
    const stack = new Stack();
    const digits = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    let bèiChúShù = num;
    let yúShù;
    let result = '';
    if (chúShù < 2 || chúShù > 36) {
        return '';
    }

    while(bèiChúShù > 0) {
        yúShù = Math.floor(bèiChúShù % chúShù);
        stack.push(yúShù);
        bèiChúShù = Math.floor(bèiChúShù / chúShù);
    }
    while(!stack.isEmpty()) {
        result += digits[stack.pop()]
    }
    return result;
}
console.log(baseConverter(100233, 2))
console.log(baseConverter(634, 8))
console.log(baseConverter(100345, 16))