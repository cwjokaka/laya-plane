/*
* 飞机基类
*/
var Role = (function (_super) {
    function Role(opts) {
        this.hp = opts.hp || 1;
        this.maxHp = opts.maxHp || 1;
        this.atk = opts.maxHp || 1;
        this.init(opts);
    }

    Laya.class(Role, "Role", _super);
    var _proto = Bullet.prototype;

    /**
     * 初始化
     */
    _proto.init = function(opts) {

    }


    return Role;
}(Laya.Sprite));