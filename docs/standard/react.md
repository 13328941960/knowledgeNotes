# React编程规范
## 基本规范

+ 每个文件只写一个模块.
+ 但是多个无状态模块可以放在单个文件中. eslint: [react/no-multi-comp](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-multi-comp.md).
推荐使用JSX语法.

## 创建模块

+ 如果你的模块没有状态或是没有引用`refs`， 推荐使用普通函数（非箭头函数）而不是类:
```js

// bad
class Listing extends React.Component {
  render() {
    return <div>{this.props.hello}</div>;
  }
}

// bad (relying on function name inference is discouraged)
const Listing = ({ hello }) => (
  <div>{hello}</div>
);

// good
function Listing({ hello }) {
  return <div>{hello}</div>;
}
```

## 命名
+ **文件名**: 文件名使用帕斯卡命名. 如, `ReservationCard.jsx`.

+ **引用命名**: React模块名使用帕斯卡命名，实例使用骆驼式命名. eslint: [react/jsx-pascal-case](https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-pascal-case.md)
```js
// bad
import reservationCard from './ReservationCard';

// good
import ReservationCard from './ReservationCard';

// bad
const ReservationItem = <ReservationCard />;

// good
const reservationItem = <ReservationCard />;
```
+ **模块命名**: 模块使用当前文件名一样的名称. 比如 `ReservationCard.jsx` 应该包含名为 `ReservationCard`的模块. 但是，如果整个文件夹是一个模块，使用 `index.js`作为入口文件，然后直接使用 `index.js` 或者文件夹名作为模块的名称:
```js
// bad
import Footer from './Footer/Footer';

// bad
import Footer from './Footer/index';

// good
import Footer from './Footer';
```
+ **高阶模块命名**: 对于生成一个新的模块，其中的模块名 `displayName` 应该为高阶模块名和传入模块名的组合. 例如, 高阶模块 `withFoo()`, 当传入一个 `Bar` 模块的时候， 生成的模块名 `displayName` 应该为 `withFoo(Bar)`.
::: tip
为什么？一个模块的 `displayName` 可能会在开发者工具或者错误信息中使用到，因此有一个能清楚的表达这层关系的值能帮助我们更好的理解模块发生了什么，更好的`Debug`.
:::
```js
// bad
export default function withFoo(WrappedComponent) {
  return function WithFoo(props) {
    return <WrappedComponent {...props} foo />;
  }
}

// good
export default function withFoo(WrappedComponent) {
  function WithFoo(props) {
    return <WrappedComponent {...props} foo />;
  }

  const wrappedComponentName = WrappedComponent.displayName
    || WrappedComponent.name
    || 'Component';

  WithFoo.displayName = `withFoo(${wrappedComponentName})`;
  return WithFoo;
}
```
+ **属性命名**: 避免使用`DOM`相关的属性来用作其他的用途。
::: tip
为什么？对于`style` 和 `className`这样的属性名，我们都会默认它们代表一些特殊的含义，如元素的样式，`CSS` `class`的名称。在你的应用中使用这些属性来表示其他的含义会使你的代码更难阅读，更难维护，并且可能会引起`bug`。
:::
```js
// bad
<MyComponent style="fancy" />

// good
<MyComponent variant="fancy" />
```
## 声明模块
+ 不要使用 `displayName` 来命名`React`模块，而是使用引用来命名模块， 如 `class` 名称.
```js
// bad
export default React.createClass({
  displayName: 'ReservationCard',
  // stuff goes here
});

// good
export default class ReservationCard extends React.Component {
}
```
+ 不要使用 `require` 方式来引用组件 或者 图片，而是使用 `es6`模块的标准语法
```js
// bad
const qrCodeImg = require('@/assets/img/enter.png');
<img src={qrCodeImg} alt="" />

// good
import qrCodeImg from '@/assets/img/enter.png';
<img src={qrCodeImg} alt="" />
```
## 代码对齐 
+ 遵循以下的JSX语法缩进/格式. eslint: [react/jsx-closing-bracket-location](https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-closing-bracket-location.md) [react/jsx-closing-tag-location](https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-closing-tag-location.md)
```js
// bad
<Foo superLongParam="bar"
     anotherSuperLongParam="baz" />

// good, 有多行属性的话, 新建一行关闭标签
<Foo
  superLongParam="bar"
  anotherSuperLongParam="baz"
/>

// 若能在一行中显示, 直接写成一行
<Foo bar="bar" />

// 子元素按照常规方式缩进
<Foo
  superLongParam="bar"
  anotherSuperLongParam="baz"
>
  <Quux />
</Foo>
```
## 单引号还是双引号
+ 对于`JSX`属性值总是使用双引号(`"`), 其他均使用单引号(`'`). eslint: [jsx-quotes](https://eslint.org/docs/latest/rules/jsx-quotes)
::: tip
为什么? `HTML`属性也是用双引号, 因此`JSX`的属性也遵循此约定.
:::
```js
// bad
<Foo bar='bar' />

// good
<Foo bar="bar" />
```
## 空格
+ 总是在自动关闭的标签前加一个空格，正常情况下也不需要换行. eslint: [no-multi-spaces](https://eslint.org/docs/latest/rules/no-multi-spaces), [react/jsx-tag-spacing](https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-tag-spacing.md)
```js
// bad
<Foo/>

// very bad
<Foo                 />

// bad
<Foo
 />

// good
<Foo />
```
+ 不要在JSX `{}` 引用括号里两边加空格. eslint: [react/jsx-curly-spacing](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-curly-spacing.md)
```js
// bad
<Foo bar={ baz } />

// good
<Foo bar={baz} />
```
+ 在JSX属性中禁止等号周围的空格. eslint: [react/jsx-equals-spacing](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-equals-spacing.md)
```js
// bad
<Hello name = {firstname} />;
<Hello name ={firstname} />;
<Hello name= {firstname} />;

// good
<Hello name={firstname} />;
```
## 属性
+ JSX属性名使用骆驼式风格`camelCase`.
```js
// bad
<Foo
  UserName="hello"
  phone_number={12345678}
/>

// good
<Foo
  userName="hello"
  phoneNumber={12345678}
/>
```
+ 如果属性值为 `true`, 可以直接省略. eslint: [react/jsx-boolean-value](https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-boolean-value.md)
```js
// bad
<Foo
  hidden={true}
/>

// good
<Foo
  hidden
/>

// good
<Foo hidden />
```
+ 禁止使用未知的DOM属性. eslint：[react/no-unknown-property](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-unknown-property.md)
```js
// bad
var React = require('react');
var Hello = <div class="hello">Hello World</div>;

// good
var React = require('react');
var Hello = <div className="hello">Hello World</div>;
```
`<img>` 标签总是添加 alt 属性. 如果图片以presentation(以类似PPT方式显示)方式显示，alt 可为空, 或者`<img>` 要包含role="presentation". eslint: [jsx-a11y/alt-text](https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/alt-text.md)
```js
// bad
<img src="hello.jpg" />

// good
<img src="hello.jpg" alt="Me waving hello" />

// good
<img src="hello.jpg" alt="" />

// good
<img src="hello.jpg" role="presentation" />
```
+ 不要在 `alt` 值里使用如 "image", "photo", or "picture"包括图片含义这样的词， 中文也一样. eslint: [jsx-a11y/img-redundant-alt](https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/img-redundant-alt.md)
::: tip
为什么? 屏幕助读器已经把 `img` 标签标注为图片了, 所以没有必要再在 `alt` 里说明了.
:::
```js
// bad
<img src="hello.jpg" alt="Picture of me waving hello" />

// good
<img src="hello.jpg" alt="Me waving hello" />
```
+ 使用有效正确的 aria role属性值 ARIA roles. eslint: [jsx-a11y/aria-role](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/main/docs/rules/aria-role.md)
```js
// bad - not an ARIA role
<div role="datepicker" />

// bad - abstract ARIA role
<div role="range" />

// good
<div role="button" />
```
+ 不要在标签上使用 `accessKey` 属性. eslint: [jsx-a11y/no-access-key](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/main/docs/rules/no-access-key.md)
::: tip
为什么? 屏幕助读器在键盘快捷键与键盘命令时造成的不统一性会导致阅读性更加复杂.
::: 
```js
// bad
<div accessKey="h" />

// good
<div />
```
+ 避免使用数组的index来作为属性key的值，推荐使用唯一ID. ([为什么?](https://www.jianshu.com/p/c74624223986?u_atoken=8d331c69-f9e4-4774-8fa1-a7e9d32c1e14&u_asession=01rCg72BTOQWmDzmjAhHFYAr_UVkeX69s2ocCRfb0YuEzaSbfLlL-snuAgfo2_AkTsX0KNBwm7Lovlpxjd_P_q4JsKWYrT3W_NKPr8w6oU7K9fkIYSaS3rc3-WWyFHjyLLPpcarp92QKzyJKyYjREPlmBkFo3NEHBv0PZUm6pbxQU&u_asig=05PHkngCIBn4AI6DScvcchjvTom6CQRSJrn5_SqVYTjnoiZKpP0WU381YetgwCjao4QpbkfPa1QK1L39raDGJPPDWkXshNcJlPm3hunJDeBkqUw_QSyoBStEDZ5X1FF3Bxd0srBqR1YwH4IV8AhMwKfSD8iWSHzxynxLnUhEYoNqX9JS7q8ZD7Xtz2Ly-b0kmuyAKRFSVJkkdwVUnyHAIJzZPoy3vp4O04A5JXTMmxDhyVUafqyqVZ6prkp_koTXe1WPRPQyB_SKrj-61LB_f61u3h9VXwMyh6PgyDIVSG1W-hfNN6jy6rQs9MVKk3s9IUtdQcavBnR-VzaKpyQBss9oMaHklTfeYrFRrbj7_1p4oajP92R_iEAY2xhJZ4smkzmWspDxyAEEo4kbsryBKb9Q&u_aref=2omJTkEKFZpXQcROUAhjAcVAcWM%3D))
```js
// bad
{todos.map((todo, index) =>
  <Todo
    {...todo}
    key={index}
  />
)}

// good
{todos.map(todo => (
  <Todo
    {...todo}
    key={todo.id}
  />
))}
```
+ 对于所有非必须的属性，总是手动去定义`defaultProps`属性.
::: tip
为什么? propTypes 可以作为模块的文档说明, 并且声明 `defaultProps` 的话意味着阅读代码的人不需要去假设一些默认值。更重要的是, 显示的声明默认属性可以让你的模块跳过属性类型的检查.
:::
```js
  // bad
  function SFC({ foo, bar, children }) {
    return <div>{foo}{bar}{children}</div>;
  }
  SFC.propTypes = {
    foo: PropTypes.number.isRequired,
    bar: PropTypes.string,
    children: PropTypes.node,
  };

  // good
  function SFC({ foo, bar, children }) {
    return <div>{foo}{bar}{children}</div>;
  }
  SFC.propTypes = {
    foo: PropTypes.number.isRequired,
    bar: PropTypes.string,
    children: PropTypes.node,
  };
  SFC.defaultProps = {
    bar: '',
    children: null,
  };
```
+ 尽可能少地使用扩展运算符

例外情况:

+ 使用了变量提升的高阶组件
```js
function HOC(WrappedComponent) {
  return class Proxy extends React.Component {
    Proxy.propTypes = {
      text: PropTypes.string,
      isLoading: PropTypes.bool
    };

    render() {
      return <WrappedComponent {...this.props} />
    }
  }
}
```
+ 只有在清楚明白扩展对象时才使用扩展运算符。这非常有用尤其是在使用Mocha测试组件的时候。
```js
export default function Foo {
  const props = {
    text: '',
    isPublished: false
  }

  return (<div {...props} />);
}
```
特别提醒：尽可能地筛选出不必要的属性。
```js
// good
render() {
  const { irrelevantProp, ...relevantProps  } = this.props;
  return <WrappedComponent {...relevantProps} />
}

// bad
render() {
  const { irrelevantProp, ...relevantProps  } = this.props;
  return <WrappedComponent {...this.props} />
}
```
+ 限制JSX中单行上的props的最大数量 `1`，当jsx中的props跨越多行时，仅检查每行的最大道具数. eslint: [react/jsx-max-props-per-line](https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-max-props-per-line.md)
```js
// bad
<Hello lastName="Smith" firstName="John" />;

// good
<Hello
    firstName="John"
    lastName="Smith"
/>;
```
+ 禁止在JSX中创建重复的props. eslint: [react/jsx-no-duplicate-props](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-no-duplicate-props.md)
```js
// bad
<Hello
    name="John"
    name="John"
/>;

// good
<Hello
    firstName="John"
    lastName="Smith"
/>;
```
+ 当我们希望使用a标签`target=_blank`来打开一个新标签页时，一定要加上`rel='noreferrer noopener'`，否则你的网页就会存在很严重的安全问题. eslint: [react/jsx-no-target-blank](https://github.com/yannickcr/eslint-plugin-react/blob/ac102885765be5ff37847a871f239c6703e1c7cc/docs/rules/jsx-no-target-blank.md)
```js
// bad
var Hello = <a target='_blank' href="http://example.com/"></a>

// good
var Hello = <a target='_blank' rel='noopener noreferrer' href="http://example.com"></a>
```
## 引用
+ 总是在Refs里使用回调函数. eslint: [react/no-string-refs](https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/no-string-refs.md)
```js
// bad
<Foo
  ref="myRef"
/>

// good
<Foo
  ref={(ref) => { this.myRef = ref; }}
/>
```
## 括号
+ 将多行的JSX标签写在 `()`里. eslint: [react/jsx-wrap-multilines](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-wrap-multilines.md)
```js
// bad
render() {
  return <MyComponent className="long body" foo="bar">
           <MyChild />
         </MyComponent>;
}

// good
render() {
  return (
    <MyComponent className="long body" foo="bar">
      <MyChild />
    </MyComponent>
  );
}
// good, 单行可以不需要
render() {
  const body = <div>hello</div>;
  return <MyComponent>{body}</MyComponent>;
}
```
## 标签
+ 对于没有子元素的标签来说总是自己关闭标签. eslint: [react/self-closing-comp](https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/self-closing-comp.md)
```js
// bad
<Foo className="stuff"></Foo>

// good
<Foo className="stuff" />
```
+ 如果模块有多行的属性， 关闭标签时新建一行. eslint: [react/jsx-closing-bracket-location](https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-closing-bracket-location.md)
```js
// bad
<Foo
  bar="bar"
  baz="baz" />

// good
<Foo
  bar="bar"
  baz="baz"
/>
```
## 函数
+ 使用箭头函数来获取本地变量.
```js
function ItemList(props) {
  return (
    <ul>
      {props.items.map((item, index) => (
        <Item
          key={item.key}
          onClick={() => doSomethingWith(item.name, index)}
        />
      ))}
    </ul>
  );
}
```
+ 当在 `render()` 里使用事件处理方法时，提前在构造函数里把 `this` 绑定上去 或者声明函数时使用箭头匿名函数，箭头函数会自动设置`this`为当前类。**(简洁有效，墙裂推荐)**. eslint: [react/jsx-no-bind](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-no-bind.md)
::: tip
为什么? 在每次 render 过程中， 再调用 bind 都会新建一个新的函数，浪费资源.
:::
```js
// bad
class extends React.Component {
  onClickDiv() {
    // do stuff
  }

  render() {
    return <div onClick={this.onClickDiv.bind(this)} />;
  }
}

// good
class extends React.Component {
  constructor(props) {
    super(props);

    this.onClickDiv = this.onClickDiv.bind(this);
  }

  onClickDiv() {
    // do stuff
  }

  render() {
    return <div onClick={this.onClickDiv} />;
  }
}

// very good
class extends React.Component {
  onClickDiv = () => {
    // do stuff
  }

  render() {
    return <div onClick={this.onClickDiv} />
  }
}
```
+ 在 `render` 方法中总是确保 `return` 返回值. eslint: [react/require-render-return](https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/require-render-return.md)
```js
// bad
render() {
  (<div />);
}

// good
render() {
  return (<div />);
}
```
+ 禁止在 `componentDidUpdate` 里面使用 `setState`. eslint：[react/no-did-update-set-state](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-did-update-set-state.md)
```js
// bad
class Hello extends React.Component {
    componentDidUpdate() {
        this.setState({
            name: this.props.name.toUpperCase()
        });
        },
    render() {
        return <div>Hello {this.state.name}</div>;
    }
};

// good
class Hello extends React.Component {
    componentDidUpdate() {
        this.props.onUpdate();
    },
    render() {
        return <div>Hello {this.props.name}</div>;
    }
};
```
+ 禁止在componentWillUpdate中使用setState. eslint：[react/no-will-update-set-state](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-direct-mutation-state.md)

+ 禁止使用 ReactDOM.render 的返回值. eslint: [react/no-render-return-value](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-render-return-value.md)
```js
// bad
const inst = ReactDOM.render(<App />, document.body);
doSomethingWithInst(inst);

// good
ReactDOM.render(<App ref={doSomethingWithInst} />, document.body);
ReactDOM.render(<App />, document.body, doSomethingWithInst);
```
## 模块生命周期
+ 使用新的生命周期函数

react16.3版本后

新增：`getDerivedStateFromProps`，`getSnapshotBeforeUpdate`

UNSAFE：`UNSAFE_componentWillMount`，`UNSAFE_componentWillUpdate`，`UNSAFE_componentWillReceiveProps`。

UNSAFE将在17版本中进行删除，应当避免使用

`class extends React.Component` 的生命周期函数:

可选的 `static` 方法
`constructor` 构造函数
`componentDidMount` 模块渲染后
`getDerivedStateFromProps` 模块将接受新的数据
`shouldComponentUpdate` 判断模块需不需要重新渲染
`componentDidUpdate` 模块渲染结束
`componentWillUnmount` 模块将从DOM中清除, 做一些清理任务
点击回调或者事件处理器 如 `onClickSubmit()` 或 `onChangeDescription()`
`render` 里的 `getter` 方法 如 `getSelectReason()` 或 `getFooterContent()`
可选的 `render` 方法 如 `renderNavigation()` 或 `renderProfilePicture()`
`render` render() 方法
如何定义 `propTypes`, `defaultProps`, `contextTypes`, 等等其他属性...
```js
import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  id: PropTypes.number.isRequired,
  url: PropTypes.string.isRequired,
  text: PropTypes.string,
};

const defaultProps = {
  text: 'Hello World',
};

class Link extends React.Component {
  static methodsAreOk() {
    return true;
  }

  render() {
    return <a href={this.props.url} data-id={this.props.id}>{this.props.text}</a>;
  }
}

Link.propTypes = propTypes;
Link.defaultProps = defaultProps;

export default Link;
```
## A11Y
+ 要求ARIA角色有效且不抽象,如果是开发人员创建的组件则不检测. eslint: [jsx-a11y/aria-role](https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/aria-role.md)
```js
// good
<div role="button"></div> <!-- Good: "button" is a valid ARIA role -->
<div role={role}></div> <!-- Good: role is a variable & cannot be determined until runtime. -->
<div></div> <!-- Good: No ARIA role -->
<Foo></Foo> <!-- Good: 开发人员创建的组件 -->
```
+ 要求所有aria-开头的属性都有效. eslint: [jsx-a11y/aria-props](https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/aria-props.md)
```js
// bad
<div id="address_label">Enter your address</div>
<input aria-labeledby="address_label">

// good
<div id="address_label">Enter your address</div>
<input aria-labelledby="address_label">
+ 要求ARIA状态和属性值有效. eslint: [jsx-a11y/aria-proptypes](https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/aria-proptypes.md)

// Bad: the aria-hidden state is of type true/false
<span aria-hidden="yes">foo</span>

// Good: the aria-hidden state is of type true/false
<span aria-hidden="true">foo</span>
```
+ 要求所有需要替代文本的元素都具有有意义的信息，此规则将检查以下内容替代文本：`<img>，<area>，<input type="image">`，和`<object>`. eslint: [jsx-a11y/alt-text](https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/alt-text.md)
```js
// Bad
<img src="foo" />
<object {...props} />
<area {...props} />
<input type="image" {...props} />

// Good
<img src="foo" alt="Foo eating a sandwich." />
<object aria-label="foo" />
<area aria-label="foo" />
<input type="image" alt="This is descriptive!" />
```
+ 禁止img alt文本包含多余的单词，如`"image", "picture", "photo"`. eslint:[jsx-a11y/img-redundant-alt](https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/img-redundant-alt.md)
```js
// bad
<img src="foo" alt="Photo of foo being weird." />
<img src="bar" alt="Image of me at a bar!" />
<img src="baz" alt="Picture of baz fixing a bug." />

// good
<img src="foo" alt="Foo eating a sandwich." />
<img src="bar" aria-hidden alt="Picture of me taking a photo of an image" /> // Will pass because it is hidden.
<img src="baz" alt={`Baz taking a ${photo}`} /> // This is valid since photo is a variable name.
```
+ 要求`label`标签具有文本标签和关联控件,可以通过设置label的htmlFor属性为页面上的元素id或者将元素放在label标签里来实现。eslint: [jsx-a11y/label-has-associated-control](https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/b800f40a2a69ad48015ae9226fbe879f946757ed/docs/rules/label-has-associated-control.md)
```js
// bad
function Foo(props) {
  return <label {...props} />
}

<input type="text" />
<label>Surname</label>

// good
<label>
  Surname
  <input type="text" />
</label>

<label htmlFor={domId}>Surname</label>
<input type="text" id={domId} />
```
+ 对于仅限键盘的用户，要求鼠标`onmouseover / onmouseout`伴随有`onfocus / onblur`. eslint: [jsx-a11y/mouse-events-have-key-events](https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/mouse-events-have-key-events.md)
```js
// bad
< div  onMouseOver = {（）=>  void  0  } />
< div  onMouseOut = {（）=>  void  0  } />
< div  onMouseOver = {（）=>  void  0  }  { ... otherProps } />
< div  onMouseOut = {（）=>  void  0  }  { ... otherProps } />

// good
< div  onMouseOver = {（）=>  void  0  }  onFocus = {（）=>  void  0  } />
< div  onMouseOut = {（）=>  void  0  }  onBlur = {（）=>  void  0  } />
< div  onMouseOver = {（）=>  void  0  }  onFocus = {（）=>  void  0  }  { ... otherProps } />
< div  onMouseOut = {（）=>  void  0  }  onBlur = {（）=>  void  0  }  { ... otherProps } />
```
+ 禁止在元素上使用accessKey. eslint: [jsx-a11y/no-access-key](https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/no-access-key.md)
```js
// bad
<div accessKey="h" />

// good
<div />
```
+ 具有交互式角色和交互处理程序（鼠标或按键）的元素必须是可聚焦的. eslint: [jsx-a11y/interactive-supports-focus](https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/interactive-supports-focus.md)
```js
// Bad: span with onClick attribute has no tabindex
<span onclick="submitForm();" role="button">Submit</span>
// Bad: anchor element without href is not focusable
<a onclick="showNextPage();" role="button">Next page</a>

// Good: div with onClick attribute is hidden from screen reader
<div aria-hidden onClick={() => void 0} />
// Good: span with onClick attribute is in the tab order
<span onClick="doSomething();" tabIndex="0" role="button">Click me!</span>
// Good: span with onClick attribute may be focused programmatically
<span onClick="doSomething();" tabIndex="-1" role="menuitem">Click me too!</span>
// Good: anchor element with href is inherently focusable
<a href="javascript:void(0);" onClick="doSomething();">Click ALL the things!</a>
// Good: buttons are inherently focusable
<button onClick="doSomething();">Click the button :)</button>
```
+ 具有ARIA角色的元素必须具有该角色的所有必需属性. eslint: [jsx-a11y/role-has-required-aria-props](https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/role-has-required-aria-props.md)
```js
// Bad: the checkbox role requires the aria-checked state
<span role="checkbox" aria-labelledby="foo" tabindex="0"></span>

// Good: the checkbox role requires the aria-checked state
<span role="checkbox" aria-checked="false" aria-labelledby="foo" tabindex="0"></span>
```
+ 要求定义显式或隐式角色的元素仅包含其aria-*支持的属性role. eslint: [jsx-a11y/role-supports-aria-props](https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/role-supports-aria-props.md)
```js
// Bad: the radio role does not support the aria-required property
<ul role="radiogroup" aria-labelledby="foo">
    <li aria-required tabIndex="-1" role="radio" aria-checked="false">Rainbow Trout</li>
    <li aria-required tabIndex="-1" role="radio" aria-checked="false">Brook Trout</li>
    <li aria-required tabIndex="0" role="radio" aria-checked="true">Lake Trout</li>
</ul>

// Good: the radiogroup role does support the aria-required property
<ul role="radiogroup" aria-required aria-labelledby="foo">
    <li tabIndex="-1" role="radio" aria-checked="false">Rainbow Trout</li>
    <li tabIndex="-1" role="radio" aria-checked="false">Brook Trout</li>
    <li tabIndex="0" role="radio" aria-checked="true">Lake Trout</li>
</ul>
```
+ 避免使用设置tabIndex>0属性值来同步页面流与键盘选项卡顺序. eslint: [jsx-a11y/tabindex-no-positive](https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/tabindex-no-positive.md)
```js
// Bad
<span tabIndex="5">foo</span>
<span tabIndex="3">bar</span>
<span tabIndex="1">baz</span>
<span tabIndex="2">never really sure what goes after baz</span>

// Good
<span tabIndex="0">foo</span>
<span tabIndex="-1">bar</span>
<span tabIndex={0}>baz</span>
```
+ 强制标题元素（h1，h2等）具有内容，并且屏幕阅读器可以访问内容。可访问意味着它不会使用`aria-hiddenprop` 隐藏. eslint: [jsx-a11y/heading-has-content](https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/heading-has-content.md)
```js
// Bad
<h1 />
<h1><TextWrapper aria-hidden />

// Good
<h1>Heading Content!</h1>
<h1><TextWrapper /><h1>
```
+ 要求HTML元素具有"lang"属性. eslint: [jsx-a11y/lang](https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/html-has-lang.md)
```js
// Bad
<html>

// Good
<html lang="en">
<html lang="en-US">
<html lang={language}>
```
+ 禁止使用表意不明的元素，如`<marquee>`和`<blink>`. eslint: [jsx-a11y/no-distracting-elements](https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/no-distracting-elements.md)
```js
// Bad
<marquee />
<blink />

// Good
<div />
```
+ scope属性只允许在th上使用. eslint: [jsx-a11y/scope](https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/scope.md)
```js
// Bad
<div scope />

// Good
<th scope="col" />
<th scope={scope} />
```
+ 通过将表情符号包装成a，给它role="img"，并提供有用的描述aria-label，屏幕阅读器会将表情符号视为可访问性树中的图像，并为最终用户提供可访问的名称. eslint: [jsx-a11y/accessible-emoji](https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/accessible-emoji.md)
```js
// Bad
<span>🐼</span>
<i role="img" aria-label="Panda">🐼</i>

// Good
<span role="img" aria-label="Snowman">&#9731;</span>
<span role="img" aria-label="Panda">🐼</span>
<span role="img" aria-labelledby="panda1">🐼</span>
```
+ 确保iframe元素具有唯一标题. eslint: [jsx-a11y/iframe-has-title](https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/iframe-has-title.md)
```js
// Bad
<iframe />
<iframe {...props} />
<iframe title="" />
<iframe title={''} />
<iframe title={``} />
<iframe title={undefined} />
<iframe title={false} />
<iframe title={true} />
<iframe title={42} />

// Good
<iframe title="This is a unique title" />
<iframe title={uniqueTitle} />
```
+ 媒体元素必须写captions属性. eslint: [jsx-a11y/media-has-caption](https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/media-has-caption.md)
```js
// Bad
<audio {...props} />
<video {...props} />

// Good
<audio><track kind="captions" {...props} /></audio>
<video><track kind="captions" {...props} /></video>
<video muted {...props} ></video>
```
## Hook
+ 只能在顶层调用Hook。不要在循环，条件或嵌套函数中调用Hook。确保总是在你的 React 函数的最顶层调用他们。遵守这条规则，你就能确保 Hook 在每一次渲染中都按照同样的顺序被调用。这让 React 能够在多次的 useState 和 useEffect 调用之间保持 hook 状态的正确。

+ 只在 React 函数中调用 Hook，不要在普通的 JavaScript 函数中调用 Hook。你可以：

    i. 在 React 的函数组件中调用 Hook

    ii. 在自定义 Hook 中调用其他 Hook 遵循此规则，确保组件的状态逻辑在代码中清晰可见。eslint: [react-hooks/rules-of-hooks](https://github.com/facebook/react/blob/c11015ff4f610ac2924d1fc6d569a17657a404fd/packages/eslint-plugin-react-hooks/src/RulesOfHooks.js)

::: tip
 为什么？正如我们所了解的，我们可以在单个组件中使用多个 State Hook 或 Effect Hook
:::
```js
function Form() {
  // 1. Use the name state variable
  const [name, setName] = useState('Mary');

  // 2. Use an effect for persisting the form
  useEffect(function persistForm() {
    localStorage.setItem('formData', name);
  });

  // 3. Use the surname state variable
  const [surname, setSurname] = useState('Poppins');

  // 4. Use an effect for updating the title
  useEffect(function updateTitle() {
    document.title = name + ' ' + surname;
  });

  // ...
}
```
那么 React 怎么知道哪个 state 对应哪个 useState？答案是 React 靠的是 Hook 调用的顺序。因为我们的示例中，Hook 的调用顺序在每次渲染中都是相同的，所以它能够正常工作：
```js
  // ------------
  // 首次渲染
  // ------------
  useState('Mary')           // 1. 使用 'Mary' 初始化变量名为 name 的 state
  useEffect(persistForm)     // 2. 添加 effect 以保存 form 操作
  useState('Poppins')        // 3. 使用 'Poppins' 初始化变量名为 surname 的 state
  useEffect(updateTitle)     // 4. 添加 effect 以更新标题

  // -------------
  // 二次渲染
  // -------------
  useState('Mary')           // 1. 读取变量名为 name 的 state（参数被忽略）
  useEffect(persistForm)     // 2. 替换保存 form 的 effect
  useState('Poppins')        // 3. 读取变量名为 surname 的 state（参数被忽略）
  useEffect(updateTitle)     // 4. 替换更新标题的 effect

  // ...
```
只要 Hook 的调用顺序在多次渲染之间保持一致，React 就能正确地将内部 state 和对应的 Hook 进行关联。这就是为什么 Hook 需要在我们组件的最顶层调用。如果我们想要有条件地执行一个 effect，可以将判断放到 Hook 的内部：
```js
useEffect(function persistForm() {
    // 将条件判断放置在 effect 中
    if (name !== '') {
      localStorage.setItem('formData', name);
    }
});
```
