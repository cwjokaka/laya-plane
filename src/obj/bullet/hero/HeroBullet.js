/*
* name;
*/
var HeroBullet = (function (_super) {
    function HeroBullet() {
        HeroBullet.super(this);
        this.init();
    }

    Laya.class(HeroBullet, 'HeroBullet', _super);

    var _proto = HeroBullet.prototype;

    _proto.init = function(){
        //创建一个动画为飞机的身体
        this.body = new Laya.Animation();
        //把机体添加到 容器内
        this.addChild(this.body);
        this.body.on(Laya.Event.COMPLETE, this, this.onPlayComplete);
        this.playAction("fly");
    }
    _proto.onPlayComplete = function(){
        //如果是击毁动画 则隐藏对象
        if(this.action === "down"){
            //停止动画播放
            this.body.stop();
            //隐藏显示
            this.visible = false;
        }else if(this.action === "hit"){
            this.playAction("fly");
        }
    }
    _proto.playAction = function(action){
        this.action = action;
        this.body.play(0, true, "bullet1_" + action);
        //获取动画大小区域t
        this.bound = this.body.getBounds();
        //设置机身居中
        this.body.pos(-this.bound.width/2, -this.bound.height/2);
    }
    return HeroBullet;
}(Bullet));