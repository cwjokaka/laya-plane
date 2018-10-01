/*
* name;
*/
var EffectSpark = (function (_super) {
    function EffectSpark() {
    }

    Laya.class(EffectSpark, "EffectSpark", _super);

    var _proto = EffectSpark.prototype;

    // 动画名
    _proto.ani = 'effect_spark';

    // 类名
    _proto.className = 'EffectSpark';

    _proto.init = function(opts) {
        _super.call(this, opts);
        _super.prototype.init.call(this, opts);
        
    }

    // _proto.play = function() {
    //     _super.play.call(this);
    // }

    
    return EffectSpark;
}(Effect));