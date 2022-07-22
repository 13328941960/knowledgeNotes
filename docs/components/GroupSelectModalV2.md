# GroupSelectModalV2 组织树选择组织弹框

通过组织树选择组织。

## 何时使用
- 需要进行选择组织的时候使用

## 代码演示

```js
import GroupSelectModalV2 from '@/components/GroupSelectModalV2';
import { useModal } from '@shihengtech/hooks';

const App: React.FC = () => {
  const modal = useModal<any>();
  const onChange = (data) => {
    console.log(data)
  }
  return (
    <>
      <a onClick={() => modal.openModal()}>组织选择</a>
      <GroupSelectModalV2 
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
| onChange | 选择后的回调 | (data: ShopDto[]) => void | - |
| ...modal | useModal()中的参数, 可以通过 openModal传递已选人群 | IUseModalResult | - |
