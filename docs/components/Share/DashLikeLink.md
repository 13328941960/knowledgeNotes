# DashLikeLink 允许短横线的链接按钮

可以跳转的链接按钮

## 何时使用
- 

## 代码演示

```js
import { DashLikeLink } from '@/components/Share';

const App: React.FC = () => {
  return (
    <DashLikeLink
      to={`/store/groupBuyingPatrol/detail?type=2`}
      text='文案'
    />
  )
}
```
## API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| to | 提交按钮文案 | string | null | - |
| text | 重置按钮文案 | string | - |
| onClick | 点击的回调 | () => void | - |
