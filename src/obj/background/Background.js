/*
* 背景
*/
var Background = (function (_super){
    function Background(){
        Background.super(this);
        this.bg1 = new Laya.Sprite();
        this.bg1.loadImage(Asset.IMAGE.BACKGROUND);
        this.addChild(this.bg1);
        this.bg2 = new Laya.Sprite();
        this.bg2.loadImage(Asset.IMAGE.BACKGROUND);
        this.bg2.pos(0, -852);
        this.addChild(this.bg2);

        //创建一个 帧循环 更新容器位置
        Laya.timer.frameLoop(1, this, this.onLoop);
    }

    //注册类
    Laya.class(Background, "Background", _super);
    var _proto = Background.prototype;
    _proto.onLoop = function(){
        this.y += 5;
        if(this.bg1.y + this.y >= 852){
            this.bg1.y -= 852*2;
        }
        if(this.bg2.y + this.y >= 852){
            this.bg2.y -= 852*2;
        }
    }
    return Background;
})(Laya.Sprite);