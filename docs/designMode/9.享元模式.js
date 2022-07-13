
var objPoolFactory = function(createObjFn) {
  var objPool = [];
  return {
    create: function() {
      console.log(objPool.length, 'objPool.length')
      var obj = objPool.length === 0 
        ? createObjFn.apply(this,arguments)
        : objPool.shift();
      return obj;
    },
    recover: function(obj) {
      return objPool.push(obj)
    }
  }
}

var iframeFactory = objPoolFactory(function() {
  var iframe = document.createElement('iframe');
  document.body.appendChild(iframe);
  iframe.onload = function() {
    iframe.onload = null;
    iframeFactory.recover(iframe);
  }
  return iframe;
})

var iframe1 = iframeFactory.create();
iframe1.src = 'http://www.baidu.com';

var iframe2 = iframeFactory.create();
iframe2.src = 'http://www.qq.com';

setTimeout(() => {
  var iframe3 = iframeFactory.create();
  iframe3.src = 'http://www.163.com';
}, 3000)
