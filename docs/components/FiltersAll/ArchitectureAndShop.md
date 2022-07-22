# ArchitectureAndShop 组织与门店联动选择器

## 何时使用
- 

## 代码演示

```js
import { ArchitectureAndShopNotAll } from '@/components/FiltersAll';

const App: React.FC = () => {
  const [fromShopIds, setShopIds] = useState<number[]>([]);

  return (
    <ArchitectureAndShopNotAll
      notDefaultAll
      defaultValue={{ shop: fromShopIds }}
      onShopIdsChange={(fromShopIds) => setShopIds(fromShopIds)}
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
| notDefaultAll | 不默认展示全部 | boolean | - |
| defaultValue | 默认值 | ArchitectureAndShopValue | - |
| onChange | 改变后的回调 | (value: ArchitectureAndShopValue[]): void | - |
