/*
* 游戏信息管理类
*/
var CustHolder = (function () {
    var CustHolder = {}

    CustHolder.init = function(opts) {
        //升级球
        this.upgradeSphere = 500;
        //拥有的战机集合（暂未实现）
        this.fighters = [
                {'atk' : 1, 'shootSpeed' : 1, 'hp' : 10,},
            ];

    }

    CustHolder.upgradeAtk = function(index, value){
        var fighter = this.fighters[index]
        fighter.atk += value;
    }

    return CustHolder;
}());
