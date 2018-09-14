/*
* 子弹群
*/
var EnemyBulletGroup = (function (_super) {
    function EnemyBulletGroup() {
    }

    Laya.class(EnemyBulletGroup, "EnemyBulletGroup", _super);
    var _proto = EnemyBulletGroup.prototype;

    // 类名
    _proto.className = 'EnemyBulletGroup';


    _proto.init = function(opts) {
        _super.call(this, opts);
        _super.prototype.init.call(this, opts);
        opts = opts || {};
        // 子弹速度
        this.speed = opts.speed || 3;
        // 子弹总数量
        this.count = opts.count || 10;
        
        for (var i = 0; i < this.count; i++) {
            var rad = ((2 * Math.PI / 360) / this.count) * i;
            var bullet = Laya.Pool.getItemByClass(EnemyBullet.prototype.className, EnemyBullet);
            var vx = Math.sin(rad) * this.speed;
            var vy = Math.cos(rad) * this.speed;
            bullet.init({x: this.x, y:this.y, vx: vx, vy: vy});
            this.addChild(bullet);
        }
    }


    return EnemyBulletGroup;
}(EnemyBullet));