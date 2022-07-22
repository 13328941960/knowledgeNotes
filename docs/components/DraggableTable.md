# DraggableTable 拖拽表格

表格可以切换成拖拽形式

## 何时使用
- 需要表格可进行拖拽时使用

## 代码演示

```js
import DraggableTable from '@/components/DraggableTable';
import { SwapOutlined } from '@ant-design/icons';
import { Button, Popconfirm, Row, Space } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { useEffect, useState } from 'react';

const dataSource = [
  {
    "productId": 6694,
    "brandId": 7777,
    "name": "标品-属性加价(多规格)",
    "categoryId": 134,
    "description": null,
    "categoryName": "本地优惠计算",
    "fileUrls": null,
    "price": null,
    "showPrice": "35.00元 ～ 60.00元",
    "productEnum": "SPU",
    "sort": 1,
    "openSkuId": null,
    "openSpuId": "BP1234",
    "aliasName": null
  },
  {
    "productId": 6716,
    "brandId": 7777,
    "name": "标品属性不加价",
    "categoryId": 134,
    "description": null,
    "categoryName": "本地优惠计算",
    "fileUrls": null,
    "price": 15,
    "showPrice": "15.00元",
    "productEnum": "SKU",
    "sort": 2,
    "openSkuId": "12312321321312312",
    "openSpuId": "12312321321312312",
    "aliasName": null
  },
  {
    "productId": 6717,
    "brandId": 7777,
    "name": "标品部分属性加价",
    "categoryId": 134,
    "description": null,
    "categoryName": "本地优惠计算",
    "fileUrls": null,
    "price": 10,
    "showPrice": "10.00元",
    "productEnum": "SKU",
    "sort": 3,
    "openSkuId": "12312312312312312321",
    "openSpuId": "12312312312312312321",
    "aliasName": null
  },
  {
    "productId": 6541,
    "brandId": 7777,
    "name": "柴宝可乐",
    "categoryId": 121,
    "description": null,
    "categoryName": "柴宝菜单分类",
    "fileUrls": null,
    "price": 6,
    "showPrice": "6.00元",
    "productEnum": "SKU",
    "sort": 4,
    "openSkuId": "4557",
    "openSpuId": "4557",
    "aliasName": null
  },
]
const App: React.FC = () => {
  const [draggable, setDraggable] = useState(false);
  const [_dataSource, setDataSource] = useState([]);

  useEffect(() => setDataSource(dataSource.sort((a, b) => a.sort - b.sort)), [dataSource]);
  const save = () => {
    setDataSource((d) => d.map((it, index) => ({ ...it, sort: index + 1 })));
    setDraggable(false);
  }
  const cancel = () => {
    setDataSource(dataSource);
    setDraggable(false);
  }
  return (
    <>
      {draggable ? (
        <Row className="mb-16" justify="end">
          <Space>
            <Button
              onClick={cancel}
            >
              取消
            </Button>
            <Button
              type="primary"
              onClick={save}
            >
              保存
            </Button>
          </Space>
        </Row>
      ) : (
        <Button icon={<SwapOutlined rotate={90} />} onClick={() => setDraggable(true)}>
            优先级管理
        </Button>
      )}
      <DraggableTable
        draggable={draggable}
        columns={(
          [
            { title: '名称', dataIndex: 'name' },
            { title: 'ID', dataIndex: 'openSpuId'},
            { title: '分类', dataIndex: 'categoryName' },
            { title: '价格（元）', dataIndex: 'showPrice' },
            { title: '优先级', dataIndex: 'sort' },
          ] as ColumnsType<any>
        ).concat(
          draggable
            ? []
            : [
                {
                  title: '操作',
                  key: 'operation',
                  width: 80,
                  render: (_v, record) => (
                    <Popconfirm
                      title="确定移除选择的商品吗？"
                    >
                      <a>移除</a>
                    </Popconfirm>
                  ),
                },
              ]
        )}
        rowKey="productId"
        pagination={false}
        dataSource={_dataSource}
        onDragEnd={setDataSource}
      />
    </>
    
  )
}
```

## API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| draggable | 是否可拖拽排序 | boolean | false |

其他参数参考[antd.Table](https://ant.design/components/table-cn/#API)
