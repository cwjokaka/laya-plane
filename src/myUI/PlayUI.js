var PlayUI = (function(_super){
    function PlayUI(){
        PlayUI.super(this);
        //炸弹事件
        this.boomLabel.on(Laya.Event.CLICK, this, this.onBoom);
        this.reset();
    }
    //注册类
    Laya.class(PlayUI, "PlayUI", _super);
    var _proto = PlayUI.prototype;

    _proto.reset = function(){
        this.showBoom(ObjectHolder.hero.boomNum);
        this.showScore(0)
        this.showUpgradesphere(0);
    }

    //暂停按钮点击事件
    _proto.onBoom = function(event){
        //阻止事件往下传递
        event.stopPropagation();
        if(ObjectHolder.hero.boomNum > 0){
            ObjectHolder.hero.boomNum--;
            var boom = new Boom();
            boom.init({'atk': 99999, 'x': 0, 'y': 825, 'vx': 0, 'vy': -3});
            ObjectHolder.heroBulletBox.addChild(boom);
            this.showBoom(ObjectHolder.hero.boomNum);
        }
        //Laya.stage.once(Laya.Event.CLICK, this, this.onStageClick);
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
    //显示升级球数量
    _proto.showUpgradesphere = function(value){
        this.upgradesphereLabel.text = value;
    }
    //显示积分
    _proto.showScore = function(value){
        this.scoreLabel.text = "score:" + value;
    }
    //显示积分
    _proto.showBoom = function(value){
        this.boomLabel.text = "炸弹：" + value;
    }
    return PlayUI;
})(ui.GameInfoUI);