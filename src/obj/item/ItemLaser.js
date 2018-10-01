/*
* 用于升级属性的道具
*/
var ItemLaser = (function (_super) {

    function ItemLaser() {
        this.lifeCycle = 800;
    }

    Laya.class(ItemLaser, "ItemLaser", _super);

    var _proto = ItemLaser.prototype;
    // 类名
    _proto.className = 'ItemLaser';
    // 动画前缀
    _proto.aniPre = 'laser_item_';

    _proto.init = function(opts) {
        _super.call(this, opts);
        _super.prototype.init.call(this, opts);
    }



    return ItemLaser;


}(Item));