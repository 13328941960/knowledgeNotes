# ShopSelectModalV2 组织树选择门店弹框

通过组织树选择门店，展示站列表的门店弹框，可删除门店。

## 何时使用
- 需要进行选择门店的时候使用

## 代码演示

```js
import ShopSelectModal from '@/components/ShopSelectModal';
import { useModal } from '@shihengtech/hooks';
import { ShopDto } from '@/services/marketing';

const App: React.FC = () => {
  const modal = useModal<any>();
  return (
    <>
      <a onClick={() => modal.openModal([6197])}>门店选择</a>
      <ShopSelectModalV2 
        {...modal} 
        onChange={onChange} 
      />
    </>
  )
}
```

## API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| selectList | 已选择的名店 | ShopDto | - |
| onChange | 选择后的回调 | (data: ShopDto[]) => void | - |
| ...modal | useModal()中的参数, 可以通过 openModal传递已选门店 | IUseModalResult | - |
