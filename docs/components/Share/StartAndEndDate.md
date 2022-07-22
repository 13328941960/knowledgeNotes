# StartAndEndDate 起止时间

两行的起止时间组件，默认年月日
## 何时使用
- 

## 代码演示

```js
import { CommonButtonGroup } from '@/components/Share';

const App: React.FC = () => {
  return (
    <StartAndEndDate startMoment={moment(startTime)} endMoment={moment(endTime)} />
  )
}
```
## API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| startMoment | 提交按钮文案 | string \| number \| Moment \| | - |
| endMoment | 重置按钮文案 | string \| number \| Moment \| | - |
| format | 时间的展示格式 | string | `YYYY-MM-DD` |
