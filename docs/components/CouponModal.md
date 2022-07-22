
# CouponModal 优惠券弹框

## 何时使用
- 当表单中需要使用到时间段选择器

## 代码演示

```js
import CouponModal from '@/components/CouponModal';
import { useState } from 'react';
import { CouponTemplate } from '@/services/marketing';

const App: React.FC = () => {
  const [couponVisible, setCouponVisible] = useState(false);

  const onChange = (value: CouponTemplate) => {
    console.log(value, '选中的优惠券数据')
    setCouponVisible(false)
  }
  const closeModal = () => {
    setCouponVisible(false)
  }
  const onEndChange = (value: CouponTemplate[]) => {
    console.log(value)
  }
  return (
    <>
      <a onClick={() => setCouponVisible(true)}>打开弹框</a>
      {couponVisible && (
        <CouponModal
          closeModal={closeModal}
          onChange={onChange}
        />
      )}
    </>
  )
}
```

## API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| onChange | 单选模式时选择优惠券的回调 | function(CouponTemplate) | - |
| closeModal | 关闭弹框的回调 | function | - |
| btnText | 操作选中时的按钮文案 | string | `选择` |
| value | 选中的优惠券 | CouponTemplate[] | - |
| isMultiple | 是否多项 | boolean | true |
| onEndChange | 多选模式时优惠券，确定选择的回调 | function(CouponTemplate) | - |
