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
        // console.log('start');
        this.graphics.clear();
        for (var i = -1; i < 2; i++) {
            var rad = (2*Math.PI / 360) * i * 20;
            var bullet = Laya.Pool.getItemByClass(EnemyBullet.prototype.className, EnemyBullet);
            var vx = Math.sin(rad) * this.speed;
            var vy = Math.cos(rad) * this.speed;
            bullet.init({x: 0, y:0, vx: vx, vy: vy});
            this.addChild(bullet);
        }

    }




    return TrebleBulletGroup;
}(EnemyBulletGroup));