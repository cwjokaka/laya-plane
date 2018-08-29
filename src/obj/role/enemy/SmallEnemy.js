/*
* name;
*/
var SmallEnemy = (function (_super) {
    function SmallEnemy() {
    }

    Laya.class(SmallEnemy, "SmallEnemy", _super);

    var _proto = SmallEnemy.prototype;

    // 类名
    _proto.className = 'SmallEnemy';
    // 动画前缀
    _proto.aniPre = 'enemy1_';
    // 宽度体型修正
    _proto.widthFix = 5;
    // 高度体型修正
    _proto.heightFix = 10;

    // 默认最大生命值
    _proto.maxHp = 2;

    /**
     * 初始化
     */
    _proto.init = function(opts) {
        _super.call(this, opts);
        _super.prototype.init.call(this, opts);
        opts = opts || {};
        this.vy = opts.vy || 3;
        this.score = opts.score || 1;
    }

    /**
     * 被攻击时触发
     * from: 攻击源
     */
    _proto.hitBy = function(from) {
        this.hp -= from.atk;
        if (this.bar) {
            this.bar.setValue(this.hp);
        }

        switch (this.state) {
            case this.stateEnum.ALIVE:
            case this.stateEnum.HURT:
                if(this.hp > 0){
                    this.state = this.stateEnum.HURT;
                } else {
                    this.state = this.stateEnum.DEATH;
                    this.playAction('down');
                    GameHolder.increaseScore(this.score);
                }
                break;
            case this.stateEnum.DEATH:
                break;
            default:
                console.error('未知的敌机状态:', this.state);

        }
    }

    _proto.attack = function() {

    }


    return SmallEnemy;
}(Enemy));