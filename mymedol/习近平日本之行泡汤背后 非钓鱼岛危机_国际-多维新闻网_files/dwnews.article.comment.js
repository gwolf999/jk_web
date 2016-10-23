/**
rewrite dwnews article comments
**/
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
var clubLock = "0";
var getClubId = function(){
    return "";
};
var getUserPic = function(){
    var userImg = "http://u."+domain+"/avatar.php?uid="+getAuthorids()+"&size=small";
    return userImg;
};
var getType = function(){
    return "news";
};
var loadJs = function(url){
	$.ajax({
	  type: "GET",
	  url: url,
	  dataType: "script",
	  success: function(){
	  }
	}); 
};
var commentPlug = function () {
	var p=1;
    var widthSize = function() {
        var width = $("div.news_block").width();
		return width+"px";
    };
    return {
		pnum : function(p){
			return p;
		},
        init : function () {
			var url = "http://blog.dwnews.com/index.php?r=comment/index&callback=?&page="+p+"&url="+getUrl();
			commentPlug.ajaxLoadComment(url);
        },
		newsLeftBar : function (){
			if($('.layer-box .list').find(".reply").length>0){
				$('.layer-box .list').find(".reply").remove();
			}
			var url = "http://blog.dwnews.com/index.php?r=comment/index&callback=?&page=1&new_left=1&url="+getUrl();
			barLayer.addComment("<div id=\"loading_div\" style='width:560px;height:50px;background:url(http://s0.dwnews.net/images/club/ajax-loader.gif) no-repeat center;'></div>");
			$.getJSON(url,{is_club_post:"",format:"json"},function(lbdata){
				$("#loading_div").remove();
				if (lbdata.status == "ok" && lbdata.total>0){
					barLayer.addComment(lbdata.data);
					if (lbdata.total < 10){
						barLayer.addComment("<div class=\"loadTipComment\" style=\"width:560px;height:190px;line-height:190px;text-align:center;\">没有更多加载</div>");
					}
				}else{
					barLayer.addComment("<div class=\"loadTipComment\" style=\"width:560px;height:190px;line-height:190px;text-align:center;\">没有更多加载</div>");
				}
				if($("div.wypl_comment div.jspVerticalBar").length <= 0){
					$("#dv_scroll_bar").hide();
				}else{
					$("#dv_scroll_bar").show();
				}
			});
		},
        ajaxLoadComment : function (url){
			if($("#commentarea div.loadtag").length>0){
				$("#commentarea div.loadtag").replaceWith("<div class=\"loadtag\" style='width:560px;height:50px;background:url(http://s0.dwnews.net/images/club/ajax-loader.gif) no-repeat center;'></div>");
			}else{
				$("#commentarea div.replies").append("<div class=\"loadtag\" style='width:560px;height:50px;background:url(http://s0.dwnews.net/images/club/ajax-loader.gif) no-repeat center;'></div>");
			}
			$.getJSON(url,{is_club_post:"",format:"json"},function(cbdata){
				if (cbdata.status == "ok" && cbdata.total>0){
					if (cbdata.total > 10){
						if ((p*10)>cbdata.total){
							$("#commentarea div.list").append(cbdata.data);
							$("#commentarea div.loadtag").replaceWith("<div class=\"loadtag\"><a class=\"comm_loadingnone\" href=\"javascript:;\">没有更多加载</a></div>");
						}else{
							$("#commentarea div.list").append(cbdata.data);
							$("#commentarea div.loadtag").replaceWith("<div class=\"loadtag\"><a class=\"comm_loading\" href=\"javascript:commentPlug.init();\">加载更多</a></div>");
							p+=1;
						}
					}else{
						$("#commentarea div.list").append(cbdata.data);
						$("#commentarea div.loadtag").replaceWith('<div class=\"loadtag\"><a class=\"comm_loadingnone\" href=\"javascript:;\">没有更多加载</a></div>');
					}
				}else{
					$("#commentarea div.loadtag").replaceWith("<div class=\"loadtag\"><a class=\"comm_loadingnone\" href=\"javascript:;\">没有更多加载</a></div>");
				}
			});
		},
		picMiniComment : function (){
			var url = "http://blog.dwnews.com/index.php?r=comment/index&callback=?&page=1&new_left=1&url="+getUrl();
			minbarLayer.addComment("<div id='loading_div' style='width:560px;height:50px;background:url(http://s0.dwnews.net/images/club/ajax-loader.gif) no-repeat center;'></div>");
			$.getJSON(url,{is_club_post:"",format:"json"}, function(cbdata){
				$("#loading_div").remove();
				if (cbdata.status == "ok" && cbdata.total>0){
					minbarLayer.addComment(cbdata.data);
					if (cbdata.total < 10){
					minbarLayer.addComment("<div class=\"loadTipComment\" style=\"width:560px;height:190px;line-height:190px;text-align:center;\">没有更多加载</div>");
					}
				}else{
					minbarLayer.addComment("<div class=\"loadTipComment\" style=\"width:560px;height:190px;line-height:190px;text-align:center;\">没有更多加载</div>");
				}
				if($("div.jspVerticalBar").length > 0){
					$("#dv_scroll_bar").show();
				}else{
					$("#dv_scroll_bar").hide();
				}
			});
		},
		minBarComment : function (){
			var dom = $("#min_dw_comment").html();
			$("div.layer-body").html(dom).addClass("layer-roll");
			var array = new Array();
			array.push("<div id=\"dv_scroll_bar\" class=\"hidden\">");
			array.push("<div class=\"Scrollbar-Track\" id=\"dv_scroll_track\"></div>");
			array.push("</div>");
			$("div.layer-body").append(array.join(""));
			$("#dv_scroll_bar").css("height","428px");
			$("div.layer-box div.list,div.layer-box div.hot-comm,div.layer-box div.face-comment").css({"width":"560px","height":"430px","overflow":"auto"});
			if($("div.jspVerticalBar").length <= 0){
				$.getScript("http://s0.dwnews.net/js/jquery.jscrollpane.min.js",function(){
					commentPlug.picMiniComment();
					minbarLayer.bindComment();
				});
			}
		}
    };
}();