/*
* name;
*/
var RingBulletGroup = (function (_super) {
    function RingBulletGroup() {
    }

    Laya.class(RingBulletGroup, "RingBulletGroup", _super);
    var _proto = RingBulletGroup.prototype;

    // 类名
    _proto.className = 'RingBulletGroup';

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
        this.curRepeat = opts.curRepeat || 1;
        this.perAngle = 360 / this.count;
        this.angleOffset = opts.angleOffset || 0;   // 偏移角度
        this.graphics.clear();
        for (var i = 0; i < 10; i++) {
            var rad = (2*Math.PI / 360) * i * this.perAngle + (2*Math.PI / 360) * this.angleOffset * this.curRepeat;
            var bullet = Laya.Pool.getItemByClass(EnemyBullet.prototype.className, EnemyBullet);
            var vx = Math.sin(rad) * this.speed;
            var vy = Math.cos(rad) * this.speed;
            bullet.init({x: 0, y: 0, vx: vx, vy: vy});
            this.addChild(bullet);
        }

    }


    return RingBulletGroup;
}(EnemyBulletGroup));