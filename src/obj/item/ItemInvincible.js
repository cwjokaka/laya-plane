/*
* name;
*/
var ItemInvincible = (function (_super) {

    function ItemInvincible() {
        this.lifeCycle = 600;
    }

    Laya.class(ItemInvincible, "ItemInvincible", _super);

    var _proto = ItemInvincible.prototype;

    // 类名
    _proto.className = 'ItemInvincible';
    // 动画前缀
    _proto.aniPre = 'ufo1_';

    _proto.init = function(opts) {
        _super.call(this, opts);
        _super.prototype.init.call(this, opts);
    }


    return ItemInvincible;


}(Item));