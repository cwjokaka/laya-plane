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
    // 宽度体型修正
    _proto.widthFix = 8;
    // 高度体型修正
    _proto.heightFix = 15;

    /**
     * 初始化
     */
    _proto.init = function(opts) {
        _super.call(this, opts);
        _super.prototype.init.call(this, opts);
        opts = opts || {};
        this.maxHp = opts.maxHp || 3;
        this.hp = opts.hp || this.maxHp;
        this.vy = opts.vy || 2;
    }


    return MediumEnemy;
}(Enemy));