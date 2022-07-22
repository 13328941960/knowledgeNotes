# Editor 富文本

多功能富文本

## 何时使用
- 表单需要富文本时

## 代码演示

```js
import Editor from '@/components/Editor';
import { DraggableTable } from '@/components';
import { Form } from 'antd';

const App: React.FC = () => {
  const changeEditorValue = (value: any) => {
    form.setFieldsValue({
      content: value,
    });
  };
  const rules = [
    {
      validator: (_, value, cb) => {
        if (!value || value === '<p></p>') {
          return cb('请输入图文内容');
        }
        cb();
      },
    },
  ]
  return (
    <Form.Item
      noStyle
      shouldUpdate={(prevValues, curValues) => prevValues.content !== curValues.content}
    >
      {() => {
        const content = form.getFieldValue('content');
        const value = content ? content : '';
        return (
          <Form.Item
            required
            rules={rules}
            name="content"
            label="图文内容"
          >
            <Editor value={value} onChange={changeEditorValue} />
          </Form.Item>
        )
      }}
    </Form.Item>
  )
}
```

## API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| value | 富文本内容 | string | - |
| onChange | 富文本输入时的回调 | (value: string) => void | - |
