# OneProductSelectModal 商品选择列表弹框 

单个选择，传入商品列表弹框

## 何时使用
- 需要进行单个选择，传入的商品列表时使用

## 代码演示

```js
import { useModal } from '@shihengtech/hooks';
import SelectOneProductModal from '@/components/SelectOneProductModal';
import { Commodity } from '@/types/pages/commodity';

const App: React.FC = () => {
  const modal = useModal<any>();

  const onSubmit = (value: Commodity) => {
    console.log(value)
  }
  const products: any = [{
    name: "固定商品A",
    categoryId: 138,
    productId: 6751,
    fileUrls: [''],
    categoryName: "子菜独立",
    detailImages: ['detailImages'],
    price: 'null',
    showPrice: "10.00元 ～ 20.00元",
    productEnum: 'SKU',
    skuName: 'null',
    labelNames: '标签名称',
    innerSalePlatforms: [2, 1],
    waiMaiSalePlatforms: [],
    relations: 'null',
    openSpuId: 12314123,
    aliasName: 'null',
    hideInCloseTime: 'null',
}]
  return (
    <>
      <a onClick={() => modal.openModal()}>商品选择</a>
      <SelectOneProductModal
        {...modal}
        onSubmit={onSubmit}
        products={products}
      />
    </>
  )
}
```

## API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| products | 商品列表数据 | Commodity[] | - |
| onSubmit | 选择后的回调 | (data: Commodity) => void | - |
