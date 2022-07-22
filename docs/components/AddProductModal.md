# AddProductModal 添加商品弹框

添加商品弹框

## 何时使用
- 在某处需要添加商品

## 代码演示

```js
import AddProductModal from '@/components/AddProductModal';
import { useModal } from '@shihengtech/hooks';
import { Commodity } from '@/types/pages/commodity';

const App: React.FC = () => {
  const addProductModal = useModal<Commodity>();
  const onChange = (value: Commodity) => {
    console.log(value, '商品')
  }
  return (
    <>
      <a onClick={() => addProductModal.openModal()}>+添加商品</a>

      {addProductModal.visible
        && <AddProductModal
          {...addProductModal} 
          onChange={onChange}
        />
      }
    </>
  )
}

```

## API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| visible | useModal中的visible | boolean | false |
| initValue | useModal中的initValue，useModal的openModal方法中传递值 | void | - |
| closeModal | useModal中的closeModal | string | - |
| onChange | 选择商品改变后的回调 | function(Commodity) | - |
