# TagSelect 标签选择器

## 何时使用

## 代码演示

```js
import TagSelect from '@/components/TagSelect';

const App: React.FC = () => {
  const options = [{
    label: '一',
    value: 1,
    disabled: false,
  },{
    label: '二',
    value: 2,
    disabled: false,
  },{
    label: '三',
    value: 3,
    disabled: false,
  }]
  const onChange = (value: any) => {
    console.log(value)
  }
  return (
    <TagSelect
      options={options}
      onChange={onChange}
    />
  )
}
```

## API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| options | options | { label: string; value: any; disabled?: boolean }[] |
| onChange | 选择后的回调 | (val: any) => void | - |
| value | 选中的值 | any | - |
| defaultValue | 默认的值 | any | - |
