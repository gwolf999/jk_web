/**
Class Name: 多维网用户注册处理
Author: luoming@caixun.com
 **/
var registerService = function () {
    var loadDom = function (url,target){
        $.get(url, function(data){
            $(target).html(data);
        });
    };
    var loadJs = function(url){
        $.ajax({
            type: "GET",
            url: url,
            dataType: "script"
        }); 
    };
    var iptFocus = function (e){
        $(e.target).addClass("box-on");
    };
    var iptUnfocus = function (e){
        $(e.target).removeClass("box-on");
    };
    var doRegister = function (){
        var iptlist = $("ul.box_list_reg").find("li");
        var email = iptlist.find("input").eq(0);
        var username = iptlist.find("input").eq(1);
        var password = iptlist.find("input").eq(2);
        var againPassword = iptlist.find("input").eq(3);
        var validCode = iptlist.find("input").eq(4);
        if ($.trim(email.val()).length <=0){
            email.addClass("box-error");
            iptlist.eq(0).find("div").find("em").removeClass();
            iptlist.eq(0).find("div").addClass("orange");
            return false;
        }
        if ($.trim(username.val()).length <=0){
            username.addClass("box-error");
            iptlist.eq(1).find("div").find("em").removeClass();
            iptlist.eq(1).find("div").addClass("orange");
            return false;
        }
        if ($.trim(password.val()).length <=0){
            password.addClass("box-error");
            iptlist.eq(2).find("div").find("em").removeClass();
            iptlist.eq(2).find("div").addClass("orange");
            return false;
        }
        if ($.trim(againPassword.val()).length <=0){
            againPassword.addClass("box-error");
            iptlist.eq(3).find("div").find("em").removeClass();
            iptlist.eq(3).find("div").addClass("orange");
            return false;
        }
        if ($.trim(validCode.val()).length <=0){
            validCode.addClass("box-error");
            iptlist.eq(4).find("div").find("em").removeClass();
            iptlist.eq(4).find("div").addClass("orange");
            return false;
        }
    };
    return {
        init: function () {
            $("a.reg").bind('click', function (e) {
				registerService.agree(true);
                e.stopPropagation();
            });
			$(".post-reg").live('click', function (e) {
				registerService.agree(true);
                e.stopPropagation();
            });
            $("ul.box_list input").focus(function(e){
                iptFocus(e);
                e.stopPropagation();
            });
            $("ul.box_list input").focusout(function(e){
                iptUnfocus(e);
                e.stopPropagation();
            });
            $(".btn-clearall").live('click', function (e) {
                var iptlist = $("ul.box_list").find("li");
                var ipt = iptlist.find("input");
                ipt.attr("value","");
                validation.initValid();
                e.stopPropagation();
            });
        },
        next : function(url,name,password){
        //registerService.doLogin(url,name,password);
        },
        agree : function(bool){
            if (bool){
                Layer.ajaxLayer(dwnews.url + "/index.php?r=login/regindex&callback=?","用户注册",true);
                //加载验证码
                setTimeout(function(){registerService.getCode();},1000);
                loadJs("http://s0.dwnews.net/js/common/dwnews.registerService.js");
                setTimeout(function(){
                    loadJs("http://s1.dwnews.net/js/common/dwnews.verification.js");
                },1000);	
            }else{
                return false;
            }
        },
        register : function(){
            doRegister();
            var bool = validation.checkValid();
            if (bool){
				//显示loading
				lockLayer.loadLayer();
                //提交数据
                var iptlist = $("ul.box_list_reg").find("li");
                var email = iptlist.find("input").eq(0).val();
                var username = iptlist.find("input").eq(1).val();
                var password = iptlist.find("input").eq(2).val();
                var sendmail = 0;
                if($("#agree_reg").attr("checked") !== 'checked'){
	              sendmail = 1;
	            }
                var params = {
                    "username":username, 
                    "password":password, 
                    "email":email, 
                    "toemail":email, 
                    "rememberMe":0,
                    "sendmail":sendmail,
	    	    "url" : window.location.href
                };
                registerService.postRegData(params);
            }
        },
        getCode : function(){
            $.getJSON(dwnews.code_url + "/index.php?r=login/getCaptcha&callback=?",
                function(data){
                    $("#getCode").attr({
                        "src":data.url,
                        "code":data.code
                    });
                }
            ); 
        },
        postRegData : function(params){
            $.getJSON(dwnews.passport_url + '/ucenter/register?format=json&callback=?',{
                "username":registerService.guid(),
                "password":params.password, 
                "email":params.email,
                "toemail":params.email,
                "rememberMe":params.rememberMe
            },function(ucdata) {
                //Ucenter注册成功
                if(ucdata.code == "200000"){
                    params.uid = ucdata.data.uid;
                    //本地数据注入
                    var url = dwnews.url + "/index.php?r=login/register&callback=?";
                    $.getJSON(url,params,function(dwdata) {
                        //注册成功
                        if(dwdata.code == 1) {
                            //注册cookie
                            regUserCookie(params);
							showLoginHtml(params.username);
                            //关闭注册层
                            lockLayer.close();
							$(".post-gongju").html("欢迎您："+params.username);
                            Layer.ajaxLayer(dwnews.url + "/index.php?r=login/regsuccess&callback=?","注册成功", true);
                        } else {
							lockLayer.close();
                            layer.msg(dwdata.msg,1,-1);			
                        }
                    });
                } else {
					lockLayer.close();
                    layer.msg(ucdata.msg,1,-1);
                }
            });
        },
        close　: function(){
            $("div.dw_showbox_bg, div.dw_showbox").hide();   
        },
        //生成ucenter唯一用户名
        guid : function()
        {  
            return Math.uuid(8, 10);
        },
        //显示订阅电子报邮箱
        showEditEmail : function(){
            $(".edit_email").removeClass("hidden");
        },
        //电子报订阅
        takeEpaper : function(){
            var epaper ="";  
            $('input[name="epaper"]:checked').each(function(){  
                epaper += $(this).val() + ",";  
            });  
            if(epaper.length == 0){
                layer.msg("您没有选择订阅电子报",1,-1);
                return false;
            }
            var email_match = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/; 
            var toemail = $.trim($("#reg_toemail").val());
            if(toemail == ""){
                layer.msg("订阅电子邮箱不能为空",1,-1);
                return false;
            }
            if(!email_match.test(toemail)){
                layer.msg("请输入正确的电子邮箱",1,-1);
                return false;
            }
            var data = {
                type:epaper, 
                toemail:toemail
            };
            //数a据提交
             $.getJSON(dwnews.url + '/index.php?r=epaper/orderemailcheck&callback=?',{'toemail':toemail},function(data) {
              if(data.post == 'error'){
              	  layer.alert('此邮箱已存在',9,-1);
              	  return false;
              }else{
                $("#reg_dingyue").html("<img src='http://s0.dwnews.net/images/club/ajax-loader.gif' />");
                $.getJSON(dwnews.url + "/index.php?r=epaper/sendEmail&callback=?",data,function(data) {
                });
                setTimeout(function(){
                    $("#reg_dingyue").html('<a class="reg_dingyue" title=""  onclick="registerService.takeEpaper();" href="javascript:;">订阅</a>');
                   layer.alert('激活邮件会发送到您的邮箱！如果未收到邮件请到 会员中心>订阅 中重新发送邮件',1,-1);
                },1000); 
              }
            });
                  
        }
    };
}();
$(function($) {
    registerService.init();
});