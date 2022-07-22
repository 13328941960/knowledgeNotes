# DownloadQrcodeModal 推广弹框(重复)

活动推广方式编辑弹框，与（@/components/DownloadQrcodeCommonModal）重复，后续可能废弃

## 何时使用
- 

## 代码演示

```js
import DownloadQrcodeModal from '@/components/DownloadQrcodeModal';
import { useModal } from '@shihengtech/hooks';

const App: React.FC = () => {
  const downloadQrcodeModalProps = useModal<any>();
  return (
    <>
      <a
        onClick={() =>
          downloadQrcodeModalProps.openModal({
            name: '注册有礼新新',
            activityId: 103,
            jumpCode: 'REGIST',
            jumpPara: JSON.stringify({
              registerGiftId: 103,
            }),
            activityType: 9,
            path: `pages/router/main?jumpCode=${'REGIST'}&jumpPara=${encodeURIComponent(
              JSON.stringify({
                registerGiftId: 103,
              })
            )}`,
          })
        }
      >
        推广
      </a>
      <DownloadQrcodeCommonModal {...downloadQrcodeModalProps} />
    </>
  )
}
```

## API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| name | 活动名称 | string | - |
| activityId | 活动ID | number | - |
| activityType | 活动类型 | number | - |
| jumpCode | 活动页面路径跳转码 | string | - |
| jumpPara | 活动页面路径跳转参数 | string | - |
| path | 活动页面路径 | string | - |
