var MobileCheck = function(){

	var MOBILE = "mobile";
	var WEB = "web";
	var curURL = window.location.href;
	var navli = new Array("taiwan","hongkong","global","opinion","economics","military","history","culture","entertainments","china");

	var versions = function(){ 
		var u = navigator.userAgent, app = navigator.appVersion; 
		return {
			mobile: !!u.match(/AppleWebKit.*Mobile.*/) && !u.match(/iPad|Touch/) && !!document.URL.match(/\/dwnews\.com|www|taiwan|hongkong|global|opinion|economics|military|history|culture|entertainments|china/)
		};
	};

	var getChannel = function() {
		for(var i=0;i<navli.length;i++){
			if(curURL.indexOf("/" + navli[i]) > -1){
				return navli[i];
			}
		}
	};		

	var setCookie = function(name,value){
		var Days = 1; 
		var exp  = new Date();
		exp.setTime(exp.getTime() + Days*24*60*60*1000);
		document.cookie = name+"="+escape(value)+";path=/;domain=.dwnews.com;expires=" + exp.toGMTString();		
	};

	var getCookie = function(name){
		var arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));
		if(arr != null) return unescape(arr[2]); return null;
	};
	
	

	var gotoMobile = function(){
		toMobile();
		/*在多维mdw_login.html页面执行，进入最终选择页面*/
	};

	
	var toMobile = function(){		
		var dwHost = window.location.hostname;
		var channel = getChannel();
		if(!channel){
			window.location.href="http://m.dwnews.com/";			
		}
		else {
			var curl = curURL;
			window.location.href = curl.replace(dwHost, "m.dwnews.com/" + channel);
		}		
	};
	
	return {
		 init : function () {			
			var isMobile = versions().mobile;
			var mark = getCookie('viewterminal');			
			if(isMobile && (!mark || mark == MOBILE)){
				toMobile();
			}
		 }	
	}

}(); 
MobileCheck.init();

/*多维mdw_login.html页面,及移动版页面运行*/