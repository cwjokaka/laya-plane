/*
* 游戏场景
*/
var PlayScene = (function (_super) {

	var Handler = Laya.Handler;

    function PlayScene(_super) {
        PlayScene.super(this);
        ObjectHolder.init();
        this.background = ObjectHolder.background;
        this.enemyBox = ObjectHolder.enemyBox;
        this.enemyBulletBox = ObjectHolder.enemyBulletBox;
        this.heroBulletBox = ObjectHolder.heroBulletBox;
        this.itemBox = ObjectHolder.itemBox;
        this.hero = ObjectHolder.hero;
        this.init();
    }


    Laya.class(PlayScene, "PlayScene", _super);

    var _proto = PlayScene.prototype;
    /**
     * 场景初始化
     */
    _proto.init = function() {
        Laya.stage.addChild(this.background);
        Laya.stage.addChild(this.enemyBox);
        Laya.stage.addChild(this.enemyBulletBox);
        Laya.stage.addChild(this.heroBulletBox);
        Laya.stage.addChild(this.itemBox);
        Laya.stage.addChild(this.hero);
        Laya.timer.frameLoop(1, this, this.onLoop);
        this.restart();
    }

    /**
     * 重新游戏
     */
    _proto.restart = function() {
        //恢复游戏
        this.resume();
    }

    /**
     * 游戏主循环
     */
    _proto.onLoop = function() {
        //主角射击
        this.hero.shoot();
        
        //主角子弹移动循环
        for(var i = 0; i < this.heroBulletBox.numChildren; i++){
            var heroBullet = this.heroBulletBox.getChildAt(i);
            heroBullet.move();
        }

        //生成小飞机
        if(Laya.timer.currFrame % (80) === 0){
            var smallEnemy = new SmallEnemy();
            this.enemyBox.addChild(smallEnemy);
        }

        for(var i = 0; i < this.enemyBox.numChildren; i++){
            this.enemyBox.getChildAt(i).move();
        }  
        

    }

    /**
     * 暂停游戏
     */
    _proto.pause = function(){
        //移除舞台的鼠标移动事件
        Laya.stage.off(Laya.Event.MOUSE_MOVE, this, this.hero.move);
    }

    /**
     * 恢复游戏
     */
    _proto.resume = function(){
        //添加鼠标移动触发事件
        Laya.stage.on(Laya.Event.MOUSE_MOVE, this, this.hero.move);
    }


    _proto.createEnemy = function(type,num,speed,hp){
        for(var i=0;i<num;i++){
            //创建敌人
            var enemy = Laya.Pool.getItemByClass("role",Role);
            //初始化角色
            enemy.init("enemy"+(type+1),1,hp,speed,this.radius[type]);
            //随机位置
            enemy.pos(Math.random()*400+40,-Math.random()*200 - 100);
            //添加到舞台上
            this.roleBox.addChild(enemy);
        }
    }



    return PlayScene;
}(Laya.Sprite));