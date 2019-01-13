/**
 * 程序的初始化类，用于laya引擎的初始化，设置游戏窗口的等主体；（第一个被执行函数） 
 */
(function(){
    var WebGL = laya.webgl.WebGL;
    // SysConfig.SCREEN_WIDTH = Laya.Browser.clientWidth;
    // SysConfig.SCREEN_HEIGHT = Laya.Browser.clientHeight;

    Laya.init(SysConfig.SCREEN_WIDTH, SysConfig.SCREEN_HEIGHT, WebGL);
    //Laya.Stat.show(0,0);
    //屏幕缩放模式 始终等比显示
    //Laya.stage.scaleMode = Laya.Stage.SCALE_SHOWALL;
    Laya.stage.scaleMode = Laya.Stage.SCALE_EXACTFIT;
    Laya.stage.frameRate = Laya.Stage.FRAME_FAST;

    //水平对齐方式， 水平居中
    Laya.stage.alignH = Laya.Stage.ALIGN_CENTER;
    //垂直对其方式， 垂直居中
    Laya.stage.alignV = Laya.Stage.ALIGN_MIDDLE;
    //屏幕适配  横屏还是竖屏， 默认不改变
    Laya.stage.screenMode = Laya.Stage.SCREEN_NONE;

})();