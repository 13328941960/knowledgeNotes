// 策略对象
var rules = {
    required: function(arg) {
        if (arg.value === '') return arg.errorMsg;
    },
    length: function(arg) {
        var min = arg.min;
        var max = arg.max;
        var value = arg.value;
        var errorMsg = arg.errorMsg;
        if (value && min && value.length < min) return errorMsg;
        if (value && max && value.length > max) return errorMsg;
    },
    isMobile: function(arg) {
        if (!/(^1[3|5|8][0-9]{9})/.test(arg.value)) return arg.errorMsg;
    }
}
// 环境对象
function getErrorMsg(dom, configRules) {
    for(var j = 0; j < configRules.length; j++) {
        var item = configRules[j];
        var arg = { 
            value: dom.value, 
            errorMsg: configRulesItem.errorMsg,
        }
        if (item.name === 'length') {
            arg.min = item.min && item.min
            arg.max = item.max && item.max
        }
        var errorMsg = rules[item.name].call(dom, arg)
        if (errorMsg) {
            return errorMsg
        }
    }
}
function validator(form, config) {
    for(var i = 0; i < config.length; i++) {
        var item = config[i];
        var dom = form[item.name];
        var configRules = item.rules;
        getErrorMsg(dom, configRules)
    }
}
// 客户调用
var zhuCeBiaoDan = document.getElementById('zhuCeBiaoDan');

var config = [{
    name: 'userName',
    rules: [{
        name: 'required',
        errorMsg: '用户名不能为空'
    },{
        name: 'length',
        max: 6,
        errorMsg: '用户名长度不能大于6位'
    }]
}, {
    name: 'password',
    rules: [{
        name: 'length',
        min: 6,
        errorMsg: '密码长度不能少于6位'
    }] 
}, {
    name: 'phoneNumber',
    rules: [{
        name: 'isMobile',
        errorMsg: '手机号码格式不正确'
    }]
}]

zhuCeBiaoDan.onsubmit = function() {
    var errorMsg = validator(zhuCeBiaoDan, config)
    if (errorMsg) {
        alert(errorMsg);
        return false;
    }
}