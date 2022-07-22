
# DelayButton 延迟按钮

加载结束，会变成禁用状态，数秒后才可再次点击

## 何时使用
- 加载结束后需要数秒才可操作按钮时使用

## 代码演示

```js
import { useState } from 'react';
import DelayButton from '@/components/DelayButton';

const App: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const onClick = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 3000)
  }
  return (
    <DelayButton
      loading={loading}
      delay={2}
      delayRender={(time) => `${time}s 后可继续导出`}
      onClick={onClick}
    >
      延迟按钮
    </DelayButton>
  )
}
```

## API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| delay | 禁用秒数，必须大于1秒 | number | - |
| delayRender | 禁用后的按钮文案 | ReactNode | - |

其他API参考[antd.Button](https://ant.design/components/button-cn/#API)
