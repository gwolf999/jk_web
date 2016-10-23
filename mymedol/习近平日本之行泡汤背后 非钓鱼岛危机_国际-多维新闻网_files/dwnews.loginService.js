/**
Class Name: 多维网用户登录处理
Author: luoming@caixun.com
**/
var loginService = function () {
	var range = 10;
	var lPos,tPos = 0;
	var mouseEvent = function(e) {
        this.x = e.pageX;
        this.y = e.pageY;
    };
	var position = function(e){
        pos = new mouseEvent(e);
        lPos = pos.x;
        tPos = pos.y + range;
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
	var markerLogin = function (){
		var username = $.cookie('username');
		var uid = $.cookie('uid');
		if (uid != "" && uid != null){
			$("a.login").hide();
			$("a.reg").hide();
			if($(".user_fixed").length>0){
				$(".user_fixed").addClass("user_fixed_on");
				$("a.user_fixed_on").bind('mouseover', function (e) {
					var uid = $.cookie('uid');
					if (uid != "" && uid != null){
					   if($("div.dw_fixblock").length<=0){
							var info = loginService.logInfo();
							$("body").prepend(info);
						}
						$("div.dw_fixblock").show();
					}
					e.stopPropagation();
				});
				$("a.user_fixed_on").bind('mouseout', function (e) {
					logInfoHide(e,"a.user_fixed_on");
					e.stopPropagation();
				});
			}
			var susMessage = "<div class=\"dw_welcome fl\"><span>欢迎您,</span><a class=\"dw_user_name\" href=\"javascript:;\">"+username+"</a></div>";
			if($("div.dw_welcome").length >0){
				$("div.dw_welcome").remove();
			}
			$("div.right_top").prepend(susMessage);
			LoginLayer.loginHide();
			$("a.dw_user_name").bind('mouseout', function (e) {
				logInfoHide(e,"a.dw_user_name");
				e.stopPropagation();
			});
			//pv.loginLog();
		}
	};
    var doLogin = function(url,username,password,rememberMe,callback){
        var params = {
            "username":username,
            "password":password,
            "rememberMe":rememberMe,
			"url" : window.location.href
        };
        //Ucenter登录验证
        $.getJSON(dwnews.passport_url + "/ucenter/login?format=json&callback=?",params,function(json) {
            //验证通过
            if(json.code == "200000"){
                //检测本地用户是否存在
                json.data.url = params.url;
                $.getJSON(url,json.data,function(data) {
                    if(data.code == 1){
                        data.data.rememberMe = params.rememberMe;
                        regUserCookie(data.data);
						markerLogin();
						(function(){
						  if(callback != undefined){
							callback();
						  }
						})();
                    } else {
                        layer.msg(data.msg,1,-1);
                    }
                });
            } else {
                layer.msg(json.msg,1,-1);
            }
        });
    };
    return {
        init: function () {
			markerLogin();
			$(".label-account,.label-password").keydown(function(e){
				var e = e || event,
				keycode = e.which || e.keyCode;
				if(keycode==13){
					setTimeout(function(){
					   $(".loginframe-btn").click();
				},100); }
			});
            $(".loginframe-btn").bind('click', function (e) {
                var username = $("input.label-account").val();
                var password = $("input.label-password").val();
                var rememberMe = 0;
                if($(".loginframe-checkbox").attr('checked')){
                    rememberMe = 10;
                }
                loginService.login_pre(dwnews.url + "/index.php?r=login/checkLogin&callback=?",username,password,rememberMe);
                e.stopPropagation();
            });
            $(".dw_user_name").live('click', function (e) {
                var info = loginService.logInfo();
                $("body").prepend(info);
                $("div.dw_fixblock").show();
                e.stopPropagation();
            });
            $(document).bind('click', function(e){
                $("div.dw_fixblock").hide();
                e.stopPropagation();
            });
        },
        login : function(url,name,password,rememberMe,callback){
            doLogin(url,name,password,rememberMe,callback);
        },
        login_pre : function(url,name,password,rememberMe){
            if ($.trim(name).length <=0){
               // var utips = "<div class='entry_tips'>输入的账户名不存在，请核对后重新输入</div>";
               // $(".label-account").after(utips);
               $(".label-account").addClass("entry_error");
			$(".label-account").focus();
                return false;
            }
            if ($.trim(password).length <=0){
				//var ptips = "<div style='top:104px' class='entry_tips'>您输入的账户名和密码不匹配，请重新输入</div>";
				// $(".label-password").after(ptips);
				$(".label-password").addClass("entry_error");
			$(".label-password").focus();
                return false;
            }
            doLogin(url,name,password,rememberMe);
        },
		//获取用户主题数
		getUserCommentCount : function (){
			if($.cookie && $.cookie("commentCount") != null) {
				$("#userComment").text($.cookie("commentCount"));
				return $.cookie("commentCount");
			}
			var commentCount = 0;
	    	$.getJSON(dwnews.url + '/index.php?r=user/getUserCommentCount&callback=?',function (data) {
			    $("#userComment").text(data.count);
			    $.cookie("commentCount",data.count,{expires:$.cookie("rememberMe"),domain:dwnews.domain,path:dwnews.path});
				commentCount = data.count;
            });
            return commentCount;
		},
        logInfo : function () {
			var commentCount = 0;
	        commentCount = loginService.getUserCommentCount();	
            var info = new Array();
            info.push("<!--网站发布图层开始-->");
            info.push("<div class='dw_fixblock'><div class='dw_fwidth'>");
            info.push("<div class='dw_layer'>");
            info.push("<ul class='lay_list' >");
            info.push("<li  class='zl'><a href='"+dwnews.url+"/myinfo.html'><i></i>我的资料</a></li><li class='zt'><a href='"+dwnews.url+"/mytopic'><i></i>我的文章<span></span></a></li><li  class='pl'><a href='"+dwnews.url+"/comment-0.html'><i></i>我的评论<span></span></a></li><li class='sc'><a href='"+dwnews.url+"/collect.html '><i></i>我的收藏<span></span></a></li>");
            info.push("<li class='dy'><a href='"+dwnews.url+"/epaper.html'><i></i>我的订阅</a></li><li class='sz'><a href='"+dwnews.url+"/share.html'><i></i>分享设置</a></li><li class='gz'><a href='"+dwnews.url+"/follow-0.html'><i></i>我的关注</a></li>");
            info.push("<li class='fs'><a href='"+dwnews.url+"/fans-0.html'><i></i>我的粉丝</a></li>");
            //info.push("<li class='fb'><a href='"+dwnews.url+"/public' ><i></i>发布主题</a></li>");
            info.push("</ul>");
            info.push("<div class='clear'></div>");
            info.push("<div class='layer-line'></div>");
            info.push("<a class='la-fabu' href='"+dwnews.url+"/public'><i></i>发布文章</a>");
            info.push("<a href='javascript:logout()' class='login_out'>退出登录</a>");
            info.push("</div></div></div>");
            info.push("<!--网站发布图层结束-->");
            return info.join("");
        }
    };
}();
$(function($) {
loginService.init();
});
/*
 *  注册Cookie信息
 */
var regUserCookie = function(params){
    if(params.rememberMe == 0 ){
        $.cookie("uid",params.uid,{domain:dwnews.domain,path:dwnews.path});
        $.cookie("username",params.username,{domain:dwnews.domain,path:dwnews.path});
        $.cookie("rememberMe",params.rememberMe,{domain:dwnews.domain,path:dwnews.path});
    } else {
        $.cookie("uid",params.uid,{expires: params.rememberMe,domain:dwnews.domain,path:dwnews.path});
        $.cookie("username",params.username,{expires: params.rememberMe,domain:dwnews.domain,path:dwnews.path});
        $.cookie("rememberMe",params.rememberMe,{expires: params.rememberMe,domain:dwnews.domain,path:dwnews.path});
    }
    return true;
}
/**
 * 兼容ie8 indexOf 
 * @returns
 */
var ieIndexOf = function(){
	if (!Array.prototype.indexOf)
	{
	  Array.prototype.indexOf = function(elt /*, from*/)
	  {
	    var len = this.length >>> 0;
	    var from = Number(arguments[1]) || 0;
	    from = (from < 0)
	         ? Math.ceil(from)
	         : Math.floor(from);
	    if (from < 0)
	      from += len;

	    for (; from < len; from++)
	    {
	      if (from in this &&
	          this[from] === elt)
	        return from;
	    }
	    return -1;
	  };
	}
}

 /*
  *  退出登录
  */
 var  logout = function(){
	//加载退出层
//	lockLayer.loadLayer();
  	//Ucenter退出
  	$(".dw_welcome").html("退出中......");
	var userLinkArray = [dwnews.url + "/index.php?r=club/topic", dwnews.url + "/index.php?r=user/comment",
		dwnews.url + "/index.php?r=user/follow"
	];
	ieIndexOf();
	var url = window.location.href;
	var uid = $.cookie("uid");
  	$.getJSON(dwnews.passport_url + '/ucenter/logout?format=json&callback=?',{},function(ucdata) {
		$.getJSON(dwnews.url + "/index.php?r=login/logout&callback=?",function(){
            $.cookie("username",null,{domain:dwnews.domain,path:dwnews.path});
			$.cookie("commentCount",null,{domain:dwnews.domain,path:dwnews.path});
            $.cookie("uid",null,{domain:dwnews.domain,path:dwnews.path});
            $.cookie("rememberMe",null,{domain:dwnews.domain,path:dwnews.path});
			if(userLinkArray.indexOf(url) >= 0){
				location.href = url + "&uid=" + uid;
			} else {
                location.reload();
			}
        });
	});	
  }