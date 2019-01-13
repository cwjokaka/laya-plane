/*
* 效果类;
*/
var Effect = (function (_super) {
    function Effect() {
    }

    Laya.class(Effect, "Effect", _super);

    var _proto = Effect.prototype;

    // 类名
    _proto.className = 'Effect';
    // 动画名
    _proto.ani = 'no';

    _proto.init = function(opts) {
        _super.call(this, opts);
        // _super.prototype.init.call(this, opts);
        opts = opts || {};
        this.x = opts.x || 0;
        this.y = opts.y || 0;
        this.isLoop = opts.isLoop || false;
        this.play(0, true, this.ani);
        this.setBounds(this.getBounds());
        this.pivot(this.getBounds().width/2, this.getBounds().height/2);
        this.on(Laya.Event.COMPLETE, this, this.onPlayComplete);
    }

    // _proto.play = function() {
    //     _super.play.call(this);
    // }
    _proto.onPlayComplete = function() {
        if(!this.isLoop) {
            this.removeSelf();
            Laya.Pool.recover(this.className, this);
        }
    }
    
    return Effect;
}(Laya.Animation));