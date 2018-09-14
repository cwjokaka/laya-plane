/*
* name;
*/
var TrebleBulletGroup = (function (_super) {
    function TrebleBulletGroup() {
    }

    Laya.class(TrebleBulletGroup, "TrebleBulletGroup", _super);
    var _proto = TrebleBulletGroup.prototype;

    // 类名
    _proto.className = 'TrebleBulletGroup';

    _proto.init = function(opts) {
        _super.call(this, opts);
        _super.prototype.init.call(this, opts);
        opts = opts || {};
        // 子弹速度
        this.speed = opts.speed || 3;
        // 子弹总数量
        this.count = opts.count || 10;
        this.x = opts.x || 0;
        this.y = opts.y || 0;
        for (var i = -1; i < 1; i++) {
            var rad = 2*Math.PI / 360 * i * 30;
            var bullet = Laya.Pool.getItemByClass(EnemyBullet.prototype.className, EnemyBullet);
            var vx = Math.sin(rad) * this.speed;
            var vy = Math.cos(rad) * this.speed;
            bullet.init({x: 0, y:0, vx: vx, vy: vy});
            this.addChild(bullet);
            // console.log(bullet.toParentPoint(bullet.po))
        }
    }

    _proto.moveAndRecover = function() {
        for (var i = 0; i<this.numChildren; i++) {
            this.getChildAt(i).move();
        }
    }

    /**
     * 判断是否碰撞到主角,如果碰撞到,处理逻辑
     */
    _proto.checkCollisionAndDeal = function(hero) {
        for (var i = 0; i<this.numChildren; i++) {
            var bullet = this.getChildAt(i);
            var bound = bullet.getBounds();
            bound.setTo(this.x, this.y, bound.width, bound.height);
            this.getChildAt(i).checkCollisionAndDeal(hero);
        }
    }



    return TrebleBulletGroup;
}(EnemyBullet));