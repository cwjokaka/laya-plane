/*
* name;
*/
var ItemHp = (function (_super) {

    function ItemHp() {
        this.increaseHp = 1;
    }

    Laya.class(ItemHp, "ItemHp", _super);

    var _proto = ItemHp.prototype;

    // 类名
    _proto.className = 'ItemHp';
    // 动画前缀
    _proto.aniPre = 'heroHp_';



    _proto.init = function(opts) {
        _super.call(this, opts);
        _super.prototype.init.call(this, opts);
    }


    return ItemHp;


}(Item));