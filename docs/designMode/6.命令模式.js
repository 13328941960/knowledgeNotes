var tween = {
    zhiXian: function(haoShi, startPos, endPos, duration) {
        return endPos * haoShi / duration + startPos
    },
    jianRu: function(haoShi, startPos, endPos, duration) {
        return endPos * (haoShi /= duration) + startPos;
    },
    qiangJianRu: function(haoShi, startPos, endPos, duration) {
        return endPos * (haoShi /= duration) * Math.pow(haoShi, 4)  + startPos;
    },
    qiangJianChu: function(haoShi, startPos, endPos, duration) {
        return endPos * ( (haoShi = haoShi / duration - 1) * Math.pow(haoShi, 4) + 1 ) + startPos
    },
    sineJianRu: function(haoShi, startPos, endPos, duration) {
        return endPos * (haoShi /= duration) * Math.pow(haoShi, 2) + startPos
    },
    sineJianChu: function(haoShi, startPos, endPos, duration) {
        return endPos * ( (haoShi = haoShi / duration - 1) * Math.pow(haoShi, 2) + 1 ) + startPos
    },
}


var Animate = function(dom) {
    this.dom = dom;
    this.startTime = 0;
    this.startPos = 0;
    this.endPos = 0;
    this.domNeedChangedCssPropertyName = null;
    this.huanDongSuanfa = null;
    this.duration = null;
}

Animate.prototype.start = function(domNeedChangedCssPropertyName, endPos, duration, huanDongSuanfa) {
    this.startTime = +new Date();
    this.startPos = this.dom.getBoundingClientRect()[domNeedChangedCssPropertyName]
    this.domNeedChangedCssPropertyName = domNeedChangedCssPropertyName;
    this.endPos = endPos;
    this.duration = duration;
    this.huanDongSuanfa = tween[huanDongSuanfa]

    var self = this;
    var timeId = setInterval(function() {
        if (self.step() === false) {
            // 如果动画已结束，清除定时器
            clearInterval(timeId)
        }
    }, 19)
}

Animate.prototype.step = function() {
    var currentTime = +new Date();
    // 说明动画已经结束，修正小球的位置
    if (currentTime > this.startTime + this.duration) {
        this.update(this.endPos);
        // 通知清除定时器
        return false
    }

    var pos = this.huanDongSuanfa(
        currentTime - this.startTime,
        this.startPos,
        this.endPos - this.startPos,
        this.duration
    );

    this.update(pos)
}

Animate.prototype.update = function(pos) {
    this.dom.style[this.domNeedChangedCssPropertyName] = pos + 'px';
}

var div = document.getElementById('div');
var pos = document.getElementById('pos');
var moveBtn = document.getElementById('moveBtn');
var cancelBtn = document.getElementById('cancelBtn');

var MoveCommand = function(receiver, pos) {
    this.receiver = receiver;
    this.pos = pos;
    this.oldPos = null;
}

MoveCommand.prototype.execute = function() {
    this.receiver.start('left', this.pos, 1000, 'qiangJianChu');
    this.oldPos = this.receiver.dom.getBoundingClientRect()[this.receiver.domNeedChangedCssPropertyName];
    console.log(this.oldPos, 'this.oldPos')
    // 记录小球开始移动前的位置
}

MoveCommand.prototype.undo = function() {
    console.log(this.oldPos, 'this.oldPos')
    this.receiver.start('left', this.oldPos, 1000, 'qiangJianChu');
}

var moveCommand;

moveBtn.onclick = function() {
    var animate = new Animate(div);
    moveCommand = new MoveCommand(animate, pos.value);
    moveCommand.execute();
}

cancelBtn.onclick = function() {
    moveCommand.undo(); // 撤销命令
}
