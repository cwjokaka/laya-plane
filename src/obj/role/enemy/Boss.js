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
    _proto.maxHp = 800 * (GameHolder.gameData.appearBossIndex + 1) * 2;

    // 攻击方式
    _proto.attackMode = [
        [
            {bullet: EnemyBullet, delay: 30, repeat: 6},
            {bullet: EnemyBullet, delay: 60, repeat: 3},
            {bullet: EnemyBullet, delay: 15, repeat: 5}
        ],
        [

        ]
    ]

    /**
     * 初始化
     */
    _proto.init = function(opts) {
        _super.call(this, opts);
        _super.prototype.init.call(this, opts);
        opts = opts || {};
        this.vy = opts.vy || 1;
        this.vx = opts.vx || 1;
        this.dir = 1;
        this.state = this.stateEnum.SHOW;
        this.width = this.body.getBounds().width;
        this.score = 100;
        this.curForm = 0;
        this.curAttackIndex = 0;
        this.curRepeatCount = 1;
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
                //GameHolder.increaseScore(this.score);
                break;
            default:
                break;
        }
    }

    // 攻击
    _proto.attack = function() {
        switch(this.state) {
            case this.stateEnum.SHOW:
                break;
            case this.stateEnum.ALIVE:
            case this.stateEnum.HURT:
                var nowFrame = Laya.timer.currFrame;
                if (this.attackFrame <= nowFrame) {
                    var curAttack = this.attackMode[this.curForm][this.curAttackIndex];

                    if (++this.curRepeatCount >= curAttack.repeat) {
                        this.curRepeatCount = 1;
                        if (++this.curAttackIndex >= this.attackMode[this.curForm].length) {
                            this.curAttackIndex = 0;
                        }
                    }
                    var bulletClass = curAttack.bullet;
                    var bullet = Laya.Pool.getItemByClass(bulletClass.prototype.className, bulletClass);
                    bullet.init({x: this.x, y: this.y});
                    ObjectHolder.enemyBulletBox.addChild(bullet);
                    this.attackFrame = nowFrame + curAttack.delay;
                }
                break;
            case this.stateEnum.DEATH:
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