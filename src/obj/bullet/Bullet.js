/*
* 子弹基类
*/
var Bullet = (function (_super) {
    function Bullet(opts) {
        this.x = opts.x || 0;
        this.y = opts.y || 0;
        // 攻击力
        this.atk = opts.atk || 1;
        // x轴速度
        this.vx = opts.vx || 0;
        // y轴速度
        this.vy = opts.vy || 1
    }

    Laya.class(Bullet, "Bullet", _super);
    var _proto = Bullet.prototype;

    /**
     * 子弹移动
     */
    _proto.move = function() {
        this.x += this.vx;
        this.y += this.vy;
    }

    /**
     * 碰撞目标时触发
     */
    _proto.onHitTarget = function() {
        this.removeSelf();
    }

    return Bullet;
}(Laya.Sprite));