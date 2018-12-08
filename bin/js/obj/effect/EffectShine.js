/*
* name;
*/
var EffectShine = (function (_super) {
    function EffectShine() {
    }

    Laya.class(EffectShine, "EffectShine", _super);

    var _proto = EffectShine.prototype;

    // 动画名
    _proto.ani = 'effect_shine';

    // 类名
    _proto.className = 'EffectShine';

    _proto.init = function(opts) {
        _super.call(this, opts);
        _super.prototype.init.call(this, opts);
        
    }

    // _proto.play = function() {
    //     _super.play.call(this);
    // }

    
    return EffectShine;
}(Effect));