/*
* 用于升级属性的道具
*/
var ItemUpgrade = (function (_super) {

    function ItemUpgrade() {
    }

    Laya.class(ItemUpgrade, "ItemUpgrade", _super);

    var _proto = ItemUpgrade.prototype;
    // 类名
    _proto.className = 'ItemUpgrade';
    // 动画前缀
    _proto.aniPre = 'upgrade_';

    _proto.init = function(opts) {
        _super.call(this, opts);
        _super.prototype.init.call(this, opts);
    }



    return ItemUpgrade;


}(Item));