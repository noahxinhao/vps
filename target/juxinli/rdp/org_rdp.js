$(document).ready(function () {
    //用户信息参数
    if (!checkBrowser()) {
        return false;
    }
    //$("#connect").bind("click", connectRDP);
    connectRDP();
});

function connectRDP() {
    var args = {"gateway": "www.remotespark.com:8080", "server": "54.250.188.69", "port": "3389", "user": "Administrator", "pwd": "h=x@WFYGL@4"};
    var r = svManager.getInstance();
    if (r == null) {
        r = new Rdp2(args);
    } else {
        var apps = r.getRunninApps();
        var len = apps.length;
        var isApp = $id("app").checked;
        var warn = r.isRemoteApp() && (!isApp);
        if (warn) {
            var s = "警告：一个RemoteApp连接还在运行中。\n\n";
            for (var i = 0; i < len; i++) {
                s += apps[i] + "\n";
            }
            s += "\n请新开一个窗口建立新的连接。\n";
            alert(s);
            return;
        }
    }

    r.onclose = function () {
        r.hide();
        window.close();
    };

    r.onerror = function (e) {
        console.log(e.name + ":" + e.message);
    };
    r.addSurface(new svGlobal.LocalInterface());

    r.run();
}

function checkBrowser() {
    var msg = "";
    var Sys = {};
    var s;
    var ieVersion = true;
    var ua = navigator.userAgent.toLowerCase();
    (s = ua.match(/msie ([\d.]+)/)) ? Sys.ie = s[1] :
        (s = ua.match(/firefox\/([\d.]+)/)) ? Sys.firefox = s[1] :
            (s = ua.match(/chrome\/([\d.]+)/)) ? Sys.chrome = s[1] :
                (s = ua.match(/opera.([\d.]+)/)) ? Sys.opera = s[1] :
                    (s = ua.match(/version\/([\d.]+).*safari/)) ? Sys.safari = s[1] : 0;
    if (!Sys.ie) {
        (s = ua.match(/rv ([\d.]+)/)) ? Sys.ie = s[1] : 0;
    }
    if (Sys.ie) {
        if (Sys.ie < 10) {
            ieVersion = false;
            msg = "您目前使用的IE版本不支持html5，请下载聚信立客户端\n\n";
        }
    }

//    var ieVersion = (function() {
//        var v = 3,
//            div = document.createElement('div'),
//            all = div.getElementsByTagName('i');
//        while (
//            div.innerHTML = '<!--[if gt IE ' + (++v) + ']><i></i><![endif]-->',
//                all[0]8
//            );
//        return v > 4 ? v : false;
//    })();  //判断出IE6、IE7、IE8、IE9，但判断不出IE10，在IE10和非IE中返回false。 IE11？
//    if(ieVersion) msg="您目前使用的IE版本不支持html5，请下载聚信立客户端\n\n";

    var hasCanvas = false;

    try {
        document.createElement("canvas").getContext("2d");
        hasCanvas = true;
    } catch (e) {
        msg += "您的浏览器不支持Canvas.\n\n";
    }
    ;


    var noWebSocket = !("WebSocket" in window) && !("MozWebSocket" in window);
    var userAgent = navigator.userAgent;
    var isFirefox = userAgent.indexOf("Firefox") != -1;

    if (noWebSocket) {
        msg += "您的浏览器不支持WebSocket.\n\n";
        if (isFirefox) {
            msg += "请更新到 Firefox 6或以后的版本\n\n";
        }
        else if (userAgent.indexOf("Opera") != -1) {
            msg += "请在地址栏打开'opera:config#Enable WebSockets'，选择'Enable WebSockets'并重新启动 Opera.\n\n";
        }
        else if (userAgent.indexOf("MSIE") != -1) {
            msg += "如您想在浏览器内访问聚信立，请安装IE Chrome内置插件，或使用Chrome、Firefox等支持html5的浏览器\n\n";
        }
    }

    if (msg.length > 0)
        alert(msg);
    var ready = !noWebSocket && hasCanvas && ieVersion;
    return ready;
};

$(function () {
    /*$("body").attr("onbeforeunload", "return '提示:当前程序未关闭';");*/
})


