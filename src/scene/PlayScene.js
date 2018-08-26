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
        //创建UI界面
        this.playUI = new PlayUI();
        GameHolder.init({'playUI': this.playUI});
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
        Laya.stage.addChild(this.playUI);
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

        // 碰撞事件Start

        /**
         * 主角子弹碰敌机
         */
        for(var i = 0; i < this.heroBulletBox.numChildren; i++) {
            var heroBullet = this.heroBulletBox.getChildAt(i);
            for(var j = 0; j < this.enemyBox.numChildren; j++) {
                var enemy = this.enemyBox.getChildAt(j);
                if (heroBullet.getBounds().intersects(enemy.getBounds())) {
                    var next = heroBullet.onHitTarget(enemy);
                    enemy.hitBy(heroBullet);
                    if(!next) break; 
                }
            }
        }
        /**
         * 主角碰敌机
         */
        for(var i = 0; i < this.enemyBox.numChildren; i++) {
            var enemy = this.enemyBox.getChildAt(i);
            if (this.hero.getBounds().intersects(enemy.getBounds())) {
                enemy.impactedBy(this.hero);
            }
        }
        /**
         * 主角碰道具
         */
        for(var i = 0; i < this.itemBox.numChildren; i++) {
            var item = this.itemBox.getChildAt(i);
            if (this.hero.getBounds().intersects(item.getBounds())) {
                item.impactedBy(this.hero);
            }
        }

        // 碰撞事件End


        //生成小飞机
        if(Laya.timer.currFrame % (40) === 0){
            var smallEnemy = Laya.Pool.getItemByClass(SmallEnemy.prototype.className, SmallEnemy);
            smallEnemy.init({x: Math.random()*SysConfig.SCREEN_WIDTH, y: -100});
            this.enemyBox.addChild(smallEnemy);
        }
        //生成中型飞机
        if(Laya.timer.currFrame % (80) === 0){
            var mediumEnemy = Laya.Pool.getItemByClass(MediumEnemy.prototype.className, MediumEnemy);
            mediumEnemy.init({x: Math.random()*SysConfig.SCREEN_WIDTH, y: -100});
            this.enemyBox.addChild(mediumEnemy);
        }
        //生成大型飞机
        if(Laya.timer.currFrame % (80) === 0){
            var largeEnemy = Laya.Pool.getItemByClass(LargeEnemy.prototype.className, LargeEnemy);
            largeEnemy.init({x: Math.random()*SysConfig.SCREEN_WIDTH, y: -100});
            this.enemyBox.addChild(largeEnemy);
        }

        // 敌机移动
        for(var i = 0; i < this.enemyBox.numChildren; i++){
            this.enemyBox.getChildAt(i).moveAndRecover();
        }  

        // 子弹移动
        for(var i = 0; i < this.itemBox.numChildren; i++) {
            this.itemBox.getChildAt(i).moveAndRecover();
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
        // Laya.stage.on(Laya.Event.MOUSE_MOVE, this, this.hero.move);
        Laya.stage.on(Laya.Event.MOUSE_MOVE, this, this.hero.move);
    }


    return PlayScene;
}(Laya.Sprite));