/*!
 * 喜欢不喜欢效果
 * Date: 2014-0619
 * tonghui
 */
 
var uuid = $.cookie('uuid');
function likes(){
	var url = 'http://blog.dwnews.com/index.php?r=api/like&uuid='+uuid+'&ikey='+ikey+'&callback=?';
	jQuery.getJSON(url, function(data){
       if( data.post == 'success'){
		      pv.likePv(1);
		       $(".add").attr('style','top:-35px;left:35px;z-index:999;display:none');
		       $(".add").animate({
				   opacity: 'show'
				 }, 400).animate({
				   opacity: 'hide'
				 }, 600);
				var likeObj = $(".like").children("span").children("em");
                likeNum = likeObj.text();
                likeObj.text(++likeNum);
		}else if(data.data == 2){
		    layer.alert('参数错误',8);
		}else if(data.data == 1){
		    layer.alert('您已参与过',8);
		}
	});
}
// 不喜欢
function dislikes(){
	var url = 'http://blog.dwnews.com/index.php?r=api/dislike&uuid='+uuid+'&ikey='+ikey+'&callback=?';
	jQuery.getJSON(url, function(data){
       if( data.post == 'success'){
		     pv.likePv(0);
		    $(".add").attr('style','top:-35px;left:180px;z-index:999;display:none');
		    $(".add").animate({opacity:'show'}, 400).animate({opacity:'hide'}, 600);
			var unlikeObj = $(".unlike").children("span").children("em");
            unlikeNum = unlikeObj.text();
            unlikeObj.text(++unlikeNum);
		}else if(data.data == 2){
		    layer.alert('参数错误',8);
		}else if(data.data == 1){
		    layer.alert('您已参与过',8);
		}
	});
}
//喜欢 不喜欢 数据获取
function getLikeCount(){
	var url = 'http://blog.dwnews.com/index.php?r=api/list&ikey='+ikey+'&callback=?';
	jQuery.getJSON(url, function(data){
		if( data.data == 2){
			layer.alert('参数错误',8);
		}else{
		    var unlikeObj = $(".unlike").children("span").children("em");
            unlikeObj.text(data[ikey].dislikes);
            var likeObj = $(".like").children("span").children("em");
            likeObj.text(data[ikey].likes);
		}
	});
}
// 自动获取喜欢不喜欢数并页面赋值
//getLikeCount();
// tonghuiend
 /** facebook 分享*/
function cms_share_facebook(){
	var url = 'http://www.facebook.com/sharer.php?u='+encodeURIComponent(window.location.href);
	loadJs('http://s0.dwnews.net/js/common/share.js');
	window.open(url,'','menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600');
    // 分享数
    jQuery.getJSON('http://blog.dwnews.com/index.php?r=api/share&ikey='+ikey+'&callback=?', function(data){});
     pv.dwshare(0);//参数 d = 1为twitter/0为facebook
    return false;
}
// twitter 分享
 function cms_share_twitter(value) { 
	if( value == undefined){
	    value = '多维网';
	}
    var url = 'https://twitter.com/share?url='+encodeURIComponent(window.location.href)+'&text='+encodeURIComponent(value);
    loadJs('http://s0.dwnews.net/js/common/share.js');
    window.open(url,'','menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600');
	// 分享数
	jQuery.getJSON('http://blog.dwnews.com/index.php?r=api/share&ikey='+ikey+'&callback=?', function(data){});
	 pv.dwshare(1);//参数 d = 1为twitter/0为facebook
    return false;
}
function loadJs(url){
    $.ajax({type: "GET",url: url,dataType: "script"}); 
}