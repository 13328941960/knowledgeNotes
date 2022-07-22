# CommonButtonGroup 查询+重置按钮组合

## 何时使用
-

## 代码演示

```js
import { CommonButtonGroup } from '@/components/Share';

const App: React.FC = () => {
  return (
    <CommonButtonGroup />
  )
}
```
## API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| submitText | 提交按钮文案 | string | 查询 |
| resetText | 重置按钮文案 | string | 重置 |
| loading | 加载态 | boolean | - |
| disabled | 禁用 | boolean | - |
