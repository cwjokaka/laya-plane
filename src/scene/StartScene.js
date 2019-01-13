/*
* 程序主场景，开始、升级等页面的场景;
*/
var StartScene = (function (_super) {
    function StartScene() {
        StartScene.super(this);
        this.HomePage = new HomeUI(this);
        this.UpgradePage = new UpgradeUI(this);
        this.addChild(this.HomePage);
    }

    Laya.class(StartScene, 'StartScene', _super);

    var _proto = StartScene.prototype;

    //开始游戏的触发函数
    _proto.startGame = function(){
        this.removeSelf();
        this.destroy();
		Laya.stage.addChild(new PlayScene());
    }

    //升级按钮的触发函数
    _proto.showUpgradeUI = function(){
        this.replaceChild(this.UpgradePage, this.HomePage);
    }

    //回到开始页面的触发函数
    _proto.showHomeUI = function(){
        this.replaceChild(this.HomePage, this.UpgradePage);
    }

    return StartScene;
}(Laya.Sprite));