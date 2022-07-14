var goods = {
  "red": 3,
  "blue": 6,
}

var colorSelect = document.getElementById('colorSelect')

var numberInput = document.getElementById('numberInput')
var colorInfo = document.getElementById('colorInfo')
var numberInfo = document.getElementById('numberInfo')
var nextBtn = document.getElementById('nextBtn')

colorSelect.onchange = function() {
  var color = this.value,
  number = numberInput.value
  stock = goods[color];

  colorInfo.innerHTML = color;
  if(!color) {
    nextBtn.disabled = true;
    nextBtn.innerHTML = '请选择颜色';
    return;
  }
  if (Number.isInteger(number - 0) && number > 0) {
    nextBtn.disabled = true;
    nextBtn.innerHTML = '请输入正确的数量';
    return;
  }

  if (number > stock) {
    nextBtn.disabled = true;
    nextBtn.innerHTML = '库存不足';
    return;
  }

  nextBtn.disabled = false;
  nextBtn.innerHTML = '加入购物车'
}

numberInput.oninput = function() {
  var color = this.value,
  number = numberInput.value
  stock = goods[color];

  colorInfo.innerHTML = color;
  if(!color) {
    nextBtn.disabled = true;
    nextBtn.innerHTML = '请选择颜色';
    return;
  }
  if (Number.isInteger(number - 0) && number > 0) {
    nextBtn.disabled = true;
    nextBtn.innerHTML = '请输入正确的数量';
    return;
  }

  if (number > stock) {
    nextBtn.disabled = true;
    nextBtn.innerHTML = '库存不足';
    return;
  }

  nextBtn.disabled = false;
  nextBtn.innerHTML = '加入购物车'
}
