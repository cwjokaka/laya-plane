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
        Laya.loader.load(["./res/ui/progressBar.png", "./res/ui/progressBar$bar.png"], Handler.create(this, this.onLoadBarComplete));

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
		Laya.stage.addChild(progressBar);
		this.startLoad();
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
		Laya.stage.addChild(new PlayScene());
	}

	/**
	 * 每个资源加载完成后回调
	 */
	_proto.onPerLoaded = function(percent) {
		progressBar.value = percent;
		// console.log('当前进度:' + percent);
	}

	return LoadScene;

}(Laya.Sprite));