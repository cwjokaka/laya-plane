/*
* 子弹群
*/
var EnemyBulletGroup = (function (_super) {
    function EnemyBulletGroup() {
        Role.super(this);
    }

    Laya.class(EnemyBulletGroup, "EnemyBulletGroup", _super);
    var _proto = EnemyBulletGroup.prototype;

    // 类名
    // _proto.className = 'EnemyBulletGroup';


    _proto.init = function(opts) {
        // _super.call(this, opts);
        // _super.prototype.init.call(this, opts);
        opts = opts || {};
        // 子弹速度
        this.speed = opts.speed || 3;
        // 子弹总数量
        this.count = opts.count || 10;
        
    }

    _proto.moveAndRecover = function() {
        for (var i = 0; i<this.numChildren; i++) {
            this.getChildAt(i).moveAndRecover();
        }
        if (this.numChildren === 0) {
            this.recover();
            // Laya.Pool.recover(this.className, this);
        }
    }

    /**
     * 子弹回收
     */
    _proto.recover = function() {
        this.removeSelf();
    }

    /**
     * 判断是否碰撞到主角,如果碰撞到,处理逻辑
     */
    _proto.checkCollisionAndDeal = function(hero) {
        for (var i = 0; i<this.numChildren; i++) {
            var bullet = this.getChildAt(i);
            bullet.checkCollisionAndDeal(hero);
        }
    }


    return EnemyBulletGroup;
}(Laya.Sprite));