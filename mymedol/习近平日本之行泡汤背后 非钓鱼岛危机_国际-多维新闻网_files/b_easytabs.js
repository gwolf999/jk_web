var b_tablink_idname = new Array("b_tablink");
var b_tabcontent_idname = new Array("b_tabcontent"); 
var b_tabcount = new Array("3");
var b_loadtabs = new Array("1");
var b_autochangemenu = 0;
var b_changespeed = 5;
var b_stoponhover = 0;
function b_easytabs(b_menunr, b_active) {if (b_menunr == b_autochangemenu){b_currenttab=b_active;}if ((b_menunr == b_autochangemenu)&&(b_stoponhover==1)) {b_stop_autochange()} else if ((b_menunr == b_autochangemenu)&&(b_stoponhover==0))  {b_counter=0;}b_menunr = b_menunr-1;for (i=1; i <= b_tabcount[b_menunr]; i++){document.getElementById(b_tablink_idname[b_menunr]+i).className='tab'+i;document.getElementById(b_tabcontent_idname[b_menunr]+i).style.display = 'none';}document.getElementById(b_tablink_idname[b_menunr]+b_active).className='tab'+b_active+' tabactive';document.getElementById(b_tabcontent_idname[b_menunr]+b_active).style.display = 'block';}var b_timer; b_counter=0; var b_totaltabs=b_tabcount[b_autochangemenu-1];var b_currenttab=b_loadtabs[b_autochangemenu-1];function b_start_autochange(){b_counter=b_counter+1;b_timer=setTimeout("b_start_autochange()",1000);if (b_counter == b_changespeed+1) {b_currenttab++;if (b_currenttab>b_totaltabs) {b_currenttab=1}b_easytabs(b_autochangemenu,b_currenttab);b_restart_autochange();}}function b_restart_autochange(){clearTimeout(b_timer);b_counter=0;b_start_autochange();}function b_stop_autochange(){clearTimeout(b_timer);b_counter=0;}
$(function($) {
  var b_menucount=b_loadtabs.length; var c = 0; var d = 1; do {b_easytabs(d, b_loadtabs[c]);  c++; d++;}while (d<=b_menucount);
if (b_autochangemenu!=0){b_start_autochange();}
});
