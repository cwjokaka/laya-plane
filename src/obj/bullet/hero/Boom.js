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
        this.graphics.drawRect(0, 0, 400, 20, 'blue', 'yellow', 3);
        this.setBounds(new laya.maths.Rectangle(0, 0 ,400, 20));
    }
    return Boom;
})(Bullet);