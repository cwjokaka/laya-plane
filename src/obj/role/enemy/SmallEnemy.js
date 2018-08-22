/*
* name;
*/
var SmallEnemy = (function (_super) {
    function SmallEnemy(opts) {
        _super.call(this, opts);
        this.init()
    }

    Laya.class(SmallEnemy, "SmallEnemy", _super);

    var _proto = SmallEnemy.prototype;

    /**
     * 初始化
     */
    _proto.init = function(opts) {
        //创建一个动画为飞机的身体
        this.body = new Laya.Animation();
        //把机体添加到 容器内
        this.addChild(this.body);
        this.body.on(Laya.Event.COMPLETE, this, this.onPlayComplete);
        this.playAction("fly");
    }

    // 动画播放完后执行
    _proto.onPlayComplete = function(){
        //如果是击毁动画 则隐藏对象
        if(this.state === this.stateEnum.DEATH){
            //停止动画播放
            this.body.stop();
            //隐藏显示
            this.visible = false;
        }else if(this.state === this.stateEnum.HURT){
            this.playAction("fly");
        }
    }
    /**
     * 播放动画
     */
    _proto.playAction = function(action){
        this.action = action;
        this.body.play(0, true, "enemy1_" + this.action);
        //获取动画大小区域t
        this.bound = this.body.getBounds();
        //设置机身居中
        this.body.pos(-this.bound.width/2, -this.bound.height/2);
    }



    return SmallEnemy;
}(Enemy));