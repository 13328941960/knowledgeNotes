# DownloadButton 下载按钮

## 何时使用
- 用于导出文件时使用的按钮

## 代码演示

```js
import { ShihengUpload } from '@/components';

const App: React.FC = () => {
  const onSuccess = (result) => {
    console.log(result, '上传成功的结果')
  }
  return (
    <>
      <ShihengUpload
        accept=".xlsx"
        api={async (data) => {
          await request.post < string > (await uploadPackages(), {
            data: getFormData(data),
          });
        }}
        onSuccess={onSuccess}
      >
        上传 Excel
      </ShihengUpload>
    </>
  )
}
```

## API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| accept | 可上传的文件类型 | boolean | false |
| api | 上传时调用的接口 | (arg: { file: File; [index: string]: any } => Promise`<any>` | - |
| others | 调用接口时要传的参数 | any | - |
| onSuccess | 上传成功的回调 | (result: CallResult<F>) => void; | 上传失败的回调
