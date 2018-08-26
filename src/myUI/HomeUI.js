var HomeUI = (function(_super){
    function HomeUI(startScence){
        HomeUI.super(this);
       this.startScence = startScence;
       //开始游戏
       this.startGameLabel.on(Laya.Event.CLICK, this, this.startGame);
       //升级按钮绑定
       this.upgradeAttriLabel.on(Laya.Event.CLICK, this, this.upgradeAttri);
    }
    //注册类
    Laya.class(HomeUI, "HomeUI", _super);

    var _proto = HomeUI.prototype;

    _proto.startGame = function(){
        this.startScence.startGame();
    }

    _proto.upgradeAttri = function(){
        this.startScence.showUpgradeUI();
    }
    return HomeUI;
})(ui.HomePageUI);