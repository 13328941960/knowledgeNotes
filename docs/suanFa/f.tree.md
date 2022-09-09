# 树

树，它对于存储需要快速查找的数据非常有用。

## 树的概念

位于树顶部的节点叫作**根节点**

树中的每个元素都叫作**节点**，节点分为**内部节点**和**外部节点**。至少有一个子节点的节点称为**内部节点**。

**子树**由节点和它的后代构成。

节点的一个属性是**深度**，节点的深度取决于它的祖先节点的数量。

比如，节点有3个祖先节点，它的深度为3。

树的**高度**取决于所有节点深度的最大值。

## 二叉树和二叉搜索树

**二叉树**中的节点最多只能有两个子节点：一个是左侧子节点，另一个是右侧子节点。

**二叉搜索树**（BST）是二叉树的一种，但是只允许你在左侧节点存储（比父节点）小的值，在右侧节点存储（比父节点）大的值。

##  树的遍历

遍历一棵树是指访问树的每个节点并对它们进行某种操作的过程。

访问树的所有节点有三种方式：中序、先序和后序。

### 中序遍历

**中序遍历**是一种以上行顺序访问BST所有节点的遍历方式，也就是以从最小到最大的顺序访问所有节点

### 先序遍历

**先序遍历**是以优先于后代节点的顺序访问每个节点的

### 后序遍历

**后序遍历**后序遍历则是先访问节点的后代节点，再访问节点本身

```js
function Node(data, left, right) {
  this.data = data;
  this.left = left;
  this.right = right;
}

Node.prototype = {
  show: function () {
    console.log(this.data);
  }
}

function Tree() {
  this.root = null;
}

Tree.prototype = {
  insert: function (data) {
      var node = new Node(data, null, null);
      if (!this.root) {
          this.root = node;
          return;
      }
      var current = this.root;
      var parent = null;
      while (current) {
          parent = current;
          if (data < parent.data) {
              current = current.left;
              if (!current) {
                  parent.left = node;
                  return;
              }
          } else {
              current = current.right;
              if (!current) {
                  parent.right = node;
                  return;
              }
          }

      }
  },
  getMin: function () {
      var current = this.root;
      while(current){
          if(!current.left){
              return current;
          }
          current = current.left;
      }
  },
  getMax: function () {
      var current = this.root;
      while(current){
          if(!current.right){
              return current;
          }
          current = current.right;
      }
  },
  getDeep: function (node,deep) {
      deep = deep || 0;
      if(node == null){
          return deep;
      }
      deep++;
      var dleft = this.getDeep(node.left,deep);
      var dright = this.getDeep(node.right,deep);
      return Math.max(dleft,dright);
  },
  getNode: function (data, node) {
    if (node) {
        if (data === node.data) {
            return node;
        } else if (data < node.data) {
            return this.getNode(data,node.left);
        } else {
            return this.getNode(data,node.right);
        }
    } else {
        return null;
    }
  },
  // inOrderTraverseNode: function (node, callback) {
  //   if (node != null) {
  //     this.inOrderTraverseNode(node.left, callback);
  //     callback(node.data);
  //     this.inOrderTraverseNode(node.right, callback);
  //   }
  // },
  // inOrderTraverse(callback) {      
  //   this.inOrderTraverseNode(this.root, callback); 
  // },

  // inOrderTraverse: function(callback) {
  //   const stack = [];
  //   let current = this.root;
  //   while (current || stack.length > 0) {
  //     while (current) {
  //       stack.push(current);
  //       current = current.left;
  //     }
  //     current = stack.pop();
  //     callback(current.data)
  //     current = current.right;
  //   }
  // },

  preOrderTraverseNode: function (node, callback) {
    if (node != null) {
      callback(node.data, '1');
      this.preOrderTraverseNode(node.left, callback);
      this.preOrderTraverseNode(node.right, callback);
    }
  },
  inOrderTraverse: function(callback) {
    this.preOrderTraverseNode(this.root, callback)
  }
}

var t = new Tree();
t.insert(3);
t.insert(8);
t.insert(1);
t.insert(2);
t.insert(5);
t.insert(7);
t.insert(6);
t.insert(0);
// console.log(t);
// t.middleOrder(t.root);
// console.log(t.getMin(), t.getMax());
// console.log(t.getDeep(t.root, 0));
// console.log(t.getNode(5,t.root));

t.inOrderTraverse((value) => console.log(value))
```

## 自平衡树

AVL树是一种**自平衡二叉搜索树**，意思是任何一个节点左右两侧子树的高度之差最多为1
