/*
* name;
*/
var Enemy = (function (_super) {

    function Enemy(opts) {
        _super.call(this, opts);
        this.init();
    }

    Laya.class(Enemy, "Enemy", _super);

    var _proto = Enemy.prototype;

    _proto.stateEnum = {
        ALIVE: 0,       
        HURT: 1,
        DEATH: 2
    }

    _proto.init = function(opts) {
        this.state = this.stateEnum.ALIVE;
    }

    _proto.move = function() {
        this.y++;
    }

    return Enemy;
}(Role));