!function(e){"function"==typeof define&&define.amd?define(["jquery"],e):e("object"==typeof exports?require("jquery"):jQuery)}(function(e){function n(e){return u.raw?e:encodeURIComponent(e)}function o(e){return u.raw?e:decodeURIComponent(e)}function i(e){return n(u.json?JSON.stringify(e):String(e))}function t(e){0===e.indexOf('"')&&(e=e.slice(1,-1).replace(/\\"/g,'"').replace(/\\\\/g,"\\"));try{return e=decodeURIComponent(e.replace(c," ")),u.json?JSON.parse(e):e}catch(n){}}function r(n,o){var i=u.raw?n:t(n);return e.isFunction(o)?o(i):i}var c=/\+/g,u=e.cookie=function(t,c,a){if(arguments.length>1&&!e.isFunction(c)){if(a=e.extend({},u.defaults,a),"number"==typeof a.expires){var s=a.expires,d=a.expires=new Date;d.setMilliseconds(d.getMilliseconds()+864e5*s)}return document.cookie=[n(t),"=",i(c),a.expires?"; expires="+a.expires:"",a.path?"; path="+a.path:"",a.domain?"; domain="+a.domain:"",a.secure?"; secure":""].join("")}for(var f=t?void 0:{},p=document.cookie?document.cookie.split("; "):[],l=0,m=p.length;m>l;l++){var h=p[l].split("="),x=o(h.shift()),g=h.join("=");if(t&&t===x){f=r(g,c);break}t||void 0===(g=r(g))||(f[x]=g)}return f};u.defaults={},e.removeCookie=function(n,o){return void 0===e.cookie(n)?!1:(e.cookie(n,"",e.extend({},o,{expires:-1})),!e.cookie(n))}}),function(e){function n(e){var n=new RegExp("(^|&)"+e+"=([^&]*)(&|$)"),o=window.location.search.substr(1).match(n);return null!=o?unescape(o[2]):null}function o(n,o){e.cookie(n,o,{path:"/",domain:r})}var i={ecd:"code",hmsr:"channel"},t=window.location.host,r=t.substring(t.indexOf("."),t.length);for(var c in i)n(c)&&o(i[c],n(c))}($);