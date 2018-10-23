/*
* name;
*/
var ItemShield = (function (_super) {

    function ItemShield() {

    }

    Laya.class(ItemShield, "ItemShield", _super);

    var _proto = ItemShield.prototype;

    // 类名
    _proto.className = 'ItemShield';
    // 动画前缀
    _proto.aniPre = 'shield_';



    _proto.init = function(opts) {
        _super.call(this, opts);
        _super.prototype.init.call(this, opts);
    }


    return ItemShield;


}(Item));