/*
* 资源加载场景
*/
var LoadScene = (function (_super) {
	var Stage       = Laya.Stage;
	var ProgressBar = Laya.ProgressBar;
	var Handler     = Laya.Handler;
	var WebGL       = Laya.WebGL;
	var progressBar;
    function LoadScene(opts) {
        LoadScene.super(this);
		// 先加载进度条图片
        Laya.loader.load(["res/atlas/resource/role.atlas", "res/atlas/resource/ui.atlas", "./res/ui/progressBar.png", "./res/ui/progressBar$bar.png"], Handler.create(this, this.onLoadBarComplete));

    }
    Laya.class(LoadScene, 'LoadScene', _super);

    var _proto = LoadScene.prototype;

	/**
	 * 进度条图片加载完成回调
	 */
	_proto.onLoadBarComplete = function(){
		progressBar = new ProgressBar("./res/ui/progressBar.png");
		progressBar.width = 300;
		progressBar.x = (Laya.stage.width - progressBar.width) / 2;
		progressBar.y = Laya.stage.height / 2;
		progressBar.sizeGrid = "5,5,5,5";
		this.addChild(progressBar);
		this.startLoad();
		this.loadAnimation();
		
		//用户信息初始化（后面改为调后台接口）
		CustHolder.init();
	}

	/**
	 * 开始正式加载资源
	 */
	_proto.startLoad = function() {
		Laya.loader.load([
			{url: Asset.IMAGE.BACKGROUND, type: Laya.Loader.IMAGE},
            {url: Asset.ATLAS.RESOURCE, type: Laya.Loader.ATLAS},
            {url: Asset.SOUND.BG_MUSIC, type: Laya.Loader.SOUND},
            {url: Asset.SOUND.ENEMY_DOWN, type: Laya.Loader.SOUND},
            {url: Asset.SOUND.HERO_SHOOT, type: Laya.Loader.SOUND},
            {url: Asset.SOUND.ACHIEVEMENT, type: Laya.Loader.SOUND},
            {url: Asset.SOUND.BULLET, type: Laya.Loader.SOUND},
            {url: Asset.SOUND.ENEMY_1_DOWN, type: Laya.Loader.SOUND},
            {url: Asset.SOUND.ENEMY_2_DOWN, type: Laya.Loader.SOUND},
            {url: Asset.SOUND.ENEMY_3_DOWN, type: Laya.Loader.SOUND},
            {url: Asset.SOUND.GAME_OVER, type: Laya.Loader.SOUND},
		], 
		Handler.create(this, this.onAllLoaded),
		Handler.create(this, this.onPerLoaded, null, false)
		);
	}

	/**
	 * 资源全部加载完成后回调
	 */
	_proto.onAllLoaded = function() {
		console.log('加载完成,进入游戏');
		this.removeSelf();
		Laya.stage.addChild(new StartScene());
	}

	/**
	 * 每个资源加载完成后回调
	 */
	_proto.onPerLoaded = function(percent) {
		progressBar.value = percent;
		// console.log('当前进度:' + percent);
	}
    
	/**
	 * 动画加载
	 */
    _proto.loadAnimation = function(){
        //缓存飞机的动作
        Laya.Animation.createFrames(["resource/role/hero_fly.png"],"hero_fly");
        //缓存集中爆炸动作
        Laya.Animation.createFrames(["resource/role/enemy1_down1.png","resource/role/enemy1_down2.png"],"hero_down");

        //缓存敌机1飞行动作
        Laya.Animation.createFrames(["resource/role/enemy1_fly1.png"],"enemy1_fly");
        //缓存敌机1爆炸动作
        Laya.Animation.createFrames(["resource/role/enemy1_down1.png","resource/role/enemy1_down2.png","resource/role/enemy1_down3.png"
        ,"resource/role/enemy1_down4.png"],"enemy1_down");

        //缓存敌机2飞行动作
        Laya.Animation.createFrames(["resource/role/enemy2_fly.png"],"enemy2_fly");
        //缓存敌机2爆炸动作
        Laya.Animation.createFrames([
         "resource/role/explosion2.png",
        "resource/role/explosion3.png",
        "resource/role/explosion4.png",
        "resource/role/explosion5.png",
        "resource/role/explosion6.png",
        "resource/role/explosion7.png",
        "resource/role/explosion8.png",
        "resource/role/explosion9.png",
        "resource/role/explosion10.png",
        "resource/role/explosion12.png",
        "resource/role/explosion13.png",
        "resource/role/explosion15.png",
        ],"enemy2_down");
        //缓存敌机2碰撞动作
        Laya.Animation.createFrames(["resource/role/enemy2_hit1.png","resource/role/enemy2_hit2.png","resource/role/enemy2_hit3.png"],"enemy2_hit");

        //缓存敌机3飞行动作
        Laya.Animation.createFrames(["resource/role/enemy3_fly.png"],"enemy3_fly");
        //缓存敌机3爆炸动作
        Laya.Animation.createFrames([
         "resource/role/explosion2.png",
        "resource/role/explosion3.png",
        "resource/role/explosion4.png",
        "resource/role/explosion5.png",
        "resource/role/explosion6.png",
        "resource/role/explosion7.png",
        "resource/role/explosion8.png",
        "resource/role/explosion9.png",
        "resource/role/explosion10.png",
        "resource/role/explosion12.png",
        "resource/role/explosion13.png",
        "resource/role/explosion15.png",
        ],"enemy3_down");
        //缓存敌机3碰撞动作
        Laya.Animation.createFrames(["resource/role/enemy3_hit1.png","resource/role/enemy3_hit2.png","resource/role/enemy3_hit3.png"],"enemy3_hit");

        //缓存敌机4飞行动作
        Laya.Animation.createFrames(["resource/role/enemy4_fly.png"],"enemy4_fly");
        //缓存敌机4爆炸动作
        Laya.Animation.createFrames(["resource/role/enemy4_down1.png","resource/role/enemy4_down2.png","resource/role/enemy4_down3.png"
        ,"resource/role/enemy4_down4.png","resource/role/enemy4_down5.png","resource/role/enemy4_down6.png"],"enemy4_down");
        //缓存敌机4碰撞动作
        Laya.Animation.createFrames(["resource/role/enemy4_fly.png"],"enemy4_hit");

        //缓存子弹动画
        Laya.Animation.createFrames(["resource/role/bullet1.png"],"bullet1_fly");                // 主角炸弹
       // Laya.Animation.createFrames(["resource/role/enemy1_down1.png","resource/role/enemy1_down2.png"],"bullet1_down");

        // 敌机子弹
        Laya.Animation.createFrames(["resource/role/enemy_bullet.png"],"enemy_bullet_fly");

        // 主角炸弹
        Laya.Animation.createFrames(["resource/ui/heroBoom.png"],"hero_boom_fly");
        //缓存激光子弹
        Laya.Animation.createFrames(["resource/role/laser_bullet.png"],"laser_bullet_fly");

        //缓存强化包
        Laya.Animation.createFrames(["resource/role/ufo1.png"],"ufo1_fly");
        //缓存炸弹包
        Laya.Animation.createFrames(["resource/role/ufo2.png"],"ufo2_fly");
        //缓存升级球
        Laya.Animation.createFrames(["resource/role/upgrade.png"],"upgrade_fly");
		//缓存升级球
        Laya.Animation.createFrames(["resource/role/hp_item.png"],"heroHp_fly");
        //缓存激光图标
        Laya.Animation.createFrames(["resource/role/laser_item.png"],"laser_item_fly");
    }
	return LoadScene;

}(Laya.Sprite));