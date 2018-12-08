/*
* name;
*/
var Bar = (function (_super) {
    function Bar() {
    }

    Laya.class(Bar, "Bar", _super);

    var _proto = Bar.prototype;

    // 类名
    _proto.className = 'Bar';

    _proto.init = function(opts) {
        _super.call(this, opts);
        // _super.prototype.init.call(this, opts);
        opts = opts || {};
        this.x = opts.x || 0;
        this.y = opts.y || 0;
        this.width = opts.width || 64;
        this.height = opts.height || 10;
        this.color = opts.color || 'red';
        this.borderColor = opts.borderColor || 'black';
        this.borderWidth = opts.borderWidth || 1;
        this.maxValue = opts.maxValue || 64;
        this.curValue = opts.curValue || this.maxValue;
        this.alpha = opts.alpha || 0.3;
        this.fadeTime = opts.fadeTime || 0;
        // 绘制边框
        // this.graphics.drawLines(0, 0, [0, 0, this.width, 0, this.width, this.height, 0, this.height, 0, 0], this.borderColor, this.borderWidth);
        // 填充颜色(底层)
        // this.graphics.drawRect(-this.border, -this.border, this.maxWidth + this.border * 2, 5 + this.border * 2, 'white');  
        // 填充颜色(上层)
        // this.graphics.drawRect(0, 0, (this.curValue / this.maxValue) * this.width, this.height, this.color);
        // Laya.timer.frameLoop(1, this, this.refresh);    
        this.setValue(this.curValue);
    }

    _proto.setValue = function(value) {
        if (value > this.maxValue) {
            this.curValue = this.maxValue;
        } 
        else if (value <= 0) {
            this.curValue = 0;
        } else {
            this.curValue = value;
        }

        if(this.fadeTime > 0) {
            this.alpha = 0.3;
            Laya.Tween.to(this, {alpha : 0}, this.fadeTime, Laya.Ease.linearIn, null, 1500, true);
        }

        this.graphics.clear();
        this.graphics.drawRect(0, 0, (this.curValue / this.maxValue) * this.width, this.height, this.color);
        // this.graphics.drawLines(0, 0, [-this.borderWidth/2, 0, this.width, 0, this.width, this.height, 0, this.height, 0, 0], this.borderColor, this.borderWidth);
        // this.graphics.drawLines(0, 0, [0, 0, this.width, 0, this.width, this.height, 0, this.height, 0, 0], this.borderColor, this.borderWidth);
        this.graphics.drawPoly(0, 0, [0, 0, this.width, 0, this.width, this.height, 0, this.height, 0, 0], null, this.borderColor, this.borderWidth);
    }

    _proto.refresh = function() {
        // 绘制边框
    }

    return Bar;
}(Laya.Sprite));