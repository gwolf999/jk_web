// 还有运算后一下后再连续++等bug及有理数无理数显示未处理
cal_num = new Array('', '', '');
// 声明一个全局变量的二维数组，其实可以不用
/* cal_num[0]=new Array();
 cal_num[1]='';
 cal_num[2]=new Array();*/
store = new Array('', ''); //设置全局变量默认值为sotre[0]为'',不能设置为0，防止存储0进来

//按键绑定事件程序
function register_key() {
    tip = "NOHELP";
    //计算器3个控制键，帮助实现，退格、清空、清屏
    document.getElementById("featu_del").addEventListener('mouseover', function() {
        tip = "featu_del";
    });
    document.getElementById("featu_del").addEventListener('mouseout', function() {
        tip = "NOHELP";
        offHelp();
    });
    document.getElementById("featu_zap").addEventListener('mouseover', function() {
        tip = "featu_zap";
        // onHelp("featu_zap");
    });
    document.getElementById("featu_zap").addEventListener('mouseout', function() {

        tip = "NOHELP";
        offHelp();
    });

    document.getElementById("featu_zap_scr").addEventListener('mouseover', function() {
        tip = "featu_zap_scr";
        console.log('tip=' + tip);
    });

    document.getElementById("featu_zap_scr").addEventListener('mouseout', function() {
        tip = "NOHELP";
        offHelp();
    });

    // 五个存储区的功能键帮助控制
    document.getElementById("mem01").addEventListener('mouseover', function() {
        tip = "mem01";
    });
    document.getElementById("mem01").addEventListener('mouseout', function() {
        tip = "NOHELP";
        offHelp();
    });
    document.getElementById("mem02").addEventListener('mouseover', function() {
        tip = "mem02";
    });
    document.getElementById("mem02").addEventListener('mouseout', function() {
        tip = "NOHELP";
        offHelp();
    });
    document.getElementById("mem03").addEventListener('mouseover', function() {
        tip = "mem03";
    });
    document.getElementById("mem03").addEventListener('mouseout', function() {
        tip = "NOHELP";
        offHelp();
    });
    document.getElementById("mem04").addEventListener('mouseover', function() {
        tip = "mem04";
    });
    document.getElementById("mem04").addEventListener('mouseout', function() {
        tip = "NOHELP";
        offHelp();
    });
    document.getElementById("mem05").addEventListener('mouseover', function() {
        tip = "mem05";
    });
    document.getElementById("mem05").addEventListener('mouseout', function() {
        tip = "NOHELP";
        offHelp();
    });
    //四个算数快捷键帮助控制
    document.getElementById("num_Negate").addEventListener('mouseover', function() {
        tip = "num_Negate";
    });
    document.getElementById("num_Negate").addEventListener('mouseout', function() {
        tip = "NOHELP";
        offHelp();
    });
    document.getElementById("num_recip").addEventListener('mouseover', function() {
        tip = "num_recip"
    });
    document.getElementById("num_recip").addEventListener('mouseout', function() {
        tip = "NOHELP";
        offHelp();
    });
    document.getElementById("num_per").addEventListener('mouseover', function() {
        tip = "num_per"
    });
    document.getElementById("num_per").addEventListener('mouseout', function() {
        tip = "NOHELP";
        offHelp();
    });
    document.getElementById("num_sqr").addEventListener('mouseover', function() {
        tip = "num_sqr"
    });
    document.getElementById("num_sqr").addEventListener('mouseout', function() {
        tip = "NOHELP";
        offHelp();
    });

    // 注册数字键盘及运输符
    document.getElementById("num01").addEventListener('click', function() {
        char_pro(1);
    });
    document.getElementById("num02").addEventListener('click', function() {
        char_pro(2);
    });
    document.getElementById("num03").addEventListener('click', function() {
        char_pro(3);
    });
    document.getElementById("num04").addEventListener('click', function() {
        char_pro(4);
    });
    document.getElementById("num05").addEventListener('click', function() {
        char_pro(5);
    });
    document.getElementById("num06").addEventListener('click', function() {
        char_pro(6);
    });
    document.getElementById("num07").addEventListener('click', function() {
        char_pro(7);
    });
    document.getElementById("num08").addEventListener('click', function() {
        char_pro(8);
    });
    document.getElementById("num09").addEventListener('click', function() {
        char_pro(9);
    });
    document.getElementById("num00").addEventListener('click', function() {
        char_pro(0);
    });
    document.getElementById("num_dot").addEventListener('click', function() {
        char_pro('.');
    });

    document.getElementById("num_add").addEventListener('click', function() {
        char_pro('+');
    });

    document.getElementById("num_sub").addEventListener('click', function() {
        char_pro('-');
    });

    document.getElementById("num_mul").addEventListener('click', function() {
        char_pro('X');
    });

    document.getElementById("num_div").addEventListener('click', function() {
        char_pro('÷');
    });
    document.getElementById("num_equ").addEventListener('click', function() {
        char_pro('=');
    });
    // 绑定各功能键click事件
     document.getElementById("featu_del").addEventListener('click', function() {
        char_pro('bk_sp');
    });
    document.getElementById("featu_zap").addEventListener('click', function() {
        char_pro('C');
    });

    document.getElementById("featu_zap_scr").addEventListener('click', function() {
        char_pro('scr');
    });
    //绑定存储键
    document.getElementById("mem01").addEventListener('click', function() {
        char_pro('store_mem');
    });
    //绑定读取存储键
    document.getElementById("mem02").addEventListener('click', function() {
        char_pro('read_mem');
    });
    //绑定累加存储键
    document.getElementById("mem03").addEventListener('click', function() {
        char_pro('add_mem');
    });
    //绑定累乘存储
    document.getElementById("mem04").addEventListener('click', function() {
        char_pro('mul_mem');
    });
    //绑定清空存储键
    document.getElementById("mem05").addEventListener('click', function() {
        char_pro('zap_mem');
    });
    //绑定取反的click
    document.getElementById("num_Negate").addEventListener('click', function() {
        char_pro('Negate');
    });
    //绑定的倒数的click
    document.getElementById("num_recip").addEventListener('click', function() {
        char_pro('recip');
    });
    //绑定百分比的click
    document.getElementById("num_per").addEventListener('click', function() {
        char_pro('per');
    });
    //绑定开平方根的click
    document.getElementById("num_sqr").addEventListener('click', function() {
        char_pro('sqr');
    });


}

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

//键盘按下去的捕获函数
function showKeyDown(evt) {
    console.log("evt=" + evt); //keyborad事件
    evt = (evt) ? evt : window.event;
    console.log("new_evt=" + evt); //keyborad事件
    if (evt.keyCode == 72 && tip == "num03") {
        alert(evt.keyCode + tip);
    } else if (evt.keyCode == 72 && tip == "featu_del") {
        onHelp("featu_del");
    } else if (evt.keyCode == 72 && tip == "featu_zap") {
        onHelp("featu_zap");
    } else if (evt.keyCode == 72 && tip == "featu_zap_scr") {
        onHelp("featu_zap_scr");
    } else if (evt.keyCode == 72 && tip == "mem01") {
        onHelp("mem01");
    } else if (evt.keyCode == 72 && tip == "mem02") {
        onHelp("mem02");
    } else if (evt.keyCode == 72 && tip == "mem03") {
        onHelp("mem03");
    } else if (evt.keyCode == 72 && tip == "mem04") {
        onHelp("mem04");
    } else if (evt.keyCode == 72 && tip == "mem05") {
        onHelp("mem05");
    } else if (evt.keyCode == 72 && tip == "num_Negate") {
        onHelp("num_Negate");
    } else if (evt.keyCode == 72 && tip == "num_recip") {
        onHelp("num_recip");
    } else if (evt.keyCode == 72 && tip == "num_per") {
        onHelp("num_per");
    } else if (evt.keyCode == 72 && tip == "num_sqr") {
        onHelp("num_sqr");
    } else {
        onHelp("init");
    };
}

//显示帮助
function onHelp(x) {
    var arr = {};
    console.log("arr=" + arr.featu_del);

    arr.init = "移动鼠标到计算器上相关按键上同时在PC键盘上按H键，就会出现帮助提示；在计数器空白位置按下H键会出现本提示，5秒后自动消失！";
    arr.featu_del = "在屏幕上将所输入数字从最右边，一位一位删除";
    arr.featu_zap = "把内存及屏幕上的所有数字，相当于计算器重新开机";
    arr.featu_zap_scr = "保留内存中数字但是清空屏幕上显示的数字，M标志继续保留，把它们转化为0";
    arr.mem01 = "将显示屏上的数字存入的内存中，如果内存中已有数字则替换内存中的数字，同时屏幕左下角显示M标志";
    arr.mem02 = "将内存中的数字显示在显示屏上，如果内存中没有数字，则显示0；同时屏幕左下角显示M标志";
    arr.mem03 = "将显示屏上的数据与的内存中的数字相加，并用运算结果替换内存中已有的数字，如果内存中没有数字，则直接把显示屏上的数字存入内存；同时屏幕左下角显示M标志,屏幕上数字不会有变化";
    arr.mem04 = "将显示屏上的数据与的内存中的数字相乘，并用运算结果替换内存中已有的数字，如果内存中没有数字，则直接把显示屏上的数字存入内存；同时屏幕左下角显示M标志,屏幕上数字不会有变化";
    arr.mem05 = "将内存中的数字清空,同时左下角的M标志消失，但是当前屏幕数字不变";
    arr.num_Negate = "将当前显示屏幕上的数字取反，正数变为负书，负数变为正数";
    arr.num_recip = "计算一个数的倒数";
    arr.num_per = "返回一个数字的百分数形式，0.2=0.002，就是相当于一个数除以100；";
    arr.num_sqr = "计算一个数的开方，例如9的开方等于3";

    // console.log("arr1=" + arr.featu_del);
    // console.log("x=" + x);
    switch (x) {
        case "featu_del":
            document.getElementById("help").innerHTML = arr.featu_del;
            document.getElementById("help").style.display = "block";
            break;
        case "featu_zap":
            document.getElementById("help").innerHTML = arr.featu_zap;
            document.getElementById("help").style.display = "block";
            break;
        case "featu_zap_scr":
            document.getElementById("help").innerHTML = arr.featu_zap_scr;
            document.getElementById("help").style.display = "block";
            break;
        case "mem01":
            document.getElementById("help").innerHTML = arr.mem01;
            document.getElementById("help").style.display = "block";
            break;
        case "mem02":
            document.getElementById("help").innerHTML = arr.mem02;
            document.getElementById("help").style.display = "block";
            break;
        case "mem03":
            document.getElementById("help").innerHTML = arr.mem03;
            document.getElementById("help").style.display = "block";
            break;
        case "mem04":
            document.getElementById("help").innerHTML = arr.mem04;
            document.getElementById("help").style.display = "block";
            break;
        case "mem05":
            document.getElementById("help").innerHTML = arr.mem05;
            document.getElementById("help").style.display = "block";
            break;
        case "num_Negate":
            document.getElementById("help").innerHTML = arr.num_Negate;
            document.getElementById("help").style.display = "block";
            break;
        case "num_recip":
            document.getElementById("help").innerHTML = arr.num_recip;
            document.getElementById("help").style.display = "block";
            break;
        case "num_per":
            document.getElementById("help").innerHTML = arr.num_per;
            document.getElementById("help").style.display = "block";
            break;
        case "num_sqr":
            document.getElementById("help").innerHTML = arr.num_sqr;
            document.getElementById("help").style.display = "block";
            break;
        default:
            document.getElementById("help").innerHTML = arr.init;
            //代码启动执帮助提示
            document.getElementById("help").style.display = "block";
            // 设置5秒后执行前面的语句
            setTimeout('document.getElementById("help").style.display="none";', 5000);
            break;
    }
}
//关闭帮助
function offHelp() {
    document.getElementById("help").style.display = "none";
}


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
                    //console.log("line 26 首次输入，判断小数点");
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
        case '÷':
            contiue_cal('÷');
            break;
         case 'bk_sp': //退格键盘
            bk_sp();
            break;    
        case 'C': //全部清零功能键；
            tozero();
            break;
        case 'Negate': //取反
            Negate();
            break;
        case 'per': //百分比
            per();
            break;
        case 'recip': //倒数
            recip();
            break;
        case 'sqr': //平方根
            sqr();
            break;
        case 'scr': //全不清零功能键；
            scrToZero();
            break;
        case 'store_mem': //把屏幕上显示数字存入存储器,并在屏幕上显示M标志；
            storeMem();
            break;
        case 'read_mem': //读取存储器上的数字，并把它显示在屏幕上；
            readMem();
            break;
        case 'add_mem': //累加存储键；
            console.log('addMem');
            addMem();
            break;
        case 'mul_mem': //累乘存储键；
            mulMem();
            break;
        case 'zap_mem': //清空存储键
            zapMem();
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

//把数组及显示屏蔽及内存都全部归零，M标志消失；等同于按了C键
function tozero() {
    store[0] = '';
    cal_num[0] = '';
    cal_num[1] = '';
    cal_num[2] = '';
    console.log('cal_numC:' + cal_num[0]);
    // document.getElementById("cal_span").innerHTML = cal_num[0];//原来的为空
    document.getElementById("cal_span").innerHTML = '0';
    document.getElementById("logM").style.display = "none";
}

//屏幕清零及cal_num数组清零；
function scrToZero() {
    cal_num[0] = '';
    cal_num[1] = '';
    cal_num[2] = '';
    console.log('cal_numC:' + cal_num[0]);
    document.getElementById("cal_span").innerHTML = '0';
}
//把屏幕上显示数字存入存储器，同时显示M标准到屏幕上
function storeMem() {
    store[0] = document.getElementById("cal_span").innerHTML;
    console.log('storeMem store=' + store[0]);
    document.getElementById("logM").style.display = "block";
}

//读取存储器上的数字，并把它显示在屏幕上；M标志不消失
function readMem() {
    cal_num[0] = store[0];
    store[1] = 'p'; //定义为p则表示存储数字显示在屏幕上了
    console.log('readMem cal_num[0]=' + store[0]);
    cal_num[1] = '';
    cal_num[2] = '';
    console.log('readMem store=' + store[0]);
    if (store[0]) { //不为空
        document.getElementById("cal_span").innerHTML = store[0];
    } else { //为空则屏幕上显示0
        document.getElementById("cal_span").innerHTML = '0';
    }

}

//把屏幕上数字与内存中数字相加，但不知屏幕上显示，同时在屏幕上显示一个M标志
function addMem() {
    var x = document.getElementById("cal_span").innerHTML;
    console.log("addMem x=" + x);
    store[0] = String(add((store[0] - 0), (x - 0)));
    console.log("addMem store=" + store[0]);
    document.getElementById("logM").style.display = "block";
}

//把屏幕上数字与内存中数字相乘，但不知屏幕上显示，同时在屏幕上显示一个M标志
function mulMem() {
    var x = document.getElementById("cal_span").innerHTML;
    console.log("addMem x=" + x);
    store[0] = String(mul((store[0] - 0), (x - 0)));
    document.getElementById("logM").style.display = "block";
}

//清空存储键,屏幕上显示数字不变，但是M标志消失。
function zapMem() {
    store[0] = '';
    document.getElementById("logM").style.display = "none";
}

//下面四个快捷运算符，第一个是取反；每次都是去屏幕数字运算
function Negate() {
    var x = document.getElementById("cal_span").innerHTML;
    document.getElementById("cal_span").innerHTML = String(mul((x - 0), -1));
      //默认更新第二个参数，如果第二个参数为空则更新第一个
    if(cal_num[2]){
        cal_num[2]=String(mul((x - 0), -1));
    }else{
         cal_num[0]=String(mul((x - 0), -1));
    }


}
//倒数函数
function recip() {
    var x = document.getElementById("cal_span").innerHTML;
    console.log("recip x="+x);
    if(x=='0'){
         
    //  char_pro("=");
      document.getElementById("cal_span").innerHTML = "ERROR";
    }else{
         document.getElementById("cal_span").innerHTML = String(div(1, (x - 0)));
           //不能放外面否则又出现，1/0错误了。
    if(cal_num[2]){
        cal_num[2]=String(div(1, (x - 0)));
    }else{
         cal_num[0]=String(div(1, (x - 0)));
    }
    }
     console.log("recip x1="+x);
     console.log(cal_num);
   


}
//取百分比函数
function per() {
    var x = document.getElementById("cal_span").innerHTML;
    document.getElementById("cal_span").innerHTML = String(mul((x - 0), 0.01));
     //默认更新第二个参数，如果第二个参数为空则更新第一个
    if(cal_num[2]){
        cal_num[2]=String(mul((x - 0), 0.01));
    }else{
         cal_num[0]=String(mul((x - 0), 0.01));
    }

}

//开平方根
function sqr() {
    var x = document.getElementById("cal_span").innerHTML;
    x = Math.sqrt((x - 0));
    console.log("sqr x=" + x);
    document.getElementById("cal_span").innerHTML = String(x);
  //默认更新第二个参数，如果第二个参数为空则更新第一个
    if(cal_num[2]){
        cal_num[2]=String(x);
    }else{
         cal_num[0]=String(x);
    }

}
//退格函数
function bk_sp(){
    var x = document.getElementById("cal_span").innerHTML;
     x=x.slice(0, (x.length-1));
        document.getElementById("cal_span").innerHTML = x;
  //默认更新第二个参数，如果第二个参数为空则更新第一个
    if(cal_num[2]){
        cal_num[2]=String(x);
    }else{
         cal_num[0]=String(x);
    }
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
        //在标准计算器模式下，后面还是不加符号
        //  document.getElementById("cal_span").innerHTML = check_len((cal_num[0] + cal_num[1]));
        document.getElementById("cal_span").innerHTML = check_len((cal_num[0]));
    } else {
        cal_num[1] = y;
        document.getElementById("cal_span").innerHTML = cal_num[1];
    }

}

//执行一次=操作；执行完成后调用store_equ()存储，并调用tozero（）归零；
function process_equ() {

    if (cal_num[1] == '+') { //按了+号后再按=号情况
        //   document.getElementById("cal_span").innerHTML = check_len((cal_num[0] - 0) + (cal_num[2] - 0));
        document.getElementById("cal_span").innerHTML = check_len(add(cal_num[0], cal_num[2]));
        store_equ(cal_num[1]);
    } else if (cal_num[1] == '-') {
        // document.getElementById("cal_span").innerHTML = cal_num[0] - cal_num[2];
        document.getElementById("cal_span").innerHTML = sub(cal_num[0], cal_num[2]);
        store_equ(cal_num[1]);
        console.log("line 155 -号后再按=号情况");
        console.log("cal_num数组为" + cal_num);
        console.log("cal_num【1】长度为" + cal_num[1].length);
    } else if (cal_num[1] == 'X') {
        //check_len(String(cal_num[0] * cal_num[2]));必须要转换为String否则监测不了数值型的长度。
        //    document.getElementById("cal_span").innerHTML = check_len(String((cal_num[0]-0) * (cal_num[2]-0)));
        // document.getElementById("cal_span").innerHTML = check_number(String(check_len(cal_num[0] * cal_num[2])));
        document.getElementById("cal_span").innerHTML = check_number(String(check_len(mul(cal_num[0], cal_num[2]))));
        store_equ(cal_num[1]);
    } else if (cal_num[1] == '÷') {
        //    document.getElementById("cal_span").innerHTML = check_len(cal_num[0] / cal_num[2]);
        document.getElementById("cal_span").innerHTML = check_len(div(cal_num[0], cal_num[2]));
        console.log("line148 process_equ \   cal_num数组为" + cal_num);
        store_equ(cal_num[1]);
    } else { //就是按了=号，但是前面cal_num[1]没有运算符情况下，又区分下面两种情况
        if (cal_num[2] != '') {
            //  document.getElementById("cal_span").innerHTML = check_len(cal_num[0] / cal_num[2]);
            document.getElementById("cal_span").innerHTML = check_len(div(cal_num[0], cal_num[2]));
            console.log("line 82 error");
            store_equ(cal_num[1]);
        } else { //针对刚刚正常运算完成后（已经按了一个等号），再按一个等号情况，相当于执行了C清零；
            console.log("line 84 几个等号？");
            // tozero();
            scrToZero();
        };
    };
}



// 把按等号以后的运行结果存储到第一参数去，方便连续计算,返回值要换成字符串，否则出错。因为al_num[0].indexOf('.')不能运行
function store_equ(f) {
    switch (f) {
        case '+':
            //    cal_num[0] = String((cal_num[0] - 0) + (cal_num[2] - 0));
            cal_num[0] = String(add(cal_num[0], cal_num[2]));
            cal_num[1] = 'L';
            cal_num[2] = '';

            break;
        case '-':
            //     cal_num[0] = String(check_len(cal_num[0] - cal_num[2]));
            cal_num[0] = String(sub(cal_num[0], cal_num[2]));
            cal_num[1] = 'L';
            cal_num[2] = '';
            break;
        case 'X':
            //    cal_num[0] = String(check_len(cal_num[0] * cal_num[2]));
            cal_num[0] = String(mul(cal_num[0], cal_num[2]));
            cal_num[1] = 'L';
            cal_num[2] = '';
            break;
        case '/':
            // 这里加一个三元符是为了给5/0时候，给第一个参数赋值为null,运算结果出来后，默认就是第一次新操作
            //    cal_num[0] = (String(check_len(cal_num[0] / cal_num[2])) == "ERROR" ? "" : String(check_len(cal_num[0] / cal_num[2])));
            cal_num[0] = (String(check_len(div(cal_num[0], cal_num[2]))) == "ERROR" ? "" : String(check_len(div(cal_num[0], cal_num[2]))));
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
