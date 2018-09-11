/*
* 游戏信息管理类
*/
var GameHolder = (function () {
    var GameHolder = {}

    // 游戏状态
    GameHolder.stateEnum = {
        PLAY: 0,
        PAUSE: 1,
        END: 2
    };

    // 游戏状态
    GameHolder.appearBossScores = [500, 800, 2000, 15000];

    // 游戏进行中的状态
    GameHolder.playStateEnum = {
        NORMAL: 0,
        SHOW_BOSS: 1,
        BOSSING: 2,
        BONUS: 3
    };

    GameHolder.ratio = {
        hp:     [1, 1.1, 1.2],
        atk:    [1, 1.1, 1.2]
    }

    GameHolder.gameData = {
        appearBossIndex: 0,//boss出现的下标
    }

    GameHolder.init = function(opts) {
        this.playUI = opts.playUI;
        this.score = 0;
        this.level = 0;
        this.nextLevelScore = 10;
        this.upgradeSphere = 0;
        this.state = GameHolder.stateEnum.PLAY;
        this.playState = GameHolder.playStateEnum.NORMAL;
    }

    GameHolder.increaseScore = function(value){
        this.score += value;
        if(this.score > this.nextLevelScore){
            this.level++;
            this.nextLevelScore += this.nextLevelScore * 0.5;
        }
        if(this.score > GameHolder.appearBossScores[GameHolder.gameData.appearBossIndex] && this.playState === this.playStateEnum.NORMAL) {
            this.playState = this.playStateEnum.SHOW_BOSS;
            GameHolder.gameData.appearBossIndex++;
        }
        this.playUI.showScore(this.score);
    }

    GameHolder.getRatioHp = function(){
        if (this.level >= GameHolder.ratio.hp.length){
            return 2;
        }
        return GameHolder.ratio.hp[this.level];
    }

    GameHolder.increaseUpgradeSphere = function(value){
        this.upgradeSphere += value;
        this.playUI.showUpgradesphere(this.upgradeSphere);
    }

    return GameHolder;
}());
