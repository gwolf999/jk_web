 function asort() {
     var score = document.getElementById("score").value;

     var b = checkscore(score);
     console.log("b=" + b);
     if (b === 'ture') {

         // parseInt()
         var stu_score = Math.floor(eval(score / 10) - 0.01);

         switch (stu_score) {

             case 10:
                 document.getElementById("layer").innerHTML = "学生等级为一等生";
                 break;
             case 9:
                 document.getElementById("layer").innerHTML = "学生等级为一等生";
                 break;
             case 8:
                 document.getElementById("layer").innerHTML = "学生等级为二等生";
                 break;
             case 7:
                 document.getElementById("layer").innerHTML = "学生等级为三等生";
                 break;
             case 6:
                 document.getElementById("layer").innerHTML = "学生等级为四等生";
                 break;
             case 5:
                 document.getElementById("layer").innerHTML = "学生等级为五等生";
                 break;
             case 4:
                 document.getElementById("layer").innerHTML = "学生等级为六等生";
                 break;
             case 3:
                 document.getElementById("layer").innerHTML = "学生等级为七等生";
                 break;
             case 2:
                 document.getElementById("layer").innerHTML = "学生等级为八等生";
                 break;
             case 1:
                 document.getElementById("layer").innerHTML = "学生等级为九等生";
                 break;

             default:
                 document.getElementById("layer").innerHTML = "学生等级为十等生";
         };
     } else {
         // console.log("b2=" + b);
         score.value = "";
         document.getElementById("score").value = "";
         document.getElementById("layer").innerHTML = "请输入0-100之间分数!";
     };
     return b;
 };

 function checkscore(x) {
     var a = x - 0;
     // // alert("checkscore:" + "a");
     // console.log((a >= 0 && a <= 100) ? "一等生" : "请输入0至100的数字");
    
     return ((a && a >= 0 && a <= 100) ? 'ture' : 'false');
 };
