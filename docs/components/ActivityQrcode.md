# ActivityQrcode 推广弹框

活动推广方式编辑弹框

## 何时使用
- 某个活动需要推广方式

## 代码演示

```js
import { useState } from 'react';
import { ActivityQrcode } from '@/components/ActivityQrcode';
const App: React.FC = () => {
  const [rowId, setRowId] = useState<number>(-1);
  const [showQrcode, setShowQrcode] = useState(false);
  return (
    <>
      <a
        onClick={() => {
          setRowId(181);
          setShowQrcode(true);
        }}
      >
        推广
      </a>
      {showQrcode && <ActivityQrcode
        activityId={rowId}
        jumpCode="CUT_KNIFE"
        onClose={() => {
          setShowQrcode(false);
        }}
        jumpPara={JSON.stringify({
          activityId: rowId,
        })}
        activityType="砍一刀"
      />}
    </>
  )
}
```

## API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| activityId | 活动ID | number \| null | - |
| onClose | 关闭弹框的回调 | function | - |
| jumpCode | 活动页面路径跳转码 | string | - |
| jumpPara | 活动页面路径跳转参数 | string | - |
| activityType | 活动的名称 | string |
