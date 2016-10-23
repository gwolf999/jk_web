/**
Class Name: 多维网页面统计
Author: luoming@caixun.com
**/
var dGa = function () {
	var getUrl = function() {
		var iikey = window.location.href;
		if(typeof(ikey) != "undefined"){
			var iikey = ikey;
			if(iikey.length<1){
				iikey = window.location.href;
				if(iikey.indexOf('big5') > -1){
					iikey = iikey.replace('big5'+'/','');
				}
			}
		}
		return iikey;
	};
	var loadJs = function(url){
		$.getScript(url,function(){
			var host = window.location.host;
			$("div.like_unlike").length > 0 ? (function(){
				$("div.like_unlike").find("a.like").html("<span>喜欢<em>"+user_preferences.like+"</em></span>");
				$("div.like_unlike").find("a.unlike").html("<span>不喜欢<em>"+user_preferences.dislike+"</em></span>");
			}()) : "";
		}); 
	};
	var digg = function(){
		var iiKey = getUrl();
		var index = iiKey.lastIndexOf('?');
		if (index > 0){
			iiKey = iiKey.substr(0,index);
		}
		loadJs("http://g.dwnews.net:8081/p.js?ikey="+encodeURIComponent(iiKey));
	};
    return {
        init:function(){
			if(typeof(maxpage) != "undefined"){
				digg();
			}
        }
    };
}();
$(function($) {
  dGa.init();
});
/*ga*/
var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-12118652-1']);
_gaq.push(['_setDomainName', 'dwnews.com']);
_gaq.push(['_trackPageview']);
(function() {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://' : 'http://') + 'stats.g.doubleclick.net/dc.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();
//<!-- Quantcast Tag -->
var _qevents = _qevents || [];
(function() {
var elem = document.createElement('script');
elem.src = (document.location.protocol == "https:" ? "https://secure" : "http://edge") + ".quantserve.com/quant.js";
elem.async = true;
elem.type = "text/javascript";
var scpt = document.getElementsByTagName('script')[0];
scpt.parentNode.insertBefore(elem, scpt);
})();
_qevents.push({
qacct:"p-35qVZ8ebAOBeU"
});
document.write('<noscript><div style="display:none;"><img src="//pixel.quantserve.com/pixel/p-35qVZ8ebAOBeU.gif" border="0" height="1" width="1" alt="Quantcast"/></div></noscript>');
//<!-- End Quantcast tag -->