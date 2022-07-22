
# AvailableTimeFormItem 时间段选择器

最多可添加三个的时间段选择器

## 何时使用
- 当表单中需要使用到时间段选择器

## 代码演示

```js
import AvailableTimeFormItem from '@/components/AvailableTimeFormItem';
import { Form } from 'antd';

const App: React.FC = () => {
  const [form] = Form.useForm();
  return (
    <Form>
      <AvailableTimeFormItem form={form} />
    </Form>
  )
}
```

## API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| form | 传递antd的Form.useForm() | FormInstance | - |
