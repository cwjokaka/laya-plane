/*
* 游戏信息管理类
*/
var GameHolder = (function () {
    var GameHolder = {}

    GameHolder.init = function(opts) {
        this.playUI = opts.playUI;
        this.socre = 0;
        this.level = 1;
        this.nextLevelScore = 200;
        this.upgradeSphere = 0;
    }

    GameHolder.increaseScore = function(value){
        this.socre += value;
        if(this.socre > this.nextLevelScore){
            this.level++;
            this.nextLevelScore += this.nextLevelScore * 0.5;
        }
        this.playUI.showScore(this.socre);
    }

    GameHolder.increaseUpgradeSphere = function(value){
        this.upgradeSphere += value;
        this.playUI.showUpgradesphere(this.upgradeSphere);
    }

    return GameHolder;
}());
