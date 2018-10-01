/*
* name;
*/
var BevelSmallEnemy = (function (_super) {
    function BevelSmallEnemy() {
    }

    Laya.class(BevelSmallEnemy, "BevelSmallEnemy", _super);

    var _proto = BevelSmallEnemy.prototype;

    // 类名
    _proto.className = 'BevelSmallEnemy';
    // 动画前缀
    _proto.aniPre = 'bevelSmallEnemy_';
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
        this.enemyType =  opts.enemyType + '_';
        _super.call(this, opts);
        _super.prototype.init.call(this, opts);
        opts = opts || {};
        this.vy = opts.vy || 2.5;
        this.vx = opts.vx || 0;
        this.score = opts.score || 5;
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
                    GameHolder.increaseScore(GameConfig.HIT_SCORE);
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

    /**
     * 播放动画
     */
    _proto.playAction = function(action){
        this.action = action;
        this.body.play(0, true, this.aniPre + this.enemyType +this.action);
        //获取动画大小区域t
        this.bound = this.body.getBounds();
        //设置机身居中
        this.body.pos(-this.bound.width/2, -this.bound.height/2);
    }

    _proto.attack = function() {

    }

    _proto.move = function() {
        if (this.state != this.stateEnum.DEATH)
            this.y += this.vy;
            this.x += this.vx;
    }

    return BevelSmallEnemy;
}(Enemy));