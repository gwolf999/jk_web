/**
Class Name: 多维网前端登录层处理
Author: luoming@caixun.com
**/
var LoginLayer = function () {
	var range = 10;
	var lPos,tPos = 0;
    var domShow = function(target,styles) {
        $(target).fadeIn().css(styles);
    };
    var mouseEvent = function(e) {
        this.x = e.pageX;
        this.y = e.pageY;
    };
	var position = function(e){
        pos = new mouseEvent(e);
        lPos = pos.x;
        tPos = pos.y + range;
    };
	var domHide = function(e) {
		position(e);
		if ($("div.dw_login").length >0){
			var _top = $("div.dw_login").offset().top;
			if ($("a.login").length >0){
				var aTop = $("a.login").offset().top + $("a.login").height();
				if (aTop<tPos && tPos<_top){
					return;
				}
				$("div.dw_login").hide();
			}else{
				domFixdHide(e);
			}
		}
	}; 
	var domFixdHide = function(e) {
		position(e);
		var _top = $("div.dw_login").offset().top + range;
		var aTop = $("a.user_fixed").offset().top + $("a.user_fixed").height();
		if (aTop<tPos && tPos<_top){
			return;
		}
        $("div.dw_login").hide();
	};
	var varNavHide = function(e) {
		position(e);
		var _top = $("div.bar_nav").offset().top + range +10;
		var aTop = $("a.comm_column").offset().top + $("a.comm_column").height(); 
		var l = $("a.comm_column").offset().left;
		var al = $("a.comm_column").width()+$("a.comm_column").offset().left-range;
		if (aTop<tPos && tPos<_top && lPos<=al && lPos>l){
			return;
		}

		$(".bar_nav").hide();
	};
	var varNavColumnHide = function(e) {
		position(e);
		var _top = $("div.bar_nav").offset().top;
		var aTop = $("div.bar_nav").offset().top + $("div.bar_nav").height(); 
		var _left = $("div.bar_nav").offset().left;
		var aLeft = $("div.bar_nav").offset().left + $("div.bar_nav").width();
		if ((_top < tPos && tPos < aTop) && (_left < lPos && lPos < aLeft)){
			return;
		}
		$("div.bar_nav").hide();
	};
	var logInfoHide = function(e,target){
		position(e);
		$("div.dw_layer").length >0 ?(function(){
		var _top = $("div.dw_layer").offset().top + range;
		var aTop = $(target).offset().top + $(target).height(); 
		if (aTop<tPos && tPos<_top){
			return;
		}
        $("div.dw_fixblock").hide();
		}()) : "";
	};
    return {
        init: function () {
			$(document).bind('click', domHide);
			$("div.loginframe-blank input").focus(function(){
				$(this).addClass("entry_on");
			});
			$("div.loginframe-blank input").focusout(function(){
				$(this).removeClass("entry_on");
			});
			$("div.loginframe-blank input").keypress(function(){
                $("div.loginframe-blank input").removeClass("entry_error");
				$("div.entry_tips").hide();
			});
			$("div.loginframe-blank input").keydown(function(){
                $("div.loginframe-blank input").removeClass("entry_error");
				$("div.entry_tips").hide();
			});
			$("a.login,a.user_fixed").bind('mouseover', function (e){
				var _top =  $(this).offset().top;
				var _left = "0";
				$("div.main").length >0 ? (function(){
					_left = $("div.main").offset().left + $("div.main").width();
					_left = _left - $("div.dw_login").width();
				}()) : (function(){
					_left = $("ul.nav>a.user_fixed").offset().left;
					_left = _left - $("div.dw_login").width()/2;
				}());
				_left = _left + "px";
				var _styles = {"z-index":200,"left":_left,"top":"56px","position":"fixed"};
				var uid = $.cookie('uid');
				if (uid == "" || uid == null){
					LoginLayer.loginShow("div.dw_login",_styles);
				}
				e.stopPropagation();
			});
			$("a.login").bind('mouseout', function (e) {
				domHide(e);
				e.stopPropagation();
			});
			$("div.dw_login").bind('click', function (e) {
				e.stopPropagation();
			});
			$("a.user_fixed").bind('mouseout', function (e) {
				domFixdHide(e);
				e.stopPropagation();
			});
			var host = window.location.host;
			if (host == 'blog.dwnews.com'){
				$("a.comm_column").bind('mouseover', function (e) {
					if($("div.bar_nav").length>0){
						$("div.bar_nav").show();
						$("div.bar_nav").bind('mouseout', function (e) {
							varNavColumnHide(e);
							e.stopPropagation();
						});
					}
					e.stopPropagation();
				});
				$("a.comm_column").bind('mouseout', function (e) {
					varNavHide(e);
					e.stopPropagation();
				});
			}
			$(window).resize(function(e){
				var _left = "0";
				$("div.main").length >0 ? (function(){
					_left = $("div.main").offset().left + $("div.main").width();
				}()) : (function(){
					_left = $("ul.nav>a.user_fixed").offset().left;
				}());
				_left = _left - $("div.dw_login").width();
				_left = _left + "px";
				var _styles = {"left":_left};
				$("div.dw_login").css(_styles);
				e.stopPropagation();
			});
        },
		loginShow : function (target,styles) {
			domShow(target,styles);
		},
		loginHide : function (){
			$("div.dw_login").hide();
		}
    };
}();
$(function($) {
  LoginLayer.init();
});