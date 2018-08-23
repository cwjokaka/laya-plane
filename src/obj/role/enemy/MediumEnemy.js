/*
* name;
*/
var MediumEnemy = (function (_super) {
    function MediumEnemy() {
    }

    Laya.class(MediumEnemy, "MediumEnemy", _super);

    var _proto = MediumEnemy.prototype;

    // 类名
    _proto.className = 'MediumEnemy';
    // 动画前缀
    _proto.aniPre = 'enemy2_';

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


    return MediumEnemy;
}(Enemy));