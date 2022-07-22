# ShopSelected 门店选择器（疑似重复）

与AllShopsSave类似
## 何时使用


## 代码演示

```js
import ShopSelectForm from '@/components/ShopSelectForm';

const App: React.FC = () => {
  const onChange = (value: any) => {
    console.log(value)
  }
  return (
    <>
      <ShopSelectForm
        label="门店选择"
        fieldId="shopId"
        onChange={onChange}
      />
    </>
  )
}
```

## API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| value | 已选择的门店 | number | Shop | number[] | Shop[]; | - |
| needOption | 选择后的回调是否将门店所有数据传递，包括：{ id, storeName }，false: 只传递id | boolean | false |
| label | 字段标签 | string | - |
| fieldId | 字段名 | string | shopId |
| noAll | 是否可选择全部 | boolean | - |
| onChange | 选择后的回调 | (value: number | Role) => void | - |
| mode | 选择后的回调 | `multiple` \| `tags` | - |
| require | 是否必填 | boolean | false |
