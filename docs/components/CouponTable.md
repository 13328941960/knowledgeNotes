
# CouponTable 优惠券列表

## 何时使用
- 需要展示优惠券列表时

## 代码演示

```js
import CouponTable from '@/components/CouponModal/CouponTable';
import { CouponTemplate } from '@/services/marketing';

const App: React.FC = () => {
  const coupons = [{
    templateId: 452,
    name: 11,
    couponContent: '1.00折',
    couponCondition: '无门槛',
    couponTime: '领券当日起1日内可用',
    createTime: '2022-07-15 11:42:06',
    status: 'NORMAL',
    couponType: 'PRODUCT',
    totalCount: 0,
    useCount: 0,
    num: 1,
    cancelStatus: 0,
    cancelType: 0,
    cancelNum: 0,
    productCalculateType: 0,
    productDiscount: {
        buyNum: 1,
        discountNum: 1,
        discountType: 'DISCOUNT',
        discountValue: 1,
        discountMode: 'SINGLE_ITEM',
        useLadderMode: 'NO',
        discountLimit: 1,
    },
  }]
  const deleteCoupon = (index: number) => {
    console.log(index, '需要删除优惠券index')
  }
  const changeNum = (value: CouponTemplate, index: number) => {
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
| isEdit | 是否可编辑 | boolean | false |
| changeNum | 修改数量值的回调 | (value: number, index: number) => void; | - |
| deleteCoupon | 删除优惠券的回调 | (index: number) => void | - |
| btnTxt | 操作删除时的按钮文案 | string | `删除` |
| coupons | 优惠券数据 | CouponTemplate[] | - |
