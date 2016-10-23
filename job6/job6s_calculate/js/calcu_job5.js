 // 还有运算后一下后再连续++等bug及有理数无理数显示未处理
 cal_num = new Array('', '', '');
 // 声明一个全局变量的二维数组，其实可以不用
 /* cal_num[0]=new Array();
  cal_num[1]='';
  cal_num[2]=new Array();*/
 // 运算处理函数，使用修改全局变量的方法
 function char_pro(y) {
     switch (y) {
         case '.':
         case 0:
         case 1:
         case 2:
         case 3:
         case 4:
         case 5:
         case 6:
         case 7:
         case 8:
         case 9:

             if (cal_num[1].length == 0) { //首次输入，没有运算符

                 if (cal_num[0].indexOf('.') == -1 || y != '.') { //这个判断条件防止出现重复输入 .
                     cal_num[0] = cal_num[0] + y;
                     cal_num[0] = check_number(cal_num[0]);
                     console.log("line 26 首次输入，判断小数点");
                 };
                 //console.log("line 28 首次输入，判断完成小数点后，不加。原地赋值");
                 cal_num[0] = check_number(cal_num[0]);
                 //console.log('line32 check_number(cal_num[0])=' + cal_num[0]);
                 document.getElementById("cal_span").innerHTML = check_len(cal_num[0]);

             } else if (cal_num[1] == 'L') { //20160920 add 表示前面已经运算过一次了。
                 //把第一个参数及L标志清除
                 //  cal_num[0] = '';
                 cal_num[1] = '';

                 if (cal_num[2].indexOf('.') == -1 || y != '.') { //这个判断条件防止出现重复输入 .
                     cal_num[2] = cal_num[0] + y;
                     cal_num[2] = check_number(cal_num[0]);
                     console.log("line 26 首次输入，判断小数点");
                 };

                 document.getElementById("cal_span").innerHTML = check_len(cal_num[0]);
                 //document.getElementById("cal_span").innerHTML = cal_num[0];//输入不需要校验小数点尾巴上的0，但是运算结果后会出现0，这里也要带参数
             } else { //输入第二个参数
                 if (cal_num[2].indexOf('.') == -1 || y != '.') { //这个判断条件防止出现重复输入 .
                     cal_num[2] = cal_num[2] + y;
                     cal_num[0] = check_number(cal_num[0]);
                     //console.log("line 33 输入第二个参数，判断小数点");
                 }
                 console.log("line 35 输入第二个参数，判断完成小数点后，不加。原地赋值");
                 document.getElementById("cal_span").innerHTML = check_len(check_number(cal_num[2]));
             };
             break;
         case '+':
             contiue_cal('+');
             break;
         case '-':
             contiue_cal('-');
             break;
         case 'X':
             contiue_cal('X');
             break;
         case '/':
             contiue_cal('/');
             break;
         case 'C':
             tozero();
             break;
         default: //  等号情况 Infinity
             process_equ();
             break;
     };
 };

 //检查输入0防止出现整数第一位连续出现000，及输出结果尾数为0情况，不判断是否输入小数点情况
 function check_number(x, y) { //第二个参数y==‘r'表示是输入结果检查
     //  if(x.length-x.lastIndexOf('.')==1){//通过位置长度确定最后一位.在这里效果与indexOf一样
     //      //为了精确区分整数后带有小数，例如222.  情况，以便与应用中计算结果小数点后有0 区分开，这样就不能转换为0，原样返回
     //      return x;
     //  }
     // return String(x-0);//转进来字符串转化为数字后再转化为字符回去
     if (y == 'r') {
         return String(x - 0);
     }
     //else if(x.lastIndexOf('0')==0 && x.lastIndexOf('.')==-1){//如果首位是0，直接转化后输出
     else if (x.indexOf('0') == 0 && x.indexOf('.') == -1) { //如果是首个字母 0的整数
         console.log('line130');
         return String(x - 0);
     } else if (x.indexOf('0') == 0 && x.length - x.lastIndexOf('.') == 1) { //00030. 转换前面的0后，后面要补充上去'.'
         return String(x - 0) + '.';
     } else { //针对可以输入 10.700000的情况
         console.log('line136');
         return x;
     }

 }

 //把数组及显示屏蔽全部归零，等同于按了C键
 function tozero() {
     cal_num[0] = '';
     cal_num[1] = '';
     cal_num[2] = '';
     console.log('cal_numC:' + cal_num[0]);
     document.getElementById("cal_span").innerHTML = cal_num[0];
 }

 //持续运算函数
 function contiue_cal(y) {
     if (cal_num[2]) {
         //console.log("line60 cal_num[2]=" + cal_num[2]);
         process_equ();
         document.getElementById("cal_span").innerHTML = check_number(cal_num[1], 'r'); //显示上次执行结果
         cal_num[1] = y;
         // console.log("line64 cal_num数组为" + cal_num);
         // console.log(String(cal_num[0]) + cal_num[1]);
         document.getElementById("cal_span").innerHTML = check_len((cal_num[0] + cal_num[1]));
     } else {
         cal_num[1] = y;
         document.getElementById("cal_span").innerHTML = cal_num[1];
     }

 }

 //执行一次=操作；执行完成后调用store_equ()存储，并调用tozero（）归零；
 function process_equ() {

     if (cal_num[1] == '+') { //按了+号后再按=号情况
      //   document.getElementById("cal_span").innerHTML = check_len((cal_num[0] - 0) + (cal_num[2] - 0));
         document.getElementById("cal_span").innerHTML = check_len(add(cal_num[0],cal_num[2]));
         store_equ(cal_num[1]);
     } else if (cal_num[1] == '-') {
        // document.getElementById("cal_span").innerHTML = cal_num[0] - cal_num[2];
          document.getElementById("cal_span").innerHTML = sub(cal_num[0],cal_num[2]);
         store_equ(cal_num[1]);
         console.log("line 155 -号后再按=号情况");
         console.log("cal_num数组为" + cal_num);
         console.log("cal_num【1】长度为" + cal_num[1].length);
     } else if (cal_num[1] == 'X') {
         //check_len(String(cal_num[0] * cal_num[2]));必须要转换为String否则监测不了数值型的长度。
         //    document.getElementById("cal_span").innerHTML = check_len(String((cal_num[0]-0) * (cal_num[2]-0)));
        // document.getElementById("cal_span").innerHTML = check_number(String(check_len(cal_num[0] * cal_num[2])));
        document.getElementById("cal_span").innerHTML = check_number(String(check_len(mul(cal_num[0],cal_num[2]))));
         store_equ(cal_num[1]);
     } else if (cal_num[1] == '/') {
     //    document.getElementById("cal_span").innerHTML = check_len(cal_num[0] / cal_num[2]);
        document.getElementById("cal_span").innerHTML = check_len(div(cal_num[0],cal_num[2]));
         console.log("line148 process_equ \   cal_num数组为" + cal_num);
         store_equ(cal_num[1]);
     } else { //就是按了=号，但是前面cal_num[1]没有运算符情况下，又区分下面两种情况
         if (cal_num[2] != '') {
           //  document.getElementById("cal_span").innerHTML = check_len(cal_num[0] / cal_num[2]);
           document.getElementById("cal_span").innerHTML = check_len(div(cal_num[0],cal_num[2]));  
             console.log("line 82 error");
             store_equ(cal_num[1]);
         } else { //针对刚刚正常运算完成后（已经按了一个等号），再按一个等号情况，相当于执行了C清零；
             console.log("line 84 几个等号？");
             tozero();
         };
     };
 }



 // 把按等号以后的运行结果存储到第一参数去，方便连续计算,返回值要换成字符串，否则出错。因为al_num[0].indexOf('.')不能运行
 function store_equ(f) {
     switch (f) {
         case '+':
         //    cal_num[0] = String((cal_num[0] - 0) + (cal_num[2] - 0));
              cal_num[0] = String(add(cal_num[0],cal_num[2]));
             cal_num[1] = 'L';
             cal_num[2] = '';

             break;
         case '-':
        //     cal_num[0] = String(check_len(cal_num[0] - cal_num[2]));
          cal_num[0] = String(sub(cal_num[0],cal_num[2]));
             cal_num[1] = 'L';
             cal_num[2] = '';
             break;
         case 'X':
         //    cal_num[0] = String(check_len(cal_num[0] * cal_num[2]));
           cal_num[0] = String(mul(cal_num[0],cal_num[2]));
             cal_num[1] = 'L';
             cal_num[2] = '';
             break;
         case '/':
             // 这里加一个三元符是为了给5/0时候，给第一个参数赋值为null,运算结果出来后，默认就是第一次新操作
         //    cal_num[0] = (String(check_len(cal_num[0] / cal_num[2])) == "ERROR" ? "" : String(check_len(cal_num[0] / cal_num[2])));
          cal_num[0] = (String(check_len(div(cal_num[0],cal_num[2]))) == "ERROR" ? "" : String(check_len(div(cal_num[0],cal_num[2]))));
             cal_num[1] = 'L';
             cal_num[2] = '';
             console.log("line187 store_equ \   cal_num数组为" + cal_num);
             break;

     }
 };

 // 检查输入数的长度，超过10位报错,否则返回原值
 function check_len(z) {
     // console.log('z-type:' + typeof(z));
     // console.log('z=:' + z);

     // indexOf(),出现位置从0开始计算
     if (typeof(z) == "number" && z != "Infinity") {
         // z如果是数值，把先转换为字符串求出的长度减去小数点后长度，因为从0开始再减1；然后按10这个长度作为数值z的小数点后尾数返回
         //    console.log('z-n1='+z);
         //    console.log(String(z).length-String(z).indexOf('.')-1);
         //    var t=0;
         // // t = z.toFixed(String(z).length-String(z).indexOf('.')-1);
         // t = z.toFixed(10-String(z).indexOf('.')-1);
         //     console.log('z-n2='+t);
         if (String(z).indexOf('.') == -1) {
             // 如果是整数就直接返回
             return z;

         } else if (String(z).length < 10) { //处理有理数小数
             console.log('z-strz-len:' + String(z).length);
             console.log(String(z));
             return String(z);
         } else {
             // 返回截取相应长度的小数位置
             return z.toFixed(10 - String(z).indexOf('.') - 1)
         };
     } else if (typeof(z) == "number" && z == "Infinity") { //  5 / 0  返回结果为 Infinity，但是类型为number
         return "ERROR";
     } else {
         console.log('z-str=:' + z);
         return (z.length > 11) ? "ERROR" : z;
     }
 }



 // 调用处理函数，可拓展
 function inputnumber(x) {
     char_pro(x);
     // alert(x);
     // var n = document.getElementById("cal_span").innerHTML;
     // console.log("n=" + n);
     // console.log(n.length);
     // console.log(typeof(n));
     // console.log('x=' + typeof(x));
     // if (n == '' && typeof(x) != 'number') {
     //     // alert("请输入数字");
     //     return "False"
     // }
     // // c默认的值显示框为空
     // if (x === 'c') {
     //     // document.getElementById("cal_span").innerHTML = '';
     // } else {
     //     // innerHTML严格区分大小写
     //     // document.getElementById("cal_span").innerHTML = x;
     //     console.log("n2=" + n);
     // }
 };
 //加减乘除的float bug解决函数；传入数值型，返回也是数值型
 function add(a, b) {
     var c, d, e;
     try {
         c = a.toString().split(".")[1].length;
     } catch (f) {
         c = 0;
     }
     try {
         d = b.toString().split(".")[1].length;
     } catch (f) {
         d = 0;
     }
     return e = Math.pow(10, Math.max(c, d)), (mul(a, e) + mul(b, e)) / e;
 }

 function sub(a, b) {
     var c, d, e;
     try {
         c = a.toString().split(".")[1].length;
     } catch (f) {
         c = 0;
     }
     try {
         d = b.toString().split(".")[1].length;
     } catch (f) {
         d = 0;
     }
     return e = Math.pow(10, Math.max(c, d)), (mul(a, e) - mul(b, e)) / e;
 }

 function mul(a, b) {
     var c = 0,
         d = a.toString(),
         e = b.toString();
     try {
         c += d.split(".")[1].length;
     } catch (f) {}
     try {
         c += e.split(".")[1].length;
     } catch (f) {}
     return Number(d.replace(".", "")) * Number(e.replace(".", "")) / Math.pow(10, c);
 }

 function div(a, b) {
     var c, d, e = 0,
         f = 0;
     try {
         e = a.toString().split(".")[1].length;
     } catch (g) {}
     try {
         f = b.toString().split(".")[1].length;
     } catch (g) {}
     return c = Number(a.toString().replace(".", "")), d = Number(b.toString().replace(".", "")), mul(c / d, Math.pow(10, f - e));
 }
