# JumpPages 跳转页面选择器（重复）

## 何时使用
- 当表单中需要选择跳转页面时，配合JumpDetail使用.( 与@/components/JumpDetail/index重复)

## 代码演示

```js
import JumpDetail from '@/components/JumpDetail';
import JumpPages from '@/components/JumpPages';
import { Commodity } from '@/types/pages/commodity';
import { Form } from 'antd';
import { useState } from 'react';

const App: React.FC = () => {
  const [form] = Form.useForm();
  const [curProduct, setProducts] = useState<Commodity | undefined>();

  const changePage = () => {
    form.setFieldsValue({
      jumpPara: '',
    });
    setProducts(undefined);
  };
  return (
    <Form
      labelAlign="right"
      form={form}
      name="form"
      initialValues={{ jumpCode: [] }}
    >
      <JumpPages
        rules={[
          {
            required: true,
            message: '请选择',
          },
        ]}
        fieldId="jumpCode"
        label="跳转页面"
        onChange={changePage}
      />
      <JumpDetail form={form} curProduct={curProduct} setProducts={setProducts} />
    </Form>
  );
}
```

## API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| fieldId | 字段英文名 | string | - |
| label | 字段中文名 |string | - |
| style | 自定义样式 | React.CSSProperties | - |
| onChange | 切换跳转页面的时候的回调 | string | - |
| rules | [查看详情](https://ant.design/components/form-cn/#Form.Item) | [Rule](https://ant.design/components/form-cn/#Rule)[] | - |
| placeholder | 占位符 | string | - |
| extra | 额外的提示信息，和 help 类似，当需要错误信息和提示文案同时出现时，可以使用这个。| ReactNode | - |
