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

    GameHolder.playInfos = {

    };

    GameHolder.init = function(opts) {
        GameHolder.playInfos.playUI = opts.playUI;
        GameHolder.playInfos.score = 0;
        GameHolder.playInfos.level = 0;
        GameHolder.playInfos.nextLevelScore = 10;
        GameHolder.playInfos.upgradeSphere = 0;
        this.state = GameHolder.stateEnum.PLAY;
        this.playState = GameHolder.playStateEnum.NORMAL;
    }

    GameHolder.increaseScore = function(value){
        GameHolder.playInfos.score += value;
        if(GameHolder.playInfos.score > GameHolder.playInfos.nextLevelScore){
            GameHolder.playInfos.level++;
            GameHolder.playInfos.nextLevelScore += GameHolder.playInfos.nextLevelScore * 0.5;
        }
        if(GameHolder.playInfos.score > GameHolder.appearBossScores[GameHolder.gameData.appearBossIndex] && this.playState === this.playStateEnum.NORMAL) {
            this.playState = this.playStateEnum.SHOW_BOSS;
            GameHolder.gameData.appearBossIndex++;
        }
        GameHolder.playInfos.playUI.showScore(GameHolder.playInfos.score);
    }

    GameHolder.getRatioHp = function(){
        if (GameHolder.playInfos.level >= GameHolder.ratio.hp.length){
            return 2;
        }
        return GameHolder.ratio.hp[GameHolder.playInfos.level];
    }

    GameHolder.increaseUpgradeSphere = function(value){
        GameHolder.playInfos.upgradeSphere += value;
        GameHolder.playInfos.playUI.showUpgradesphere(GameHolder.playInfos.upgradeSphere);
    }

    return GameHolder;
}());
