/**
Class Name: 多维网头条新闻
Author: luoming@caixun.com
**/
var BombNews = function () {
    var BombTemplate = function(url,picUrl,title,content) {
        var array = new Array();
		array.push("<div class=\"alert-rep\">");
		array.push("<div class=\"alert-flyout-wrap\"><div class=\"close\"><a href=\"javascript:;\"><img src=\"http://s3.dwnews.net/images/www/guanbi.png\"></a></div>");
		array.push("<div class=\"alert-body\">");
		array.push("<a target=\"_blank\" href="+url+">");
		array.push("<h4>"+title+"</h4>");
		array.push("<div class=\"alert-photo\"><img width=\"100%\" src="+picUrl+"></div>");
		array.push("<p>"+content+"</p>");
		array.push("</a>");
		array.push("</div>");
		array.push("</div>");
		array.push("</div>");
		return array.join("");
    };
	var domBomb = function(dom) {
		$("body").append(dom);
    };
	var bombHide = function(e) {
		$("div.alert-rep").remove();
		e.stopPropagation(); 
	}; 
	var getQuery = function (url){
		$.get(url, function(data){
			alert(data);
			var result = true;
			if(result){
				var url = data.url;
				var picUrl = data.picUrl;
				var title = data.title;
				var content = data.content;
				var bombTip = BombTemplate(url,picUrl,title,content);
				domBomb(bombTip);
			}
		},"json");
	};
	var crossQuery = function (url){
		$.getJSON(url,function(data){
			alert(data);
			var result = true;
			if(result){
				var url = data.url;
				var picUrl = data.picUrl;
				var title = data.title;
				var content = data.summary;
				var bombTip = BombTemplate(url,picUrl,title,content);
				domBomb(bombTip);
			}
		}); 
	};
    return {
        init: function () {
			var url = "http://www.dwnews.com/js/newsalert/newsalert_info.js";
			$.getScript(url,function(){
				var array = new Array();
				array.push("<div class=\"alert-rep\">");
				array.push("<div class=\"alert-flyout-wrap\"><div class=\"close\"><a href=\"javascript:;\"><img src=\"http://s3.dwnews.net/images/www/guanbi.png\"></a></div>");
				array.push("<div class=\"alert-body\">");
				array.push("<a target=\"_blank\" href="+popData.url+">");
				array.push("<h4>"+popData.title+"</h4>");
				array.push("<div class=\"alert-photo\"><img width=\"100%\" src="+popData.picUrl+"></div>");
				array.push("<p>"+popData.summary+"</p>");
				array.push("</a>");
				array.push("<div class=\"clear\"></div>");
				array.push("</div>");
				array.push("</div>");
				array.push("</div>");
				var cookieTime = $.cookie("pushTime");
				if(cookieTime != popData.pushTime){
					$("body").append(array.join(""));
					$.cookie("pushTime",popData.pushTime,{domain:dwnews.domain,path:dwnews.path});
				}
			});
			$("div.close a").live('click', function (e) {
				bombHide(e);
			});
        }
    };
}();
$(function($) {
BombNews.init();
});