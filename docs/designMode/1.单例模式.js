 
/**
 * 1.实现一个简单的单例模式
 * 缺点：使用者得知道这是个单例模式，否则不知道要用Singleton.getInstance来创建。
 */

// var Singleton = function(name) {
//     this.name = name;
//     this.instance = null;
// }

// Singleton.prototype.getName = function() {
//     alert(this.name);
// }

// Singleton.getInstance = function(name) {
//     if (!this.instance) {
//         this.instance = new Singleton(name)
//     }
//     return this.instance;
// }

// var a = Singleton.getInstance('sven1');
// var b = Singleton.getInstance('sven2');
// alert(a === b);
// console.log(a)
// console.log(b)

/** 2. 透明性的单例模式 */ 

// var createDiv = (function() {
//     var instance;

//     var createDiv = function(html) {
//         if (instance) {
//             return instance;
//         }
//         this.html = html;
//         this.init();
//         return instance = this;
//     }

//     createDiv.prototype.init = function() {
//         var div = document.createElement('div');
//         div.innerHTML = this.html;
//         document.body.appendChild(div)
//     }

//     return createDiv
// })()

// var a = new createDiv('seven1');
// var b = new createDiv('seven2');
// console.log(a, b)

/** 3. 用代理实现单例模式 */ 

// function createDiv(html) {
//     this.html = html;
//     this.init();
// }

// createDiv.prototype.init = function() {
//     var div = document.createElement('div');
//     div.innerHTML = this.html;
//     document.body.appendChild(div);
// }

// var proxyCreateDiv = (function() {
//     var instance;
//     return function(html) {
//         if (!instance) {
//             instance = new createDiv(html)
//         }
//         return instance
//     }
// })()

// var a = new proxyCreateDiv('sven1');
// var b = new proxyCreateDiv('sven2')

// console.log(a)
// console.log(b)

/**4. JavaScript中的单例模式 */

// var MyApp = {};

// MyApp.namespace = function(name) {
//     var parts = name.split('.');
//     var current = MyApp;
//     for(var i in parts) {
//         if (!current[parts[i]]) {
//             current[parts[i]] = {};
//             console.log(current[parts[i]])
//         }
//         current = current[parts[i]]
//     }
// }

// MyApp.namespace('event');
// MyApp.namespace('dom.style');
// console.dir(MyApp);

// var user = (function() {
//     var __name = 's',__age = 29;
//     return {
//         getUserInfo: function() {
//             return __name + '-' + __age;
//         }
//     }
// })()

/**
 * 5. 惰性单例：需要的时候才创建对象实例。
 */

// var createLoginLayer = (function() {
//     var div;
//     return function() {
//         if (!div) {
//             div = document.createElement('div');
//             div.innerHTML = '我是登录浮窗';
//             div.style.display = 'none';
//             document.body.appendChild(div)
//         }
//         return div;
//     }
// })()

// document.getElementById('loginBtn').onclick = function() {
//     var loginLayer = createLoginLayer();
//     loginLayer.style.display = 'block';
// }

/**6. 通用的惰性单例 */

var getSingele = function(fn) {
    var result;
    return function() {
        return result || (result = fn.apply(this, arguments));
    }
}

var createLoginLayer = function() {
    var div = document.createElement('div');
    div.innerHTML = '我是登录浮窗';
    div.style.display = 'none';
    document.body.appendChild(div)
    return div; 
}

var createSingleLoginLayer = getSingele(createLoginLayer);

document.getElementById('loginBtn').onclick = function() {
    var loginLayer = createSingleLoginLayer();
    loginLayer.style.display = 'block';
}

var createSingleIframe = getSingele(function() {
    var iframe = document.createElement('iframe');
    document.body.appendChild(iframe);
    return iframe
})

document.getElementById('loginBtn').onclick = function() {
    var loginLayer = createSingleIframe();
    loginLayer.src = 'https://weread.qq.com';
}

var bindEvent = getSingele(function(){
    document.getElementById('div1').onclick = function() {
        alert('click');
        return true;
    }
});

var render = function() {
    console.log('开始渲染列表');
    bindEvent();
}

render()
render()
render()