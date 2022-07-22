
# CardModal 权益卡列表弹框

可以多选或展示的权益卡列表弹框

## 何时使用
- 表需要选择权益卡或者展示时使用

## 代码演示

```js
import CardModal from '@/components/CardModal';
import { TVipCardItem } from '@/types/pages/vip';
import { useModal } from '@shihengtech/hooks';
import React, { useEffect } from 'react';
import { useModel } from 'umi';

const App: React.FC = () => {
  const { fetchAllCard } = useModel('cards');
  const cardModalProps = useModal();
  const onChange = (values: TVipCardItem[]) => {
    console.log(values, '当前选择的权益卡数据数组')
  };
  useEffect(() => {
    fetchAllCard();
  }, []);
  return (
    <>
      <a onClick={(() => cardModalProps.openModal())}>打开弹框</a>
      <CardModal {...cardModalProps} onChange={onChange} />
    </>
  )
}
```

## API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| form | 传递antd的Form.useForm() | FormInstance | - |
| onChange | 多选权益卡后的回调 | function | - |
