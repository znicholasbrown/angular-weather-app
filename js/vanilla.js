function currentTime() {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    //var s = today.getSeconds();

    m = m < 10 ? "0" + m: m;
    h = h < 10 ? "0" + h: h;
    //s = s < 10 ? "0" + s: s; /*Don't need seconds for this clock*/
    document.getElementById("clock").innerHTML = h + ":" + m;
    var t = setTimeout(function(){ currentTime() }, 500);
}

$(document).ready(function() {
  currentTime();
})