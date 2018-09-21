/*
* 飞机基类
*/
var Role = (function (_super) {
    function Role() {
        Role.super(this);
    }

    Laya.class(Role, "Role", _super);
    var _proto = Role.prototype;

    /**
     * 初始化
     */
    _proto.init = function(opts) {
        opts = opts || {};
        this.x = opts.x || 0;
        this.y = opts.y || 0;
        this.hp = opts.hp || 1;
        this.maxHp = opts.maxHp || 1;
        this.atk = opts.atk || 1;
    }


    return Role;
}(Laya.Sprite));