/*
* name;
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

    _proto.startGame = function(){
        this.removeSelf();
		Laya.stage.addChild(new PlayScene());
    }

    _proto.showUpgradeUI = function(){
        this.replaceChild(this.UpgradePage, this.HomePage);
    }

    _proto.showHomeUI = function(){
        this.replaceChild(this.HomePage, this.UpgradePage);
    }

    return StartScene;
}(Laya.Sprite));