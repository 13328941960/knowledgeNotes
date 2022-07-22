# IconFont 自定义icon（存在问题）

封装antd的自定义icon。建议直接使用antd自定义icon

## 何时使用
-

## 代码演示

```js
import IconFont from '@/components/IconFont';
import { Space } from 'antd';

const App: React.FC = () => {
  return (
   <>
      <Space>
        <IconFont type="icon-tuichu" />
        <IconFont type="icon-facebook" />
        <IconFont type="icon-twitter" />
      </Space>
    </>
  )
}
```

## API

参考[antd自定义font](https://ant.design/components/icon-cn/#%E8%87%AA%E5%AE%9A%E4%B9%89-font-%E5%9B%BE%E6%A0%87)
