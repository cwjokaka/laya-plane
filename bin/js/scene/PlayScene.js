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
        this.heroBoomBox = ObjectHolder.heroBoomBox;
        this.itemBox = ObjectHolder.itemBox;
        this.hero = ObjectHolder.hero;
        this.effectBox = ObjectHolder.effectBox;
        this.test = true;
        //创建UI界面
        this.playUI = ObjectHolder.playUI;
        GameHolder.init({'playUI': this.playUI});
        this.init();
    }


    Laya.class(PlayScene, "PlayScene", _super);

    var _proto = PlayScene.prototype;
    /**
     * 场景初始化
     */
    _proto.init = function() {
        this.addChild(this.background);
        this.addChild(this.enemyBox);
        this.addChild(this.heroBulletBox);
        this.addChild(this.heroBoomBox);
        this.addChild(this.itemBox);
        this.addChild(this.hero);
        this.addChild(this.enemyBulletBox);
        this.addChild(this.effectBox);
        this.addChild(this.playUI);
        Laya.timer.frameLoop(1, this, this.onLoop);
        GameHolder.gameData.appearBossIndex = 0;
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
        if(this.hero.hp < 0){
            if(this.test){
                var deadUI = new DeadUI(this);
                this.hero.playAction('down');
                this.parent.addChild(deadUI);
                this.test = false;
            }
            return;
        }
        switch(GameHolder.state) {

            /**
             * 游戏进行时
             */
            case GameHolder.stateEnum.PLAY:
                //主角射击
                this.hero.shoot();
                //主角子弹移动循环
                for(var i = 0; i < this.heroBulletBox.numChildren; i++){
                    var heroBullet = this.heroBulletBox.getChildAt(i);
                    heroBullet.move();
                }

                // 碰撞事件Start

                /**
                 * 主角炸弹碰 敌机 和 子弹
                 */
                
                for(var i = 0; i < this.heroBoomBox.numChildren; i++) {
                    var heroBullet = this.heroBoomBox.getChildAt(i);
                    heroBullet.move();
                    for(var j = 0; j < this.enemyBox.numChildren; j++) {
                        var enemy = this.enemyBox.getChildAt(j);
                        if (heroBullet.getBounds().intersects(enemy.getBounds())) {
                            var next = heroBullet.onHitTarget(enemy);
                            enemy.hitBy(heroBullet);
                            if(!next) break; 
                        }
                    }
                    for(var i = 0; i < this.enemyBulletBox.numChildren; i++) {
                        var bullet = this.enemyBulletBox.getChildAt(i);
                        var bound = bullet.getBounds();
                        var pos = bullet.getAbsPos();
                        bound.setTo(pos[0], pos[1], 5, 5);
                        if(heroBullet.getBounds().intersects(bound)){
                            bullet.impactedBy(heroBullet);
                        }
                    }
                }
                /**
                 * 主角子弹碰敌机
                 */
                for(var i = 0; i < this.heroBulletBox.numChildren; i++) {
                    var heroBullet = this.heroBulletBox.getChildAt(i);
                    for(var j = 0; j < this.enemyBox.numChildren; j++) {
                        var enemy = this.enemyBox.getChildAt(j);
                        if (heroBullet.getBounds().intersects(enemy.getBounds())) {
                            if(enemy.state != enemy.stateEnum.DEATH){
                                heroBullet.onHitTarget();
                            }
                            enemy.hitBy(heroBullet);
                            if(!next) break; 
                        }
                    }
                    // if(heroBullet.canKillBullet){
                    //     for(var i = 0; i < this.enemyBulletBox.numChildren; i++) {
                    //         var bullet = this.enemyBulletBox.getChildAt(i);
                    //         var bound = bullet.getBounds();
                    //         var pos = bullet.getAbsPos();
                    //         bound.setTo(pos[0], pos[1], 5, 5);
                    //         if(heroBullet.getBounds().intersects(bound)){
                    //             bullet.impactedBy(heroBullet);
                    //         }
                    //     }
                    // }
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
                        this.hero.impactedItem(item);
                    }
                }
                
                /**
                 * 检测主角是否碰到敌军子弹,并处理逻辑
                 */
                for(var i = 0; i < this.enemyBulletBox.numChildren; i++) {
                    this.enemyBulletBox.getChildAt(i).checkCollisionAndDeal(this.hero);
                }

                // 碰撞事件End

                // 敌机移动&攻击
                for(var i = 0; i < this.enemyBox.numChildren; i++){
                    var enemy = this.enemyBox.getChildAt(i);
                    enemy.attack();
                    enemy.moveAndRecover();
                }

                // 物品移动
                for(var i = 0; i < this.itemBox.numChildren; i++) {
                    this.itemBox.getChildAt(i).moveAndRecover();
                }

                // 敌军子弹移动
                for(var i = 0; i < this.enemyBulletBox.numChildren; i++) {
                    this.enemyBulletBox.getChildAt(i).moveAndRecover();
                }


                switch(GameHolder.playState) {
                    case GameHolder.playStateEnum.NORMAL:
                        var enemyArr = ObjectHolder.enemyFactory.createEnemy();
                        for (enemy of enemyArr) {
                            this.enemyBox.addChild(enemy);
                        }
                        break;
                    // 出BOSS
                    case GameHolder.playStateEnum.SHOW_BOSS:
                        //取消激光
                        if(this.hero.hasLaserBullet){
                            this.hero.laserBulletLifeCycle = 0;
                            this.hero.hasLaserBullet = false;
                            this.hero.laserBullet.destroy();
                        }


                        this.boss = Laya.Pool.getItemByClass(Boss.className, Boss);
                        this.boss.init({x: SysConfig.SCREEN_WIDTH / 2,y: -100});
                        this.enemyBox.addChild(this.boss);
                        GameHolder.playState = GameHolder.playStateEnum.BOSSING;
                        break;
                    // 打BOSS中
                    case GameHolder.playStateEnum.BOSSING:
                        break;
                     // 打死亡后操作
                    case GameHolder.playStateEnum.BOSS_ENDING:
                        if(ObjectHolder.itemBox.numChildren < 1){
                            GameHolder.playState = GameHolder.playStateEnum.NORMAL;
                        }
                        break;                   
                    // 奖励时间
                    case GameHolder.playStateEnum.BONUS:
                        break;
                    
                }

                break; 

            /**
             * 游戏暂停
             */
            case GameHolder.stateEnum.PAUSE:
                break;
            /**
             * 游戏结束
             */
            case GameHolder.stateEnum.END:
                break;

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
        Laya.stage.on(Laya.Event.MOUSE_DOWN, this, this.hero.mouseDown);
        Laya.stage.on(Laya.Event.MOUSE_UP, this, this.hero.mouseUp);
    }


    return PlayScene;
}(Laya.Sprite));