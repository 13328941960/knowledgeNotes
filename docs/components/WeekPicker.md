# WeekPicker 周选择器（h5组件）

## 何时使用


## 代码演示

```js
import WeekPicker from '@/components/WeekPicker';

const App: React.FC = () => {
  return (
    <>
      
    </>
  )
}
```

## API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| title | 标题 | string | - |
| minDate | 最小日期 | string | Date | new Date(currentYear - 10, 0, 1) |
| maxDate | 最大日期 | Date | new Date(currentYear + 10, 11, 31) |
| onConfirm | 确认的回调 | (values: any) => void | - |
| onDefaultChange | 默认改变的回调 | (values: any) => void | - |
| onChange | 选择后的回调	| (values: any) => void | | - |
| onCancel | 取消的回调 | () => void | - |
