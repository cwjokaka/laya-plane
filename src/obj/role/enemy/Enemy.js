/*
* name;
*/
var Enemy = (function (_super) {

    function Enemy(opts) {
        _super.call(this, opts);
    }

    Laya.class(Enemy, "Enemy", _super);

    var _proto = Enemy.prototype;

    _proto.move = function() {
        this.y++;
    }

    return Enemy;
}(Role));