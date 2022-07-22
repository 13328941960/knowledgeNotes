# ShowTotal 记录数

显示总记录数

## 何时使用
- 在表格底部需要显示总记录数时

## 代码演示

```js
import { ShowTotal } from '@/components/Share';

const App: React.FC = () => {
  const pagination: TablePaginationConfig = {
    current: filters.pageNum,
    pageSize: filters.pageSize,
    showSizeChanger: true,
    showTotal: ShowTotal,
    total: data?.total || 0,
    onChange: (pageNum, pageSize) => setFilters({ ...filters, pageNum, pageSize: pageSize! }),
  };

  return (
    <Table
      loading={loading}
      rowKey="orderId"
      dataSource={data?.records || []}
      columns={columns}
      scroll={{ x: 1000 }}
      pagination={false}
      style={{ marginBottom: 12 }}
    />
  )
}
```
## API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| to | 提交按钮文案 | string | null | - |
| text | 重置按钮文案 | string | - |
| onClick | 点击的回调 | () => void | - |
