var CLASS$=Laya.class;
var STATICATTR$=Laya.static;
var View=laya.ui.View;
var Dialog=laya.ui.Dialog;
var DeadPageUI=(function(_super){
		function DeadPageUI(){
			
		    this.endLabel=null;

			DeadPageUI.__super.call(this);
		}

		CLASS$(DeadPageUI,'ui.DeadPageUI',_super);
		var __proto__=DeadPageUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(DeadPageUI.uiView);

		}

		DeadPageUI.uiView={"type":"View","props":{"width":400,"height":825},"child":[{"type":"Image","props":{"y":404,"x":106,"width":176,"skin":"resource/ui/myLabel.png","height":50},"child":[{"type":"Label","props":{"y":0,"x":0,"width":178,"var":"endLabel","valign":"middle","text":"结束","height":49,"fontSize":30,"color":"#c81818","align":"center"}}]}]};
		return DeadPageUI;
	})(View);
var GameInfoUI=(function(_super){
		function GameInfoUI(){
			
		    this.scoreLabel=null;
		    this.boomLabel=null;
		    this.upgradesphereLabel=null;
		    this.heroHpPos=null;

			GameInfoUI.__super.call(this);
		}

		CLASS$(GameInfoUI,'ui.GameInfoUI',_super);
		var __proto__=GameInfoUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(GameInfoUI.uiView);

		}

		GameInfoUI.uiView={"type":"View","props":{"width":400,"height":825},"child":[{"type":"Image","props":{"y":12,"x":4,"width":108,"skin":"resource/ui/myLabel.png","rotation":1,"height":34},"child":[{"type":"Label","props":{"y":-2,"x":6,"wordWrap":true,"width":100,"var":"scoreLabel","valign":"middle","text":"2555555","height":32,"fontSize":20,"color":"#120707"}}]},{"type":"Label","props":{"y":793,"x":7,"width":59,"var":"boomLabel","valign":"middle","text":"炸弹","height":36,"fontSize":20,"color":"#1a22e8","borderColor":"#0c4ae8"}},{"type":"Image","props":{"y":50,"x":5,"width":108,"skin":"resource/ui/myLabel.png","rotation":1,"height":34},"child":[{"type":"Label","props":{"y":0,"x":35,"wordWrap":true,"width":70,"var":"upgradesphereLabel","valign":"middle","text":"255","height":32,"fontSize":20,"color":"#120707"}},{"type":"Image","props":{"y":0,"x":-2,"skin":"resource/role/upgrade.png"}}]},{"type":"Image","props":{"y":33,"x":241,"width":102,"skin":"resource/ui/myLabel.png","height":10},"child":[{"type":"Sprite","props":{"y":-1,"x":-1,"width":142,"var":"heroHpPos","height":32}},{"type":"Image","props":{"y":-6,"x":-17,"width":22,"skin":"resource/ui/hpLogo.png","height":22}}]}]};
		return GameInfoUI;
	})(View);
var HomePageUI=(function(_super){
		function HomePageUI(){
			
		    this.startGameLabel=null;
		    this.upgradeAttriLabel=null;

			HomePageUI.__super.call(this);
		}

		CLASS$(HomePageUI,'ui.HomePageUI',_super);
		var __proto__=HomePageUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(HomePageUI.uiView);

		}

		HomePageUI.uiView={"type":"View","props":{"width":400,"height":825},"child":[{"type":"Image","props":{"y":-2,"x":-3,"width":533,"skin":"resource/role/background.png","height":852}},{"type":"Image","props":{"y":230,"x":63,"width":289,"skin":"resource/ui/myLabel.png","height":101},"child":[{"type":"Label","props":{"y":28,"x":50,"width":182,"var":"startGameLabel","text":"开始游戏","height":62,"fontSize":45,"color":"#cd1b18"}}]},{"type":"Image","props":{"y":344,"x":62,"width":289,"skin":"resource/ui/myLabel.png","height":101},"child":[{"type":"Label","props":{"y":25,"x":48,"width":182,"var":"upgradeAttriLabel","text":"升级属性","height":62,"fontSize":45,"color":"#cd1b18"}}]}]};
		return HomePageUI;
	})(View);
var UpgradeUI=(function(_super){
		function UpgradeUI(){
			
		    this.upgradeSphereLabel=null;
		    this.hpLabel=null;
		    this.backLabel=null;
		    this.hpUpgradeBtn=null;
		    this.hpUpgradeLabel=null;
		    this.shootSpeedLabel=null;
		    this.shootSpeedBtn=null;
		    this.attLabel=null;
		    this.attUpgradeBtn=null;

			UpgradeUI.__super.call(this);
		}

		CLASS$(UpgradeUI,'ui.UpgradeUI',_super);
		var __proto__=UpgradeUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(UpgradeUI.uiView);

		}

		UpgradeUI.uiView={"type":"View","props":{"width":400,"height":825},"child":[{"type":"Image","props":{"y":152,"x":47,"width":303,"skin":"resource/ui/upgrade.png","height":545}},{"type":"Image","props":{"y":157,"x":46,"width":37,"skin":"resource/role/upgrade.png","height":36}},{"type":"Label","props":{"y":164,"x":79,"width":74,"var":"upgradeSphereLabel","text":"123123","height":28,"fontSize":20,"color":"#092256","bold":true,"align":"center"}},{"type":"Image","props":{"y":305,"x":83,"width":188,"skin":"resource/ui/attriUpgradeBg.png","height":48},"child":[{"type":"Label","props":{"y":6,"x":67,"width":82,"var":"hpLabel","valign":"middle","text":"123123","height":33,"fontSize":15,"bold":true,"align":"center"}},{"type":"Label","props":{"y":6,"x":19,"width":66,"valign":"middle","text":"血量：","height":33,"fontSize":15,"bold":true,"align":"center"}},{"type":"Label","props":{"y":-296,"x":-80,"width":61,"var":"backLabel","text":"返回","height":34,"fontSize":30,"color":"#ec110e","bold":true}}]},{"type":"Image","props":{"y":306,"x":234,"width":94,"var":"hpUpgradeBtn","skin":"resource/ui/upgradeBtn.png","height":47},"child":[{"type":"Label","props":{"y":7,"x":31,"width":52,"var":"hpUpgradeLabel","valign":"middle","text":"50(+1)","height":29,"fontSize":15,"bold":true,"align":"center"}}]},{"type":"Image","props":{"y":313,"x":244,"width":29,"skin":"resource/role/upgrade.png","height":27}},{"type":"Image","props":{"y":370,"x":84,"width":188,"skin":"resource/ui/attriUpgradeBg.png","height":48},"child":[{"type":"Label","props":{"y":6,"x":71,"width":74,"var":"shootSpeedLabel","valign":"middle","text":"123123","height":33,"fontSize":15,"bold":true,"align":"center"}},{"type":"Label","props":{"y":5,"x":21,"width":61,"valign":"middle","text":"射速：","height":33,"fontSize":15,"bold":true,"align":"center"}}]},{"type":"Image","props":{"y":371,"x":235,"width":94,"var":"shootSpeedBtn","skin":"resource/ui/upgradeBtn.png","height":47},"child":[{"type":"Label","props":{"y":7,"x":31,"width":52,"valign":"middle","text":"50(+1)","height":29,"fontSize":15,"bold":true,"align":"center"}}]},{"type":"Image","props":{"y":378,"x":245,"width":29,"skin":"resource/role/upgrade.png","height":27}},{"type":"Image","props":{"y":437,"x":83,"width":188,"skin":"resource/ui/attriUpgradeBg.png","height":48},"child":[{"type":"Label","props":{"y":6,"x":68,"width":60,"var":"attLabel","valign":"middle","text":"123123","height":33,"fontSize":15,"bold":true,"align":"center"}},{"type":"Label","props":{"y":5,"x":22,"width":60,"valign":"middle","text":"火力：","height":33,"fontSize":15,"bold":true,"align":"center"}}]},{"type":"Image","props":{"y":438,"x":234,"width":94,"var":"attUpgradeBtn","skin":"resource/ui/upgradeBtn.png","height":47},"child":[{"type":"Label","props":{"y":7,"x":31,"width":52,"valign":"middle","text":"100(+1)","height":29,"fontSize":15,"bold":true,"align":"center"}}]},{"type":"Image","props":{"y":445,"x":244,"width":29,"skin":"resource/role/upgrade.png","height":27}}]};
		return UpgradeUI;
	})(View);