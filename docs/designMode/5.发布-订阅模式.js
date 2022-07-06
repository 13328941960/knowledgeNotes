

var Event = (function() {
    var Event;
    var _defalut = 'default';

    Event = function() {
        var offlineStack = [] // 离线缓存_trigger事件
        var callBack = {} // 回调事件
        var _listen, _trigger,_remove,_create
        var namespaceCache = {};
        var each = function(array, fn) {
            var ret;
            for(var i = 0; i < array.length; i++) {
                var n = array[i];
                ret = fn.call(n, i, n)
            }
            return ret;
        }
        _listen = function(key, fn, listenCallBack) {
            if(!listenCallBack[key]) {
                listenCallBack[key] = [];
            }
            listenCallBack[key].push(fn);
        };

        _remove = function(key, listenCallBack, fn) {
            if(listenCallBack[key]) {
                if(fn) {
                    for(var i = listenCallBack[key].length; i >= 0; i--) {
                        if (listenCallBack[key][i] === fn) {
                            listenCallBack[key].splice(i, 1);
                        }
                    }
                }  else {
                    listenCallBack[key] = [];
                }
            }
        }

        _trigger = function () {
            var listenCallBack = Array.prototype.shift.call(arguments);
            var key = Array.prototype.shift.call(arguments);
            var args = arguments;
            var _self = this;
            var stack = listenCallBack[key];
            if (!stack || stack.length === 0) return false;
            return each(stack, function() {
                return this.apply(_self, args)
            })
        }

        _create = function(namespace) {
            var namespace = namespace || _defalut;
            namespaceCache[namespace] = {
              listen: function(key, fn, last) {
                  _listen(key, fn, callBack);
                  if(offlineStack.length === 0) {
                      return;
                  }
                  if (last === 'last') {
                      offlineStack.length > 0 && offlineStack.pop()()
                  } else {
                      each(offlineStack, function() {
                        this()
                      })
                  }
                  offlineStack = [];
              },
              one: function(key, fn, last) {
                  _remove(key, callBack);
                  this.listen(key, fn, last);
              },
              remove: function(key, fn) {
                _remove(key, callBack, fn)
              },
              trigger: function() {
                  var _self = this;
                  Array.prototype.unshift.call(arguments, callBack)

                  var args = arguments;
                  var fn = function() {
                      return _trigger.apply(_self, args)
                  };
                  if (offlineStack) {
                    offlineStack.push(fn);
                  }

                  return fn();
              }
            };
            return namespaceCache[namespace]
        }
        return {
            create: _create,
            one: function(key, fn, last) {
                var event = this.create();
                event.one(key, fn, last);
            },
            remove: function(key, fn) {
                var event = this.create();
                event.remove(key, fn);
            },
            listen: function(key, fn, last) {
                var event = this.create();
                event.listen(key, fn, last);
            },
            trigger: function() {
                var event = this.create();
                return event.trigger.apply(this, arguments)
            },
        };
    }();
    return Event;
})()
// 先发布后订阅
var callback = function() {
    console.log(1)
}
Event.trigger('click', 1)
Event.listen('click', callback)
// Event.remove('click', callback)
// 使用命名空间

// Event.create('namespace1').listen('click', function(a) {
//     console.log(a)
// })

// Event.create('namespace1').trigger('click', 1);

// Event.create('namespace2').listen('click', function(a) {
//     console.log(a)
// })

// Event.create('namespace2').trigger('click', 2);