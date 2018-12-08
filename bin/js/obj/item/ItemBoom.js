/*
* name;
*/
var ItemBoom = (function (_super) {

    function ItemBoom() {
        this.atk = 10000;
    }

    Laya.class(ItemBoom, "ItemBoom", _super);

    var _proto = ItemBoom.prototype;
    // 类名
    _proto.className = 'ItemBoom';
    // 动画前缀
    _proto.aniPre = 'ufo2_';

    _proto.init = function(opts) {
        _super.call(this, opts);
        _super.prototype.init.call(this, opts);
    }



    return ItemBoom;


}(Item));