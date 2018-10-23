/*
* name;
*/
var EnemyBullet = (function (_super) {
    function EnemyBullet() {
    }

    Laya.class(EnemyBullet, "EnemyBullet", _super);
    var _proto = EnemyBullet.prototype;

    // 类名
    _proto.className = 'EnemyBullet';
    // 动画前缀
    _proto.aniPre = 'enemyBullet_';

    _proto.init = function(opts) {
        _super.call(this, opts);
        _super.prototype.init.call(this, opts);
        opts = opts || {};
        this.x = opts.x || 0;
        this.y = opts.y || 0;
        // 攻击力
        this.atk = opts.atk || 1;
        // x轴速度
        this.vx = opts.vx || 0;
        // y轴速度
        this.vy = opts.vy || 1;

        this.setBounds(this.getGraphicBounds().clone());

    }

    /**
     * 子弹移动
     */
    _proto.move = function() {
        this.x += this.vx;
        this.y += this.vy;
    }

    /**
     * 子弹移动与回收
     */
    _proto.moveAndRecover = function() {
        this.move();
        if (this.x < -30 || this.x > SysConfig.SCREEN_WIDTH + 30 || this.y < -30 || this.y > SysConfig.SCREEN_HEIGHT + 30) {
            this.removeSelf();
            //回收对象
            Laya.Pool.recover(this.className, this);
        }
    }

    /**
     * 被机体撞击时触发
     * from: 撞击源
     */
    _proto.impactedBy = function(from) {
        this.removeSelf();
        Laya.Pool.recover(this.className, this);
    }

    /**
     * 判断是否碰撞到主角,如果碰撞到,处理逻辑
     */
    _proto.checkCollisionAndDeal = function(hero) {
        var bound = this.getBounds();
        bound.setTo(this.parent.x + this.x, this.parent.y + this.y, 5, 5);
        // this.graphics.drawRect(0, 0, 5, 5, 'black');  
        if (hero.getBounds().intersects(bound)) {
            this.impactedBy(hero);
            hero.hitAction(-this.atk);
        }
    }


    return EnemyBullet;
}(Bullet));