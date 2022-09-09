# 排序和搜索算法

## 排序

公共行数

```js
const Compare = {
  LESS_THAN: -1,
  BIGGER_THAN: 1,
  EQUALS: 0
};

const DOES_NOT_EXIST = -1;

function compareFn(a, b) {
  if (a === b) {
    return Compare.EQUALS;
  }
  return a < b ? Compare.LESS_THAN : Compare.BIGGER_THAN;
}

function swap(array, index1, index2) {
  var aux = array[index1];
  array[index1] = array[index2];
  array[index2] = aux;
}
function qsort (arr) {
  return quick(arr, 0, arr.length - 1)
}
```

### 冒泡排序

冒泡排序是对比相邻的两个项，如果第一个比第二个大，则交换它们。

复杂度：O(n^2)

```js
function sort(arr) {
  const { length } = arr;
  for(let i = 0; i < length; i++) {
    for( let j = 0; j < length -1 - i; j++) {
      if (defaultCompare(arr[j], arr[j + 1]) === Compare.BIGGER_THAN) {
        swap(arr, j, j + 1)
      }
    }
  }
  return arr;
}
```

### 选择排序

选择数据结构中最小值并放置在第一位，接着找到第二小的值放在第二位。

复杂度：O(n^2)

```js
function sort(arr) {
  const { length } = arr;
  let indexMin;
  for(let i = 0; i < length - 1; i++) {
    indexMin = 1;
    for (let j = 0; j < length; j++) {
      if (defaultCompare(arr[indexMin], array[j]) === Compare.BIGGER_THAN) {
        indexMin = j;
      }
    }
    if (i !== indexMin) {
      swap(arr, i, indexMin)
    }
    return array
  }
}
```

### 插入排序

**插入排序**每次排一个数组项，以此方式构建最后的排序数组。假定第一项已经排序了。接着，它和第二项进行比较——第二项是应该待在原位还是插到第一项之前呢？这样，头两项就已正确排序，接着和第三项比较（它是该插入到第一、第二还是第三的位置呢），以此类推。

复杂度：O(n)

```js
function sort(arr) {
  const { length } = arr;
  let temp;
  for(let i = 1; i < length; i++) {
    let j = i;
    temp = arr[i];
    while (j > 0 && defaultCompare(arr[j - 1], temp) === Compare.BIGGER_THAN) {
      arr[j] = arr[j - 1];
      j--;
    }
    arr[j] = temp;
  }
  return arr;
}
```
排序小型数组时，此算法比选择排序和冒泡排序性能要好。

### 并归排序

**归并排序**是一种分而治之算法。其思想是将原始数组切分成较小的数组，直到每个小数组只有一个位置，接着将小数组归并成较大的数组，直到最后只有一个排序完毕的大数组。

复杂度：O(nlog(n))

```js
function merge(left, right) {
  let i = 0;
  let j = 0;
  const result = [];
  while(i < left.length && j < right.length) {
    result.push(
      defaultCompare(left[i], right[j]) === Compare.LESS_THAN ? left[i] : right[j++]
    )
  }

  return result.concat(i < left.length ? left.slice(i) : right.slice(j))
}

function msort(arr) {
  if (arr.length > 1) {
    const { length } = arr;
    const mid = Math.floor(length / 2);
    const left = msort(arr.slice(0, mid));
    const right = msort(arr.slice(mid));
    arr = merge(left, right)
  }
  return arr;
}

const arr = [8,7,6,5,4,3,2,1]
console.log(msort(arr))
```

### 快速排序

**快速排序**也许是最常用的排序算法了。它的复杂度为O(nlog(n))，且性能通常比其他复杂度为O(nlog(n))的排序算法要好。和归并排序一样，快速排序也使用分而治之的方法，将原始数组分为较小的数组（但它没有像归并排序那样将它们分割开）。

```js
function quick(arr, left, right) {
  if (arr.length > 1) {
    index = partition(arr, left, right)
    if (left < index -1) {
      quick(arr, left, index - 1)
    }

    if (index < right) {
      quick(arr, index, right)
    }
  }
  return arr;
}

function partition(arr, left, right) {
  const pivot = arr[Math.floor((right + left) / 2)];
  let i = left;
  let j = right;

  while (i <= j) {
    while(compareFn(arr[i], pivot) === Compare.LESS_THAN) {
      i++;
    }
    while(compareFn(arr[j], pivot) === Compare.BIGGER_THAN) {
      j--;
    }
    if (i <=j) {
      swap(arr, i, j)
      i++;
      j--;
    }
  }
  return i;
}
```

## 搜索


```js
function lesserOrEquals(a, b) {      
  const comp = compareFn(a, b);      
  return comp === Compare.LESS_THAN || comp === Compare.EQUALS;    
}

function binarySearch(array, value) {   
  const sortedArray = qsort(array); // {1}      
  let low = 0; // {2}      
  let high = sortedArray.length -1; // {3}
  while (lesserOrEquals(low, high)) { // {4}        
    const mid = Math.floor((low + high) / 2); // {5}        
    const element = sortedArray[mid]; // {6}        
    if (compareFn(element, value) === Compare.LESS_THAN) { // {7}          
      low = mid + 1; // {8}        
    } else if (compareFn(element, value) === Compare.BIGGER_THAN) { // {9}          
      high = mid -1; // {10}        
    } else {
      return mid; // {11}
    }
  }      
  return DOES_NOT_EXIST; // {12}    
}
```
