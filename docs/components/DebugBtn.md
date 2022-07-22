
# DebugBtn DeBug按钮

固定在右下角的deBug按钮

## 何时使用
- 排查一些线上问题时

## 代码演示

```js
import DebugBtn from '@/components/DebugBtn';

const App: React.FC = () => {
  const onClick = () => {
    console.log('点击')
  }
  return (
    <DebugBtn
      data='一些数据'
      onClick={onClick}
    />
  )
}
```

## API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| data | 需要输入在控制台的数据 | any | - |
| onClick | 点击按钮的回调 | (_?: any) => void | - |

