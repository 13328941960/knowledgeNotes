# ShopSelected 门店选择器

树形选择后以表格形式展示，或者通过树形选择自定义门店

## 何时使用
- 需要通过树形选择后以表格形式展示选择门店时
- 需要通过树形选择自定义门店时

## 代码演示

```js
import ShopSelected from '@/components/ShopSelected';

const App: React.FC = () => {
  const onChange = (value: ShopDto[]) => {
    console.log(value)
  }
  return (
    <>
      <ShopSelected
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
| shopIds | 已选择的门店id | number[]; | - |
| onChange | 选择后的回调 | boolean | false |
| disabled | 是否禁用 | string | - |
| isSelect | 是否选择自定义门店, 传`select`标识按自定义门店模式选择 | string |  |
| isShowAll | 是否可选按品牌 | boolean | false |

