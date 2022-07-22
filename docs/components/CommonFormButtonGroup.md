
# CommonFormButtonGroup 查询重置组合按钮

查询重置组合的按钮

## 何时使用
- 表单提交需要查询重置按钮

## 代码演示

```js
import CommonFormButtonGroup from '@/components/CommonFormButtonGroup';

const App: React.FC = () => {
  return (
    <CommonFormButtonGroup />
  )
}
```

## API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| submitText | 提交文案 | { unit: UnitType; amount: number } | - |
| resetText | 重置文案 | function({ unit: UnitType; amount: number }) | - |
| itemProps | [antd.Form.Item](https://ant.design/components/form-cn/#Form.Item)的参数 | FormItemProps | - |
