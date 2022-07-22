# OneProductSelectModal 单个商品选择列表弹框

可筛选商品选择列表弹框

## 何时使用
- 需要进行选择商品的时候使用

## 代码演示

```js
import { useModal } from '@shihengtech/hooks';
import OneProductSelectModal from '@/components/OneProductSelectModal';
import { Commodity } from '@/types/pages/commodity';

const App: React.FC = () => {
  const modal = useModal<any>();

  const dataSource: any = []
  const onChange = (value: Commodity[]) => {
    console.log(value)
  }
  return (
    <>
      <a onClick={() => modal.openModal()}>商品选择</a>
      <OneProductSelectModal
        {...modal}
        selectList={dataSource}
        onChange={onChange}
        singleProduct={true}
      />
    </>
  )
}
```

## API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| selectList | 已选择的商品 | Commodity | - |
| onChange | 选择后的回调 | (data: Commodity[]) => void | - |
| singleProduct | false: 能选套餐或单个商品，true: 只能选择单个商品 | boolean | true |
