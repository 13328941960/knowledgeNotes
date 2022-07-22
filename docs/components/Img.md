# Img 图片

## 何时使用
- 

## 代码演示

```js
import Img from '@/components/Img';

const App: React.FC = () => {
  const groupTableModalProps = useModal<TMemberGroup[]>();
  const onChange = (value) => {
    console.log(value)
  }
  return (
   <Img
      style={{ width: 50, height: 50, borderRadius: '50%' }}
      className="mr-5 overflow-hidden"
      imgUrl={imgUrl}
      alt="头像"
    />
  )
}
```

## API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| imgUrl | 图片路径 | string | - |
| alt | 无法加载时的文案 |string | 图片 |
| needPreview | 可预览 | boolean | - |
| className | 自定义类名 | string | - |
| style | 自定义样式 | React.CSSProperties | - |
