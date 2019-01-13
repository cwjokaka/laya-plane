/**
 * 主角死亡时 的UI 函数
 */
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

    //结束游戏
    _proto.endGame = function(){
        CustHolder.increaseSphere(GameHolder.playInfos.upgradeSphere);
        this.playScence.removeSelf();
        Laya.stage.removeChild(this.playScence);
        Laya.stage.addChild(new StartScene());
        this.playScence.destroy();
        this.destroy();
    }

    return DeadUI;
})(ui.DeadPageUI);