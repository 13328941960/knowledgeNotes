
# CouponTable 日期选择筛选器

选择规定范围的日期选择器

## 何时使用
- 需要选择范围的日期选择器，用来筛选时使用

## 代码演示

```js
import DateSelectFilter from '@/components/DateSelectFilter';

const App: React.FC = () => {
  return (
    <>
      <DateSelectFilter
        picks={['DAY_0', 'DAY_7', 'DAY_30', 'CUSTOM']}
        endMoment={moment().endOf('day')}
        onChange={(m) => m}
      />
    </>
  )
}
```

## API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| className | 自定义类名 | boolean | false |
| picks | 可选择的规定范围 | string[] | ['DAY_1', 'DAY_7', 'DAY_30', 'CUSTOM'] |
| defaultDateType | 默认的规定范围, 分别为今日，昨天，前天，近 7 天，近 15 天，近 30 天，自然日，自然周，自然月，自定义 | `DAY_0` \| `DAY_1` \| `DAY_2` \| `DAY_7` \| `DAY_15` \| `DAY_30` \| `DATE` \| `WEEK` \| `MONTH` \| `CUSTOM` | - |
| onDateTypeChange | 规定范围改变时的回调 | string | `删除` |
| onChange | 日期改变时的回调 | (...args: Value): void; | - |
| endMoment | 结束时间值 | Moment | moment().endOf('day').subtract(1, 'days') |
