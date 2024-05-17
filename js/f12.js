document.onkeydown = function (e) {
    if (123 == e.keyCode || (e.ctrlKey && e.shiftKey && (74 === e.keyCode || 73 === e.keyCode || 67 === e.keyCode)) || (e.ctrlKey && 85 === e.keyCode)) return btf.snackbarShow("你真坏，不能打开控制台喔!"), event.keyCode = 0, event.returnValue = !1, !1
};

// 注意: 如果自己调试阶段，可注释第一步和第二步中的代码，再进行编译，就可以打开控制台了。部署时放开注释，编译好再丢上去就OK了
// [BlogRoot]/node_modules/hexo-theme-butterfly/layout/includes/layout.pug
// f12.js