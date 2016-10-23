/**
Class Name: 多维网底部导航
Author: luoming@caixun.com
**/
var NavigationFooter = function () {
    var navigationbottom = function() {
        var array = new Array();
		array.push("<!--网站底部开始-->");
		array.push("<div class='footer_bg'>");
		array.push("<div class='footer'>");
		array.push("<dl class='about_list'>");
		array.push("<dt>关于多维</dt>");
		array.push("<dd><a href='http://www.dwnews.com/careers.html'>人才招聘</a></dd>");
		array.push("<dd><a href='http://www.dwnews.com/contactus.html'>联络我们</a></dd>");
		array.push("</dl>");
		array.push("<dl class='about_list'>");
		array.push("<dt>相关声明</dt>");
		array.push("<dd><a href='http://www.dwnews.com/copyright.html'>版权声明</a></dd>");
		array.push("<dd><a href='http://www.dwnews.com/privacy.html'>隐私条款</a></dd>");
		array.push("<dd><a href='http://www.dwnews.com/disclaimer.html'>免责声明</a></dd>");
		array.push("</dl>");
		array.push("<dl class='about_list'>");
		array.push("<dt>广告服务</dt>");
		array.push("<dd><a href='http://www.dwnews.com/emarketing.html'>广告机会</a></dd>");
		array.push("<dd><a href='http://www.dwnews.com/mediakit.html'>刊例下载</a></dd>");
		array.push("<dd><a href='http://www.dwnews.com/audience.html'>用户资料</a></dd>");
		array.push("<dd><a href='http://www.dwnews.com/partnership.html'>合作伙伴</a></dd>");
		array.push("</dl>");
		array.push("<dl class='about_list' style='width:10%;'> ");
		array.push("<dt>会员服务</dt>");
		array.push("<dd><a href='http://www.dwnews.com/epaper/index.html'>订阅电子报</a></dd>");
		array.push("<dd><a onClick=\"javascript:openCheckLoginUrl('http://blog.dwnews.com/mytopic');\" style=\"cursor:pointer\">会员中心</a></dd>");
		array.push("</dl>");
		array.push("<div class='magaz-bg'>");
		array.push("<div class='magaz-sub'>");
		array.push("<img src='http://s4.dwnews.net/images/www/dwcn/magaz-sub.png'  border='0'/><a class='sub-to' href='https://duoweicn.dwnews.com/' target='_blank'></a>");
		array.push("</div>");
		array.push("</div>");
		array.push("<div class='clear'>");
		array.push("</div>");	
		array.push("</div>");
		array.push("</div>");
		array.push("<div class='copyright_bg'>");
		array.push("<div class='copyright'>");
		array.push("<a class='sitemap' href='http://www.dwnews.com/sitemap.html'>网站导航</a>Copyright Chinese Media Net, Inc. All Rights Reserved 版权所有 不得转载");
		array.push("</div>");
		array.push("</div>");
		array.push("<!--网站底部结束-->");
		return array.join("");
    };
	var domFooter= function(text) {
        document.write(text);
		document.close();
    };
    return {
        init: function () {
            var navFooter = navigationbottom();
			domFooter(navFooter);
        }
    };
}();
NavigationFooter.init();
