function getId() {
    var id = $("a#quick").closest('div.commentBox').attr('id');
    if(id == "" || id == undefined){
        id = $("a#quick").closest('div.inner').parent().attr('id');
    }
    return id;
}

var ipFlg = true;
function checkIp(){
 // 检测ip是否被禁
   var url = dwnews.url + "/index.php?r=user/checkIP&callback=?"; 
   $.getJSON(url, function(data){ 
      	if( data.stat == 1){
      	ipFlg = false;
      	}
   }); 
}
//页面打开自动 检测ip是否被禁
checkIp();
function parseDom(arg) {
	var objE = document.createElement("div");
	objE.innerHTML = arg;
	return objE.childNodes;
};
//显示隐藏评论内容
function showClubComment(style,e){
   $this = $(e);
   var noneComment = $this.attr("data-none-comment");
   var showComment = $this.attr("data-show-comment");
   var commentObj =  $this.prev();
   if(style == "show"){
	commentObj.html(showComment);
	$this.attr("onclick","showClubComment('none',this)");
        $this.attr("class", "neir-more-up");
	$this.text("收起");
   } else {
	commentObj.html(noneComment);
	$this.attr("onclick","showClubComment('show',this)");
        $this.attr("class", "neir-more");
	$this.text("展开");
   }
}
function insertApHtml(htmlboj){
	var list = document.getElementById("newslist");
	var new_dom = parseDom(htmlboj);
	list.insertBefore(new_dom[0],list.firstChild);
}
var ucUploadUrl = "";
function getUserPicLoad(){
    var uid = $.cookie("uid");
    if(uid != "" && uid != null){
        $.getJSON(dwnews.url + "/index.php?r=user/getUserUrl&callback=?",function(data){
        	ucUploadUrl = data.img;
        });
    } else {
    	ucUploadUrl = "http://u.dwnews.com/images/noavatar_small.gif";
    }
}
getUserPicLoad();
//获取用户头像
function getUserPic(){
    return ucUploadUrl;
}
var userDomain = "";
function getUserDomainLoad(){
    var uid = $.cookie("uid");
    if(uid != "" && uid != null){
        $.getJSON(dwnews.url + "/index.php?r=user/getUserDomain&callback=?",function(data){
        	userDomain = data.domain;
        });
    } else {
    	userDomain = "javascript:;";
    }
}
getUserDomainLoad();
function getUserDomain(){
	return userDomain;
	
}
var $$ = function(func){
    if (document.addEventListener) {
        window.addEventListener("load", func, false);
    }
    else if (document.attachEvent) {
        window.attachEvent("onload", func);
    }
}
$$(function(){
	//加载新闻登录框
	loadNewsForm();
})
var getClubPost = function(){
   return ;
}
//删除评论
function deleteComment(id){
	var articleid = $("#articleid_" + id).val();
	var commentid = $("#commentid_" + id).val();
	var tid = $("#id_" + id).val();
	var params = {
		data : {
			data : {
				'_id' : commentid,
				'id' : tid,
				'articleid' : articleid,
				'lord' : getClubPost()
			}
		}
	};
    layer.confirm('确认要删除？',function(index){
    	$.getJSON(dwnews.url + "/index.php?r=comment/remove&callback=?",params, function(data) {
    		if (data.code == 1) {
    			layer.msg("删除成功", 2, 9);
    			replaceDeleteComment(id);
    		} else {
    			layer.msg("删除失败", 2);
    		}
    	});
    });
}
//替换删除内容
function replaceDeleteComment(id){
    var delObj = $("#" + id);
    var delContent = getClubPost() ? "该内容已被楼主删除" : "该内容已被作者删除";
   	if(delObj.attr('class') == "commentBox"){
		delObj.children("div.content").html(delContent);
	} else {
		delObj.children('div.inner').children('div.body').children("div.content").html(delContent);
	}
}
function removeHTMLTag(comment) {
	comment = comment.replace(/<\/?[^>]*>/g, ''); // 去除HTML tag
	comment = comment.replace(/alert/ig, ''); // 去除HTML tag
	comment = comment.replace(/[ | ]*\n/g, '\n'); // 去除行尾空白
	//comment = comment.replace(/\n/g, '<br>'); // 去除行尾空白
	// comment = str.replace(/\n[\s| | ]*\r/g,'\n'); //去除多余空行
	comment = comment.replace(/&nbsp;/ig, '');// 去掉&nbsp;
	comment = comment.replace(/\n/g, '<br>');
	return $.trim(comment);
}
//顶操作
function Support(commentid,divid){ 
    //移除顶事件
    $("#support_show_"+divid).parent().removeAttr('href');
    $("#support_show_"+divid).parent().removeAttr('onclick');
    var comment = $("#support_show_"+divid).parent().text();
    var num = comment.match(/\d/g).join("");
    num = parseInt(num);
    $("#support_show_"+divid).parent().text('已赞[' + ++num + ']');
	if(commentid != ""){
		var url = dwnews.url + "/index.php?r=comment/support&commentid="+commentid+"&callback=?";  
		jQuery.getJSON(url, function(data){  
        // $("#support_show_"+divid).parent().text('已赞['+data.support+']'); 
        });
	} 
}
//获取当前昵称
var getName = function(){
    var username = $.cookie("username");
    if(username == "" || username == null){
        username = "多维网友";
    }
    return username;
};
//拼凑回复内容
var getCommentHtml = function(content, commentBox){
    //楼层关系
    if(commentBox == undefined){
        commentBox = "";
    }
    var randomNum = Math.ceil(Math.random() * (1000 - 1) + 1);
    var num = new Date().getTime()+randomNum;
    var html = new Array();
    html.push('<div id="'+num+'" class="reply">');
    html.push('<div class="inner"><span class="author"><span class="facebox"><span class="userFace">');
    html.push('<a href="'+getUserDomain()+'" ><img src="'+getUserPic()+'" alt="" width="100%"></a></span></span>');
    html.push('<span class="author_name"><a href="'+getUserDomain()+'" >'+getName()+'</a></span></span><span class="postTime">刚刚</span>');
    html.push('<div class="body">'+commentBox+'<div class="content" style="text-indent:35px;line-height:26px;word-wrap:break-word;">'+content+'</div></div>');
/*
    html.push('<ul class="operations"><li class="support"><a href="javascript:;" onclick="Support(\'\','+num+')" class="js-reply">赞<span id="support_show_'+num+'">[0]</span></a></li><li><a href="javascript:;" class="js-reply" onclick="quote('+num+');">回复</a></li></ul>');
*/
    html.push('<ul class="operations"><li class="support"><a href="javascript:;" onclick="Support(\'\','+num+')" class="js-reply">评论成功!</li></ul>');
    html.push('<div class="clearfix"></div></div></div>');
    return html.join("")
};
//异步请求同步第三方
var sync = false;  
var shareHtml = loginHtml= "";
//获取回复内容框
var getQuickHtml = function(type){
    var html = new Array();
    var sh_facebook = sh_twitter = false;
    if($.cookie("uid") != "" && $.cookie("uid") != null){
        if(document.domain != 'blog.' + dwnews.domain){
            loginHtml = '欢迎您：'+ $.cookie('username');
        } else {
			if(!sync) {
				$.getJSON(dwnews.url + '/index.php?r=user/getShare&callback=?',{'uid':$.cookie("uid")},function(data){
					if(data.sate == 1){
						var obj = eval(data.data);
						$.each(obj, function (n, value) {
							if( value == "facebook"){
								sh_facebook = true;
							} else if(value == "twitter") {
								sh_twitter = true;
							}
						});
					}
					shareHtml = '<a class="post-share fr" href="'+dwnews.url+'/index.php?r=user/share"  target="_blank">分享设置</a>';
					$("#quick").after(shareHtml);
					sync = true; //请求完成
					loginHtml += '<span class="fl">分享到：</span>';
					if(sh_facebook){
						loginHtml += '<label class="sh-facebook"><input type="checkbox" value="" class="check-btn" name="share_facebook" id="share_facebook" checked="true">facebook</label>';
					} else {
						loginHtml += '<label style="filter: alpha(opacity=50);-moz-opacity: 0.5;opacity: 0.5;" class="sh-facebook"><input type="checkbox" value="" class="check-btn" name="share_facebook" id="share_facebook" disabled="">facebook</label>';
					}
					if(sh_twitter){
						loginHtml += '<label class="sh-twitter"><input type="checkbox" value="" class="check-btn" name="share_twitter" id="share_twitter" checked="true">twitter</label>';
					} else {
						loginHtml += '<label style="filter: alpha(opacity=50);-moz-opacity: 0.5;opacity: 0.5;" class="sh-twitter"><input type="checkbox" value="" class="check-btn" name="share_facebook" id="share_twitter" disabled="">twitter</label>';
					}
					$(".dw-post-loginInfo").html(loginHtml);
				});
			}
        }
    } else {
        loginHtml ='<a href="javascript:pop_login();" class="post-login">登录</a><a href="javascript:;" class="post-reg">注册</a>';
    }
    html.push('<div id="quotePanel" ><form action="" method="get"><div class="comment-wrap comment-txt-wrap">');
    html.push('<div class="dw-textarea-wrapper"><textarea onkeydown="if(event.keyCode==13&amp;&amp;event.ctrlKey&&$.trim($(this).val())!=\'\') quickLogin(\'ajaxpost\',\''+type+'\')" name="message" id="quickPostBody" title="Ctrl+Enter快捷提交" placeholder="多维网"></textarea>');
    html.push('<div class="dw-post-toolbar"><a href="javascript:;" onclick="quickLogin(\'ajaxPost\',\''+type+'\')" class="comment-sub" id="quick">提交</a>' + shareHtml);
    html.push( '<div class="fl post-gongju loginInfo dw-post-loginInfo">'+loginHtml+'</div>'); 
    html.push('<div class="clear"></div></div></div></div></form></div>');          
    return html.join("")
};
/*
 * 新闻加载评论框
 *
*/
var loadNewsForm = function(objtarget){
    if(document.domain != 'blog.' + dwnews.domain){
        var checkLoginHtml = ";" 
        if($.cookie("uid") != "" && $.cookie("uid")  != null){
            checkLoginHtml = '欢迎您：'+ $.cookie('username');
        } else {
            checkLoginHtml = ' <a href="javascript:pop_login();" class="post-login">登录</a><a href="javascript:;" class="post-reg">注册</a> ';
        }
        $("div.post-gongju").html(checkLoginHtml);
        $(".dw-avatar").children("img").attr("src", getUserPic());
    }
}
//处理内容
var catchComment = function(html, type){
	var browser=navigator.appName;
    if(type == "news"){
        if(photoBar == "photo"){
			if(browser=="Microsoft Internet Explorer"){
				commentPlug.picMiniComment();
			}else{
				minbarLayer.appendComment(html);
			}
        } else {
			if(browser=="Microsoft Internet Explorer"){
				commentPlug.newsLeftBar();
			}else{
				barLayer.appendComment(html);
			}
            insertApHtml(html, type);
        }
        return true;
    }
    insertApHtml(html, type);
	if($("div.wypl_comment div.jspVerticalBar").length > 0){
		if(browser=="Microsoft Internet Explorer"){
			commentPlug.newsLeftBar();
		}else{
			barLayer.appendComment(html);
		}
	}
    $("html,body").animate({
        scrollTop:$(".line").offset().top
    },1000);
    return true; 
}
//移除回复内容框
var removeQuickHtml = function(){
    $("#quotePanel").remove();
};
$(function(){
    $("div.commentBox").live('mouseover',function(e){
		e.stopPropagation();
        $(this).children("div.tieOperations").css('visibility','');
    }); 
    $("div.commentBox").live('mouseout',function(e){
		e.stopPropagation();
		$(this).children("div.tieOperations").css('visibility','hidden');
    });
    var memory = "0123456789";
    quote = function(id,type){
        doTrue = function(){
            memory = id;
            var quotePanel = $("#quickLoginPanel").html();
            if($("#"+id).attr('class') != "commentBox"){
                $("#"+id).children("div.inner").children("div.clearfix").after(quotePanel);
            } else {
                $("#"+id).children("div.clearfix").after(quotePanel);
            }
        };
        doFalse = function(){
            return false;
        }
        findPanel = function(f){
            var len = $("#"+ f).find("#quotePanel").length;
            if(len>0){
                $("#"+ f).find("#quotePanel").remove(); 
                memory = "0123456789";
                return false;
            }else{
                return false;
            }
        };
        insert = function(){
            if(!findPanel(memory)){doTrue();}
        }
        //回复框
        quotePanel = function(id,type){
            removeQuickHtml();
            var quotePanel = getQuickHtml(type);
	        if($("#"+id).attr('class') != "commentBox"){
	            $("#"+id).children("div.inner").children("div.clearfix").after(quotePanel);
	        } else {
	            $("#"+id).children("div.clearfix").after(quotePanel);
	        }
        }
        quotePanel(id,type);
		//id == memory ? doFalse():insert();
    };
    tip = function(msg){
        messageBox('提示');
        var str="";
        str="<p style='line-height:60px;height:60px;'>"+msg+"</p>";
        $('#boxData').html(str);	
    }
    getUsername = function() {
        return $("#username").val();
    }
    getPassword = function() {
        return $("#password").val();
    }
    getContent = function() {
        return $.trim($("#quickPostBody").val());
    }
    getCaptcha = function() {
        return $('#captcha').val();
    }
    getAuthorid = function() {
        return $("#authorid").val(); 
    }
    getArticleid = function() {
        return $("#articleid").val();
    }
    getCommentids = function(id) {
        return $("#commentid_"+id).val();
    }
    getArticleids = function(id) {
        return $("#articleid_"+id).val();
    }
    getAuthorids = function() {
        var uid = $.cookie('uid');
        if(uid == "" || uid == null){
            uid = 9999999;
        }
        return uid; 
    }
    getTopids = function(id) {
        return $("#id_"+id).val();
    }
    getHasCaptcha = function() {
        return $('#captchaDiv').attr('captcha');
    }
    getUid = function(){
        return $("#uid").val();
    }
    getType = function(){
        return 'news';
    }
    getPostFaceBook = function(){
	var facebook = 0;
	if( $("#share_post_facebook").attr("checked") ){
	   facebook = 1;
	}
	return facebook;
    }
    getPostTwitter = function(){
	var twitter = 0;
	if( $("#share_post_twitter").attr("checked") ){
	   twitter = 1;
	}
	return twitter;
    }
    getFaceBook = function(){
	var facebook = 0;
	if( $("#share_facebook").attr("checked") ){
	   facebook = 1;
	}
	return facebook;
    }
    getTwitter = function(){
	var twitter = 0;
	if( $("#share_twitter").attr("checked") ){
	   twitter = 1;
	}
	return twitter;
    }
    quickLogin = function(method,type){
        post(method,type);
    }
    findHtml = function(htmlObj, type){
        htmlObj.find('.commentBox').each(function(i){
            var randomNum = Math.ceil(Math.random() * (1000 - 1) + 1);
            var num = new Date().getTime()+i+randomNum;
            $(this).attr('id',num);
            $(this).children('.tieOperations').children('ul').children('li:first').children('a').attr('onclick','quote('+num+',\''+type+'\')');
            $(this).children('.commentInfo').children('input[name="authorid"]').attr('id','authorid_'+num);
            $(this).children('.commentInfo').children('input[name="articleid"]').attr('id','articleid_'+num);
            $(this).children('.commentInfo').children('input[name="commentid"]').attr('id','commentid_'+num);
            $(this).children('.commentInfo').children('input[name="id"]').attr('id','id_'+num);
        });
    }
    //提交回复内容(ajax)
    postReplyComment = function(id,params,type){
        //发贴
    	$.ajax({
    		type : "post",
    		async:false,
    		url : dwnews.url + "/index.php?r=comment/post",
    		data : params,
    		dataType : "jsonp",
    		jsonp: "callback",
    		jsonpCallback:"success_jsonpCallback",
    		success : function(data){
    			if(data.post=='success'){
    			 	layer.msg('评论完成', 2, 9);
    	            var idNum = new Date().getTime()+data.id;
    	            //评论完成移除回复框
    	            removeQuickHtml();
    	            //获取当前回复div区块
    	            var htmlObj = $('#'+id).clone(true);
    	            var html = "";
    	            //获取div 下的class属性
    	            var revert = htmlObj.attr('class');
    	            if(revert != "commentBox"){	
    	                findHtml(htmlObj, type);
    	                var cloneCommentBoxObj = htmlObj.children('div.inner').children('div.body')
    	                var innerObj = htmlObj.children('div.inner');
    	                //获取div 下的id属性
    	                var revertId = htmlObj.attr('id');
    	                //图片url
    	                var author_src = innerObj.find('span.author').eq(0).find('.userFace a img').attr('src');
    	                //作者
    	                var author_name = innerObj.find('span.author').eq(0).find('.author_name a ').text();
                        //app手机标志
                        var app = "";
                        //var app = innerObj.find('span.author').eq(0).find('.mobile-img').prop("outerHTML");
                        //app = app == undefined ? '' : app;
    	                //来自区域
    	                var from_logon = innerObj.find('span.author').eq(0).find('.from-logon').text();
    	                //发表时间
    	                var postTime = innerObj.find('span.author').eq(0).next().text();
    	                //评论内容
    	                var author_conetnt = cloneCommentBoxObj.children('div.content').html();
    	                //回复评论楼层
    	                var floorCount = 1;
    	                floorCount = cloneCommentBoxObj.children('div.commentBox').children('div.commentInfo').find('span.author').eq(0).next().text();
    	                if( floorCount == ''){
					        floorCount = 0;
					    }
    	                //floorCount++;
    	                floorCount = parseInt(floorCount)+1;
    	                //移除原有评论内容
    	                cloneCommentBoxObj.children("div.content").remove();
                        //cloneCommentBoxObj.children(".neir-more").remove();
                        var moreObj = cloneCommentBoxObj.children(".neir-more");
                        var moreHtml = "";
                        if(moreObj.length > 0){;
                            moreHtml = moreObj.prop("outerHTML");
                            moreObj.remove();
                        }
						var styleClass = '';
						if(floorCount%2 == 0){
							styleClass = ' style="background-color: #EEEEEE;" ';
						}
    	                var arrayHtml = new Array();
    	                arrayHtml.push('<div id="'+idNum+'" class="commentBox"'+styleClass+'>');
    	                arrayHtml.push(cloneCommentBoxObj.html());
    	                arrayHtml.push('<div class="commentInfo">'+'<span class="author">'+author_name+from_logon+app+'</span>');
    	                arrayHtml.push('<input type="hidden" name="commentid" id="commentid_'+idNum + '" value="'+$("#commentid_"+id).val() +'"/>');
    	                arrayHtml.push('<input type="hidden" name="id" id="id_'+idNum + '" value="'+$("#id_"+id).val() +'"/>');
    	                arrayHtml.push('<span class="floorCount">'+floorCount+'楼'+'</span></div>');
    	                arrayHtml.push('<div class="content" style="text-indent:35px;line-height:26px;word-wrap:break-word;">'+author_conetnt+'</div>' + moreHtml);
    	                arrayHtml.push('<div class="tieOperations" style="display:block;visibility: hidden;">');
    	                arrayHtml.push('<ul class="operations"><li><a class="js-reply" onclick="quote(\''+idNum+'\',\''+type+'\');" href="javascript:;">回复</a></li></ul></div>');
    	                arrayHtml.push('<div class="clearfix"></div></div>');
    	                html = arrayHtml.join("");
    	                html = getCommentHtml(params.content, html);
    	            } else {
    	                htmlObj = $("<div></div>").append(htmlObj);
    	                findHtml(htmlObj, type);
    	                html = getCommentHtml(params.content,  htmlObj.html());
    	            }
                    catchComment(html, type);
    	        }else{
    	            if(data.post=='post_time'){
    	            	layer.msg(data.msg, 2);
    	                return false;
    	            }
    	            layer.msg('评论有问题', 2);
				}
    		},
    		error:function(){
    			layer.msg('评论有问题', 2);
    		}
    	});
    }
    post = function(method,e){
        var id = getId();
        var clubId = getClubId(); 
        var content = getContent();
        // 检测ip是否被禁
        if( ipFlg == false){
          layer.msg('IP被禁言', 2);
          return false;
        }else{
        if(method=='post'){
            if(clubLock == '1'){
            	layer.msg("文章已锁定 不允许评论!", 2);
                return false;
            }
            if( e == 'news'){
               // 左侧提交评论
               var content = $("#topComment_news").val();
            }else{
                var content = $("#topComment").val();
            }
            if($.trim(content) == ""){
            	layer.msg("请输入内容!", 2);
                return false;
            }
            content = removeHTMLTag(content);
            var le = $.trim(content).length;
            if(le > 1000 || le < 1){
            	layer.msg("评论限制(2-1000)个字符", 2);
            	return false;
            }
            var url = getUrl();
            var type = getType();
            var uid = getAuthorids();
            
            var appendHtml = getCommentHtml(content);
            var params = {
                doitem:"post", 
                content:content,
                type:type,
                author:uid,
                url:url,
                club_id:clubId,
				facebook:getPostFaceBook(),
				twitter:getPostTwitter()
            }
            // 检测用户是否禁言
            if($.cookie('uid') != "" && $.cookie('uid') != null){
            var url = dwnews.url + "/index.php?r=user/checkMember&callback=?"; 
            $.getJSON(url, function(data){ 
                if( data.stat == 2) {
                	layer.msg('用户已被禁言', 2);
                    return false;
                } else {
                    //发贴
                	$.ajax({
                		type : "post",
                		async:false,
                		url : dwnews.url + "/index.php?r=comment/post",
                		data : params,
                		dataType : "jsonp",
                		jsonp: "callback",
                		jsonpCallback:"success_jsonpCallback",
                		success : function(data){
                			if(data.post=='success'){
                				layer.msg('评论完成', 2, 9);
                                $("#topComment").val("");
                                $("#topComment_news").val("");
                                //追加内容
                                catchComment(appendHtml, e);
                                // 评论数统计
                                var url = 'http://blog.dwnews.com/index.php?r=api/comment&ikey='+ikey+'&callback=?';
								jQuery.getJSON(url, function(data){});
                            }else{
                                if(data.post=="post_time"){
									layer.msg(data.msg, 2);
									return false;
                                }
                                layer.msg('评论有问题', 2);
							}
                		},
                		error:function(){
                			layer.msg('评论有问题', 2);
                		}
                	});
                }
            });
 	   } else {
	 		// 匿名用户
	 		$.ajax({
	 			type : "post",
	 			async:false,
	 			url : dwnews.url + "/index.php?r=comment/post",
	 			data : params,
	 			dataType : "jsonp",
	 			jsonp: "callback",
	 			jsonpCallback:"success_jsonpCallback",
	 			success : function(data){
	 				if(data.post=='success'){
	 					layer.msg('评论完成', 2, 9);
                        $("#topComment").val("");
                        $("#topComment_news").val("");   
	                    // 评论数统计
                        var url = 'http://blog.dwnews.com/index.php?r=api/comment&ikey='+ikey+'&callback=?';
						jQuery.getJSON(url, function(data){});
                        //追加内容
                        catchComment(appendHtml, e);
	                }else{
						if(data.post=="post_time"){
							layer.msg(data.msg, 2);
							return false;
						}
						layer.msg('评论有问题', 2);
	                }
	 			},
	 			error:function(){
	 				layer.msg('评论有问题', 2);
	 			}
	 		});
	      }
        }else{
            if(clubLock == '1'){
            	layer.msg("问章已锁定 不允许评论!", 2);
                return false;
            }
            if(content == ""){
            	layer.msg("请输入内容", 2);
                return false;
            }
            var content = removeHTMLTag(content);
            var le = $.trim(content).length;
            if(le > 1000 || le < 1){
            	layer.msg("评论限制(2-1000)个字符", 2);
            	return false;
            }
            
            var authorid = getAuthorids();
            var commentid = getCommentids(id);
            var articleid = getArticleids(id);
            var topid = getTopids(id);
            var params = {
                doitem:"ajaxdo",
                content:content,
                type:getType(),
                author:authorid,
                url:getUrl(),
                topid:topid,
                commentid:commentid,
                club_id:clubId,
				facebook:getFaceBook(),
				twitter:getTwitter()
            }
            //匿名用户不用检查用户状态
            if($.cookie('uid') == "" || $.cookie('uid') == null){
                //提交回复内容
                postReplyComment(id, params,e);
            } else {
                // 检测用户是否禁言
                var url = dwnews.url + "/index.php?r=user/checkMember&callback=?"; 
                $.getJSON(url, function(data){ 
                    if( data.stat == 2) {
                    	layer.msg('用户已被禁言', 2);
                        return false;
                    } else {
                        //提交回复内容
                        postReplyComment(id, params,e);
                    }
                });
            }
        }
        } //else end 判断ip
    }
});