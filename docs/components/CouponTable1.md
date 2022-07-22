
# CouponTable 优惠券列表(疑似重复)

## 何时使用
- 需要展示优惠券列表时，疑似与（@/components/CouponModal/CouponTable）重复，后续可能废弃

## 代码演示

```js
import CouponTable from '@/components/CouponTable';
import { TCouponTemplateDto } from '@/types/pages/bonus';

const App: React.FC = () => {
  const coupons = [{
    templateId: 1,
    name: '优惠券',
    couponTime: '2022-10-1',
    couponContent: '优惠内容',
    couponCondition: '优惠门槛',
    couponType: '商品优惠',
    num: 1,
  }]
  const deleteCoupon = (index: number) => {
    console.log(index, '需要删除优惠券index')
  }
  const changeNum = (value, index) => {
    console.log(value, '被编辑优惠券的数量值')
    console.log(index, '被编辑数量的优惠券的所有')
  }
  return (
    <>
      <CouponTable
        coupons={coupons}
        deleteCoupon={deleteCoupon}
        changeNum={changeNum}
      />
    </>
  )
}
```

## API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| changeNum | 修改数量值的回调 | (value: number, index: number) => void; | - |
| deleteCoupon | 删除优惠券的回调 | (index: number) => void | - |
| coupons | 优惠券数据 | TCouponTemplateDto[] | - |
