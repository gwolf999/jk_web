/**
	ClassName:社会化帐号分享处理
	Author:luoming@caixun.com
**/
var curl = window.location.href;
var fill=function(){
	return{
	   fillHeight:function(l,c,r){
		   var cH=0;
		   if(curl.indexOf('post-')>-1){
				cH=$(".dwnews_wypl_comment").height();
				cH = cH+100;
			}else{
				cH=$(c).height();
			}
			var aH= $(r).height()-$(l).height();
			if(aH>0){
				var h=cH + aH;
				$(c).css("height",h+"px");
			}
		},
		appendHeight:function(l,c,r){
			var cH=$(".dwnews_wypl_comment").height();
			cH=cH+100;
			$(c).css("height",cH+"px");
		}
	};
}();
(function($) {
    function zshare() {
        function getParamsOfShareWindow(e, t) {
            return ["toolbar=0,status=0,resizable=1,width=" + e + ",height=" + t + ",left=", (screen.width - e) / 2, ",top=", (screen.height - t) / 2].join("")
        }
        var links = encodeURIComponent(document.location),
        titles,
        metas = document.getElementsByTagName("meta"),
        contents = "",
        images = "";
        for (var x = 0,y = metas.length; x < y; x++) {
            if (metas[x].name.toLowerCase() == "description") {
                contents = metas[x].content;
                break;
            }
        }
        var someimg = $("div.viewcot").find("img")[0];
        if (typeof someimg != "undefined") {
            images = encodeURIComponent(someimg.src)
        }
		var windowName = "点击分享此文章";
		var param = getParamsOfShareWindow(500,500);
		function share(t){
			switch(t){
				case "weibo":
					var wb_appkey = "",
						titles = document.title,
						wb_language	= "zh_cn";
					var f='http://service.weibo.com/share/share.php?',
					u=window.location.href,
					p=['url=',u,'&title=',titles,'&description=',contents,'&appkey=',wb_appkey,'&pic=',images,'&language=',wb_language,'&source=','DWNEWS.COM'].join('');
					var postUrl = [f,p].join('');
					window.open(postUrl, windowName, param);
					$(".dw_weibo").removeClass("dw_weibo_on").addClass("dw_weibo");
				break;
				case "google":
					var postUrl = "https://plus.google.com/share?url=" + links + "&image=" + images + "&content=" + '"' + contents + '"';
					window.open(postUrl, windowName, param);
					$(".dw_g").removeClass("dw_g_on").addClass("dw_g");
				break;
				case "wechat":
					if(typeof(Data) != "undefined" && curl.indexOf('photo')>-1){
						minbarLayer.load("扫描微信二维码","#tCode",function(){
							var url = window.location.href;
							var preUrl = url.substr(0,url.lastIndexOf("/")+1);
							$("div.article-qr").find("img").attr("src",preUrl+ikey+".png");
							$(".layer-box").css({"position":"absolute","width":"280px","height":"340px","left": (screen.width - 280 ) / 2,"top":(($(window).height() - 340) / 2)});
						});
					}else if(curl.indexOf('http://blog.dwnews.com')>-1){
						minbarLayer.load("扫描微信二维码","#tCode",function(){
							$("div.article-qr").find("img").attr("src","http://blog.dwnews.com/index.php?r=club/weixin&id="+bid);
							$(".layer-box").css({"position":"fixed","width":"280px","height":"340px","left": (screen.width - 280 ) / 2,"top":(($(window).height() - 340) / 2)});
						});
					}else{
						barLayer.load("扫描微信二维码","#tCode",function(){
							var url = window.location.href;
							var preUrl = url.substr(0,url.lastIndexOf("/")+1);
							$("div.article-qr").find("img").attr("src",preUrl+ikey+".png");
							$(".layer-box").css({"position":"fixed","width":"280px","height":"340px","left": (screen.width - 280 ) / 2,"top":(($(window).height() - 340) / 2)});
						});
					}
				break;
				case "facebook":
					var postUrl = "https://www.facebook.com/sharer/sharer.php?u=" + links + "&t=" + titles;
					window.open(postUrl, windowName, param);
				break;
				case "twitter":
					var postUrl = "http://twitter.com/share?url=" + links + "&text=" + titles + ";" + "&status=" + contents;
					window.open(postUrl, windowName, param);
				break;
			}
		}
		var d =new Array(),p=new Object();
		p.dom=$(".dw_g");
		p.name = "google";
		d.push(p);
		var p2=new Object();
		p2.dom=$(".dw_weibo");
		p2.name = "weibo";
		d.push(p2);
		var p3=new Object();
		p3.dom=$(".z_wechat");
		p3.name = "wechat";
		d.push(p3);
        $.each(d,function() {
            var s=this;
            $(s.dom).live('click',function() {
                share(s.name);
            })
        });
    }
    zshare();
	var dshareMore = function(){
		var isHide = true;
		var time = null;
		var clearList = function(d){
			time = setInterval(function(){
				$(d).slideUp("normal");
			},4000);
		};
		return{
			init : function(dmore,list){
				$(dmore).click(function(){
					$(list).slideToggle("normal");
				});
				$(dmore).mouseover(function(){
					isHide = false;
					clearInterval(time);
				});
				$(dmore).mouseout(function(){
					isHide = true;
					clearList(list);
				});
				$(list).mouseover(function(){
					isHide = false;
					clearInterval(time);
				});
				$(list).mouseout(function(){
					isHide = true;
					clearList(list);
				});
			}
		};
	}();
	$(document).ready(function(){
		if(curl.indexOf('photo')<0){
			var bh = $("div.viewcot").height()+$("div.viewcot").offset().top;
			var wh = $(window).height();
			if(bh<wh){
				if(curl.indexOf('http://blog.dwnews.com')>-1){
					$("div.bottom_link").hide();
				}else{
					$("div.zanfbw").eq(1).hide();
				}
			}
		}
		if((typeof(maxpage) != "undefined" && maxpage == 1)||curl.indexOf('post-')>-1){
			$(window).load(function(){
				fill.fillHeight(".news_block",".dw_comment",".floatDiv");
			});
		}
		if((typeof(maxpage) != "undefined" && maxpage == 1)){
			window.onscroll = function(){
				fill.fillHeight(".news_block",".dw_comment",".floatDiv");
			};
		}
		if(curl.indexOf('http://blog.dwnews.com')>-1){
			dshareMore.init(".c_gnmore",".gdgn");
		}
	});
})(jQuery)