# FieldPickInput 带字段选择的输入框

## 何时使用
- 

## 代码演示

```js
import { FieldPickInput } from '@/components';
import { getChannelList } from '@/services/scrm';
import { TChannelSimple } from '@/types/pages/scrm';
import ProTable, { ProColumns } from '@ant-design/pro-table';
import { useState } from 'react';
import { useModel } from 'umi';
const ChannelFilterOptions = [
  { label: '渠道名称', value: 'channelName' },
  { label: '渠道ID', value: 'channelId' },
];
const App: React.FC = () => {
  const { brandId } = useModel('brandInfo');
  const [filterField, setFilterField] = useState('channelId');
  const columns: (ProColumns<TChannelSimple> & { dataIndex?: string | Paths<TChannelSimple> })[] = [
    {
      dataIndex: filterField,
      colSize: 2,
      // hideInTable: true,
      renderFormItem: () => (
        <FieldPickInput
          style={{ width: 300 }}
          pickValue={filterField}
          onPick={setFilterField}
          options={ChannelFilterOptions}
          pickAfterClear
          allowClear
          maxLength={20}
        />
      ),
    },
    {
      title: '渠道',
      hideInSearch: true,
    },
  ];
  return (
    <ProTable
      columns={columns}
      request={async ({ current: pageNum = 1, pageSize = 20, channelId, channelName }) => {
        const { result, total } = await getChannelList({
          pageNum,
          pageSize,
          channelId,
          channelName,
          brandId,
        });

        return { data: result, total };
      }}
    />
  )
}
```

## API

| 参数 | 说明 | 类型 | 默认值 |
| options | 字段选择配置项 | { label: string; value: string }[] | - |
| onPick | 字段选择onChange函数 | (value: string) => void; | - |
| pickValue | 字段选择框value | string | - |
| pickProps | 选择框props | `Omit<SelectProps, 'value' | 'onChange' | 'mode'>` | - |
| pickAfterClear | 选中字段改变后是否清除input | boolean | - |
