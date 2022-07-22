
# ColorIndexPicker 颜色多选器

带颜色的多选器

## 何时使用
- 用于echat 指标切换

## 代码演示

```js
import { ColorIndexPicker } from '@/components';
import { ColorIndexPickerValue } from '@/components/ColorIndexPicker';

const App: React.FC = () => {
  const [indexes, setIndexes] = useState<ColorIndexPickerValue[]>([]);
  const INDEXES = [
    {
      title: '指标选择',
      key: 'index',
      children: [
        { title: '新增会员', key: 'newMemberNum' },
        { title: '累计会员', key: 'allMemberNum' },
        { title: '消费会员', key: 'paidMemberNum' },
        { title: '新客订单', key: 'newMemberOrderNum' },
        { title: '老客订单', key: 'oldMemberOrderNum' },
        { title: '非会员订单数', key: 'noMemberOrderNum' },
      ],
    },
  ];
  return (
    <ColorIndexPicker
      dataSource={INDEXES}
      defaultIndexes={INDEXES[0].children.slice(0, 2).map((item) => item.key)}
      onChange={setIndexes}
    />
  )
}
```

## API

### ChatInput

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| dataSource | 数据 | { title: string, key: string, children: {title: string, key: string }[] }[] | - |
| defaultIndexes | 默认值 | - |
| onChange | 选择后的回调 | function | - |
| maxNum | 最大数量 | number | 2 |
| showGroupCheck | 是否展示多选 | boolean | false |
| showCheckAll | 是否展示全选 | boolean | false |
