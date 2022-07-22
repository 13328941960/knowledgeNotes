# OneProductSelectModal 多个商品选择列表弹框

多个商品选择列表弹框

## 何时使用
- 需要进行选择多个商品的时候使用

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
| singleProduct | false: 能选套餐或单品，true: 只能选择单品 | boolean | true |
| groupType | 创建套餐可选搭配或固定搭配时传递该参与，用于判断最多可以选择几个商品 | { limitCount: number; name: string; type: string } | - |
