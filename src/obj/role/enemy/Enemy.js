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

    _proto.stateEnum = {
        ALIVE: 0,       
        HURT: 1,
        DEATH: 2
    }

    _proto.init = function(opts) {
        _super.call(this, opts);
        _super.prototype.init.call(this.opts);
        this.state = this.stateEnum.ALIVE;
    }

    // 默认移动方式
    _proto.move = function() {
        this.y++;
    }

    // 动画播放完后执行
    _proto.onPlayComplete = function(){
        //如果是击毁动画 则隐藏对象
        if(this.state === this.stateEnum.DEATH){
            //停止动画播放
            this.body.stop();
            this.removeSelf();
            Laya.Pool.recover(this.className, this);
        }else if(this.state === this.stateEnum.HURT){
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