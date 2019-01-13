/**
 * 程序入口在GameInitiator.js之后执行， Laya.stage.addChild 添加第一个页面（加载页面）
 */
(function(){
    var loadScene = new LoadScene();
    Laya.stage.addChild(loadScene);
})();

