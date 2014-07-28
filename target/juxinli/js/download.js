$(document).ready(function () {
    $("#downLoad").bind("click", htmlToPdf);
    if (!checkBrowser()) {
        return false;
    }
});

function htmlToPdf() {
    var url = $("#url").val();
    if (!checkUrl(url)) {
        return;
    }
    $("#downLoad").unbind("click", htmlToPdf)
    $("#downLoad").html("<span class='glyphicon glyphicon-refresh'></span> 正在下载...")
    $.ajax({
        url: $("#applicationContextPath").val() + "/down/toPdf",
        data: {
            url: url
        },
        type: "GET",
        cache: false,
        dataType: "json",
        success: function (data) {
            if (data.success == "true") {
                var load = document.getElementById('loadpdf');
                load.href = $("#applicationContextPath").val() + "/down/download_file?file_name=" + data.downloadUrl;
                load.click();
                $("#downLoad").bind("click", htmlToPdf)
                $("#downLoad").html("开始转换 <span class='glyphicon glyphicon-cloud-download'></span>");
            }
        }, fail: function (data) {
            alert("生成失败")
            $("#downLoad").bind("click", htmlToPdf)
            $("#downLoad").html('开始转换 <span class="glyphicon glyphicon-cloud-download"></span>')
        }, error: function (data) {
            alert("生成失败")
            $("#downLoad").bind("click", htmlToPdf)
            $("#downLoad").html('开始转换 <span class="glyphicon glyphicon-cloud-download"></span>')
        }
    })
}
function checkUrl(url) {
    /*if(url==""){
     alert("请输入网址")
     return false;
     }*/
    if (url != "" && /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&amp;%@!\-\/]))?/.test(url)) {
        return true;
    } else {
        alert("URL格式错误,请输入正确格式的URL")
        return false;
    }
}

var _bdhmProtocol = (("https:" == document.location.protocol) ? " https://" : " http://");
document.write(unescape("%3Cscript src='" + _bdhmProtocol + "hm.baidu.com/h.js%3F3cb9923d3a441e586ded9bab9fb7991d' type='text/javascript'%3E%3C/script%3E"));
