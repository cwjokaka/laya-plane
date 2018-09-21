/*
* name;
*/
var ItemBullet = (function (_super) {

    function ItemBullet() {
        this.lifeCycle = 1800;
    }

    Laya.class(ItemBullet, "ItemBullet", _super);

    var _proto = ItemBullet.prototype;

    // 类名
    _proto.className = 'ItemBullet';
    // 动画前缀
    _proto.aniPre = 'ufo1_';



    _proto.init = function(opts) {
        _super.call(this, opts);
        _super.prototype.init.call(this, opts);
    }


    return ItemBullet;


}(Item));