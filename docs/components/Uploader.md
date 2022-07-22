# Uploader 上传

文件选择上传和拖拽上传控件。

## 何时使用
上传是将信息（网页、文字、图片、视频等）通过网页或者上传工具发布到远程服务器上的过程。

- 当需要上传一个或一些文件时。

- 当需要展现上传的进度时。

- 当需要使用拖拽交互时。

## 代码演示

```js
import Uploader from '@/components/Uploader';

const App: React.FC = () => {
  return (
    <>
      <Uploader
        accept=".jpg,.png,.gif"
        maxCount={1}
        uploading={uploading}
        setUploading={setUploading}
        limitSize={1}
      />
    </>
  )
}
```

## API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| accept | 接受上传的文件类型, 详见 [input accept Attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#accept) | string | - |
| action | 上传的地址	 | string | (file) => Promise<string> | - |
| maxCount | 限制上传数量。当为 1 时，始终用最新上传的文件代替当前文件 | number | - |
| multiple | 是否支持多选文件。开启后按住 ctrl 可选择多个文件	 | boolean | 上传失败的回调 | false |
| disabled | 是否禁用	 | boolean | false |
| listType | 上传列表的内建样式，支持三种基本样式 text, picture 和 picture-card | string | `picture-card` |
| limitSize | 限制上传文件大小 | number | 5 |
| beforeUpload | 上传文件之前的钩子，参数为上传的文件，若返回 false 则停止上传。支持返回一个 Promise 对象，Promise 对象 reject 时则停止上传，resolve 时开始上传（ resolve 传入 File 或 Blob 对象则上传 resolve 传入对象）；也可以返回 Upload.LIST_IGNORE，此时列表中将不展示此文件。 注意：IE9 不支持该方法 |  (file, fileList) => boolean | Promise<File> | Upload.LIST_IGNORE | - |
| showUploadList | 是否展示文件列表, 可设为一个对象，用于单独设定 showPreviewIcon, showRemoveIcon, showDownloadIcon, removeIcon 和 downloadIcon | boolean | { showPreviewIcon?: boolean, showRemoveIcon?: boolean, showDownloadIcon?: boolean, previewIcon?: ReactNode | (file: UploadFile) => ReactNode, removeIcon?: ReactNode | (file: UploadFile) => ReactNode, downloadIcon?: ReactNode | (file: UploadFile) => ReactNode } | true |
| uploading | 上传加载态 | boolean | false |
| setUploading | 多张图片的情况下，设置加载态开关 | (value: boolean) => void | - |
| value | 文件url值 | string[] \| string | - |
| onChange | 上传图片变化的回调 | (values: string[] | string) => void | - |
| resetValue | 重置后的值 | string[] | string | - |
| isSingle | 是否只能上传单个文件 | boolean | - |
| additionalData | 上传所需额外参数或返回上传额外参数的方法	 | object|(file) => object | Promise<object> | - |
| className | 自定义类型 | string | - |
