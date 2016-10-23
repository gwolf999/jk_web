/**
 * 定义统一配置文件
 * dwnews
 *
 */

//获取顶级域名
var getHostName = function(url) {
            var host = "null";
            if (typeof url == "undefined"
                    || null == url)
                url = window.location.href;
            var regex = /.*\:\/\/([^\/|:]*).*/;
            var match = url.match(regex);
            if (typeof match != "undefined"
                    && null != match) {
                host = match[1];
            }
            if (typeof host != "undefined"
                    && null != host) {
                var strAry = host.split(".");
                if (strAry.length > 1) {
                    host = strAry[strAry.length - 2] + "." + strAry[strAry.length - 1];
                }
            }
            return host;
};

var domain = getHostName();
//临时更改配置域名
//var domain = 'dwnews.net';
var dwnews = {
    domain : domain,
    path : '/',
    url : 'http://blog.'+ domain,
    code_url : 'http://code.'+ domain,
    passport_url : "http://passport."+ domain
};
