var UpgradeUI = (function(_super){
    function UpgradeUI(startScence){
        UpgradeUI.super(this);
        this.startScence = startScence;

        //当前选择的战机
        this.currentFighter = 0
        //绑定返回
        this.backLabel.on(Laya.Event.CLICK, this, this.goBack);
        //绑定升级攻击力
        this.attUpgradeBtn.on(Laya.Event.CLICK, this, this.upgradeAtt);
        //绑定升级HP
        this.hpUpgradeBtn.on(Laya.Event.CLICK, this, this.upgradeHp);
        //绑定升级设计频率
        this.shootSpeedBtn.on(Laya.Event.CLICK, this, this.upgradeShootSpeed);
        this.init();
    }
    //注册类
    Laya.class(UpgradeUI, "UpgradeUI", _super);

    var _proto = UpgradeUI.prototype;

    _proto.init = function(){
        this.upgradeSphereLabel.text = CustHolder.upgradeSphere;
        this.attLabel.text = CustHolder.fighters[this.currentFighter].atk;
        this.hpLabel.text = CustHolder.fighters[this.currentFighter].hp;
        this.shootSpeedLabel.text = CustHolder.fighters[this.currentFighter].shootSpeed;
    }

    _proto.goBack = function(){
        this.startScence.showHomeUI();
    }

    //升级当前选中战机攻击力
    _proto.upgradeAtt = function(){
        if(CustHolder.upgradeSphere >= 80){
            CustHolder.upgradeSphere -= 80;
            CustHolder.upgradeAtk(this.currentFighter, 1);

            this.attLabel.text = CustHolder.fighters[this.currentFighter].atk;
            this.upgradeSphereLabel.text = CustHolder.upgradeSphere;
        }
    }

    //升级当前选中战机hp
    _proto.upgradeHp = function(){
        if(CustHolder.upgradeSphere >= 30){
            CustHolder.upgradeSphere -= 30;
            CustHolder.upgradeHp(this.currentFighter, 1);

            this.hpLabel.text = CustHolder.fighters[this.currentFighter].hp;
            this.upgradeSphereLabel.text = CustHolder.upgradeSphere;
        }
    }

    //升级当前选中战机设计频率
    _proto.upgradeShootSpeed = function(){
        if(CustHolder.upgradeSphere >= 20){
            CustHolder.upgradeSphere -= 20;
            CustHolder.upgradeShootSpeed(this.currentFighter, 1);

            this.shootSpeedLabel.text = CustHolder.fighters[this.currentFighter].shootSpeed;
            this.upgradeSphereLabel.text = CustHolder.upgradeSphere;
        }
    }
    return UpgradeUI;
})(ui.UpgradeUI);