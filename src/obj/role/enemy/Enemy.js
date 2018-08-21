/*
* name;
*/
var Enemy = (function (_super) {

    var state = {
        ALIVE: 0,
        DEATH: 1
    }

    function Enemy(opts) {
        this.maxHp = opts.maxHp || 1;
        this.hp = opts.maxHp || 1;
        this.atk = opts.maxHp || 1;
    }

    Laya.class(Enemy, "Enemy", _super);



    return Enemy;
}());