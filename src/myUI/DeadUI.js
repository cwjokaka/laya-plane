var DeadUI = (function(_super){
    function DeadUI(playScence){
        DeadUI.super(this);
       this.playScence = playScence;
       //结束游戏
       this.endLabel.on(Laya.Event.CLICK, this, this.endGame);
    }
    //注册类
    Laya.class(DeadUI, "DeadUI", _super);

    var _proto = DeadUI.prototype;

    _proto.endGame = function(){
        this.playScence.removeSelf();
        Laya.stage.removeChild(this.playScence);
        Laya.stage.addChild(new StartScene());
        this.playScence.destroy();
        this.destroy();
    }

    _proto.upgradeAttri = function(){
        this.startScence.showUpgradeUI();
    }
    return DeadUI;
})(ui.DeadPageUI);