/**
Class Name: 多维网内文小插件
Author: luoming@caixun.com
**/
var smPlugin = function () {
	var getUrl = function() {
		var iikey = ikey;
		if(iikey.length<1){
			iikey = window.location.href;
			if(iikey.indexOf('big5') > -1){
				iikey = iikey.replace('big5'+'/','');
			}
		}
		return iikey;
	};
	var addFavorite = function(){
		var iiKey = getUrl();
		var index = iiKey.lastIndexOf('?');
		if (index > 0){
			iiKey = iiKey.substr(0,index);
		}
		addFavorites(iiKey,ititle,unFormatTime,"");
	};
    return {
        init : function () {
			$("a.c_print,a.dw_print").live('click', function () {
				var URL = window.location.href;
				var ptype = "news";
				if(URL.indexOf('blog.dwnews.com')>-1){
					ptype = "blog";
				}
				if(URL.indexOf('/news/')>-1){
					if (URL.indexOf('classifieds')>-1){
						ptype = "classifieds";
					}else{
						ptype = "news";
					}
				}
				if(URL.indexOf('/photo/')>-1){
					ptype = "photo";
				}
				var ptitle = $(document).attr("title");
				$.layer({
					type: 2,
					maxmin: true,
					shadeClose: false,
					title: ptitle,
					shade: [0.8,'#000'],
					offset: ['20px',''],
					area: ['1000px', ($(window).height() - 50) +'px'],
					iframe: {src: 'http://blog.dwnews.com/print/print.php?url='+URL+"&ptype="+ptype}
				}); 
			});
			$("a.dw_collect").live('click', function () {
				var title = $(document).attr("title");
				addFavorite();
			});
        },
		fontSize : function(size) {
			typeof size == "number" ? size = size +"px" : size;
			var lineheight = "28px";
			switch(size){
				case "18px":lineheight = "32px";break;
				case "16px":lineheight = "28px";break;
				case "14px":lineheight = "24px";break;
			}
			$("div.viewcot p,div.viewcot div,div.viewcot").css({"font-size":size,"line-height":lineheight});
		},
		resetFont : function() {
			$("html").css("font-size", originalFontSize);
		}
    };
}();
$(function($) {
  smPlugin.init();
});