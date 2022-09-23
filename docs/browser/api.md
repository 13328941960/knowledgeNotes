# 浏览器API

## 大量DOM操作、海量数据的性能优化

### 题目

10w 条记录的数组，一次性渲染到页面上，如何处理可以不冻结UI？

### 具体化

页面上有个空的无序列表节点 ul ，其 id 为 list-with-big-data ，现需要往列表插入 10w 个 li ，每个列表项的文本内容可自行定义，且要求当每个 li 被单击时，通过 alert 显示列表项内的文本内容。

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>页面加载海量数据</title>
</head>

<body>
  <ul id="list-with-big-data">100000 数据</ul>
  <script>
    // 此处添加你的代码逻辑
  </script>
</body>

</html>
```
### 分析
可能在看到这个问题的第一眼，我们可能会想到这样的解决办法：获取 ul 元素，然后新建 li 元素，并设置好 li 的文本内容和监听器绑定，然后在循环里对 ul 进行 append 操作，即可能想到的是以下代码实现。

```js
(function() {
  const ulContainer = document.getElementById("list-with-big-data");

  // 防御性编程
  if (!ulContainer) {
    return;
  }

  for (let i = 0; i < 100000; i++) {
    const liItem = document.createElement("li");

    liItem.innerText = i + 1;
    // EventListener 回调函数的 this 默认指向当前节点，若使用箭头函数，得谨慎
    liItem.addEventListener("click", function() {
      alert(this.innerText);
    });
    ulContainer.appendChild(liItem);
  }
})();
```
实践上述代码，我们发现界面体验很不友好，卡顿感严重。出现卡顿感的主要原因是，在每次循环中，都会修改 DOM 结构，并且由于数据量大，导致循环执行时间过长，浏览器的渲染帧率过低。
事实上，包含 100000 个 li 的长列表，用户不会立即看到全部，只会看到少部分。因此，对于大部分的 li 的渲染工作，我们可以延时完成。

我们可以从 **减少 DOM 操作次数** 和 **缩短循环时间** 两个方面减少主线程阻塞的时间。

`DocumentFragment`

:::tip
The DocumentFragment interface represents a minimal document object that has no parent. It is used as a lightweight version of Document that stores a segment of a document structure comprised of nodes just like a standard document. The key difference is that because the document fragment isn't part of the active document tree structure, changes made to the fragment don't affect the document, cause reflow, or incur any performance impact that can occur when changes are made.
:::

在 MDN 的介绍中，我们知道可以通过 DocumentFragment 的使用，减少 DOM 操作次数，降低回流对性能的影响。
`requestAniminationFrame`
:::tip
The window.requestAnimationFrame() method tells the browser that you wish to perform an animation and requests that the browser call a specified function to update an animation before the next repaint. The method takes a callback as an argument to be invoked before the repaint.
:::

在缩短循环时间方面，我们可以通过 分治 的思想，将 100000 个 li 分批插入到页面中，并且我们通过 requestAniminationFrame 在页面重绘前插入新节点。

### 事件绑定
如果我们想监听海量元素，推荐方法是使用 JavaScript 的事件机制，实现事件委托，这样可以显著减少 DOM 事件注册 的数量。

### 解决方案

经过上面的讨论，我们有了如下的解决方案。

```js
(function() {
  const ulContainer = document.getElementById("list-with-big-data");

  // 防御性编程
  if (!ulContainer) {
    return;
  }

  const total = 100000; // 插入数据的总数
  const batchSize = 4; // 每次批量插入的节点个数，个数越多，界面越卡顿
  const batchCount = total / batchSize; // 批处理的次数
  let batchDone = 0; // 已完成的批处理个数

  function appendItems() {
    // 使用 DocumentFragment 减少 DOM 操作次数，对已有元素不进行回流
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < batchSize; i++) {
      const liItem = document.createElement("li");
      liItem.innerText = batchDone * batchSize + i + 1;
      fragment.appendChild(liItem);
    }

    // 每次批处理只修改 1 次 DOM
    ulContainer.appendChild(fragment);
    batchDone++;
    doAppendBatch();
  }

  function doAppendBatch() {
    if (batchDone < batchCount) {
      // 在重绘之前，分批插入新节点
      window.requestAnimationFrame(appendItems);
    }
  }

  // kickoff
  doAppendBatch();

  // 使用 事件委托 ，利用 JavaScript 的事件机制，实现对海量元素的监听，有效减少事件注册的数量
  ulContainer.addEventListener("click", function(e) {
    const target = e.target;

    if (target.tagName === "LI") {
      alert(target.innerText);
    }
  });
})();
```

## DOM事件流的机制

### DOM事件级别

DOM级别分为4个级别：DOM0级、DOM1级、DOM2级和DOM3级。

DOM事件分为3个级别：DOM0级事件处理、DOM2级事件处理、DOM3级事件处理。

由于DOM1级中没有事件的相关内容，所以没有DOM1级事件。

1. DOM 0级事件

DOM0事件是给元素的事件绑定方法。如下例：

```js
var btn = document.getElementById('btn');
 btn.onclick = function(){
     alert(this.innerHTML);
 }
```

但DOM0事件，为同一个元素绑定多个同类型事件是不被允许的

2. DOM 2级事件

**el.addEventListener(event-name, callback, useCapture)**

event-name: 事件名称，可以是标准的DOM事件
callback: 回调函数，当事件触发时，函数会被注入一个参数为当前的事件对象 event
**useCapture: 默认是false，代表事件句柄在冒泡阶段执行**

```js
var btn = document.getElementById('btn');
btn.addEventListener("click", test, false);
function test(e){
	e = e || window.event;
  alert((e.target || e.srcElement).innerHTML);
  btn.removeEventListener("click", test)
}
```

3. DOM 3级事件

在DOM 2级事件的基础上添加了更多的事件类型。

+ UI事件，当用户与页面上的元素交互时触发，如：load、scroll
+ 焦点事件，当元素获得或失去焦点时触发，如：blur、focus
+ 鼠标事件，当用户通过鼠标在页面执行操作时触发如：dblclick、mouseup
+ 滚轮事件，当使用鼠标滚轮或类似设备时触发，如：mousewheel
+ 文本事件，当在文档中输入文本时触发，如：textInput
+ 键盘事件，当用户通过键盘在页面上执行操作时触发，如：keydown、keypress
+ 合成事件，当为IME（输入法编辑器）输入字符时触发，如：compositionstart
+ 变动事件，当底层DOM结构发生变化时触发，如：DOMsubtreeModified
+ 同时DOM3级事件也允许使用者自定义一些事件。


### DOM事件模型和事件流

**DOM事件模型分为捕获和冒泡**。一个事件发生后，会在子元素和父元素之间传播。

这种传播分成三个阶段。

（1）捕获阶段：事件从window对象开始，自上而下向目标节点传播的阶段；
（2）目标阶段：目标节点正在处理事件的阶段；
（3）冒泡阶段：事件从目标节点自下而上向window对象传播的阶段。

**DOM事件捕获的具体流程**

![An image](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2018/11/9/166f81f3e0d2d1ca~tplv-t2oaga2asx-zoom-in-crop-mark:3024:0:0:0.awebp)


事件冒泡的例子：

```html
<div id="outer">
    <div id="inner"></div>
</div>
```

```js
window.onclick = function() {
    console.log('window');
};
document.onclick = function() {
    console.log('document');
};
document.documentElement.onclick = function() {
    console.log('html');
};
document.body.onclick = function() {
    console.log('body');
}
outer.onclick = function(ev) {
    console.log('outer');
};
inner.onclick = function(ev) {
    console.log('inner');
};

// inner
// outer
// body
// html
// document
// window
```

正如我们上面提到的onclick给元素的事件行为绑定方法都是在当前元素事件行为的冒泡阶段(或者目标阶段)执行的。

### 事件代理(事件委托)

由于事件会在冒泡阶段向上传播到父节点，因此可以把子节点的监听函数定义在父节点上，由父节点的监听函数统一处理多个子元素的事件。这种方法叫做**事件代理**（delegation）。

**优点**

+ 减少内存消耗，提高性能

假设有一个列表，列表之中有大量的列表项，我们需要在点击每个列表项的时候响应一个事件

```html
// 例4
<ul id="list">
  <li>item 1</li>
  <li>item 2</li>
  <li>item 3</li>
  ......
  <li>item n</li>
</ul>
```

如果给每个列表项一一都绑定一个函数，那对于内存消耗是非常大的。

借助事件代理，我们只需要给父容器ul绑定方法即可，这样不管点击的是哪一个后代元素，都会根据冒泡传播的传递机制，把容器的click行为触发，然后把对应的方法执行，根据事件源，我们可以知道点击的是谁，从而完成不同的事。

+ 动态绑定事件

在很多时候，我们需要通过用户操作动态的增删列表项元素，如果一开始给每个子元素绑定事件，那么在列表发生变化时，就需要重新给新增的元素绑定事件，给即将删去的元素解绑事件，如果用事件代理就会省去很多这样麻烦。

**如何实现**

接下来我们来实现上例中父层元素 #list 下的 li 元素的事件委托到它的父层元素上：
```js
// 给父层元素绑定事件
document.getElementById('list').addEventListener('click', function (e) {
  // 兼容性处理
  var event = e || window.event;
  var target = event.target || event.srcElement;
  // 判断是否匹配目标元素
  if (target.nodeName.toLocaleLowerCase === 'li') {
    console.log('the content is: ', target.innerHTML);
  }
});
```

### Event对象常见的应用

**event. preventDefault()**

如果调用这个方法，默认事件行为将不再触发。什么是默认事件呢？

例如表单一点击提交按钮(submit)跳转页面、a标签默认页面跳转或是锚点定位等。

很多时候我们使用a标签仅仅是想当做一个普通的按钮，点击实现一个功能，不想页面跳转，也不想锚点定位。

1. 方法一：
```html
<a href="javascript:;">链接</a>
```

2. 方法二:

给其click事件绑定方法，当我们点击a标签的时候，先触发click事件，其次才会执行自己的默认行为

```html
<a id="test" href="http://www.cnblogs.com">链接</a>
<script>
test.onclick = function(e){
    e = e || window.event;
    return false;
}
</script>
```

```html
<a id="test" href="http://www.cnblogs.com">链接</a>
<script>
test.onclick = function(e){
    e = e || window.event;
    e.preventDefault();
}
</script>
```

接下来我们看个例子：输入框最多只能输入六个字符，如何实现？

```html
 <input type="text" id='tempInp'>
 <script>
    tempInp.onkeydown = function(ev) {
        ev = ev || window.event;
        let val = this.value.trim() //trim去除字符串首位空格（不兼容）
        // this.value=this.value.replace(/^ +| +$/g,'') 兼容写法
        let len = val.length
        if (len >= 6) {
            this.value = val.substr(0, 6);
            //阻止默认行为去除特殊按键（DELETE\BACK-SPACE\方向键...）
            let code = ev.which || ev.keyCode;
            if (!/^(46|8|37|38|39|40)$/.test(code)) {
                ev.preventDefault()
            }
        }
    }
 </script>
```

**event.stopPropagation()**

1. event.stopPropagation() 

方法阻止事件冒泡到父元素，阻止任何父事件处理程序被执行。上面提到事件冒泡阶段是指事件从目标节点自下而上向window对象传播的阶段。

```js
inner.onclick = function(ev) {
  console.log('inner');
  ev.stopPropagation();
};
```

2. event.stopImmediatePropagation()

stopImmediatePropagation 既能阻止事件向父元素冒泡，也能阻止元素同事件类型的其它监听器被触发。而 stopPropagation 只能实现前者的效果。我们来看个例子：

```html
<body>
  <button id="btn">click me to stop propagation</button>
</body>
```

```js
const btn = document.querySelector('#btn');
btn.addEventListener('click', event => {
  console.log('btn click 1');
  event.stopImmediatePropagation();
});
btn.addEventListener('click', event => {
  console.log('btn click 2');
});
document.body.addEventListener('click', () => {
  console.log('body click');
});
// btn click 1
```

如上所示，使用 stopImmediatePropagation后，点击按钮时，不仅body绑定事件不会触发，与此同时按钮的另一个点击事件也不触发。


**event.target & event.currentTarget**

老实说这两者的区别，并不好用文字描述，我们先来看个例子：
```html
<div id="a">
  <div id="b">
    <div id="c">
      <div id="d"></div>
    </div>
  </div>
</div>
<script>
  document.getElementById('a').addEventListener('click', function(e) {
    console.log(
      'target:' + e.target.id + '&currentTarget:' + e.currentTarget.id
    )
  })
  document.getElementById('b').addEventListener('click', function(e) {
    console.log(
      'target:' + e.target.id + '&currentTarget:' + e.currentTarget.id
    )
  })
  document.getElementById('c').addEventListener('click', function(e) {
    console.log(
      'target:' + e.target.id + '&currentTarget:' + e.currentTarget.id
    )
  })
  document.getElementById('d').addEventListener('click', function(e) {
    console.log(
      'target:' + e.target.id + '&currentTarget:' + e.currentTarget.id
    )
  })
</script>
```

当我们点击最里层的元素d的时候，会依次输出:

```js
target:d&currentTarget:d
target:d&currentTarget:c
target:d&currentTarget:b
target:d&currentTarget:a
```

从输出中我们可以看到，`event.target`指向引起触发事件的元素，

`event.currentTarget`则是事件绑定的元素，

只有被点击的那个目标元素的`event.target才会等于event.currentTarget`。

`event.currentTarget`始终是监听事件者，而`event.target`是事件的真正发出者。

