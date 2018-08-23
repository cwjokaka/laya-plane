var PlayUI = (function(_super){
    function PlayUI(){
        PlayUI.super(this);
        this.reset();
    }
    //注册类
    Laya.class(PlayUI, "PlayUI", _super);
    var _proto = PlayUI.prototype;

    _proto.reset = function(){
        
        this.showScore(0)
    }

    //暂停按钮点击事件
    _proto.onBoom = function(event){
        //阻止事件往下传递
        event.stopPropagation();
        this.gameMain.boomAction();
        Laya.stage.once(Laya.Event.CLICK, this, this.onStageClick);
    }

    //暂停按钮点击事件
    _proto.onPauseBtnClick = function(event){
        //阻止事件往下传递
        event.stopPropagation();
        this.infoLabel.text = "游戏已暂停，点击任意地方回复游戏";
        this.gameMain.pause();
        Laya.stage.once(Laya.Event.CLICK, this, this.onStageClick);
    }

    //恢复游戏
    _proto.onStageClick = function(){
        this.infoLabel.text = "";
        this.gameMain.resume();
    }

    //显示血量
    _proto.showHp = function(value){
        this.hpLabel.text = "HP:" + value;
    }
    //显示等级
    _proto.showLevel = function(value){
        this.levelLabel.text = "level:" + value;
    }
    //显示积分
    _proto.showScore = function(value){
        this.scoreLabel.text = "score:" + value;
    }
    //显示积分
    _proto.showBoom = function(value){
        this.boom.text = "炸" + value;
    }
    return PlayUI;
})(ui.GameInfoUI);