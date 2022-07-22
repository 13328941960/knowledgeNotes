# AllShops 门店单选择器

包含"全部"的门店单选择器

## 何时使用

## 代码演示

```js
import AllShopsSave from '@/components/AllShopsSave';
const onChangeShop = (value: string) => {
  console.log(value)
}
const App: React.FC = () => {
  return (
    <>
      <AllShopsSave onChangeShop={onChangeShop} />
    </>
  )
}
```

## API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| shopIds | 门店id | number[] | - |
| onChangeShop | 选择后的回调 | (shopId: string) => void | - |
