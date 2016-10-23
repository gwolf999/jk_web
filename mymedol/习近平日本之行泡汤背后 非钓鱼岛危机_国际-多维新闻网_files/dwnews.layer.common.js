/**
Class Name: 多维网前端层处理
Author: luoming@caixun.com
**/
var Layer = function () {
    var layerShow = function(target,style) {
		if(style!="null"){
			$(target).show().css(style);
		}else{
			$(target).show();
		}
    };
	var layerHide = function(e) {
		$("div.dw_showbox_bg, div.dw_showbox").hide();
		e.stopPropagation();
	}; 
	var dataSource = function(url){
		$.ajax({
		  url: url,
		  cache: false,
		  dataType: 'html',
		  success: function(html){
			$("#focus").append(html);
		  }
		}); 
	};
	var about = function(){
		var array = new Array();
		array.push("<div class='box_about'>");
		array.push("<a href='http://www.dwnews.com/privacy.html' target='_blank\'  title=\"\">隐私条款</a>");
		array.push("<a href='http://www.dwnews.com/copyright.html' target='_blank\'  title=\"\">版权声明</a>");
		array.push("<a href='http://www.dwnews.com/contactus.html'  target='_blank\'  title=\"\">联络我们</a>");
		array.push("</div>");
		return array.join("");
	}; 
    return {
        init: function () {
			if($("div.dw_showbox").length <= 0 ){
				Layer.initDom();
			}
        },
        initDom: function () {
            var array = new Array();
			array.push("<!--网站弹出层开始-->");
			array.push("<div class='dw_showbox_bg hidden'></div>");
			array.push("<div class='dw_showbox hidden' style='width:800px;left:20%;top:5%;'>");
			array.push("<div class='box_kuang'><a href='javascript:;' class='box_close'>关闭</a><div class='box_title center'></div><div class='wdline'></div>");
			array.push("<div class='box_body'>");
			array.push("</div>");
			array.push("</div>");
			array.push("</div>");
			array.push("<!--网站弹出层结束-->");
			var layDom = array.join("");
			$("body").append(layDom);
        },
		loadLayer : function (title,objtarget,callBack){
			layerShow("div.dw_showbox_bg,div.dw_showbox",{"position":"fixed"});
			$("div.box_title").html(title).removeClass("center");
			var data = $(objtarget).html();
			(function(){
				$("div.box_body").html(data);
				if(callBack != undefined){
				 callBack();
				}
			})();
			var boxW = $("div.dw_showbox").width();
			var boxH = $("div.dw_showbox").height();
			var _left = $("div.main").offset().left + parseInt($("div.main").width() - boxW)/2;
			_left = _left + "px";
			var _top = parseInt($(window).height() - boxH)/2;
			_top = _top + "px";
			var _styles = {"top":_top,"left":_left};
			layerShow("div.dw_showbox",_styles);
			$("div.box_about").remove();
			$("div.box_kuang").append(about());
			$("a.box_close").live('click', function (e) {
				//清空帖子id
				$("#edit_post").val("");
				$("div.box_about").remove();
				layerHide(e);
			});
		},
		ajaxLayer : function (url,title,plug){
			$.getJSON(url, function(data){
				layerShow("div.dw_showbox_bg,div.dw_showbox",{"position":"fixed"});
				$("div.box_title").html(title).removeClass("center");
				$("div.box_body").html(data);
				var boxW = $("div.dw_showbox").width();
				var boxH = $("div.dw_showbox").height();
				var _left = 0;
				if($("div.main").length>0){
					_left = $("div.main").offset().left + parseInt($("div.main").width() - boxW)/2;
				}else{
					_left = parseInt($(window).width() - boxW)/2;
				}
				_left = _left + "px";
				var _top = parseInt($(window).height() - boxH)/2;
				_top = _top + "px";
				var _styles = {"top":_top,"left":_left};
				layerShow("div.dw_showbox",_styles);
				if(plug){
					if($("div.box_about").length<=0){
						$("div.box_kuang").append(about());
					};
				}else{
					if($("div.box_about").length>0){
						$("div.box_about").remove();
					}
				}
			});
			$("a.box_close").live('click', function (e) {
				layerHide(e);
				e.stopPropagation();
			});
		},
		imageLayer : function (url,plug){
			$.get(url,function(data){
				layerShow("div.dw_showbox_bg,div.dw_showbox","null");
				$("div.box_body").html(data);
				var boxW = $("div.dw_showbox").width();
				var boxH = $("div.dw_showbox").height();
				var _left = $("div.main").offset().left + parseInt($("div.main").width() - boxW)/2;
				_left = _left + "px";
				var _top = parseInt($(window).height() - boxH)/2;
				_top = _top + "px";
				var _styles = {"top":_top,"left":_left,"position":"fixed"};
				layerShow("div.dw_showbox_bg",{"position":"fixed"})
				layerShow("div.dw_showbox",_styles);
				if(plug){
					if($("div.box_about").length<=0){
						$("div.box_kuang").append(about());
					};
				}else{
					if($("div.box_about").length>0){
						$("div.box_about").remove();
					}
				}
			},"html");
			$("a.box_close").live('click', function (e) {
				layerHide(e);
				e.stopPropagation();
			});
		},
		initOffsetLayer : function (){
			var boxW = $("div.dw_showbox").width();
			var boxH = $("div.dw_showbox").height();
			var _left = $("div.main").offset().left + parseInt($("div.main").width() - boxW)/2;
				_left = _left + "px";
			var _top = parseInt($(window).height() - boxH)/2;
				_top = _top + "px";
				var _styles = {"top":_top,"left":_left,"position":"fixed"};
				layerShow("div.dw_showbox",_styles);
		},
	    loadJs :function(url){
	        $.ajax({
	            type: "GET",
	            url: url,
	            dataType: "script"
	        }); 
	    }
    };
}();
$(function($) {
  Layer.init();
});