# 算法

## 分而治之

1. **分解**原问题为多个子问题（原问题的多个小实例）。
2. **解决**子问题，用返回解决子问题的方式的递归算法。递归算法的基本情形可以用来解决子问题。
3. **组合**这些子问题的解决方式，得到原问题的解

## 动态规划

动态规划是一种将复杂问题分解成更小的子问题来解决的优化技术

用动态规划解决问题时，要遵循三个重要步骤：

(1) 定义子问题；

(2) 实现要反复执行（递归）来解决子问题的部分

(3) 识别并求解出基线条件。

### 最少硬币找零问题

**最少硬币找零问题**是给出要找零的钱数，以及可用的硬币面额d1,…, dn及其数量，找到所需的最少的硬币个数。

```js
function minCoinChange(coins, amount) {      
  const cache = []; // {1}      
  const makeChange = (value) => { // {2}        
    if (!value) { // {3}          
      return [];        
    }        
    if (cache[value]) { // {4}          
      return cache[value];        
    }        
    let min = [];        
    let newMin;        
    let newAmount;        
    for (let i = 0; i < coins.length; i++) { // {5}          
      const coin = coins[i];
      newAmount = value - coin; // {6}        
      if (newAmount >= 0) {            
        newMin = makeChange(newAmount); // {7}          
      }
      if (newAmount >= 0 && // {8}            
        (newMin.length < min.length -1 || ! min.length) && // {9}            
        (newMin.length || ! newAmount) // {10}          
      ) {            
        min = [coin].concat(newMin); // {11}            
        // console.log('new Min ' + min + ' for ' + value);          
      }        
    }
    return (cache[value] = min); // {12}      
  };
  return makeChange(amount); // {13}    
}

console.log(minCoinChange([1, 5, 10, 25], 5));
```

### 背包问题

**背包问题**是一个组合优化问题。它可以描述如下：给定一个固定大小、能够携重量W的背包，以及一组有价值和重量的物品，找出一个最佳解决方案，使得装入背包的物品总重量不超过W，且总价值最大。

```js
function findValues(n, capacity, kS, weights, values) {
  let i = n;
  let k = capacity;
  console.log('构成解的物品：');
  console.log(i, k)
  while (i > 0 && k > 0) {
    console.log(kS[i][k], 'kS[i][k]')
    console.log(kS[i -1][k], 'kS[i -1][k]')
    if (kS[i][k] !== kS[i -1][k]) {
      console.log(`物品 ${i} 可以是解的一部分w: ${weights[i -1]}, v: ${values[i -1]}`);
      i--;
      k -= kS[i][k];
    } else {
      i--;
    }
  }
}

function knapSack(capacity, weights, values, n) {
  const kS = [];
  for (let i = 0; i <= n; i++) { // {1} 初始化将用于寻找解决方案的矩阵
    kS[i] = [];
  }
  // console.log(kS, 'kS') 
  for (let i = 0; i <= n; i++) {
    // console.log(i, 'i')
    for (let w = 0; w <= capacity; w++) {
      if (i === 0 || w === 0) { // {2} 忽略矩阵的第一列和第一行，只处理索引不为0的列和行
        // console.log(w, 'w')
        kS[i][w] = 0;
        // console.log(kS, 'kS[i][w]')
      }
      else if (weights[i -1] <= w) { // {3} 物品i的重量必须小于约束(capacity)
        // console.log(`weights[i -1]: ${weights[i -1]}`, `w: ${w}`, weights[i -1] <= w)
        // console.log(i, 'i')
        // console.log(values[i -1], 'values[i -1]')
        // console.log(kS[i -1], 'kS[i -1]')
        // console.log([w - weights[i -1]], '[w - weights[i -1]')
        const a = values[i -1] + kS[i -1][w - weights[i -1]]; // 当前物品价值 + 还能再装下的物品价值 
        // console.log(`a: ${a}`)
        const b = kS[i -1][w]; // 上一个物品，当前重量能装的物品价值
        // console.log(`b: ${b}`)
        kS[i][w] = a > b ? a : b; // {4} max(a, b) 当找到可以构成解决方案的物品时，选择价值最大的那个
        // console.log(kS, 'kS[i][w]')
      }
      else {
        kS[i][w] = kS[i -1][w]; // {5} 总重量就会超出背包能够携带的重量，这是不可能发生的，发生这种情况时，只要忽略它，用之前的值就可以
      }
    }
  }
  findValues(n, capacity, kS, weights, values); // {6} 增加的代码
  // console.log(kS, 'kS')
  // console.log(n, capacity)
  return kS[n][capacity]; // {7} 最后，问题的解决方案就在这个二维表格右下角的最后一个格子里
}

const values = [3,4,5], 
weights = [2,3,4],
capacity = 5,
n = values.length;

console.log(knapSack(capacity, weights, values, n)); // 输出7
```

### 最长公共子序列
**最长公共子序列（LCS）**：找出两个字符串序列的最长子序列的长度。最长子序列是指，在两个字符串序列中以相同顺序出现，但不要求连续（非字符串子串）的字符串序列。

```js
function printSolution(solution, wordY, wordYlength, wordXlength) {
  console.log(solution, wordY)
  let x = solution[wordYlength][wordXlength];
  let answer = '';
  while (x !== '0') {
    console.log('__________________________________')
    if (solution[wordYlength][wordXlength] === 'diagonal') {
      answer = wordY[wordYlength - 1] + answer;
      wordYlength--;
      wordXlength--;
      x = solution[wordYlength][wordXlength];
    } else if (solution[wordYlength][wordXlength] === 'left') {
      wordXlength--;
    } else if (solution[wordYlength][wordXlength] === 'top') {
      wordYlength--;
    }
  }
  console.log('lcs: ' + answer);
}

function lcs(wordY, wordX) {
  const wordYlength = wordY.length;
  const wordXlength = wordX.length;
  const l = [];
  const solution = []
  for (let y = 0; y <= wordYlength; y++) {
    l[y] = []
    solution[y] = [];
    for (let x = 0; x <= wordXlength; x++) {
      l[y][x] = 0;
      solution[y][x] = '0';
    }
  }
  // console.log(l, 'l')

  for (let y = 0; y <= wordYlength; y++) {
    // console.log('_______________________')
    for (let x = 0; x <= wordXlength; x++) {
      if (y === 0 || x === 0) {
        l[y][x] = 0;
        // console.log('y', y,'x', x, 'value', 0)    
      } else if (wordY[y - 1] === wordX[x - 1]) {
        // console.log(wordY[y - 1], wordX[x - 1], wordY[y - 1] === wordX[x - 1], 'wordy[y - 1] === wordx[x - 1]')
        l[y][x] = l[y - 1][x - 1] + 1;
        solution[y][x] = 'diagonal';  
        // console.log(l, 'l')
        // console.log('y', y,'x', x, 'value', l[y - 1][x - 1] + 1)    
      } else {
        const a = l[y - 1][x];
        const b = l[y][x - 1];
        // console.log('y', y,'x', x, 'value', a > b ? a : b, 'a', a, 'b', b)
        l[y][x] = a > b ? a : b; // max(a,b)
        solution[y][x]=(l[y][x] == l[y-1][x]) ? 'top' : 'left';       
      }
    }
  }
  // console.log(l, 'l')
  return printSolution(solution, wordY, wordYlength, wordXlength); 
}

 
lcs('acbaed', 'abcadf')
```

### 矩阵链相乘

```js
function matrixChainOrder(arr) {      
  const arrLenth = arr.length;      
  const m = [];      
  // const s = [];  
  // for (let i = 0; i <= n; i++){      
  //   s[i] = [];      
  //   for (let j=0; j <= n; j++){        
  //     s[i][j] = 0;      
  //   }    
  // }
  for (let i = 1; i <= arrLenth; i++) {        
    m[i] = [];        
    m[i][i] = 0;      
  }
  console.log('m', m)
  for (let l = 2; l < arrLenth; l++) {
    console.log('_________________________')
    // console.log('l', l, '(arrLenth - l) + 1', (arrLenth - l) + 1)  
    for (let i = 1; i <= (arrLenth - l) + 1; i++) {
      const j = (i + l) -1;
        
      m[i][j] = Number.MAX_SAFE_INTEGER;

      for (let k = i; k <= j -1; k++) {
        const q = m[i][k] + m[k + 1][j] + ((arr[i -1] * arr[k]) * arr[j]); // {1}
        console.log('i', i, 'j', j, 'k', k, 'q', q, 'm[i][j]', m[i][j])           
        if (q < m[i][j]) {              
          m[i][j] = q; // {2}
  //         // s[i][j] = k;         
        }          
      }        
    }     
  }
  // printOptimalParenthesis(s, 1, n-1);
  // console.log(n, 'n');
  // console.log(m, 'm');
  // // console.log(s, 's');
  return m[1][arrLenth -1]; // {3}  
}

const arr = [10, 100, 5, 50, 1];    
console.log(matrixChainOrder(arr));

// function printOptimalParenthesis(s, i, j){
//   if(i === j) {
//     console.log("A[" + i + "]");
//   } else {
//     console.log("(");
//     printOptimalParenthesis(s, i, s[i][j]);
//     printOptimalParenthesis(s, s[i][j] + 1, j);
//     console.log(")");
//   }
// }
```

## 贪心算法

**贪心算法**遵循一种近似解决问题的技术，期盼通过每个阶段的局部最优选择（当前最好的解），从而达到全局的最优（全局最优解）。它不像动态规划算法那样计算更大的格局。

### 最少硬币找零问题
```js
function minCoinChange(coins, amount) {
  const change = [];
  let total = 0;
  for (let i = coins.length; i >= 0; i--) {// {1}
    const coin = coins[i];
    while (total + coin <= amount) { // {2}
      console.log('i', i, 'total', total, 'coin', coin)
      change.push(coin); // {3}
      console.log('change', change)
      total += coin; // {4}
    }
  }
  return change;
}

console.log(minCoinChange([1, 3, 4], 6));
console.log(minCoinChange([1, 5, 10, 25], 36));
```

## 回溯算法

回溯是一种渐进式寻找并构建问题解决方式的策略。我们从一个可能的动作开始并试着用这个动作解决问题。如果不能解决，就回溯并选择另一个动作直到将问题解决。根据这种行为，回溯算法会尝试所有可能的动作（如果更快找到了解决办法就尝试较少的次数）来解决问题。

有一些可用回溯解决的著名问题：

+ 骑士巡逻问题
+ N皇后问题
+ 迷宫老鼠问题
+ 数独解题器

### 迷宫老鼠问题

```js
function ratInAMaze(maze) {
  const solution = [];
  // 首先创建一个包含解的矩阵。将每个位置初始化为零
  for (let i = 0; i < maze.length; i++) { // {1}
    solution[i] = [];
    for (let j = 0; j < maze[i].length; j++) {
      solution[i][j] = 0;
    }
  }
  // 对于老鼠采取的每步行动，我们将路径标记为1。如果算法能够找到一个解
  if (findPath(maze, 0, 0, solution) === true) { // {2} 
    // 就返回解决矩阵， 
    return solution;
  }
  // 否则返回一条错误信息
  return 'NO PATH FOUND'; // {3}   
}

function findPath(maze, x, y, solution) {
  const n = maze.length;
  // 算法的第一步是验证老鼠是否到达了终点
  if (x === n - 1 && y === n - 1) { // {4}
    // 如果到了，就将最后一个位置标记为路径的一部分 
    solution[x][y] = 1;
    // 并返回true，表示移动成功结束
    console.log('y', x, 'x', y)
    return true;
  }
  // 如果不是最后一步，要验证老鼠能否安全移动至该位置,
  // 表示根据下面声明的isSafe方法判断出该位置空闲）。
  if (isSafe(maze, x, y) === true) { // {5}
    // 如果是安全的，我们将这步加入路径       
    solution[x][y] = 1; // {6}
    // 试着在maze矩阵中水平移动（向右）到下一个位置
    console.log('x', x, 'y', y, 'isSafe', isSafe(maze, x, y))
    if (findPath(maze, x + 1, y, solution)) { // {7}
      console.log('findPathx')
      return true;
    }
    // 如果水平移动不可行，我们就试着垂直向下移动到下一个位置
    if (findPath(maze, x, y + 1, solution)) { // {8}
      console.log('findPathy')
      return true;
    }
    // 如果水平和垂直都不能移动，那么将这步从路径中移除并回溯
    // 表示算法会尝试另一个可能的解
    solution[x][y] = 0; // {9}        
    return false;
  }
  // 在算法尝试了所有可能的动作还是找不到解时，就返回false，
  // 表示这个问题无解
  return false; // {10}    
}

function isSafe(maze, x, y) {
  const n = maze.length;
  if (x >= 0 && y >= 0 && x < n && y < n && maze[x][y] !== 0) {
    return true; // {11}      
  }
  return false;
}

const maze = [
  [1, 1, 0, 0],
  [0, 1, 1, 1],
  [1, 0, 1, 0],
  [1, 1, 1, 1]
];
console.log('maze', maze)
console.log(ratInAMaze(maze));
```

### 数独

```js
function sudokuSolver(matrix) {
  if (solveSudoku(matrix) === true) {
    return matrix;
  }
  return '问题无解！';
}

const UNASSIGNED = 0;
function solveSudoku(matrix) {
  let row = 0;
  let col = 0;
  let checkBlankSpaces = false;
  // 第一步是验证谜题是否已被解决
  for (row = 0; row < matrix.length; row++) { // {1}
    for (col = 0; col < matrix[row].length; col++) {
      console.log('行', row, '列', col, matrix[row][col] === UNASSIGNED ? '是空的，开始试着用1～9填写这个位置，一次填一个' : '有值')
      if (matrix[row][col] === UNASSIGNED) {
        // 如果有空白位置
        checkBlankSpaces = true; // {2}            
        break;
      }
    }
    if (checkBlankSpaces === true) { // {3}
      // 我们要从两个循环中跳出        
      break;
    }
  }
  // 如果没有空白的位置（值为0的位置）
  if (checkBlankSpaces === false) {
    // 表示谜题已被完成
    return true; // {4}      
  }
  // 开始试着用1～9填写这个位置，一次填一个
  for (let num = 1; num <= 9; num++) { // {5}
    // 在这行、这列或在小矩阵（3×3矩阵）中没有出现过
    console.log('____________________________')
    console.log('检查数字', num, '是否符合规则')
    if (isSafe(matrix, row, col, num)) { // {6}
      // 如果符合，我们就将这个数字填入         
      matrix[row][col] = num; // {7}
      console.log(matrix, 'matrix')  
      // 并再次执行solveSudoku函数来尝试填写下一个位置     
      if (solveSudoku(matrix)) { // {8}            
        return true;
      }
      // 如果一个数字填在了不正确的位置，我们就再将这个位置标记为空
      console.log('如果一个数字填在了不正确的位置，我们就再将这个位置标记为空')
      console.log(row, col)
      matrix[row][col] = UNASSIGNED; // {9}        
    }
  }
  // 并且算法会回溯,再尝试一个其他数字。
  console.log('算法会回溯,再尝试一个其他数字')
  return false; // {10}    
}

function isSafe(matrix, row, col, num) {
  return (
    !usedInRow(matrix, row, num) &&
    !usedInCol(matrix, col, num) &&
    !usedInBox(matrix, row - (row % 3), col - (col % 3), num)
  );
}

function usedInRow(matrix, row, num) {
  // 首先，通过迭代矩阵中给定行row中的每个位置检查数字是否在行row中存在   
  for (let col = 0; col < matrix.length; col++) { // {11}        
    if (matrix[row][col] === num) {
      console.log('行：存在')                  
      return true;
    }      
  }
  console.log('行：不存在')     
  return false;    
}    
function usedInCol(matrix, col, num) {     
  // 迭代所有的列来验证数字是否在给定的列中存在 
  for (let row = 0; row < matrix.length; row++) { // {12}
    if (matrix[row][col] === num) {
      console.log('列：存在')                  
      return true;        
    }   
  }
  console.log('列：不存在')                      
  return false;    
}    
function usedInBox(matrix, boxStartRow, boxStartCol, num) {      
  for (let row = 0; row < 3; row++) {        
    for (let col = 0; col < 3; col++) {      
      // 最后的检查是通过迭代3×3矩阵中的所有位置来检查数字是否在小矩阵中存在    
      if (matrix[row + boxStartRow][col + boxStartCol] === num) { // {13}
        console.log('矩阵：存在')            
        return true;          
      }        
    }      
  }
  console.log('矩阵：不存在')                  
  return false;    
}


const sudokuGrid = [
  [5, 3, 0, 0, 7, 0, 0, 0, 0],
  [6, 0, 0, 1, 9, 5, 0, 0, 0],
  [0, 9, 8, 0, 0, 0, 0, 6, 0],
  [8, 0, 0, 0, 6, 0, 0, 0, 3],
  [4, 0, 0, 8, 0, 3, 0, 0, 1],
  [7, 0, 0, 0, 2, 0, 0, 0, 6],
  [0, 6, 0, 0, 0, 0, 2, 8, 0],
  [0, 0, 0, 4, 1, 9, 0, 0, 5],
  [0, 0, 0, 0, 8, 0, 0, 7, 9]
];
console.log(sudokuSolver(sudokuGrid));
```
