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
    }

    /**
     * 重新游戏
     */
    _proto.restart = function() {
    }

    /**
     * 游戏主循环
     */
    _proto.onLoop = function() {

    }

    return PlayScene;
}(Laya.Sprite));