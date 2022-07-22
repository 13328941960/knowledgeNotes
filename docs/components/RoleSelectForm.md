# RoleSelectForm 角色选择器

角色选择器

## 何时使用
- 当在表单中需要角色选择时使用

## 代码演示

```js
import RoleSelectForm from "@/components/RoleSelectForm";
import { Role } from "@/types/pages/orgManage";
import { useEffect } from "react";
import { useModel } from "umi";

const App: React.FC = () => {
  const { brandInfo } = useModel('brandInfo');
  const { getRoles } = useModel('roles');

  useEffect(() => {
    getRoles(brandInfo?.brandId)
  }, [])
  const onChange = (value: number | Role) => {
    console.log(value)
  }
  return (
    <>
      <RoleSelectForm 
        needOption={false}
        label="角色选择"
        fieldId="roleId"
        noAll={false}
        onChange={onChange}
      />
    </>
  )
}
```

## API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| value | 已选择的角色 | number | - |
| needOption | 选择后的回调是否将角色所有数据传递，包括：{ id, roleName }，false: 只传递id | boolean | false |
| label | 字段标签 | string | - |
| fieldId | 字段名 | string | - |
| noAll | 是否可选择全部 | boolean | - |
| onChange | 选择后的回调 | (value: number | Role) => void | - |
