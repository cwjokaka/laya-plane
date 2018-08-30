/*
* name;
*/
var Boss = (function (_super) {
    function Boss() {
    }

    Laya.class(Boss, "Boss", _super);

    var _proto = Boss.prototype;

    // 类名
    _proto.className = 'Boss';
    // 动画前缀
    _proto.aniPre = 'enemy3_';
    // 宽度体型修正
    _proto.widthFix = 20;
    // 高度体型修正
    _proto.heightFix = 20;

    // 状态枚举
    _proto.stateEnum = {
        SHOW: 0,
        ALIVE: 1,
        HURT: 2,
        DEATH: 3
    };

    // 默认最大生命值
    _proto.maxHp = 100;

    /**
     * 初始化
     */
    _proto.init = function(opts) {
        _super.call(this, opts);
        _super.prototype.init.call(this, opts);
        opts = opts || {};
        // this.maxHp = opts.maxHp || 300;
        // this.hp = opts.hp || this.maxHp;
        this.vy = opts.vy || 1;
        this.vx = opts.vx || 1;
        this.dir = 1;
        this.state = this.stateEnum.SHOW;
        this.width = this.body.getBounds().width;
    }

    // 移动
    _proto.move = function() {
        switch(this.state) {
            case this.stateEnum.SHOW:
                this.y += this.vy;
                if (this.y > 200) {
                    this.state = this.stateEnum.ALIVE;
                }
                break;
            case this.stateEnum.ALIVE:
            case this.stateEnum.HURT:
                this.x += this.vx * this.dir;
                if (this.x <= this.width / 2 || this.x >= SysConfig.SCREEN_WIDTH - this.width / 2 ){
                    this.dir = -this.dir;
                }
                break;
            case this.stateEnum.DEATH:
                GameHolder.playState = GameHolder.playStateEnum.NORMAL;
                break;
            default:
                break;
        }
    }

    /**
     * 被攻击时触发
     * from: 攻击源
     */
    _proto.hitBy = function(from) {
        switch (this.state) {
            case this.stateEnum.SHOW:
                break;
            case this.stateEnum.ALIVE:
            case this.stateEnum.HURT:
                this.hp -= from.atk;
                if (this.bar) {
                    this.bar.setValue(this.hp);
                }
                if(this.hp > 0){
                    this.state = this.stateEnum.HURT;
                    this.playAction('hit');
                } else {
                    this.state = this.stateEnum.DEATH;
                    this.playAction('down');
                }
                break;
            case this.stateEnum.DEATH:
                break;
            default:
                console.error('hitBy未知的敌机状态:', this.state);
        }
    }

    /**
     * 被机体撞击时触发
     * from: 撞击源
     */
    _proto.impactedBy = function(from) {
        
    }


    return Boss;
}(Enemy));