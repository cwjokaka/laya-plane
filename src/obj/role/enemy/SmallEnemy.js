/*
* name;
*/
var SmallEnemy = (function (_super) {
    function SmallEnemy(opts) {
        _super.call(this, opts);
        
    }

    Laya.class(SmallEnemy, "SmallEnemy", _super);

    var _proto = SmallEnemy.prototype;

    /**
     * 初始化
     */
    _proto.init = function(opts) {

    }


    return SmallEnemy;
}(Enemy));