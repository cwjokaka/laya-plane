/*
* name;
*/
var LargeEnemy = (function (_super) {
    function LargeEnemy() {
    }

    Laya.class(LargeEnemy, "LargeEnemy", _super);

    var _proto = LargeEnemy.prototype;

    // 类名
    _proto.className = 'LargeEnemy';
    // 动画前缀
    _proto.aniPre = 'enemy3_';
    // 宽度体型修正
    _proto.widthFix = 20;
    // 高度体型修正
    _proto.heightFix = 20;

    /**
     * 初始化
     */
    _proto.init = function(opts) {
        _super.call(this, opts);
        _super.prototype.init.call(this, opts);
        opts = opts || {};
        this.maxHp = opts.maxHp || 5;
        this.hp = opts.hp || this.maxHp;
        this.vy = opts.vy || 1;
    }


    return LargeEnemy;
}(Enemy));