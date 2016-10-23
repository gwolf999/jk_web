/*社区点赞，喜欢，不喜欢
type = zan,likes,nolikes
*/
var CLUB_HOST = 'http://blog.dwnews.com';
var GL_WIN;
function clubZan(clubid,type,e){
    var ac_type = type;  
    if( type == 'support'){
         ac_type = 'likes';
         
         var tagObj = e.outerHTML;
	     var tagParent = $(e).parent();
	     $(e).replaceWith("<img id='zan_img_"+clubid+"' src='http://s0.dwnews.net/images/club/ajax-loader.gif' />");	
    }else{
       $(".like").removeAttr("onclick");
       $(".unlike").removeAttr("onclick");
    }
    var url = CLUB_HOST+"/index.php?r=club/clubzan&id="+clubid+"&type="+ac_type+"&callback=?";  
	jQuery.getJSON(url, function(data){
        if( type == 'support' ){
	         $("#zan_img_"+clubid).remove();
	         tagParent.prepend(tagObj);
        }else{
           $(".like").attr("onclick","javascript:clubZan("+clubid+",'likes',this);");
           $(".unlike").attr("onclick","javascript:clubZan("+clubid+",'nolikes',this);");
        }    
       
       if( data.post == 'success'){
            
//            if(ac_type == 'nolikes'){
//              pv.likePv(0);
//            }else{
//              pv.likePv(1);
//            }
            if( type == 'support'){
		      $("#c_zan_"+clubid).text('('+data.count+')');
		    }else if(type == 'likes'){  
		       $(".add").attr('style','top:-35px;left:35px;z-index:999;display:none');
		       $(".add").animate({
				   opacity: 'show'
				 }, 400).animate({
				   opacity: 'hide'
				 }, 600);
		       //attr('style','top:-35px;left:35px;z-index:999;').show('slow');
			var likeObj = $(".like").children("span").children("em");
			likeNum = likeObj.text();
			likeObj.text(++likeNum);
		    } else if(type == 'nolikes'){  
		       $(".add").attr('style','top:-35px;left:180px;z-index:999;display:none');
		       $(".add").animate({
				    opacity: 'show'
				 }, 400).animate({
				   opacity: 'hide'
				 }, 600);
			var unlikeObj = $(".unlike").children("span").children("em");
			unlikeNum = unlikeObj.text();
			unlikeObj.text(++unlikeNum);
		    }                           
		    
		}else if(data.code == 1){
		    layer.alert('参数错误', 8);
		}else if(data.code == 2){
		    layer.alert('您已参与过', 8);
		}
	});
}

// 添加收藏
function addFavorites(url,title,createtime,bid){
   var flg = checCookiekLogin(); 
    if (flg == false){
       pop_login();
       return;
    }
  // url = url.replace(/&/, "##");
   url = encodeURIComponent(url);
   var posturl = CLUB_HOST+"/index.php?r=user/addfavorites&url="+url+"&title="+title+"&bid="+bid+"&createtime="+createtime+"&callback=?";  
   jQuery.getJSON(posturl, function(data){  
		if( data.post == 'success'){
		     layer.alert('收藏成功', 9); 
             //pv.cstore(1);  //参数 d = 1收藏/0取消收藏                                 
		}else if(  data.stat == 2){
			 layer.alert('您已收藏此页面', 9);
		}else if( data.stat == 3 ){
                     binding_pop();
                }else{
		    layer.alert('收藏失败', 8);
		}
	});
}
// 取消收藏
function delFavorites(id){
	var url = CLUB_HOST+"/index.php?r=user/delfavorites&id="+id+"&callback=?";  
      layer.confirm('确定删除吗？',function() {
          jQuery.getJSON(url, function(data){  
		   if( data.post == 'success'){
			$("#favorite_"+id).remove(); 
		    layer.alert("删除成功",9);  
		    //pv.cstore(0);  //参数 d = 1收藏/0取消收藏                                    
		   }else{
			layer.alert('失败', 8);
		   }
	      });
      });
}
// 添加关注 社区明星
function start_attention(touid){
    var objHml = $("#start_"+touid).html();
    var flg = checCookiekLogin();
    if ( flg == false){
	   $("#start_"+touid).html(objHml);	
           pop_login();
           return;
    }
    $("#start_"+touid).html("<div style='height:38px;text-align:center'><img src='http://s0.dwnews.net/images/club/ajax-loader.gif' /></div>");
    var url = CLUB_HOST+"/index.php?r=user/addattention&touid="+touid+"&callback=?";  
    jQuery.getJSON(url, function(data){  
	    $("#start_"+touid).html(objHml);
	    if( data.post == 'success'){
	        $("#start_"+touid).html('<a href="javascript:;" class="small_no_follow" onclick="javascript:start_clearattention('+touid+')">取消关注</a>');                                      
	        if($(".user_"+touid).length >0){
		       $(".user_"+touid).html('<a  href="javascript:;" class="u_f_follow" onclick="javascript:delattention('+touid+')">取消关注</a>');                                      
		    }
	    }else if( data.stat == 2){
			pop_login(); 
		}else if( data.stat == 3){
			layer.alert('亲爱的会员：您最多只能关注20人', 9);      
		}else if( data.stat == 4){
             // 临时会员，去完善资料
             binding_pop();
        }else if( data.stat == 5){
             layer.alert('您已关注此会员', 9);  
		}else if( data.stat == 6){
             layer.alert('您不能自己关注自己', 8);  
        }else{
		  layer.alert('关注失败', 8);  
		}
	});
}

// 添加关注 flag  delete 注销用户删除  ta 他的主页关注
function attention(touid,flag){
	var objHml = $(".user_"+touid).html();
	var flg = checCookiekLogin();
    if ( flg == false){
	    $(".user_"+touid).html(objHml);	
           pop_login();
           return;

    }
    $(".user_"+touid).html("<img src='http://s0.dwnews.net/images/club/ajax-loader.gif' />");
    var url = CLUB_HOST+"/index.php?r=user/addattention&touid="+touid+"&callback=?";  
	jQuery.getJSON(url, function(data){  
	$(".user_"+touid).html(objHml);	
	if( data.post == 'success' && flag != 'ta'){
			$(".user_"+touid).html('<a href="javascript:;" class="u_f_follow" onclick="javascript:delattention('+touid+')">取消关注</a>');                                      
		    if($("#user_"+touid).length >0){
		       $("#user_"+touid).html('<a href="javascript:;"  class="u_yjguanz" onclick="javascript:delattention('+touid+')">已关注</a>');                                      
		    }
		}else if( data.stat == 2){
			pop_login(); 
		}else if(data.post == 'success' && flag == 'ta'){
			$("#user_"+touid).html('<a class="u_yjguanz"  href="javascript:delattention('+touid+',\'ta\')">已关注</a>');                                      
		    if($(".user_"+touid).length >0){
		       $(".user_"+touid).html('<a  href="javascript:;" class="u_f_follow" onclick="javascript:delattention('+touid+',\'ta\')">取消关注</a>');                                      
		    }
		}else if( data.stat == 3){
			layer.alert('亲爱的会员：您最多只能关注20人', 9);      
		}else if( data.stat == 4){
                      // 临时会员，去完善资料
                      binding_pop();
        }else if( data.stat == 5){
                     layer.alert('您已关注此会员', 9);  
		}else if( data.stat == 6){
                     layer.alert('您不能自己关注自己', 8);  
        }else{
		  layer.alert('关注失败', 8);  
		}
	});
}
function start_clearattention(touid){
     var objHml = $(".user_"+touid).html();
     var flg = checCookiekLogin();
     if ( flg == false){
           pop_login();
           return;

     }
     $("#start_"+touid).html("<div style='height:38px;text-align:center'><img src='http://s0.dwnews.net/images/club/ajax-loader.gif' /></div>");	
     var url =CLUB_HOST+ "/index.php?r=user/delattention&touid="+touid+"&callback=?"; 
	 jQuery.getJSON(url, function(data){  
        $("#start_"+touid).html(objHml);
        if( data.post == 'success'){ 
            $("#start_"+touid).html('<a href="javascript:;"  class="small_follow"  onclick="javascript:start_attention('+touid+')">关注</a>');                                      
            if($(".user_"+touid).length >0){
		       $(".user_"+touid).html('<a href="javascript:;"  class="comm_f_follow"  onclick="javascript:attention('+touid+')">关注</a>');                                      
		    }
        }else if( data.stat == 2){
			pop_login();
		}else{
			layer.alert('关注失败', 8);
		}
	});
        
}
// 取消关注 flag  delete 注销用户删除  ta 他的主页关注
function delattention(touid,flag){
 var objHml = $(".user_"+touid).html();
       var flg = checCookiekLogin();
        if ( flg == false){
           pop_login();
           return;

        }
        $(".user_"+touid).html("<img src='http://s0.dwnews.net/images/club/ajax-loader.gif' />");	
        var url =CLUB_HOST+ "/index.php?r=user/delattention&touid="+touid+"&callback=?"; 
	jQuery.getJSON(url, function(data){  
        $(".user_"+touid).html(objHml);
		if( data.post == 'success' && flag !='delete' && flag !='ta'){ 
			$(".user_"+touid).html('<a href="javascript:;"  class="comm_f_follow"  onclick="javascript:attention('+touid+')">关注</a>');                                      
		    if($("#user_"+touid).length >0){
		       $("#user_"+touid).html('<a href="javascript:;"  class="u_guanz"  onclick="javascript:attention('+touid+')">关注Ta</a>');                                      
		    }
		} else if( data.post == 'success' && flag == 'delete'){ 
                    $(".user_"+touid).parent().remove();
        } else if(data.post == 'success' && flag == 'ta'){
			$("#user_"+touid).html('<a  class="u_guanz" onclick="javascript:attention('+touid+',\'ta\')">关注Ta</a>');                                      
		    if($(".user_"+touid).length >0){
		       $(".user_"+touid).html('<a href="javascript:;"  class="comm_f_follow"  onclick="javascript:attention('+touid+',\'ta\')">关注</a>');                                      
		    }
		}else if( data.stat == 2){
			pop_login();
		}else{
			layer.alert('关注失败', 8);
		}
	});
}
// 邮箱验证
function is_email(value) {
    return preg_match("/^[0-9a-zA-Z]+(?:[\_\.\-][a-z0-9\-]+)*@[a-zA-Z0-9]+(?:[-.][a-zA-Z0-9]+)*\.[a-zA-Z]+$/i", value);
}
// 验证是否登陆
function checCookiekLogin(){
	var uid = $.cookie('uid');
	if (uid != "" && uid != null){
		return true;
	}else{
	    return false;
	}
}

/**
 * 左侧链接检测
 */
function openCheckLoginUrl(url){
  var flg = checCookiekLogin();
  if(flg == false){
        pop_login();
	return ;
  }
  //跳转地址
  location.href = url;
}

//修改用户头像
var editPic = function(){
  // 是否登录
    var flg = checCookiekLogin();
       if( flg == false ){
           pop_login();
          return;
       }
      javascript:Layer.ajaxLayer('/index.php?r=user/pic&callback=?','修改头像',false);
}
// 第三方登陆窗口
function open_win(url)
{
$.cookie("reloadUrl",location.href,{domain:dwnews.domain,path:dwnews.path});
window.location.href= dwnews.url+url;
//GL_WIN = window.open(url,"_blank","toolbar=yes, location=yes, directories=no, status=no, menubar=yes, scrollbars=yes, resizable=no, copyhistory=yes, width=800, height=800")
}
// 跳过
function closeWindow(){
   window.location.href=$.cookie("reloadUrl");
   $.cookie("reloadUrl",null);
}

// 统一登录弹出窗口
function pop_login(){
 Layer.ajaxLayer(CLUB_HOST+'/index.php?r=login/poplogin&callback=?','登录',true);                 
}

// 注册弹出层
function pop_reg()
{ 
   Layer.ajaxLayer(CLUB_HOST+'/index.php?r=login/regindex&callback=?','用户注册',true);
    //加载验证码
    setTimeout(function(){registerService.getCode();},1000);
    Layer.loadJs("http://s0.dwnews.net/js/common/dwnews.registerService.js");
    setTimeout(function(){
       Layer.loadJs("http://s0.dwnews.net/js/common/dwnews.verification.js");
    },1000);
}

//统一登录成功html样式
function showLoginHtml(username){
	 $("a.login").hide();
         $("a.reg").hide();
        var susMessage = "<div class=\"dw_welcome fl\"><span>欢迎您，</span><a class=\"dw_user_name\" href=\"#\">"+username+"</a></div>";
	$("div.dw_welcome").remove();
        $("div.right_top").prepend(susMessage);
        LoginLayer.loginHide();	

 };
//关闭弹出层
//关闭登录框
var close_login = function(){ 
$("a.box_close").click();
}
// 完善资料弹出层
function binding_pop(){
Layer.ajaxLayer(CLUB_HOST+'/index.php?r=user/bindingpop&callback=?','完善资料,成为网站会员,享有会员权利',true);
}
/** facebook 分享*/
function open_share_facebook( club_id ){
	 var url = 'http://www.facebook.com/sharer.php?u='+encodeURIComponent(window.location.href);
	 Layer.loadJs('http://s0.dwnews.net/js/common/share.js');
	 window.open(url,  '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600');
	 //pv.dwshare(0);//参数 d = 1为twitter/0为facebook
	 if(club_id != undefined){
	    jQuery.getJSON(CLUB_HOST+'/index.php?r=club/sharecount&club_id='+club_id+'&type=facebook&callback=?', function(data){  
	
	    });
	 }
     return false;
}
// twitter 分享
 function open_share_twitter( club_id,value) { 
	if( value == undefined){
       value = '多维网';
    }
    var url = 'https://twitter.com/share?url='+encodeURIComponent(window.location.href)+'&text='+encodeURIComponent(value);
    Layer.loadJs('share.js');
    window.open(url,  '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600');
    
    //pv.dwshare(1);//参数 d = 1为twitter/0为facebook
    if(club_id !=undefined){
	    jQuery.getJSON(CLUB_HOST+'/index.php?r=club/sharecount&club_id='+club_id+'&type=twitter&callback=?', function(data){  
	
	    });
    }
    return false;
 }

// 禁言弹出框
function shutup(type){
  layer.alert('此用户被禁言或文章被冻结不准许访问', 8);
} 
function resetLeftH(){
		var rh = $("div.user_right").height();
		var lh = $("div.user_left").height();
		if(rh > lh){
			lh = rh - 101;
		}
		lh = lh+"px";
		$("div.user_left").css({"height":lh});
	};
