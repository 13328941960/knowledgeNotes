# OptionItem 表单项+多选器


## 何时使用
- 

## 代码演示

```js
import { OptionItem } from '@/components/Share';

const App: React.FC = () => {
  return (
    <OptionItem
      options={[
        { value: 0, name: '全部' },
        { value: 3, name: '微信支付' },
        { value: 4, name: '支付宝支付' },
      ]}
      name="payChannel"
      label="支付渠道"
      style={style}
      selectStyle={{ maxWidth: 200 }}
    />
  )
}
```
## API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| options | 选择的配置数据 | { value: unknown; name: string }[] | - |
| selectStyle | 自定义样式 | CSSProperties | - |
| selectOnChange | 选择后的回调 | (value: any, option: DefaultOptionType | DefaultOptionType[]) => void | - |
