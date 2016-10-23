/**
Class Name: 多维网顶部导航
Author: luoming@caixun.com
**/
var NavigationHeader = function () {
    var navigationTop = function() {
        var array = new Array();
		array.push("<!--网站顶部功能开始-->");
		array.push("<div class='site_top_bg'>");
		array.push("<div class='site_top'>");
		array.push("<div class='left_top fl'></div>");
		array.push("<div class='right_top fr'>");
		array.push("<a href='javascript:;' cursor='cursor' class='login fl'>登录</a><a href='javascript:;' class='reg fl'>注册</a>");
		array.push("<i class='su_line fl'></i>");
        array.push("<a class='fanjian fl' href='javascript:;'>繁体</a><i class='su_line fl su_line2'></i>");
		array.push("<a class='facebook fl' href='javascript:;' onclick='javascript:open_share_facebook();'>分享到facebook</a><a class='twitter fl' href='javascript:;' onclick='javascript:open_share_twitter();'>分享到tiwtter</a>");
		array.push("</div>");
		array.push("</div>");
		array.push("</div>");
		array.push("<!--网站顶部功能结束-->");
		array.push("<!--网站header开始-->");
		array.push("<div class='topDiv header_bg'>");
		array.push("<div class='header'>");
		array.push("<h1><a href='http://www.dwnews.com' target='_blank' class='logo'>多维新闻网</a></h1>");
		array.push("<div class='search'>");
		array.push('<form action="http://www.dwnews.com/search.html" method="get" target="_blank">');
		array.push('<input class="search_input" type="text" value="搜索" onMouseOut="this.style.borderColor=\'\'" onFocus="if (value ==\'搜索\'){value =\'\'}" onBlur="if (value ==\'\'){value=\'搜索\'}" name="q">');
		array.push('<input type="hidden" name="domains" value="dwnews.com;chinesenewsnet.com"></input>');
		array.push('<input type="hidden" name="sitesearch" value="dwnews.com"></input>');
		array.push('<input type="hidden" name="client" value="pub-5895419964522249"></input>');
		array.push('<input type="hidden" name="ie" value="utf-8"></input>');
		array.push('<input type="hidden" name="oe" value="utf-8"></input>');
		array.push('<input type="hidden" name="cof" value="GALT:#008000;GL:1;DIV:#336699;VLC:663399;AH:center;BGC:FFFFFF;LBGC:FFFFFF;ALC:0000FF;LC:0000FF;T:000000;GFNT:0000FF;GIMP:0000FF;LH:50;LW:185;L:http://www.chinesemedianet.com/images/logo.gif;S:http://www.dwnews.com;FORID:11"></input>');
		array.push('<input type="button" value="" class="search_btn" />');
		array.push('</form>');
		array.push("</div>");
		array.push("<div class='dwpro'>");
        array.push("<a href='http://blog.dwnews.com/mobile/chn/index.php/mobile/ios' class='pro_ios' target='_blank'>iOS版</a><i class='pro_line fl'></i><a href='http://blog.dwnews.com/mobile/chn/index.php/mobile/wap' target='_blank' class='pro_android'>Android版</a><i class='pro_line fl'></i><a href='http://www.dwnews.com/mobile/index.html' target='_blank' class='pro_mobile'>Mobile版</a><i class='pro_line fl'></i><a href='http://www.dwnews.com/epaper/index.html' target='_blank' class='pro_dzb'>电子报</a><i class='pro_line fl'></i><a href='https://duoweicn.dwnews.com' class='pro_szk' target='_blank'>《多维CN》月刊</a>");
		array.push("<div class='dwpr_more'></div>");
		array.push("</div>");
		array.push("<div class='clear'></div>");
		array.push("</div>");
		array.push("<div class='nav_bg'>");
		array.push("<ul class='nav'>");
		array.push("<li><a href='http://www.dwnews.com' class='bl_none sy'><span>首页</span></a></li>");
		array.push("<li><a href='http://china.dwnews.com' class='zg'><span>中国</span></a></li>");
		array.push("<li><a href='http://taiwan.dwnews.com' class='la'><span>两岸</span></a></li>");
		array.push("<li><a href='http://hongkong.dwnews.com' class='xg'><span>香港</span></a></li>");
		array.push("<li><a href='http://global.dwnews.com' class='gj'><span>国际</span></a></li>");
		array.push("<li><a href='http://opinion.dwnews.com' class='gd'><span>观点</span></a></li>");
		array.push("<li><a href='http://economics.dwnews.com' class='jj'><span>经济</span></a></li>");
		array.push("<li><a href='http://military.dwnews.com' class='js'><span>军事</span></a></li>");
		array.push("<li><a href='http://history.dwnews.com' class='ls'><span>历史</span></a></li>");
		array.push("<li><a href='http://culture.dwnews.com' class='tx'><span>天下</span></a></li>");
		array.push("<li><a href='http://entertainments.dwnews.com' class='yl'><span>娱乐风尚</span></a></li>");
		array.push("<li><a href='http://blog.dwnews.com' class='br_none sq'><span>社区</span></a></li>");
		array.push("</ul>");
		array.push("</div>");
		array.push("<div class='dw_login' style='display:none;'>");
		array.push("<div class='loginframe-blank'>");
		array.push("<label class='loginframe-label clearfix'><span class='hidden'>账号：</span><input type='text' class='label-account' placeholder='请输入邮箱'></label>");
		array.push("<label class='loginframe-label clearfix'><span class='hidden'>密码：</span><input type='password' class='label-password' placeholder='请输入密码'></label>");
		array.push("<div class='wangjimima'>");
		array.push("<a href='http://blog.dwnews.com/index.php?r=user/findpwd' class='forgetpwd'>忘记密码？</a>");
		array.push("<label class='fl'><input type='checkbox' name='autologin' class='loginframe-checkbox'><span class='fl'>十天内免登录</span></label>");
		array.push("</div>");
		array.push("<a href='javascript:' class='free_reg clearfix reg fl'>免费注册</a><button style='cursor:pointer' class='loginframe-btn fl'>登录</button>");
		array.push("</div>");
		array.push("<div class='other_login'>");
		array.push("<a href='javascript:open_win(\"/index.php?r=login/OAuthLogin&amp;type=facebook\");' class='facebook_login'>facebook<br>账号登录</a><a href='javascript:open_win(\"/index.php?r=login/OAuthLogin&amp;type=twitter\");' class='twitter_login'>twitter<br>账号登录</a>");
		array.push("</div>");
		array.push("</div>");
		array.push("<div class='dw_fixedmore hidden' style='left:944.5px;z-index: 200;top: 56px;position: fixed;'>");
		array.push("<div class='more-body'>");
		array.push("<div class='more-fan'><a href='javascript:;'>繁体版</a></div>");
		array.push("<div class='layer-line'></div>");
		array.push("</div>");
		array.push("<div class='more-body'>");
		array.push("<div class='more-subscribe'><a href='http://www.dwnews.com/epaper/index.html' target='_blank'>订阅电子报</a></div>");
		array.push("<div class='layer-line'></div>");
		array.push("</div>");
		array.push("<div class='more-body'>");
		array.push("<div class='more-phone'>");
		array.push("<a href='javascript:;' class='phone-app p-on' style='display:none;'>手机App</a>");
		array.push("<a href='http://m.dwnews.com' target='_blank' class='phone-mobile p-on' style='float:none;'>Mobile版</a>");
		array.push("<div class='clear'></div>");
		array.push("<!--手机app切换开始-->");
		array.push("<div class='body-app hidden'>");
		array.push("<div class='phone-qr'><img src='http://s1.dwnews.net/images/www/qr-phone.png' width='100%'/></div>");
		array.push("<div class='phone-down'>");
		array.push("<a href='javascript:;' class='phone-android'><i></i>Android下载</a>");
		array.push("<a href='javascript:;' class='phone-iphone'><i></i>Iphone下载</a>");
		array.push("</div>");
		array.push("</div>");
		array.push("<!--mobile切换结束-->");
		array.push("<!--手机app切换开始-->");
		array.push("<div class='body-mobile'>");
		array.push("<div class='phone-qr'><img src='http://s2.dwnews.net/images/www/wap-qr.png' width='100%'/></div>");
		array.push("<p>手机扫描二维码，查看手机网页版，全新体验！</p>");
		array.push("</div>");
		array.push("<!--mobile切换结束-->");
		array.push("</div>");
		array.push("<div class='layer-line'></div>");
		array.push("</div>");
		array.push("<div class='more-body'>");
		array.push("<div class='more-share'>");
		array.push("<span class='more-s-txt'>分享给好友：</span>");
		array.push("<a href='javascript:;' onclick='javascript:open_share_facebook();' class='more-s-facebook'></a><a href='javascript:;' onclick='javascript:open_share_twitter();' class='more-s-twitter'></a>");
		array.push("<div class='clear'></div>");
		array.push("</div>");
		array.push("</div>");
		array.push("</div>");
		array.push("<div class='nav_fixed' style='display:none;'>");
		array.push("<ul class='nav'><a href='javascript:;' class='more_fixed'>更多</a><a href='javascript:;' class='search_fixed'>网站搜索</a><a href='javascript:;' class='user_fixed'>会员中心</a>");
		array.push("<a href='http://www.dwnews.com' target='_blank' class='logo_fixed'>多维新闻网</a>");
		array.push("<div class=\"dw_search hidden\">");
		array.push("<div class=\"dw_search_bg\">");
		array.push('<form action="http://www.dwnews.com/search.html" method="get" target="_blank">');
		array.push("<input type=\"text\" name=\"q\" class=\"f-search\" value=\"请输入关键字\" onmouseout=\"this.style.borderColor=&quot;请输入关键字&quot;\" onfocus=\"if (value ==&quot;请输入关键字&quot;){value =&quot;&quot;}\" onblur=\"if (value ==&quot;&quot;){value=&quot;请输入关键字&quot;}\">");
		array.push('<input type="hidden" name="domains" value="dwnews.com;chinesenewsnet.com"></input>');  
		array.push('<input type="hidden" name="sitesearch" value="dwnews.com"></input>'); 
		array.push('<input type="hidden" name="client" value="pub-5895419964522249"></input>'); 
		array.push('<input type="hidden" name="ie" value="utf-8"></input>'); 
		array.push('<input type="hidden" name="oe" value="utf-8"></input>'); 
		array.push('<input type="hidden" name="cof" value="GALT:#008000;GL:1;DIV:#336699;VLC:663399;AH:center;BGC:FFFFFF;LBGC:FFFFFF;ALC:0000FF;LC:0000FF;T:000000;GFNT:0000FF;GIMP:0000FF;LH:50;LW:185;L:http://www.chinesemedianet.com/images/logo.gif;S:http://www.dwnews.com;FORID:11"></input>'); 
		array.push("<a class=\"f-search-btn\" href=\"javascript:;\"></a>");
		array.push("</form>");
		array.push("</div>");
		array.push("</div>");
		array.push("<li><a href='http://www.dwnews.com' class='on bl_none sy'><span>首页</span></a></li>");
		array.push("<li><a href='http://china.dwnews.com' class='zg'><span>中国</span></a></li>");
		array.push("<li><a href='http://taiwan.dwnews.com' class='la'><span>两岸</span></a></li>");
		array.push("<li><a href='http://hongkong.dwnews.com' class='xg'><span>香港</span></a></li>");
		array.push("<li><a href='http://global.dwnews.com' class='gj'><span>国际</span></a></li>");
		array.push("<li><a href='http://opinion.dwnews.com' class='gd'><span>观点</span></a></li>");
		array.push("<li><a href='http://economics.dwnews.com' class='jj'><span>经济</span></a></li>");
		array.push("<li><a href='http://military.dwnews.com' class='js'><span>军事</span></a></li>");
		array.push("<li><a href='http://history.dwnews.com' class='ls'><span>历史</span></a></li>");
		array.push("<li><a href='http://culture.dwnews.com' class='tx'><span>天下</span></a></li>");
		array.push("<li><a href='http://entertainments.dwnews.com' class='yl'><span>娱乐风尚</span></a></li>");
		array.push("<li><a href='http://blog.dwnews.com' class='br_none sq'><span>社区</span></a></li>");
		array.push("</ul><div class='shadow_bg'></div>");
		array.push("</div>");
		array.push("</div>");
		array.push("<!--网站header结束-->");
		return array.join("");
    };
	var domHeader = function(text) {
        document.write(text);
		document.close();
    };
    return {
        init: function () {
            var navHeader = navigationTop();
			domHeader(navHeader);
			$.getScript("http://s2.dwnews.net/js/dwnews.do.command.js",function(){
				jQuery(".search").find("form").submit(function(){
					var t = $(".search_input").val();
					if(jQuery.trim(t) == '' || t == "请输入关键字"){
						layer.msg("请输入关键字！",1,-1);
						return false;
					}
					pv.dwgsch('j1',t);
				});
				jQuery(".search").find("form").find(".search_btn").click(function(){jQuery(this).parent().submit()});
				jQuery(".dw_search").find("form").submit(function(){
					var t = $(".f-search").val();
					if(jQuery.trim(t) == '' || t == "请输入关键字"){
						layer.msg("请输入关键字！",1,-1);
						return false;
					}
					pv.dwgsch('j1',t);
				});
				jQuery(".dw_search").find("form").find(".f-search-btn").click(function(){jQuery(this).parent().submit()});
			});
        }
    };
}();
NavigationHeader.init();