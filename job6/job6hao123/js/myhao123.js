      //检查web Storage存储情况
    function checkWebStorage() {
        if (typeof(Storage) !== "undefined") {
            console.log('web storage username=' + localStorage.username);
            changeColor(localStorage.username);

        } else {
            alert("对不起，您的浏览器不支持 web 存储");
        }
    }


    //按键绑定事件程序
    function register_key() {
        document.getElementById("color1").addEventListener('click', function() {
            changeColor('color1');
        });
        document.getElementById("color2").addEventListener('click', function() {
            changeColor('color2'); //更改权威推荐栏目
        });
        document.getElementById("color3").addEventListener('click', function() {
            changeColor('color3');
        });
    }
    //修改背景颜色及字体颜色
    function changeColor(x) {
        var y = document.getElementById(x).currentStyle.backgroundColor;
        console.log('x=' + x);
        console.log('y=' + y);
        document.getElementById("govsite-inner").style.backgroundColor = y;
        if (x == 'color1') {
            //  document.getElementById("div1").style.color = "blue";
            var a = document.querySelectorAll(".govsite-link");
            // localStorage.username = 'color2';
            for (var i = a.length - 1; i >= 0; i--) {
                a[i].style.color = "#92925C";
            }

        } else if (x == 'color2') {
            // 用法http://javascript.ruanyifeng.com/dom/document.html#toc25
            // document.getElementById("govsite-inner").style.color = "#FFFFFF";
            // 找到多个元素但是只能返回第一个
            // document.querySelector('.govsite-link').style.color = "#FFFFFF";
            // 这里取得值是一个数组，需要循环分别赋值
            var a = document.querySelectorAll(".govsite-link");
            // localStorage.username = 'color2';
            for (var i = a.length - 1; i >= 0; i--) {
                a[i].style.color = "#FFFFFF";
            }


        } else {
            var a = document.querySelectorAll(".govsite-link");
            for (var i = a.length - 1; i >= 0; i--) {
                a[i].style.color = "#333";
            }
        }
        // 存储webstorage的值
        localStorage.username = x;
        //  console.log('web storage=' + localStorage.username);
    }
    // javascript的style属性只能获取内联样式，对于外部样式和嵌入式样式需要用currentStyle属性。但是，currentStyle在FIrefox和Chrome下不支持，需要使用如下兼容性代码
    HTMLElement.prototype.__defineGetter__("currentStyle", function() {
        return this.ownerDocument.defaultView.getComputedStyle(this, null);
    });


    //绑定事件的兼容IE函数
    function addEventHandler(oTarget, sEventType, fnHandler) {
        if (oTarget.addEventListener) {
            oTarget.addEventListener(sEventType, fnHandler, false);
        } else if (oTarget.attachEvent) {
            oTarget.attachEvent("on" + sEventType, fnHandler);
        } else {
            oTarget["on" + sEventType] = fnHandler;
        }
    };