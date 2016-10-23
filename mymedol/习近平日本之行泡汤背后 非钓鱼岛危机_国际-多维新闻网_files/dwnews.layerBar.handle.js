/*
Class Name: 多维网新闻侧边栏层处理
Author: luoming@caixun.com
*/
var photoBar = "news";
var barLayer = function () {
	var p=1;
	var api;
    var barLayerShow = function(target,style) {
		if(style!="null"){
			if($("div.bar_wrap").length > 0 ){
				$("div.bar_wrap").append($(target));
				$(target).fadeIn(100).css(style);
			}
		}else{
			if($("div.bar_wrap").length > 0 ){
				$("div.bar_wrap").append($(target));
				$(target).fadeIn();
			}
		}
    };
	var layer = function(target,callback) {
		if($("div.bar_wrap").length > 0 ){
			$("div.bar_wrap").append($(target));
			$(target).show();
			callback.call(this);
		}
    };
	var barLayerHide = function() {
		$("div.layer-box").hide();
	}; 
	var loadJs = function(url){
		$.ajax({
		  type: "GET",
		  url: url,
		  dataType: "script",
		  success: function(){}
		});
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
    return {
        init: function () {
			if($("div.layer-box").length <= 0 ){
				barLayer.createElm();
			}
        },
        createElm: function () {
            var array = new Array();
			array.push("<!--侧边栏浮层开始-->");
			array.push("<div class=\"layer-box hidden\">");
			array.push("<div class=\"layer_kuang\"><a href=\"javascript:;\" class=\"layer-close\">关闭</a>");
			array.push("<div class=\"layer-title\"></div>");
			array.push("<div class=\"wdline\"></div>");
			array.push("<div class=\"layer-body\">");
			array.push("<!--浮层结束-->");
			array.push("</div>");
			array.push("</div>");
			array.push("</div>");
			array.push("<div id=\"newsleftbar\" class=\"hidden\">");
			array.push("<div class=\"dw_comment\">");
			array.push("<h2 class=\"bt_change\">");
			array.push("<a class=\"tit_wypl wypl_on\" href=\"javascript:;\">网友评论</a><i class=\"fl\"></i>");
			array.push("<a class=\"tit_hot\" href=\"javascript:;\">热门评论</a><i class=\"fl\"></i>");
			array.push("<a class=\"tit_facebook\" href=\"javascript:;\">facebook评论</a><i class=\"fl\"></i>");
			array.push("</h2>");
			array.push("<div class=\"wypl_comment\">");
			array.push("<div class=\"replies\">");
			array.push("<div class=\"list\" style=\"overflow:hidden;\">");
			array.push("<form action=\"\" method=\"get\">");
			array.push("<div class=\"comment-wrap\">");
			array.push("<a class=\"dw-avatar\" href=\"javascript:;\" onClick=\"return false\">");
			array.push("<img src=\"http://u.dwnews.com/avatar.php?uid=null&size=small\" alt=\"\" width=\"100%\" style=\"display: block;\">");
			array.push("</a>");
			array.push("<div class=\"dw-textarea-wrapper\">");
			array.push("<textarea name=\"message\""); 
			array.push("onkeydown=\"if(event.keyCode==13&&event.ctrlKey&&$.trim($(this).val())!='') quickLogin('post','news')\""); 
			array.push("title=\"CtrlEnter快捷提交\" id=\"topComment_news\" placeholder=\"多维网\">");
			array.push("</textarea>");
			array.push("<div class=\"dw-post-toolbar\">");
			array.push("<a href=\"javascript:;\" class=\"comment-sub\" id=\"comment_submit\" onClick=\"quickLogin('post','news')\">提交</a>");
			array.push("<div class=\"loginInfo fl post-gongju\">");
			array.push("<a href=\"javascript:pop_login();\" class=\"post-login\">登录</a><a href=\"javascript:;\" class=\"post-reg\">注册</a>");
			array.push("</div>");
			array.push("<div class=\"clear\"></div>");
			array.push("</div>");
			array.push("</div>");
			array.push("</div>");
			array.push("</form>");
			array.push("<div class=\"line\"></div>");
			array.push("</div>");
			array.push("</div>");
			array.push("</div>");
			array.push("<div class=\"hot-comm\"></div>");
			array.push("<div class=\"face-comment\"></div>");
			array.push("</div>");
			array.push("</div>");
			array.push("<div id=\"tCode\" class=\"hidden\">");
			array.push("<div class=\"qr-shuoming\">扫描如下二维码可将本文分享给好友：</div>");
			array.push("<div class=\"article-qr\"><img src=\"\" width=\"100%\"/></div>");
			array.push("</div>");
			array.push("<div id=\"tArticle\" class=\"hidden\">");
			array.push("<form method=\"get\" action=\"\">");
			array.push("<div class=\"l-transmit\">");
			array.push("<div class=\"l-article\">");
			array.push("<h3></h3>");
			array.push("<div class=\"l-pohoto\"><img width=\"100%\" src=\"\" alt=\"\"></div>");
			array.push("<p></p>");
			array.push("<div class=\"l-ztrans\"><input type=\"text\" onblur=\"if (value ==''){value='请输入您的邮箱'}\" onfocus=\"if (value =='请输入您的邮箱'){value =''}\"  value=\"请输入您的邮箱\" class=\"l-email\" name=\"\"><input type=\"text\" onblur=\"if (value ==''){value='请输入您要转发的邮箱'}\" onfocus=\"if (value =='请输入您要转发的邮箱'){value =''}\" value=\"请输入您要转发的邮箱\" class=\"l-email\" name=\"\">");
			array.push("<div class=\"l-shuom\"><span><em>*</em>必填项，同时发送多个地址请用分号隔开 | </span><input type=\"checkbox\" value=\"\" class=\"l-chaos\" name=\"\"><span>抄送我</span><div class=\"clear\"></div></div><div class=\"wdline\"></div>");
			array.push("<div class=\"l-txt\">邮件标题</div><input id=\"mailTitle\" type=\"text\" value=\"\"><div class=\"l-txt\">您的留言</div>");
			array.push("<textarea class=\"l-neir\" rows=\"\" cols=\"\" name=\"\">向您推荐一篇来自多维新闻网(www.dwnews.com)的文章。</textarea>");
			array.push("<div class=\"l-gongneng\"><a href=\"javascript:transArticle.trans();\" class=\"l-fasong\"></a><a href=\"javascript:transArticle.close();\" class=\"l-quxiao\"></a></div>");
			array.push("</div>");
			array.push("</div>");
			array.push("</div>");
			array.push("</form>");
			array.push("</div>");
			var layDom = array.join("");
			$("body").append(layDom);
        },
		addComment : function (dom){
			var pane = $('.layer-box .list');
			pane.jScrollPane({
				showArrows: false,
				verticalDragMinHeight: 29,
				verticalDragMaxHeight: 29,
				maintainPosition: true
			});
			api = pane.data('jsp');
			api.getContentPane().append(dom);
			api.reinitialise();
		},
		appendComment : function (dom){
			var pane = $('.layer-box .list');
			pane.jScrollPane({
				showArrows: false,
				verticalDragMinHeight: 29,
				verticalDragMaxHeight: 29,
				maintainPosition: true
			});
			api = pane.data('jsp');
			api.getContentPane().find("div.line").after(dom);
			api.reinitialise();
			if($("div.wypl_comment div.jspVerticalBar").length > 0){
				$("#dv_scroll_bar").show();
			}else{
				$("#dv_scroll_bar").hide();
			}
		},
		bindComment : function(){
			trig = true;
			var pane = $('.layer-box .list');
			pane.bind('jsp-scroll-y',
			function(event, scrollPositionY, isAtTop, isAtBottom)
			{
				if(isAtBottom && trig)
				{
					trig = false;
					p +=1;
					var url = "http://blog.dwnews.com/index.php?r=comment/index&callback=?&page="+p+"&url="+getUrl();
					barLayer.addComment("<div id=\"loading_div\" style='width:560px;height:50px;background:url(http://s0.dwnews.net/images/club/ajax-loader.gif) no-repeat center;'></div>");
					$.getJSON(url,{is_club_post:"",format:"json"},function(lbdata){
						$("#loading_div").remove();
						if (lbdata.status == "ok" && lbdata.total>0){
							api.getContentPane().append(lbdata.data);
							if (lbdata.total > 10){
								if ((p*10)>lbdata.total){
								    if($("div.loadTipComment").length<=0){
										api.getContentPane().append("<div class=\"loadTipComment\" style=\"width:560px;height:190px;line-height:190px;text-align:center;\">没有更多加载</div>");
									}
									trig = false;
								}else{
									p+=1;
									setTimeout(function(){trig=true;},1000);
								}
							}else{
								if($("div.loadTipComment").length<=0){
									api.getContentPane().append("<div class=\"loadTipComment\" style=\"width:560px;height:190px;line-height:190px;text-align:center;\">没有更多加载</div>");
								}
								trig = false;
							}
						}else{
							if($("div.loadTipComment").length<=0){
								api.getContentPane().append("<div class=\"loadTipComment\" style=\"width:560px;height:190px;line-height:190px;text-align:center;\">没有更多加载</div>");
							}
							trig = false;
						}
						if($("div.wypl_comment div.jspVerticalBar").length <= 0){
							$("#dv_scroll_bar").hide();
						}else{
							$("#dv_scroll_bar").show();
						}
						api.reinitialise();
					});
				}
			});
		},
		clcomment: function(){
			$(".bar_link").find("a").each(function(){
				var cs = $(this).attr("class");
				cs.indexOf("_on") > 0 ? $(this).removeClass(cs).addClass(cs.substr(0,cs.length-3)) : "";
			});
			var cls = $(".dw_commentt").attr("class");
			$(".dw_commentt").removeClass(cls).addClass(cls+"_on");
			if(fkey.length <=0){
				$(".tit_facebook").hide();
			};
			$("div.layer-title,div.wdline").hide();
			var data = $("#newsleftbar").html();
			if($("div.wypl_comment div.jspVerticalBar").length <= 0){
				$("div.layer-body").html(data);
				var array = new Array();
				array.push("<div id=\"dv_scroll_bar\" class=\"hidden\">");
				array.push("<div class=\"Scrollbar-Track\" id=\"dv_scroll_track\"></div>");
				array.push("</div>");
				$("div.layer-body").append(array.join(""));
				$("#dv_scroll_bar").css("height","428px");
				$("div.layer-box div.list,div.layer-box div.hot-comm,div.layer-box div.face-comment").css({"width":"560px","height":"430px","overflow":"auto"});
				$.getScript("http://s0.dwnews.net/js/jquery.jscrollpane.min.js",function(){
					commentPlug.newsLeftBar();
					barLayer.bindComment();
				});
			}
			var css = {".dw_qr":[{"top":"-40px","width":"280px","height":"340px"}],".dw_transmit":[{"top":"-40px","width":"340px","height":"520px"}],".dw_commentt":[{"top":"-40px","width":"580px","height":"515px"}]};
			barLayerShow("div.layer-box",css[".dw_commentt"][0]);
		},
		loadLayer : function (target,events,title,objtarget){
			$(target).live(events, function (e) {
				$(".bar_link").find("a").each(function(){
					var cs = $(this).attr("class");
					cs.indexOf("_on") > 0 ? $(this).removeClass(cs).addClass(cs.substr(0,cs.length-3)) : "";
				});
				var cls = $(this).attr("class");
				$(this).removeClass(cls).addClass(cls+"_on");
				if(fkey.length <=0){
					$(".tit_facebook").hide();
				};
				var otherdata = $(objtarget).html();
				objtarget == ".dw_comment" ? (function(){
					$("div.layer-title,div.wdline").hide();
					var data = $("#newsleftbar").html();
					if($("div.wypl_comment div.jspVerticalBar").length <= 0){
						$("div.layer-body").html(data);
						var array = new Array();
						array.push("<div id=\"dv_scroll_bar\" class=\"hidden\">");
						array.push("<div class=\"Scrollbar-Track\" id=\"dv_scroll_track\"></div>");
						array.push("</div>");
						$("div.layer-body").append(array.join(""));
						$("#dv_scroll_bar").css("height","428px");
						$("div.layer-box div.list,div.layer-box div.hot-comm,div.layer-box div.face-comment").css({"width":"560px","height":"430px","overflow":"auto"});
						$.getScript("http://s0.dwnews.net/js/jquery.jscrollpane.min.js",function(){
							commentPlug.newsLeftBar();
							barLayer.bindComment();
						});
					}
				}()) : (function(){
					$("div.layer-title,div.wdline").show();
					$("div.layer-title").html(title);
					$("div.layer-body").html(otherdata);
					$.getScript("http://s0.dwnews.net/js/dwnews.transArticle.js",function(){
						if($("#sptip").length>0){
							$("#sptip").remove();
							$("#spmessage").remove();
							$("div.layer-box").css("height","520px");
						}
					}); 
				}());
				var css = {".dw_qr":[{"top":"-40px","width":"280px","height":"340px"}],".z_wechat":[{"top":"-40px","width":"280px","height":"340px"}],".dw_transmit":[{"top":"-40px","width":"340px","height":"520px"}],".dw_commentt":[{"top":"-40px","width":"580px","height":"515px"}]};
				barLayerShow("div.layer-box",css[target][0]);
				e.stopPropagation();
			});
		},
		load:function(t,objtarget,callback){
			var b = $(objtarget).html();
			$("div.layer-title,div.wdline").show();
			$("div.layer-title").html(t);
			$("div.layer-body").html(b);
			layer("div.layer-box",callback);
		}
    };
}();
$(function($) {
barLayer.init();
barLayer.loadLayer(".dw_qr","click","扫描二维码","#tCode");
barLayer.loadLayer(".dw_transmit","click","转发文章","#tArticle");
$("a.layer-close").live('click', function (e) {
	$(".bar_link").find("a").each(function(){
		var cs = $(this).attr("class");
		cs.indexOf("_on") > 0 ? $(this).removeClass(cs).addClass(cs.substr(0,cs.length-3)) : "";
	});
	$("div.layer-box").hide();
});
});