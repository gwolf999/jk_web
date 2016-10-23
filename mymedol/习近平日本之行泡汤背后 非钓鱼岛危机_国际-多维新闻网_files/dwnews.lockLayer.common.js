/**
Class Name: 多维网前端锁定层处理
Author: luoming@caixun.com
**/
var lockLayer = function () {
	
    var loadShow = function(target,style) {
		if(style!="null"){
			$(target).fadeIn(100).css(style);
		}else{
			$(target).fadeIn();
		}
    };
	
	var loadHide = function() {
		$("#overLay").hide();
	}; 

    return {

        init: function () {
			if($("div#overLay").length <= 0 ){
				lockLayer.initDom();
			}
        },
		
        initDom: function () {
            var array = new Array();
			array.push("<div id=\"overLay\" style=\"display: none;position: fixed;background-color:#fff;z-index:100000000;-moz-opacity: 0.75;opacity:.75;filter: alpha(opacity=75); \">");
			array.push("</div>");
			var layDom = array.join("");
			$("body").append(layDom);
        },
		
		loadLayer : function (){
			
			var boxW = $("div.dw_showbox").width()+ "px";
			var boxH = $("div.dw_showbox").height() + "px";
			var _left = parseInt($("div.dw_showbox").offset().left+10) + "px";
			var _top = parseInt($("div.dw_showbox").offset().top+10);
			var stop = $(document).scrollTop(); 
			    _top = parseInt(_top - stop) + "px";
			var _styles = {"width":boxW,"height":boxH,"top":_top,"left":_left};
			
			loadShow("div#overLay",_styles);
			
			var array = new Array();
			array.push("<div style=\"background:url('http://s0.dwnews.net/images/club/ajax-loader.gif') center no-repeat;width:"+boxW+";text-align:center;line-height:"+boxH+";height:"+boxH+";\"></div>");
			var layDom = array.join("");
			$("div#overLay").append(layDom);
		},
		
		close : function (){
			loadHide();
		}
		
		
    };

}();

$(function($) {
  lockLayer.init();
});


