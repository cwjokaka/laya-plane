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

    // 物品掉落率 0~1
    _proto.itemDropChance = 0;
    // 物品掉落区间
    _proto.itemDropZone = [
        {from: 0, to: 0.03, item: ItemBoom},
        {from: 0.03, to: 0.13, item: ItemBullet},
        {from: 0.13, to: 0.20, item: ItemHp},
        {from: 0.20, to: 0.25, item: ItemLaser},
        {from: 0.25, to: 1, item: ItemUpgrade}
    ];

    // 状态枚举
    _proto.stateEnum = {
        ALIVE: 0,
        HURT: 1,
        DEATH: 2
    }

    // 默认最大生命值
    _proto.maxHp = 1;

    // 攻击间隔(帧数)
    _proto.attackInterval = 60;

    _proto.init = function(opts) {
        _super.call(this, opts);
        _super.prototype.init.call(this, opts);
        opts = opts || {};
        delete this.maxHp;
        delete this.hp;
        var ratioHp = opts.ratioHp || 1
        this.maxHp = opts.maxHp || this.maxHp * ratioHp;
        this.hp = opts.hp || this.maxHp;
        this.vx = opts.vx || 0;
        this.vy = opts.vy || 1;
        this.score = opts.score || 1;
        // 下一次攻击的帧数
        this.attackFrame = Laya.timer.currFrame + this.attackInterval;
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
        // 添加血条
        if(!opts.isHiddenBlood){
            var width = newBound.width;
            var height = newBound.height;
            var bar = Laya.Pool.getItemByClass(Bar.prototype.className, Bar);
            this.bar = bar;
            bar.init({x: -(width / 2), y: -(height / 2) - 30, width: width,borderWidth: 4, maxValue: this.maxHp, alpha: 0, fadeTime: 500});
            this.addChild(bar);
        }
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
        if (this.bar) {
            this.bar.setValue(this.hp);
        }
        switch (this.state) {
            case this.stateEnum.ALIVE:
            case this.stateEnum.HURT:
                if(this.hp > 0){
                    this.state = this.stateEnum.HURT;
                    this.playAction('hit');
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
                console.error('hitBy未知的敌机状态:', this.state);
        }
    }

    /**
     * 被机体撞击时触发
     * from: 撞击源
     */
    _proto.impactedBy = function(from) {
        this.hp = 0;
        if (this.bar) {
            this.bar.setValue(this.hp);
        }

        switch (this.state) {
            case this.stateEnum.ALIVE:
            case this.stateEnum.HURT:
                from.hitAction(this.atk);
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

    /**
     * 物品掉落
     */
    _proto.dropItem = function() {
        var ran = Math.random();
        if (this.itemDropChance >= ran) {
            ran = Math.random();
            for(var i in this.itemDropZone) {
                if(ran >= this.itemDropZone[i].from && ran <= this.itemDropZone[i].to){
                    var item = Laya.Pool.getItemByClass(this.itemDropZone[i].item.className, this.itemDropZone[i].item);
                    item.init({x: this.x, y: this.y});
                    ObjectHolder.itemBox.addChild(item);
                    break;
                }
            }
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

    // 攻击
    _proto.attack = function() {
        var nowFrame = Laya.timer.currFrame;
        if (this.attackFrame <= nowFrame) {
            var bullet = Laya.Pool.getItemByClass(EnemyBullet.className, EnemyBullet);
            bullet.init({x: this.x - 3, y: this.y - 3, vy: 5, vx: 0});
            ObjectHolder.enemyBulletBox.addChild(bullet);
            this.attackFrame = nowFrame + this.attackInterval;
        }
    }

    // 动画播放完后执行
    _proto.onPlayComplete = function(){
        // 如果是击毁动画 则隐藏对象
        if(this.state === this.stateEnum.DEATH) {
            // 停止动画播放
            this.body.stop();
            // 掉落物品
            this.dropItem();
            this.removeSelf();
            Laya.Pool.recover(this.className, this);
            if(this.bar){
              Laya.Pool.recover(this.bar.className, this.bar);              
            }
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