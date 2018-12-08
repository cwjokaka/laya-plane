/*
* 游戏信息管理类
*/
var CustHolder = (function () {
    var CustHolder = {}

    CustHolder.init = function(opts) {
        //升级球
        this.upgradeSphere = 2000;
        //拥有的战机集合（暂未实现）
        this.fighters = [
                {'atk' : 1, 'shootSpeed' : 50, 'hp' : 10,},
            ];

    }

    CustHolder.upgradeAtk = function(index, value){
        var fighter = this.fighters[index]
        fighter.atk += value;
    }

    CustHolder.upgradeHp = function(index, value){
        var fighter = this.fighters[index]
        fighter.hp += value;
    }

    CustHolder.upgradeShootSpeed = function(index, value){
        var fighter = this.fighters[index]
        fighter.shootSpeed -= fighter.shootSpeed * 0.05;
    }

    CustHolder.increaseSphere = function(value){
        this.upgradeSphere += value;
    }
    return CustHolder;
}());
