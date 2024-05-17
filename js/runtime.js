// 然后计时器还要往#footer-wrap这块元素上面写入网站运行时间等信息，新建文件[BlogRoot]\source\js\runtime.js，写入如下代码。这里要修改的几块东西是：网站诞生时间、currentTimeHtml这块东西；其中currentTimeHtml分为了两种模式，对应两个不同的图标，自行研究一下就懂！

var now = new Date();
function createtime() {
  // 当前时间
  now.setTime(now.getTime() + 1000);
  var start = new Date("08/01/2022 00:00:00"); // 旅行者1号开始计算的时间
  var dis = Math.trunc(23400000000 + ((now - start) / 1000) * 17); // 距离=秒数*速度 记住转换毫秒
  var unit = (dis / 149600000).toFixed(6);  // 天文单位
  var grt = new Date("09/20/2020 00:00:00");	// 网站诞生时间
  var days = (now - grt) / 1e3 / 60 / 60 / 24,
    dnum = Math.floor(days),
    hours = (now - grt) / 1e3 / 60 / 60 - 24 * dnum,
    hnum = Math.floor(hours);
  1 == String(hnum).length && (hnum = "0" + hnum);
  var minutes = (now - grt) / 1e3 / 60 - 1440 * dnum - 60 * hnum,
    mnum = Math.floor(minutes);
  1 == String(mnum).length && (mnum = "0" + mnum);
  var seconds = (now - grt) / 1e3 - 86400 * dnum - 3600 * hnum - 60 * mnum,
    snum = Math.round(seconds);
  1 == String(snum).length && (snum = "0" + snum);
  let currentTimeHtml = "";
  (currentTimeHtml =
    hnum < 18 && hnum >= 9
    ? `<img class='boardsign' src='/img/YY.gif' title='驾照回归，此时的Bronya是真正的荔枝律者💥!'><br> <div style="font-size:13px;font-weight:bold">在互联网的数据浪潮中🌐，本站已航行 ${dnum} 天 ${hnum} 小时 ${mnum} 分 ${snum} 秒 <i id="heartbeat" class='fas fa-heartbeat'></i> <br> 此时，旅行者 1 号距离地球 ${dis} 千米，约为 ${unit} 个天文单位 🚀</div>`
    : `<img class='boardsign' src='/img/YY.gif' title='驾照回归，此时的Bronya是真正的荔枝律者💥!'><br> <div style="font-size:13px;font-weight:bold">在宇宙的无限运转中✨，本站已律动 ${dnum} 天 ${hnum} 小时 ${mnum} 分 ${snum} 秒 <i id="heartbeat" class='fas fa-heartbeat'></i> <br> 此时，旅行者 1 号距离地球 ${dis} 千米，约为 ${unit} 个天文单位 🚀</div>`),
    document.getElementById("workboard") &&
    (document.getElementById("workboard").innerHTML = currentTimeHtml);
}
// 设置重复执行函数，周期1000ms
setInterval(() => {
  createtime();
}, 1000);