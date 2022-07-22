# ArchitectureAndShop 组织与门店联动选择器

## 何时使用
- 

## 代码演示

```js
import { ArchitectureAndShop } from '@/components';
const App: React.FC = () => {
  const onShopIdsChange = (shopIds) => {
    console.log(shopIds, '门店id')
  }
  return (
    <ArchitectureAndShop
      onShopIdsChange={onShopIdsChange}
    />
  )
}
```

## API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| className | 自定义类目 | string | - |
| onShopIdsChange | 选择门店的回调 | (value: number[]): void | - |
| disabled | 禁用 | boolean | - |
| isHiddenMultiple | 是否门店关闭多选 | boolean | - |
| isNoVal | 初始不给值 | boolean | - |
| defaultValue | 默认值 | ArchitectureAndShopValue | - |
| onChange | 改变后的回调 | (value: ArchitectureAndShopValue[]): void | - |
