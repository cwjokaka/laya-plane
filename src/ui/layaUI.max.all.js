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

		DeadPageUI.uiView={"type":"View","props":{"width":480,"height":825},"child":[{"type":"Image","props":{"y":396,"x":145,"width":176,"skin":"resource/ui/myLabel.png","height":50},"child":[{"type":"Label","props":{"y":0,"x":0,"width":178,"var":"endLabel","valign":"middle","text":"结束","height":49,"fontSize":30,"color":"#c81818","align":"center"}}]}]};
		return DeadPageUI;
	})(View);
var GameInfoUI=(function(_super){
		function GameInfoUI(){
			
		    this.heroHpPos=null;
		    this.boomBtn=null;
		    this.boomLabel=null;
		    this.scoreLabel=null;
		    this.upgradesphereLabel=null;

			GameInfoUI.__super.call(this);
		}

		CLASS$(GameInfoUI,'ui.GameInfoUI',_super);
		var __proto__=GameInfoUI.prototype;
		__proto__.createChildren=function(){
		    			View.regComponent("Text",laya.display.Text);

			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(GameInfoUI.uiView);

		}

		GameInfoUI.uiView={"type":"View","props":{"width":480,"height":825},"child":[{"type":"Image","props":{"y":29,"x":338,"width":102,"skin":"resource/ui/myLabel.png","height":10},"child":[{"type":"Sprite","props":{"y":-1,"x":-1,"width":142,"var":"heroHpPos","height":34}},{"type":"Image","props":{"y":-13,"x":-34,"width":34,"skin":"resource/role/hp_item.png","height":36}}]},{"type":"Image","props":{"y":775,"x":6,"width":50,"var":"boomBtn","skin":"resource/ui/myLabel.png","height":50},"child":[{"type":"Image","props":{"y":1,"x":4,"width":40,"skin":"resource/ui/boomBtn.png","height":30}},{"type":"Text","props":{"y":43,"x":16,"width":30,"var":"boomLabel","text":"x 5","pivotY":12,"height":20,"color":"#f4eeee"}}]},{"type":"Image","props":{"y":1,"x":0,"width":180,"skin":"resource/ui/myLabel.png","height":40},"child":[{"type":"Label","props":{"y":4,"x":3,"wordWrap":true,"width":172,"var":"scoreLabel","valign":"middle","text":"2555555","height":32,"fontSize":25,"color":"#120707"}}]},{"type":"Image","props":{"y":47,"x":1,"width":130,"skin":"resource/ui/myLabel.png","height":40},"child":[{"type":"Label","props":{"y":7,"x":42,"wordWrap":true,"width":80,"var":"upgradesphereLabel","valign":"middle","text":"255","height":32,"fontSize":20,"color":"#120707"}},{"type":"Image","props":{"y":7,"x":7,"width":33,"skin":"resource/role/upgrade.png","height":32}}]}]};
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

		HomePageUI.uiView={"type":"View","props":{"width":400,"height":825},"child":[{"type":"Image","props":{"y":-2,"x":-3,"width":480,"skin":"resource/role/background.jpg","height":855}},{"type":"Image","props":{"y":288,"x":147,"width":190,"skin":"resource/ui/zb_intro_Btn_pre1.png","height":70},"child":[{"type":"Button","props":{"y":0,"x":0,"width":195,"var":"startGameLabel","height":83}}]},{"type":"Image","props":{"y":461,"x":149,"width":190,"skin":"resource/ui/update_btn_pressed.png","height":60},"child":[{"type":"Button","props":{"y":15,"x":20,"width":192,"var":"upgradeAttriLabel","pivotY":15,"pivotX":20,"height":65}}]}]};
		return HomePageUI;
	})(View);
var UpgradeUI=(function(_super){
		function UpgradeUI(){
			
		    this.hpLabel=null;
		    this.backLabel=null;
		    this.hpUpgradeBtn=null;
		    this.hpUpgradeLabel=null;
		    this.shootSpeedLabel=null;
		    this.shootSpeedBtn=null;
		    this.attLabel=null;
		    this.attUpgradeBtn=null;
		    this.upgradeSphereLabel=null;

			UpgradeUI.__super.call(this);
		}

		CLASS$(UpgradeUI,'ui.UpgradeUI',_super);
		var __proto__=UpgradeUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(UpgradeUI.uiView);

		}

		UpgradeUI.uiView={"type":"View","props":{"width":480,"height":852},"child":[{"type":"Image","props":{"y":-5,"x":1,"width":480,"skin":"resource/ui/upgrade.jpg","height":852}},{"type":"Image","props":{"y":305,"x":96,"width":188,"skin":"resource/ui/attriUpgradeBg.png","height":48},"child":[{"type":"Label","props":{"y":6,"x":67,"width":82,"var":"hpLabel","valign":"middle","text":"123123","height":33,"fontSize":15,"bold":true,"align":"center"}},{"type":"Label","props":{"y":6,"x":19,"width":66,"valign":"middle","text":"血量：","height":33,"fontSize":15,"bold":true,"align":"center"}},{"type":"Label","props":{"y":-296,"x":-80,"width":61,"var":"backLabel","text":"返回","height":34,"fontSize":30,"color":"#ec110e","bold":true}}]},{"type":"Image","props":{"y":306,"x":247,"width":94,"var":"hpUpgradeBtn","skin":"resource/ui/upgradeBtn.png","height":47},"child":[{"type":"Label","props":{"y":7,"x":31,"width":52,"var":"hpUpgradeLabel","valign":"middle","text":"50(+1)","height":29,"fontSize":15,"bold":true,"align":"center"}}]},{"type":"Image","props":{"y":313,"x":257,"width":29,"skin":"resource/role/upgrade.png","height":27}},{"type":"Image","props":{"y":370,"x":97,"width":188,"skin":"resource/ui/attriUpgradeBg.png","height":48},"child":[{"type":"Label","props":{"y":6,"x":71,"width":74,"var":"shootSpeedLabel","valign":"middle","text":"123123","height":33,"fontSize":15,"bold":true,"align":"center"}},{"type":"Label","props":{"y":5,"x":21,"width":61,"valign":"middle","text":"射速：","height":33,"fontSize":15,"bold":true,"align":"center"}}]},{"type":"Image","props":{"y":371,"x":248,"width":94,"var":"shootSpeedBtn","skin":"resource/ui/upgradeBtn.png","height":47},"child":[{"type":"Label","props":{"y":7,"x":31,"width":52,"valign":"middle","text":"50(+1)","height":29,"fontSize":15,"bold":true,"align":"center"}}]},{"type":"Image","props":{"y":378,"x":258,"width":29,"skin":"resource/role/upgrade.png","height":27}},{"type":"Image","props":{"y":437,"x":96,"width":188,"skin":"resource/ui/attriUpgradeBg.png","height":48},"child":[{"type":"Label","props":{"y":6,"x":68,"width":60,"var":"attLabel","valign":"middle","text":"123123","height":33,"fontSize":15,"bold":true,"align":"center"}},{"type":"Label","props":{"y":5,"x":22,"width":60,"valign":"middle","text":"火力：","height":33,"fontSize":15,"bold":true,"align":"center"}}]},{"type":"Image","props":{"y":438,"x":247,"width":94,"var":"attUpgradeBtn","skin":"resource/ui/upgradeBtn.png","height":47},"child":[{"type":"Label","props":{"y":7,"x":31,"width":52,"valign":"middle","text":"100(+1)","height":29,"fontSize":15,"bold":true,"align":"center"}}]},{"type":"Image","props":{"y":445,"x":256,"width":29,"skin":"resource/role/upgrade.png","height":27}},{"type":"Image","props":{"y":104,"x":143,"width":157,"skin":"resource/ui/myLabel.png","height":62},"child":[{"type":"Image","props":{"y":11,"x":32,"width":37,"skin":"resource/role/upgrade.png","height":36}},{"type":"Label","props":{"y":17,"x":65,"width":74,"var":"upgradeSphereLabel","text":"123123","styleSkin":"resource/role/label.png","height":28,"fontSize":20,"color":"#092256","bold":true,"align":"center"}}]}]};
		return UpgradeUI;
	})(View);