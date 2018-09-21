var BaseEnemyFactory = (function () {
   
    function BaseEnemyFactory() {
        
    }

    Laya.class(BaseEnemyFactory, "BaseEnemyFactory");
    var _proto = BaseEnemyFactory.prototype;

    _proto.createEnemy = function() {
        var arr = []
        //生成小飞机
        if(Laya.timer.currFrame % (80) === 0){
            var smallEnemy = Laya.Pool.getItemByClass(SmallEnemy.prototype.className, SmallEnemy);
            smallEnemy.init({x: Math.random()*SysConfig.SCREEN_WIDTH, y: -100, ratioHp: GameHolder.getRatioHp(0)});
            // return smallEnemy;
            arr.push(smallEnemy);
        }
        //生成中型飞机
        if(Laya.timer.currFrame % (150) === 0){
            var mediumEnemy = Laya.Pool.getItemByClass(MediumEnemy.prototype.className, MediumEnemy);
            mediumEnemy.init({x: Math.random()*SysConfig.SCREEN_WIDTH, y: -100, ratioHp: GameHolder.getRatioHp(1)});
            arr.push(mediumEnemy);
        }
        //生成大型飞机
        if(Laya.timer.currFrame % (450) === 0){
            var largeEnemy = Laya.Pool.getItemByClass(LargeEnemy.prototype.className, LargeEnemy);
            largeEnemy.init({x: Math.random()*SysConfig.SCREEN_WIDTH, y: -100, ratioHp: GameHolder.getRatioHp(2)});
            arr.push(largeEnemy);
        }
        return arr;
    }

    return BaseEnemyFactory;

})();