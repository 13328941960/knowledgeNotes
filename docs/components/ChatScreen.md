
# ChatScreen 企微SCRM欢迎语设置

企微SCRM欢迎语设置的输入框和企微展示

## 何时使用
- 用于企微SCRM欢迎语设置的输入框和企微欢迎语页面展示

## 代码演示

```js
import { ChatInput, ChatMessage, ChatScreen } from '@/components/ChatScreen';
import { Form, Space } from 'antd';
import {
  ProFormDependency,
  ProFormRadio,
  StepsForm,
} from '@ant-design/pro-form';
const { StepForm } = StepsForm;

const requiredRules = [{ required: true }];

const App: React.FC = () => {
  const ProFormChat = (props: { value?: any; onChange?: (value: any) => void }) => {
  const initMessage: ChatMessage[] = [
    {
      id: '1',
      type: 'sys',
      content: '12:00',
    },
    { id: '2', type: 'text', content: '我通过了你的朋友验证请求，现在我们可以开始聊天了' },
    { id: '3', type: 'sys', content: '对方为企业微信用户，', link: '了解更多' },
  ];
  return (
    <Space>
      <ChatInput {...props} textMessageMaxLength={1000} mediaMessageMaxCount={9} />
      <ChatScreen {...props} value={initMessage.concat(props.value || [])} />
    </Space>
  );
};

  return (
    <StepForm layout="horizontal" title="欢迎语设置">
      <ProFormRadio.Group
        rules={requiredRules}
        label="渠道欢迎语"
        name="open"
        initialValue={true}
        options={[
          { label: '自定义欢迎语', value: true },
          { label: '不使用欢迎语', value: false },
        ]}
      />
      <ProFormDependency name={['open']}>
        {({ open }) => {
          return (
            open && (
              <Form.Item label=" " colon={false} name="welcomeMsg">
                <ProFormChat />
              </Form.Item>
            )
          );
        }}
      </ProFormDependency>
    </StepForm>
  )
}
```

## API

### ChatInput

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| textMessageMaxLength | 欢迎语消息最大长度 | number | - |
| mediaMessageMaxCount | 欢迎语消息最多可放的附件数 | number | - |
| onChange | 欢迎语设置后的回调 | function | - |
| value | 欢迎语的值 | ChatMessage | - |

### ChatScreen

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| value | 欢迎语的值 | ChatMessage | - |
