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
        Laya.Animation.createFrames(["resource/role/hero_fly1.png","resource/role/hero_fly2.png"],"hero_fly");
        //缓存集中爆炸动作
        Laya.Animation.createFrames(["resource/role/hero_down1.png","resource/role/hero_down2.png"
        ,"resource/role/hero_down3.png","resource/role/hero_down4.png"],"hero_down");

        //缓存敌机1飞行动作
        Laya.Animation.createFrames(["resource/role/enemy1_fly1.png"],"enemy1_fly");
        //缓存敌机1爆炸动作
        Laya.Animation.createFrames(["resource/role/enemy1_down1.png","resource/role/enemy1_down2.png","resource/role/enemy1_down3.png"
        ,"resource/role/enemy1_down4.png"],"enemy1_down");

        //缓存敌机2飞行动作
        Laya.Animation.createFrames(["resource/role/enemy2_fly1.png"],"enemy2_fly");
        //缓存敌机2爆炸动作
        Laya.Animation.createFrames(["resource/role/enemy2_down1.png","resource/role/enemy2_down2.png","resource/role/enemy2_down3.png"
        ,"resource/role/enemy2_down4.png"],"enemy2_down");
        //缓存敌机2碰撞动作
        Laya.Animation.createFrames(["resource/role/enemy2_hit.png"],"enemy2_hit");

        //缓存敌机3飞行动作
        Laya.Animation.createFrames(["resource/role/enemy3_fly1.png","resource/role/enemy3_fly2.png"],"enemy3_fly");
        //缓存敌机3爆炸动作
        Laya.Animation.createFrames(["resource/role/enemy3_down1.png","resource/role/enemy3_down2.png","resource/role/enemy3_down3.png"
        ,"resource/role/enemy3_down4.png","resource/role/enemy3_down5.png","resource/role/enemy3_down6.png"],"enemy3_down");
        //缓存敌机3碰撞动作
        Laya.Animation.createFrames(["resource/role/enemy3_hit.png"],"enemy3_hit");

        //缓存子弹动画
        Laya.Animation.createFrames(["resource/role/bullet1.png"],"bullet1_fly");

        //缓存强化包
        Laya.Animation.createFrames(["resource/role/ufo1.png"],"ufo1_fly");
        //缓存炸弹包
        Laya.Animation.createFrames(["resource/role/ufo2.png"],"ufo2_fly");
        //缓存升级球
        Laya.Animation.createFrames(["resource/role/upgrade.png"],"upgrade_fly");
		//缓存升级球
        Laya.Animation.createFrames(["resource/ui/hpLogo.png"],"heroHp_fly");
    }
	return LoadScene;

}(Laya.Sprite));