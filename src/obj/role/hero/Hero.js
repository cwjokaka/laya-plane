/*
* hero 基类
*/
var bulletPos = [[0], [-15, 15], [-30, 0, 30], [-45, -15, 15, 45]];
var Hero = (function (_super) {
    function Hero() {
        Hero.super(this);
        
        var fighter = CustHolder.fighters[0];
        this.atk = fighter.atk;
        this.hp = fighter.hp;
        this.maxHp = fighter.hp;
        this.shootInterval = fighter.shootSpeed;
        //初始位置
        this.x = SysConfig.SCREEN_WIDTH / 2;
        this.y = SysConfig.SCREEN_HEIGHT - 80;
        this.localX = this.x;
        this.localY = this.y;
        this.isMouseDown = false;
        this.hitRadius = 30;
        //下次射击时间
        this.shootTime = Laya.Browser.now() + 200;
        //普通子弹数量
        this.normalBulletNum = 1;
        this.normalBulletFrame = 0;
        this.normalBulletLifeCycle = 0;
        
        this.maxBoomNum = 10;
        this.boomNum = 10;
        this.init();
    }

    Laya.class(Hero, "Hero", _super);

    var _proto = Hero.prototype;

    // 宽度体型修正
    _proto.widthFix = 35;
    // 高度体型修正
    _proto.heightFix = 5;

    // 状态枚举
    _proto.itemEnum = {
        DOUBLE_BULLET: 'ItemBullet',  
        SKILL_BOOM: 'ItemBoom',  
        UPGRATE: 'ItemUpgrade',
        HP: 'ItemHp',
    }

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
        //this.hero.pos(Laya.stage.mouseX, Laya.stage.mouseY);
        if(this.isMouseDown){
            var vx = Laya.stage.mouseX - this.localX;
            var vy = Laya.stage.mouseY - this.localY;
            if(vx != 0){
                var x = this.hero.x + vx;
                if(x > - 5 && x < SysConfig.SCREEN_WIDTH + 5){
                    this.hero.x = x;
                }
                this.localX = Laya.stage.mouseX;
            }
            if(vy != 0){
                var y = this.hero.y + vy;
                if(y > - 5 && y < SysConfig.SCREEN_HEIGHT + 5){
                    this.hero.y = y;
                }
                this.localY = Laya.stage.mouseY;
            }
        }

    }

    _proto.mouseDown = function(){
        this.localX = Laya.stage.mouseX;
        this.localY = Laya.stage.mouseY;
        this.isMouseDown = true;
    }
    _proto.mouseUp = function(){
        this.isMouseDown = false;
    }
    /**
     * 被攻击时触发
     * from: 攻击源
     */
    _proto.hitAction = function(loseHp) {
        this.editHp(-1 * loseHp);
    }

    _proto.editHp = function(value){
        this.hp += value;
        GameHolder.playInfos.playUI.showHp(this.hp);
    }

    /**
     * 机体之间碰撞时触发
     * from: 碰撞源
     */
    _proto.impactedBy = function(from) {
        this.editHp(-1);
    }

    _proto.impactedItem = function(item){
        switch (item.className) {
            case this.itemEnum.DOUBLE_BULLET:
                if(this.normalBulletNum == 1){
                    this.normalBulletNum++;
                    this.normalBulletFrame = Laya.timer.currFrame;
                    this.normalBulletLifeCycle = item.lifeCycle;
                }
                break;
            case this.itemEnum.SKILL_BOOM:
                if(this.boomNum < this.maxBoomNum){
                    this.boomNum++;
                    ObjectHolder.playUI.showBoom(this.boomNum);
                }
                break;
            case this.itemEnum.UPGRATE:
                GameHolder.increaseUpgradeSphere(8);
                break;
            case this.itemEnum.HP:
                this.editHp(item.increaseHp);
                break;
            default:
                console.error('未知物品:', item.className);

        }
    }


    _proto.shoot = function(){
            //获取当前时间
            var time = Laya.Browser.now();
            //如果当前时间大于下次设计时间
            if(Laya.timer.currFrame % (Math.floor(this.shootInterval)) === 0){
                this.creatBullet();
            }

            if(this.normalBulletNum > 1 && (this.normalBulletFrame + this.normalBulletLifeCycle < Laya.timer.currFrame)){
                this.normalBulletNum--;
                this.normalBulletFrame = 0;
                this.normalBulletLifeCycle = 0;
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