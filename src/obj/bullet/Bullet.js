/*
* 子弹基类
*/
var Bullet = (function (_super) {
    function Bullet(opts) {
        Bullet.super(this);
        this.className = "Bullet";
        //标记是否可以 杀死 敌方子弹
        this.canKillBullet = false;
    }

    Laya.class(Bullet, "Bullet", _super);
    var _proto = Bullet.prototype;

    /**
     * 初始化
     */
    _proto.init = function(opts) {
        opts = opts || {};
        this.x = opts.x || 0;
        this.y = opts.y || 0;
        // 攻击力
        this.atk = opts.atk || 1;
        // x轴速度
        this.vx = opts.vx || 0;
        // y轴速度
        this.vy = opts.vy || 1;
        this.childInit(opts);
    }

    /**
     * 子类初始化方法
     */
    _proto.childInit = function(opts){
        // this.graphics.drawRect(0, 0, 5, 5, 'red');  
    }

    /**
     * 子弹移动
     */
    _proto.move = function() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < -30 || this.x > SysConfig.SCREEN_WIDTH + 30 || this.y < -30 || this.y > SysConfig.SCREEN_HEIGHT + 30) {
            this.removeSelf();
            //回收对象
            Laya.Pool.recover(this.className, this);
        }
    }

    /**
     * 攻击到目标时触发
     */
    _proto.onHitTarget = function(target) {
        this.playAction("down");
        this.removeSelf();
        //回收对象
        Laya.Pool.recover("HeroBullet", this);
        var effect = Laya.Pool.getItemByClass(EffectSpark.prototype.className, EffectSpark);
        effect.init({x: this.x, y:this.y});
        ObjectHolder.effectBox.addChild(effect);

    }

    return Bullet;
}(Laya.Sprite));