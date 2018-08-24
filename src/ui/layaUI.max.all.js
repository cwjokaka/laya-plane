var CLASS$=Laya.class;
var STATICATTR$=Laya.static;
var View=laya.ui.View;
var Dialog=laya.ui.Dialog;
var GameInfoUI=(function(_super){
		function GameInfoUI(){
			
		    this.scoreLabel=null;

			GameInfoUI.__super.call(this);
		}

		CLASS$(GameInfoUI,'ui.GameInfoUI',_super);
		var __proto__=GameInfoUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(GameInfoUI.uiView);

		}

		GameInfoUI.uiView={"type":"View","props":{"width":400,"height":825},"child":[{"type":"Image","props":{"y":12,"x":11,"width":108,"skin":"resource/ui/myLabel.png","rotation":1,"height":34},"child":[{"type":"Label","props":{"y":-2,"x":15,"wordWrap":true,"width":91,"var":"scoreLabel","valign":"middle","text":"2555555","height":32,"fontSize":20,"color":"#120707"}}]}]};
		return GameInfoUI;
	})(View);