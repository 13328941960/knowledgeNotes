
# Compare 对比数据

展示对比数据

## 何时使用
- 当统计数据需要进行与其他时间段环比或者同比时使用

## 代码演示

```js
import { useMemo, useState } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Card, Row, Col, Space, Spin, Typography, Tooltip } from 'antd';
import { useModel } from 'umi';
import moment, { Moment } from 'moment';
import { curry } from 'lodash';
import { useFetch } from '@shihengtech/hooks';
import { CaretDownOutlined, CaretUpOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { DateSelectFilter, CompareSelect, ArchitectureAndShop } from '@/components';
import { CompareSelectValue } from '@/components/CompareSelect';
import { ValueEnums } from '@/components/DateSelectFilter/enum';
import CompareData, { OptionContext } from '@/components/CompareData';
import request from '@/utils/request';
import { requestAPI } from '@/services';
import { DataItem } from '@/services/data';
import { formatNum } from '@/utils/utils';

const { Text } = Typography;

const parseDateType = curry(
  (setState: React.Dispatch<React.SetStateAction<3 | 2 | 1>>, dateType: ValueEnums) => {
    switch (dateType) {
      case 'WEEK':
        setState(1);
        break;

      case 'MONTH':
        setState(2);
        break;

      default:
        setState(3);
    }
  }
);

export type QueryParams = {
  shopIds?: Nullable<number[]>;
  dateRange: Nullable<Moment[]>;
};

type CommonDataType = {
  allMemberNum: DataItem;
  allNewMemberOrderNum: DataItem;
  dayNewMemberOrderNum: DataItem;
  newMemberNum: DataItem;
  newMemberOrderNum: DataItem;
  oldMemberOrderNum: DataItem;
  paidMemberNum: DataItem;
};

export type TendencyDataItem = Record<keyof CommonDataType, number> & { date: string };

export type RemoteDataType = {
  statisticsData: Partial<CommonDataType>;
  tendencyData: TendencyDataItem[];
};

export default () => {
  const { brandId } = useModel('brandInfo');
  const [params, setParams] = useState<QueryParams>({ dateRange: null as any });
  const [selectType, setSelectType] = useState<1 | 2 | 3>(3);

  const [option, setOption] = useState<CompareSelectValue>({});

  const { loading, data } = useFetch(async () => {
    const { dateRange, shopIds } = params;
    if (!dateRange) throw null;
    return request.post<RemoteDataType>(requestAPI('order/dashboard/memberOverview'), {
      data: {
        brandId,
        shopIds,
        selectType,
        startTime: dateRange[0].format('YYYY-MM-DD'),
        endTime: dateRange[1].format('YYYY-MM-DD'),
      },
    });
  }, [params, selectType]);

  const updateTime = useMemo(() => {
    const now = moment();
    return now.format('YYYY-MM-DD（ddd）HH:mm');
  }, [data]);

  const statisticsData = data?.statisticsData || {};

  return (
    <PageHeaderWrapper>
      <div>
        <Card style={{ marginBottom: 24 }}>
          <Row align="middle" className="mb-16">
            <span style={{ marginRight: 16 }}>门店</span>
            <ArchitectureAndShop
              onShopIdsChange={(shopIds) =>
                setParams((p) => (p.shopIds === shopIds ? p : { ...p, shopIds }))
              }
            />
          </Row>
          <Row align="middle">
            <span style={{ marginRight: 16 }}>日期</span>
            <DateSelectFilter
              picks={['DAY_1', 'DAY_7', 'DAY_30', 'WEEK', 'MONTH', 'CUSTOM']}
              onDateTypeChange={parseDateType(setSelectType)}
              onChange={(dateRange) => setParams((p) => ({ ...p, dateRange }))}
            />
          </Row>
        </Card>

        <OptionContext.Provider value={option}>
          <Card>
            <Spin spinning={loading}>
              <Row className="mb-16" align="middle" justify="space-between">
                <Space align="center">
                  <div>会员概览</div>
                  <span>数据更新时间 {updateTime}</span>
                </Space>
                <CompareSelect selectedDateRange={params.dateRange} onChange={setOption} />
              </Row>

              <Row gutter={16}>
                <Col span={9}>
                  <Card>
                    <div>会员增长情况</div>
                    <Row>
                      {[
                        {
                          title: '新增会员',
                          key: 'newMemberNum',
                          tips: '统计时间内，品牌下新注册的会员人数',
                        },
                        {
                          title: '累计会员',
                          key: 'allMemberNum',
                          tips: '截止到统计时间的最后一天，品牌下累计注册的会员人数',
                        },
                      ].map(({ title, key, tips }) => (
                        <Col span={12} key={key}>
                          <Text type="secondary">
                            <Space align="center">
                              {title}
                              <Tooltip title={tips}>
                                <QuestionCircleOutlined />
                              </Tooltip>
                            </Space>
                          </Text>
                          <div>{formatNum(statisticsData[key]?.value)}</div>
                          <Space>
                            <Text type="secondary">{option.text}</Text>
                            <CompareData
                              value={statisticsData[key]}
                              prefixes={[
                                <CaretUpOutlined key="increase" />,
                                <CaretDownOutlined key="decrease" />,
                              ]}
                            />
                          </Space>
                        </Col>
                      ))}
                    </Row>
                  </Card>
                </Col>
                <Col span={15}>
                  <Card>
                    <div>会员消费情况</div>
                    <Row>
                      {[
                        {
                          title: '消费会员数',
                          key: 'paidMemberNum',
                          tips: '统计时间内，消费下单的会员人数',
                        },
                        {
                          title: '新客订单数',
                          key: 'newMemberOrderNum',
                          tips: '统计时间内，已支付订单中，新客的首单数',
                        },
                        {
                          title: '老客订单数',
                          key: 'oldMemberOrderNum',
                          tips: '统计时间内，除新客订单外的会员订单数',
                        },
                        {
                          title: '非会员订单数',
                          key: 'noMemberOrderNum',
                          tips: '统计时间内，已支付订单中，非会员的订单数',
                        },
                      ].map(({ title, key, tips }) => (
                        <Col span={6} key={key}>
                          <Text type="secondary">
                            <Space align="center">
                              {title}
                              <Tooltip title={tips}>
                                <QuestionCircleOutlined />
                              </Tooltip>
                            </Space>
                          </Text>
                          <div>{formatNum(statisticsData[key]?.value)}</div>
                          <Space>
                            <Text type="secondary">{option.text}</Text>
                            <CompareData value={statisticsData[key]} />
                          </Space>
                        </Col>
                      ))}
                    </Row>
                  </Card>
                </Col>
              </Row>
            </Spin>
            <div></div>
          </Card>
        </OptionContext.Provider>
      </div>
    </PageHeaderWrapper>
  );
};
```

## API

### CompareData

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| className | 自定义类名 | string | - |
| style | 自定义样式 | CSSProperties | - |
| value | 需要展示的值 | DataItem | - |
| prefixes | 数据前缀 | [ReactNode, ReactNode] | [<ArrowUpOutlined className="data-increase" key="increase" />,ArrowDownOutlined className="data-decrease" key="decrease">] |
| format | 数据进行转换的格式 | function | (v) => v |
| placeholder | 无数据时的占位符 | string | - |

### CompareSelect

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| selectedDateRange | 选择对比的时间范围     | Nullable<(Moment \| string)[]> | - |
| value | 需要展示的值 | DataItem | - |
| defaultValue | 默认展示的值 | [ReactNode, ReactNode] | [<ArrowUpOutlined className="data-increase" key="increase" />,ArrowDownOutlined className="data-decrease" key="decrease">] |
| format | 数据进行转换的格式 | function | (v) => v |
| onChange | 切换对比方式的回调 | function(CompareSelectValue) | - |
