# PackageProductModal 套餐商品列表弹框

套餐商品列表弹框

## 何时使用
- 需要进行套餐商品展示的时候使用

## 代码演示

```js
import { useModal } from '@shihengtech/hooks';
import PackageProductModal from '@/components/PackageProductModal';

const App: React.FC = () => {
  const modal = useModal<any>();
  const initValue = [{
    name: '套餐名称',
    productId: 1,
    fileUrls: '',
    imageUrl: '',
    categoryName: '套餐分类',
    showPrice: 10,
  }]
  return (
    <>
      <a onClick={() => modal.openModal(initValue)}>打开弹框</a>
      <PackageProductModal
        {...modal}
      />
    </>
  )
}
```

## API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| ...modal | useModal中的参数 | IUseModalResult | - |
| priceIndex | 套餐价格字段 | string | showPrice |
