var username = document.getElementById('username');
password = document.getElementById('password');
submitBtn = document.getElementById('submitBtn');

var before = function(fn, beforefn) {
  return function() {
    if (beforefn.apply(this, arguments) === false) {
      return
    }
    
    return fn.apply(this, arguments);
  }
}

var validata = function() {
  if (username.value === '') {
    alert('用户名不能为空')
    return false;
  }
  if (password.value === '') {
    alert('密码不能为空')
    return false
  }
}

var formSubmit = function() {
  var param = {
    username: username.value,
    password: password.value
  }
  console.log('ajax', param)
}

formSubmit = before(formSubmit, validata);

submitBtn.onclick = function(){
  formSubmit();
}
