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
            smallEnemy.init({x: Math.random()*SysConfig.SCREEN_WIDTH, y: -100, ratioHp: GameHolder.getRatioHp(0), isHiddenBlood: true});
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
        //生成斜角小飞机
        if(Laya.timer.currFrame % (200) === 0){
            var bevelSmallEnemy = Laya.Pool.getItemByClass(BevelSmallEnemy.prototype.className, BevelSmallEnemy);
            var hero = ObjectHolder.hero;
            var x = -20;
            var y = (hero.y - hero.x) / 2;
            var vx = 1.5;
            var vy = 3;
            var enemyType = 'lu';
            if(hero.x < SysConfig.SCREEN_WIDTH/2){
               x = 500;
               y = (hero.y - x  + hero.x) / 2;
               vx = -1.5;
               enemyType = 'ru';
            }
            bevelSmallEnemy.init({x: x, y: y, vx: vx, vy: vy, enemyType: enemyType, ratioHp: GameHolder.getRatioHp(0), isHiddenBlood: true});
            // return smallEnemy;
            arr.push(bevelSmallEnemy);
        }
        return arr;
    }

    return BaseEnemyFactory;

})();