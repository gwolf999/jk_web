/**
Class Name: 多维网前端导航处理
Author: luoming@caixun.com
**/
var navigation = function () {
	var miniChkLogin = function (){
		var uid = $.cookie('uid');
		if (uid != "" && uid != null){
			if($(".user_fixed").length>0){
				$(".user_fixed").addClass("user_fixed_on");
			}
		}
	};
    var fixedNav = function() {
		var topH = 197;
		topH = $(".main_bg").length<=0?-1:$(".main_bg").offset().top;
		//var leftH = $(".main_bg").height();
		//var navHeight = $(".nav_bg").height();
		$(window).scroll(function(){
			var scroH = $(window).scrollTop();
			//var dScroH = topH + leftH - navHeight;
			if(scroH >= topH){
				$(".nav_fixed").fadeIn("slow");
			}else{
				var tjlen = $("div.tjnavbox").length;
				if(tjlen <= 0 || tjlen == "undefined"){
					$(".nav_fixed").fadeOut("slow");
				}
			}
		});
		miniChkLogin();
    };
	var sidebarNav = function() {
		var nav = $(".bar_wrap");
		nav.length >0 ? (function(){
			var topH = $(".main_bg").offset().top;
			var navHeight = $(".bar_wrap").height();
			$(window).scroll(function(){
				var leftH = $(".main_bg").height();
				var scroH = $(window).scrollTop() + topH;
				var dScroH = leftH - navHeight;
				if(scroH <= dScroH && scroH >= topH){
					$(".bar_wrap").removeAttr("style").css({"position":"fixed","top":"auto"});
				}else{
					$(".bar_wrap").removeAttr("style").css({"position":"absolute","bottom":"120px"});
				}
				if($(".news_block > .dw_comment").length>0){
					var commentTop = $(".news_block > .dw_comment").offset().top;
					var navTop = nav.offset().top;
					if (navTop > commentTop){
						$(".bar_link").find("a").each(function(){
							var cs = $(this).attr("class");
							cs.indexOf("_on") > 0 ? $(this).removeClass(cs).addClass(cs.substr(0,cs.length-3)) : "";
						});
						$(".dw_commentt").attr("href","javascript:;");
						$("div.layer-box").hide();
					}else{
						$(".dw_commentt").attr("href","javascript:barLayer.clcomment();");
					}
				}
			});
		}()) : "";
	};
    return {
        init: function () {
            fixedNav();     
			sidebarNav();
        }
    };
}();
navigation.init();