var getUploadObj = function() {
    try {
        return new ActiveXObject('TXFTActiveX.FTNUload') // IE
    } catch (e) {
        var str;
        var body = document.body;
        if (supportFlash()) {
            str = '<object type="application/x-shockwace-flash"></objct>';
        } else {
            str = '<input name="file" type="file"></input>'
        }
        return body.appendChild(str)
    }
}

var getActiveUploading = function() {
    try {
        return new ActiveXObject('TXFTActiveX.FTNUload') // IE
    } catch (e) {
        return false
    }
}

var getFlashUploadObj = function() {
    if(supportFlash()) {
        var str;
        var body = document.body;
        if (supportFlash()) {
            str = '<object type="application/x-shockwace-flash"></objct>';
            return body.appendChild(str)
        } else {
            return false
        }
    }
}

var getFormUploadObj = function() {
    var str;
    var body = document.body;
    str = '<input name="file" type="file"></input>'
    return body.appendChild(str)
}

getWebKitUploadObj = function () {
    // 具体代码
}

var iteratorUploadObj = function() {
    for (var i = 0, fn; fn =arguments[i++];) {
        var uploadObj = fn()
        if (uploadObj !== false) {
            return uploadObj;
        }
    }
}

var uploadObj = iteratorUploadObj(getActiveUploading, getFlashUploadObj, getFormUploadObj)