# EditSortTable 编辑排序表格


## 何时使用
- 

## 代码演示

```js
const App: React.FC = () => {
  import EditSortTable from '@/components/EditSortTable';
  const columns = useMemo(() => {
    return _.compact([
      {
        title: '商品名称/编号',
        width: 240,
        render: (val: Commodity, { name, openSkuId, fileUrls }: any) => {
          return (
            <ItemName
              id={openSkuId}
              name={name}
              product={val}
              maxWidth={170}
              picture={fileUrls && fileUrls.length ? fileUrls[0] : ''}
            />
          );
        },
      },
      {
        title: '规格',
        dataIndex: 'skuName',
        width: 160,
        render: (val: string) => (val ? val : '-'),
      },
      {
        title: (
          <>
            <span className="markRed">*</span> 数量
          </>
        ),
        dataIndex: 'count',
        editable: true,
        required: true,
        width: 160,
        inputProps: {
          disabled: !!initValue?.templateId,
          min: 1,
          max: 9999,
          addonAfter: '份',
          precision: 0,
          inputType: 'number',
        },
      },
      groupType.type === 'OPTIONAL' && {
        title: '加价',
        dataIndex: 'addPrice',
        editable: true,
        width: 120,
        inputProps: {
          disabled: !!initValue?.templateId,
          min: 0,
          max: 9999,
          addonAfter: '元',
          precision: 2,
          inputType: 'number',
        },
      },
    ]);
  }, [groupType]);
  return (
   <EditSortTable
      {...others}
      columns={columns}
      data={data}
      operation={!initValue?.templateId}
      setData={setData}
      prefixFieldId={['skuList']}
      hiddenFields={['skuId']}
      header={header}
      initItem={{ packageGroupId: initValue.packageGroupId, count: 0 }}
      type="商品"
      footer={
        <Row justify="space-between">
          <Col>
            {data.length < groupType.limitCount && !initValue?.templateId && (
              <Button
                type="link"
                onClick={() => productSelectModalProps.openModal()}
                icon={<PlusCircleOutlined />}
              >
                添加商品 (最多 {groupType.limitCount} 个)
              </Button>
            )}
          </Col>
          <Col>{groupFooterExtra && groupFooterExtra(initValue.groupKey)}</Col>
        </Row>
      }
    />
  )
}
```

## API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| columns | 表格列的配置描述，具体见：[antd.Table](https://ant.design/components/table-cn/#API) | - | - |
| data | 数据数组 | {idx: number, packingFee: number}[] | [{idx: 0, packingFee: 0}] |
| maxCount | 最大数据条数 | string | 10 |
| prefixFieldId | 最终表单提交接口的对象名 | string[]; | - |
| hiddenFields | 隐藏的字段 | string[] | - |
| header | 头部 | React.ReactNode | - |
| footer | 底部 | React.ReactNode | - |
| groupFooterExtra | 底部额外自定义的内容 | React.ReactNode | - |
| initItem | 初始项数据 | any | - |
| type | 底部“添加”后面的文案 | string | - |
| setData | 更新数据的回调 | `React.Dispatch<React.SetStateAction<{idx: number, packingFee: number}[]>>` | - |
| style | 自定义样式 | React.CSSProperties | - |
| onEdit | 编辑的回调 | (item: {idx: number, packingFee: number}): void; | - |
| onChangeWhiteList | 点击白名单的回调 | (item: Item, index: number): void; | - |
| scroll | 表格是否可滚动，也可以指定滚动区域的宽、高，具体见：[antd.Table.scroll](https://ant.design/components/table-cn/#scroll) | - | - |
| operation | 是否可操作 | boolean | true |


## columns.inputProps

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| disabled | 是否禁用 | boolean | - |
| inputType | 输入框类型 | `number` \| `text` | - |
| addonAfter | 后缀 | React.ReactNode | - |
| maxLength | 最大长度 | number | - |
| minLength | 最小长度 | number | - |
| min | 最小值 | number | - |
| max | 最小值 | number | - |
| patternObj | 表单验证 | number | - |

## columns.inputProps.patternObj

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| pattern | 正则 | RegExp | - |
| message | 错误提示内容 | string | - |
