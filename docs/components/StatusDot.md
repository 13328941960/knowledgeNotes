# StatusDot 状态点

## 何时使用

## 代码演示

```js
import StatusDot from '@/components/StatusDot';

const App: React.FC = () => {
  return (
    <StatusDot type="error" text="失败" />
  )
}
```

## API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| type | 类型 | `error` \| `warning` \| `success` \| `info` \| `cancel` \| - |
| text | 文案 | string | - |
| radius | 圆角度 | number | 8 |
| style | 自定义样式 | CSSProperties | - |
