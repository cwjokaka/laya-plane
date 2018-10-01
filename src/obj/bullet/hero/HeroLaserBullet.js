var HeroLaserBullet = (function(_super){
    function HeroLaserBullet(){
        HeroLaserBullet.super(this);
        this.atk = 30;
        this.className = "HeroLaserBullet";
        this.canKillBullet = true;
    }
    Laya.class(HeroLaserBullet, "HeroLaserBullet", _super);

    var _proto = HeroLaserBullet.prototype;

    _proto.onHitTarget = function(target) {
        return true;
    }

    _proto.childInit = function(hero){
        this.body = new Laya.Animation();
        this.addChild(this.body);
        this.body.play(0, true, "laser_bullet_fly");
        this.setBounds(this.body.getBounds());
        this.hero = hero;
        this.x = this.hero.x - 13;
        this.y = this.hero.y - this.hero.hitRadius - 868;        
    }
    _proto.move = function(){
        this.x = this.hero.x - 13;
        this.y = this.hero.y - this.hero.hitRadius - 868;  
    }

    _proto.destroy = function(){
        this.removeSelf();
        //回收对象
        Laya.Pool.recover(this.className, this);
    }
    return HeroLaserBullet;
})(Bullet);