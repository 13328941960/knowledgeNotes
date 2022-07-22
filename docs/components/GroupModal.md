# GroupModal 选择会员分群弹框

## 何时使用
- 

## 代码演示

```js
import GroupTableModal from '@/components/GroupModal';
import { useModal } from '@shihengtech/hooks';
import { TMemberGroup } from '@/types/pages/memberGroup';

const App: React.FC = () => {
  const groupTableModalProps = useModal<TMemberGroup[]>();
  const onChange = (value: TMemberGroup[]) => {
    console.log(value)
  }
  return (
    <>
      <a onClick={() => groupTableModalProps.openModal()}>打开弹框</a>
      <GroupTableModal {...groupTableModalProps} onChange={onChange} />
    </>
  )
}
```

## API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| onChange | 选择会员分群的回调 | (group: TMemberGroup[]) => void | - |
| ...modal | useModel()中的值 | IUseModalResult | - |
