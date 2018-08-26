/*
* name;
*/
var Enemy = (function (_super) {

    function Enemy(opts) {
    }

    Laya.class(Enemy, "Enemy", _super);

    var _proto = Enemy.prototype;

    // 类名
    _proto.className = 'Enemy';
    // 动画前缀
    _proto.aniPre = 'enemy_';
    // 宽度体型修正
    _proto.widthFix = 5;
    // 高度体型修正
    _proto.heightFix = 5;

    _proto.stateEnum = {
        ALIVE: 0,       
        HURT: 1,
        DEATH: 2
    }

    _proto.init = function(opts) {
        _super.call(this, opts);
        _super.prototype.init.call(this, opts);
        opts = opts || {};
        this.vx = opts.vx || 0;
        this.vy = opts.vy || 1;
        this.score = opts.score || 1;
        //创建一个动画为飞机的身体
        this.body = new Laya.Animation();
        //把机体添加到容器内
        this.addChild(this.body);
        this.body.on(Laya.Event.COMPLETE, this, this.onPlayComplete);
        this.playAction("fly");
        var bound = this.body.getBounds();
        var newBound = bound.clone();
        newBound.setTo(newBound.x + this.widthFix, newBound.y + this.heightFix, newBound.width - 2 * this.widthFix, newBound.height - 2 * this.heightFix);
        this.setBounds(newBound);
        this.state = this.stateEnum.ALIVE;
    }

    // 默认移动方式
    _proto.move = function() {
        if (this.state != this.stateEnum.DEATH)
            this.y += this.vy;
    }

    /**
     * 被攻击时触发
     * from: 攻击源
     */
    _proto.hitBy = function(from) {
        this.hp -= from.atk;
        switch (this.state) {
            case this.stateEnum.ALIVE:
            case this.stateEnum.HURT:
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
                console.error('未知的敌机状态:', this.state);

        }
    }

    /**
     * 被机体撞击时触发
     * from: 撞击源
     */
    _proto.impactedBy = function(from) {
        this.hp = 0;
        switch (this.state) {
            case this.stateEnum.ALIVE:
            case this.stateEnum.HURT:
                from.impactedBy(this);
                this.state = this.stateEnum.DEATH;
                this.playAction('down');
                GameHolder.increaseScore(this.score);
                break;
            case this.stateEnum.DEATH:
                break;
            default:
                console.error('未知的敌机状态:', this.state);
        }
    }

    // 移动与回收
    _proto.moveAndRecover = function() {
        this.move();
        if (this.y > SysConfig.SCREEN_HEIGHT + 30) {
            this.removeSelf();
            Laya.Pool.recover(this.className, this);
        }

    }

    // 动画播放完后执行
    _proto.onPlayComplete = function(){
        // 如果是击毁动画 则隐藏对象
        if(this.state === this.stateEnum.DEATH) {
            // 停止动画播放
            this.body.stop();
            this.removeSelf();
            Laya.Pool.recover(this.className, this);
        } else if(this.state === this.stateEnum.HURT) {
            this.state = this.stateEnum.ALIVE;
            this.playAction("fly");
        }
    }
    /**
     * 播放动画
     */
    _proto.playAction = function(action){
        this.action = action;
        this.body.play(0, true, this.aniPre + this.action);
        //获取动画大小区域t
        this.bound = this.body.getBounds();
        //设置机身居中
        this.body.pos(-this.bound.width/2, -this.bound.height/2);
    }


    return Enemy;
}(Role));