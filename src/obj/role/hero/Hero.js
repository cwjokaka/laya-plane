/*
* hero 基类
*/
var bulletPos = [[0], [-15, 15], [-30, 0, 30], [-45, -15, 15, 45]];
var Hero = (function (_super) {
    function Hero() {
        Hero.super(this);
        
        //初始位置
        this.x = SysConfig.SCREEN_WIDTH / 2;
        this.y = SysConfig.SCREEN_HEIGHT - 80;
        this.hitRadius = 30;
        //射击间隔
        this.shootInterval = 400;
        //下次射击时间
        this.shootTime = Laya.Browser.now() + 200;
        //普通子弹数量
        this.normalBulletNum = 1;      
        this.boomNum = 10;
        this.init();
    }

    Laya.class(Hero, "Hero", _super);

    var _proto = Hero.prototype;

    // 宽度体型修正
    _proto.widthFix = 35;
    // 高度体型修正
    _proto.heightFix = 5;

    _proto.init = function(){
        //创建一个动画为飞机的身体
        this.body = new Laya.Animation();
        //把机体添加到 容器内
        this.addChild(this.body);
        this.body.on(Laya.Event.COMPLETE, this, this.onPlayComplete);
        this.playAction("fly");
        var bound = this.body.getBounds();
        var newBound = bound.clone();
        newBound.setTo(newBound.x + this.widthFix, newBound.y + this.heightFix, newBound.width - 2 * this.widthFix, newBound.height - 2 * this.heightFix);
        this.setBounds(newBound);

    }
    _proto.onPlayComplete = function(){
        //如果是击毁动画 则隐藏对象
        if(this.action === "down"){
            //停止动画播放
            this.body.stop();
            //隐藏显示
            this.visible = false;
        }else if(this.action === "hit"){
            this.playAction("fly");
        }
    }
    _proto.playAction = function(action){
        this.action = action;
        this.body.play(0, true, "hero_" + action);
        //获取动画大小区域t
        this.bound = this.body.getBounds();
        //设置机身居中
        this.body.pos(-this.bound.width/2, -this.bound.height/2);
    }

    /**
     * 主角移动
     */
    _proto.move = function(){
        this.hero.pos(Laya.stage.mouseX, Laya.stage.mouseY);
    }

    /**
     * 被攻击时触发
     * from: 攻击源
     */
    _proto.hitBy = function(from) {
        
    }

    /**
     * 机体之间碰撞时触发
     * from: 碰撞源
     */
    _proto.impactedBy = function(from) {
        // console.log('主角碰到了:', from.className);
    }


    _proto.shoot = function(){
            //获取当前时间
            var time = Laya.Browser.now();
            //如果当前时间大于下次设计时间
            if(time > this.shootTime){
                //更新下次射击时间
                this.shootTime = time + this.shootInterval;
                this.creatBullet();
            }


    }

    _proto.creatBullet = function(){
        var bulletPos = HeroConfig.BULLET_POS[this.normalBulletNum - 1];
        for(var i = 0; i < this.normalBulletNum; i++){
            var normalBullet = Laya.Pool.getItemByClass("HeroBullet", HeroBullet);
            normalBullet.init({'x':this.x + bulletPos[i], 'y':this.y - this.hitRadius -10, 'atk':this.atk, 'vx':0, 'vy':-5});
            ObjectHolder.heroBulletBox.addChild(normalBullet);
        }

    }

    return Hero;
}(Role));