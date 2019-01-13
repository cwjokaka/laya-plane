/**
 * 游戏主界面UI 触发事件定义
 */
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

    //开始游戏
    _proto.startGame = function(){
        this.startScence.startGame();
    }

    //跳转到升级页面
    _proto.upgradeAttri = function(){
        this.startScence.showUpgradeUI();
    }
    return HomeUI;
})(ui.HomePageUI);