var Boom = (function(_super){
    function Boom(){
        Boom.super(this);
        this.className = "Boom";
    }
    Laya.class(Boom, "Boom", _super);

    var _proto = Boom.prototype;

    _proto.onHitTarget = function(target) {
        return true;
    }

    _proto.childInit = function(_info){
        // this.graphics.drawRect(0, 0, 480, 25, 'blue', 'yellow', 3);
        // this.setBounds(new laya.maths.Rectangle(0, 0 ,480, 20));
        this.body = new Laya.Animation();
        this.addChild(this.body);
        this.body.play(0, true, "hero_boom_fly");
        this.setBounds(this.body.getBounds());
    }
    return Boom;
})(Bullet);