# ArchitectureCascader 组织与门店联动选择器

## 何时使用
- 

## 代码演示

```js
import { ArchitectureCascader } from '@/components';
import { useState } from 'react';

const App: React.FC = () => {
  const onShopIdsChange = (shopIds) => {
    console.log(shopIds, '门店id')
  }
  const { architecture, setArchitecture } = useState([0]);
  const onChange = (architecture) => {
    setArchitecture(architecture)
  }
  return (
    <ArchitectureCascader
      value={architecture}
      onChange={onChange}
    />
  )
}
```

## API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| className | 自定义类目 | string | - |
| placeholder | 占位符 | string | - |
| defaultValue | 默认值 | number[] | - |
| onChange | 选择后的回调 | (value: number[]): void | - |
| disabled | 禁用 | boolean | - |
