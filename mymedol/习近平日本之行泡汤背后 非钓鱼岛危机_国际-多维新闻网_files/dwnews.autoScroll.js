var dwRightAutoScroll = function(floatDiv, floatLeftDiv, floatBodyDiv) {
	//floatDiv可移动物体
	//floatLeftDiv可移动物体的左侧物体
	//floatBodyDiv可包含移动物体和移动物体的左侧物体的物体
	
	//屏幕高度
	var windowHeight = $(window).height();
	var navHeight = $(".nav_fixed").height();
	floatBodyDiv.css({
          'position' : 'relative'
    });	
/* 注掉悬停广告效果；
$(window).scroll(function() {

		var topDivDistance = floatBodyDiv.offset().top;
		var bottomDivDistance = floatBodyDiv.offset().top+floatBodyDiv.height();
		var floatDivHeight = floatDiv.height();
		var spaceHeight = floatBodyDiv.height() - floatDiv.height();
		var currentPos = $(window).scrollTop();
		floatDiv.css({
			'position' : 'absolute',
			'top' : currentPos < topDivDistance + floatDivHeight - windowHeight ? 0 : currentPos > bottomDivDistance - windowHeight ? spaceHeight - navHeight : (spaceHeight - (bottomDivDistance - currentPos) + windowHeight),
			//'left' : floatLeftDiv.outerWidth(true)
			'right' : 15//floatLeftDiv.outerWidth(true)
		});
		$("#show0").html("<p>currentPos:" + currentPos
		+ "<p>上外:" + (topDivDistance) 
		+ "<p><font color=red>上外条件</font>:" + (currentPos < (topDivDistance + floatDivHeight - windowHeight)) 
		+ "<br><p>下外:" + (bottomDivDistance - windowHeight) 
		+ "<p><font color=red>下外条件</font>:" + (currentPos > bottomDivDistance - windowHeight) 
		+ "<p>浮动中间区域:"+(topDivDistance + floatDivHeight - windowHeight)+" ~ "+(bottomDivDistance - windowHeight)
		+ "<p>浮动块相对顶端位置:" + (spaceHeight - (bottomDivDistance - currentPos) + windowHeight) 				+ "<br><br><p>上边距离:" + topDivDistance 
		+ "<p>下边距离:" + bottomDivDistance 
		+ "<p>浮动块高度:" + floatDivHeight 
		+ "<p>空白区域高度:" + spaceHeight 
		+ "<p>导航高度:" + navHeight);
	});*/
};

var floatDiv = $(".floatDiv");
var floatLeftDiv = $(".floatLeftDiv");
var floatBodyDiv = $(".floatBodyDiv");
if(floatDiv.attr('class')&&floatLeftDiv.attr('class')&&floatBodyDiv.attr('class')){
        dwRightAutoScroll(floatDiv, floatLeftDiv, floatBodyDiv);
}
