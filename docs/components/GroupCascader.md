# GroupCascader 门店可选列表弹框

可筛选门店以及城市的多选门店列表弹框

## 何时使用
- 需要进行选择门店的时候使用

## 代码演示

```js
import GroupCascader from '@/components/GroupCascader';
import { useModal } from '@shihengtech/hooks';
import { ShopDto } from '@/services/marketing';

const App: React.FC = () => {
  const modal = useModal<any>();

  const dataSource = [{
    id: 6197,
    cityName: '上海',
    storeName: '达达开通门店6'
  }]
  const onChange = (keys: ShopDto[]) => {
    console.log(keys)
  }
  return (
    <>
      <a onClick={() => modal.openModal()}>门店选择</a>
      <GroupCascader
        {...modal}
        onChange={onChange}
        selectList={dataSource}
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
| ...modal | useModal()中的参数 | IUseModalResult | - |


### ShopDto

```ts
type ShopDto = {
  id: number;
  cityName: string;
  storeName: string;
}
```
