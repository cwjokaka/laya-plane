/*
* name;
*/
var LargeEnemy = (function (_super) {
    function LargeEnemy() {
    }

    Laya.class(LargeEnemy, "LargeEnemy", _super);

    var _proto = LargeEnemy.prototype;

    // 类名
    _proto.className = 'LargeEnemy';
    // 动画前缀
    _proto.aniPre = 'enemy3_';

    /**
     * 初始化
     */
    _proto.init = function(opts) {
        _super.call(this, opts);
        _super.prototype.init.call(this, opts);

        //创建一个动画为飞机的身体
        this.body = new Laya.Animation();
        //把机体添加到容器内
        this.addChild(this.body);
        this.body.on(Laya.Event.COMPLETE, this, this.onPlayComplete);
        this.playAction("fly");
    }


    return LargeEnemy;
}(Enemy));