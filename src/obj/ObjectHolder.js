/*
* 对象管理者
*/
var ObjectHolder = (function () {
    var ObjectHolder = {}

    ObjectHolder.init = function(opts) {
        this.background = new Background();
        this.enemyBox = new Laya.Sprite();
        this.heroBulletBox = new Laya.Sprite();
        this.enemyBulletBox = new Laya.Sprite();
        this.itemBox = new Laya.Sprite();
        this.hero = new Hero();
        this.playUI = new PlayUI();
    }

    ObjectHolder.reset = function() {
        this.background.destroy();
        this.background = new Background();
        this.enemyBox.destroy();
        this.enemyBox = new Laya.Sprite();
        this.enemyBulletBox.destroy();
        this.enemyBulletBox = new Laya.Sprite();
        this.heroBulletBox.destroy();
        this.heroBulletBox = new Laya.Sprite();
        this.itemBox.destroy();
        this.itemBox = new Laya.Sprite();
        this.hero.destroy();
        this.hero = new Hero();
        this.playUI.destroy();
        this.playUI = new PlayUI();
    }

    return ObjectHolder;
}());
