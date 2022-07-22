
# CommodityVolume 商品体积输入框

带有单位选择的，商品体积输入框

## 何时使用
- 需要输入商品体积时使用

## 代码演示

```js
import CommodityVolume from '@/components/CommodityVolume';

const onChange = (value) => {
  console.log(value)
}
const App: React.FC = () => {
  return (
    <CommodityVolume 
      onChange={onChange}
    />
  )
}
```

## API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| value | 输入的数及单位的值 | { unit: UnitType; amount: number } | - |
| onChange | 输入选择后的回调 | function({ unit: UnitType; amount: number }) | - |
