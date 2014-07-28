$(document).ready(
    function () {
        var alertModal = "<div class='modal fade' id='alert_modal' style='overflow:hidden' tabindex='-1' role='dialog' aria-labelledby='myModalLabel' aria-hidden='true'>" +
            "<div class='modal-dialog' style='width: 370px'><div class='modal-content'><div class='modal-header' id='modal-header'><h4 class='modal-title' id='myModalLabel'></h4>" +
            "</div><div class='modal-body' id='modal_body'></div><div class='modal-footer'><button class='btn' data-dismiss='modal' aria-hidden='true'>确定</button></div></div></div></div>"

        $(alertModal).insertBefore($($("body").children()[$("body").children().size() - 1]));
        var isIe = /msie/.test(navigator.userAgent.toLowerCase()),
            isIe6 = false;
        if ('undefined' == typeof(document.body.style.maxHeight)) {
            isIe6 = true;
        }

        if (isIe && isIe6) {
            var ie6Modal = "<div id='browserVersionAlarmModal' class='modal hide fade' tabindex='-1' role='dialog' aria-labelledby='myModalLabel' aria-hidden='true'>" +
                "<div class='modal-header'><button type='button' class='close' data-dismiss='modal' aria-hidden='true'>×</button>" +
                "<h5 id='myModalLabel'>IE版本较低</h5></div><div class='modal-body clearfix'>" +
                "<p class='pull-left' ><img src='img/IE-destroy.png'  alt=''/></p><p class='pull-left' style='width:350px; margin-left:40px; line-height:160%;'>您使用的是较低版本浏览器，将导致无法正常使用聚信立的部分功能。建议您使用 IE8.0 或较新版本的IE浏览器，以便更好的感受聚信立的各项特色功能及服务，感谢您对聚信立的关心和支持。</p>" +
                "</div><div class='modal-footer'> <a  href='http://www.microsoft.com/windows/internet-explorer/' target='_blank' class='btn btn-large btn-success'>下载新版本IE</a>" +
                "<button type='submit' class='btn btn-large' data-dismiss='modal' aria-hidden='true'>关 闭</button></div></div>"
            $(ie6Modal).insertBefore($($("body").children()[$("body").children().size() - 1]));
            $("#browserVersionAlarmModal").show("modal");
        }
    }
);

function alertMessage(head, message) {
    $("#modal_body").html();
    $("#modal-header").html();
    $("#modal-header").html(head);
    $("#modal_body").html(message);
    $("#alert_modal").modal("show");
}





