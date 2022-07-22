
# ArrowChange 上升下降图标

带有颜色的上升下降展示图标

## 何时使用
- 当需要在数据旁边展现上升趋势或者下降趋势图标时使用

## 代码演示

```js
import ArrowChange from '@/components/ArrowChange';
const App: React.FC = () => {
  return (
    <>
      <ArrowChange
        type="up"
      />
      <ArrowChange
        type="down"
      />
    </>
  )
}
```

## API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| type | 类型为上升或下降 |  'up' \| 'down' | - |
| className | 自定义类名 | string | - |
