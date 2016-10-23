/**
Class Name: 多维网评论控制业务层
Author: luoming@caixun.com
**/
var commentControl = function () {
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
	var is_hot = false;
	var is_fb = false;
	var ajaxHotComment = function(){
		if($("div.hot-comm div.jspVerticalBar").length <= 0){
			$("#dv_scroll_bar").hide();
			$("div.layer-body .hot-comm").html("<div id='loading_more' style='width:100%;height:50px;background:url(http://s0.dwnews.net/images/club/ajax-loader.gif) no-repeat center;'></div>");
			$.getJSON("http://blog.dwnews.com/index.php?r=comment/hotComment&callback=?", function(data){
				if(data.status == "ok"){
					$("div.hot-comm #loading_more").hide();
					$("div.layer-body div.hot-comm").append(data.html);
					$("div.layer-body div.hot-comm").jScrollPane({
						showArrows: false,
						verticalDragMinHeight: 29,
						verticalDragMaxHeight: 29
					});
					if($("div.hot-comm div.jspVerticalBar").length > 0){
						$("#dv_scroll_bar").css("height","428px");
						$("#dv_scroll_bar").show();
					}
				} else {
					$("div.layer-body .hot-comm").html('没有热门评论').css({"height":"200px","line-height":"200px","text-align":"center"});
				}
			});
		}else{
			$("#dv_scroll_bar").show();
		}
	};
	var ajaxbottomHotComment = function(){
		$("#commentarea .hot-comm").html("<div id='loading_more' style='width:100%;height:50px;background:url(http://s0.dwnews.net/images/club/ajax-loader.gif) no-repeat center;'></div>");
		$.getJSON("http://blog.dwnews.com/index.php?r=comment/hotComment&callback=?", function(data){
			if(data.status == "ok"){
				is_hot = true;
				$("#commentarea #loading_more").hide();
				$("#commentarea div.hot-comm").append(data.html);
			} else {
				$("#commentarea .hot-comm").html('没有热门评论').css({"height":"200px","line-height":"200px","text-align":"center"});
			}
		});
	};
	var getFBcomments = function(){
		var fbId = fkey;
		if($("div.face-comment div.jspVerticalBar").length <= 0){
			$("div.layer-body .face-comment").html("<div style='width:100%;height:50px;background:url(http://s0.dwnews.net/images/club/ajax-loader.gif) no-repeat center;'></div>");
			$.getJSON("http://club.dwnews.net/index.php?r=api/facebookcomment&id="+fbId+"&callback=?", function(FBdata){
				if(FBdata.post == "success" && FBdata.data != null){
					$("div.layer-body .face-comment").html(FBdata.data);
					$("div.layer-body .face-comment").jScrollPane({
						showArrows: false,
						verticalDragMinHeight: 29,
						verticalDragMaxHeight: 29
					});
					if($("div.face-comment div.jspVerticalBar").length > 0){
						$("#dv_scroll_bar").show();
					}else{
						$("#dv_scroll_bar").hide();
					}
					$("#dv_scroll_bar").css("height","428px");
				} else {
					$("div.layer-body .face-comment").html('没有facebook评论');
					$("div.layer-body .face-comment").css({"height":"200px","line-height":"200px","text-align":"center"});
				}
			}).fail(function() {
				$("div.layer-body .face-comment").html('facebook评论异常');
				$("div.layer-body .face-comment").css({"height":"200px","line-height":"200px","text-align":"center"});
			});
		}
	};
	var getbottomFBcomments = function(){
		var fbId = fkey;
		$("#commentarea .face-comment").html("<div style='width:100%;height:50px;background:url(http://s0.dwnews.net/images/club/ajax-loader.gif) no-repeat center;'></div>");
		$.getJSON("http://club.dwnews.net/index.php?r=api/facebookcomment&id="+fbId+"&callback=?", function(FBdata){
			if(FBdata.post == "success" && FBdata.data != null){
				is_fb = true;
				$("#commentarea .face-comment").html(FBdata.data);
			} else {
				$("#commentarea .face-comment").html('没有facebook评论');
				$("#commentarea .face-comment").css({"height":"200px","line-height":"200px","text-align":"center"});
			}
		}).fail(function() {
			$("#commentarea .face-comment").html('facebook评论异常');
			$("#commentarea .face-comment").css({"height":"200px","line-height":"200px","text-align":"center"});
		});
	};
    return {
        init : function () {
			$("div.layer-body .tit_wypl").live("click",function(){
				$("div.layer-body .hot-comm").hide();
				$("div.layer-body .face-comment").hide();
				$("div.layer-body .wypl_comment").show();
				$(this).addClass("wypl_on");
				$("div.layer-body .tit_hot").removeClass("hot_on");
				$("div.layer-body .tit_facebook").removeClass("facebook_on");
				if($(".wypl_comment div.jspVerticalBar").length <= 0){
					if($("#dv_scroll_bar").length > 0){
						$("#dv_scroll_bar").hide();
					}
				}
			});
			$("div.layer-body .tit_hot").live("click",function(){
				$("div.layer-body .hot-comm").show();
				$("div.layer-body .wypl_comment").hide();
				$("div.layer-body .face-comment").hide();
				$(this).addClass("hot_on");
				$("div.layer-body .tit_wypl").removeClass("wypl_on");
				$("div.layer-body .tit_facebook").removeClass("facebook_on");
				ajaxHotComment();
			});
			$("div.layer-body .tit_facebook").live("click",function(){
				$("div.layer-body .face-comment").show(); 
				$("div.layer-body .wypl_comment").hide();$(".hot-comm").hide();
				$(this).addClass("facebook_on");
				$("div.layer-body .tit_wypl").removeClass("wypl_on");
				$("div.layer-body .tit_hot").removeClass("hot_on");
				$("div.layer-body .face-comment").html("");
				getFBcomments();
			});
			$("#commentarea .tit_wypl").bind("click",function(){
				$("#commentarea .hot-comm").hide();
				$("#commentarea .face-comment").hide();
				$("#commentarea .wypl_comment").show();
				$(this).addClass("wypl_on");
				$("#commentarea .tit_hot").removeClass("hot_on");
				$("#commentarea .tit_facebook").removeClass("facebook_on");
			});
			$("#commentarea .tit_hot").bind("click",function(){
				$("#commentarea .hot-comm").show();
				$("#commentarea .wypl_comment").hide();
				$("#commentarea .face-comment").hide();
				$(this).addClass("hot_on");
				$("#commentarea .tit_wypl").removeClass("wypl_on");
				$("#commentarea .tit_facebook").removeClass("facebook_on");
				if(!is_hot){
					ajaxbottomHotComment();
				}
			});
			$("#commentarea .tit_facebook").bind("click",function(){
				$("#commentarea .face-comment").show(); 
				$("#commentarea .wypl_comment").hide();$(".hot-comm").hide();
				$(this).addClass("facebook_on");
				$("#commentarea .tit_wypl").removeClass("wypl_on");
				$("#commentarea .tit_hot").removeClass("hot_on");
				if(!is_fb){
					getbottomFBcomments();
				}
			});
        },
		display : function(){
			isShowDiscuss == 0 ? (function(){
				var bar = $(".bar_link");
				if(bar.length>0){
					$(".dw_commentt").hide();
				}
				var commentarea = $(".dw_comment");
				if(commentarea.length>0){
					commentarea.hide();
				}
			}()):(function(){
				if($("span.comment-count").length>0){
					var url = "http://blog.dwnews.com/index.php?r=comment/index&callback=?&page=1&new_left=1&url="+getUrl();
					$.getJSON(url,{is_club_post:"",format:"json"},function(cdata){
						if(cdata.status == "ok"){
							if(cdata.total>0){
								if(cdata.total<100){
									$("span.comment-count").find("em").html(cdata.total);
								}
							}else{
								$("span.comment-count").remove();
							}
						}else{
							$("span.comment-count").remove();
						}
					});
				}
				commentControl.init();
				if(fkey.length <=0){
					$(".tit_facebook").hide();
					$(".tit_facebook").prev("i").hide();
					$(".tit_facebook").next("i").hide();
				};
			}());
		},
		load : function(){
			commentPlug.init();
		}
    };
}();