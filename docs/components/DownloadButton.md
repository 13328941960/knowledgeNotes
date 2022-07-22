# DownloadButton 下载按钮

## 何时使用
- 用于导出文件时使用的按钮

## 代码演示

```js
import { DownloadButton } from '@/components';
import { requestAPI } from '@/services';
import request from '@/utils/request';

const App: React.FC = () => {
  const exportTask = () => {
    
  }
  return (
    <>
      <DownloadButton
        type="link"
        delay={0}
        exportTask={() => request.get(requestAPI('product/template/get?type=2'))}
      >
        商品销售导入模板
      </DownloadButton>
    </>
  )
}
```

## API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| delay | 延迟时间(秒) | number | 3 |
| type | 按钮类型 | (lastTime: number): ReactNode; | - |
| exportTask | 模板接口api | ()  => Promise | - |

其他参数参考[antd.Button](https://ant.design/components/button-cn/#API)
