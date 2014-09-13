function onModalShow() {
    $("#user_name").val("");
    $("#phone").val("");
    $("#email").val("");
    /*$("#inputcompany").val("");*/
    $('div[id^=group_]').each(function () {
        $(this).removeClass("has-error")
    });
    $('span[id^=info_]').each(function () {
        $(this).addClass("hidden")
    });
    $("#applymodal").modal("show");
}

function submint_info() {
    if (verify_name() && verify_email() && verify_phone()) {
        $("#submit_suply_info").button('loading');
        $.ajax({
            url: $("#PageContextPath").val() + "/rs/apply",
            type: "POST",
            data: {
                name: $.trim($("#user_name").val()),//用户名
                phone: $.trim($("#phone").val()),//用户电话
                email: $("#email").val()
            },
            cache: false,
            dataType: "json",
            async: false,
            success: function (data) {
                if (data.success == "true") {
                    $("#applymodal").modal("hide");
                    $("#submit_suply_info").button('reset');
                    alertMessage("提示", "您已成功提交试用申请.我们会尽快跟您联系.");
                }
            }
        })
    }
    $("#submit_suply_info").button('reset');
}
//用户名检测
function verify_name() {
    var input_real_name = $.trim($("#user_name").val());
    if (/^([\u4E00-\u9FA5]|[\uE7C7-\uE7F3])*$/.test(input_real_name) && input_real_name.length >= 2 && input_real_name.length <= 5) {
        $("#group_name").removeClass("has-error")
        $("#info_name").addClass("hidden")
        return true;
    } else {
        $("#group_name").addClass("has-error")
        $("#info_name").html("请输入正确格式的用户名")
        $("#info_name").removeClass("hidden")
        return false;
    }
}

//邮箱检测
function verify_email() {
    var email = $("#email").val()
    if (email == null || email == "") {
        $("#group_email").addClass("has-error")
        $("#info_email").html("请输入邮箱")
        $("#info_email").removeClass("hidden")
        return false
    }
    if (/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(email)) {
        $("#group_email").removeClass("has-error")
        $("#info_email").addClass("hidden")
        return true
    } else {
        $("#group_email").addClass("has-error")
        $("#info_email").html("请输入正确格式的邮箱地址")
        $("#info_email").removeClass("hidden")
        return false
    }

}
function verify_phone() {
    var phone = $.trim($("#phone").val());
    if (phone == "") {
        $("#group_phone").addClass("has-error")
        $("#info_phone").html("请输入手机号码")
        $("#info_phone").removeClass("hidden")
        return false;
    }

    if (/^(13[0-9]{9}$)|(14[5-7]{9}$)|(15[0-9]{9}$)|(18[0-9]{9}$)/.test(phone)) {
        $("#group_phone").removeClass("has-error")
        $("#info_phone").addClass("hidden")
        return true;
    } else {
        $("#group_phone").addClass("has-error")
        $("#info_phone").html("请输入正确格式的手机号码")
        $("#info_phone").removeClass("hidden")
        return false;
    }
}
//监听键盘
function keydown_name(event) {
    if (event.which == "13") {
        $("#email").focus();
    }
}
;

function keydown_email(event) {
    if (event.which == "13") {
        $("#phone").focus();
    }
}
;

function keydown_phone(event) {
    if (event.which == "13") {
        $("#inputcompany").focus();
    }
}
;

function keydown_email(event) {
    if (event.which == "13") {
        $("#phone").focus();
    }
}
;

//邮箱检测
function verify_uemail() {
    var email = $("#uemail").val()
    if (email == null || email == "") {
        $("#group_uemail").addClass("has-error")
        $("#info_uemail").html("请输入邮箱")
        $("#info_uemail").removeClass("hidden")
        return false
    }
    if (/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(email)) {
        $("#group_uemail").removeClass("has-error")
        $("#info_uemail").addClass("hidden")
        return true
    } else {
        $("#group_uemail").addClass("has-error")
        $("#info_uemail").html("请输入正确格式的邮箱地址")
        $("#info_uemail").removeClass("hidden")
        return false
    }
}
function keydown_uemail(event) {
    if (event.which == "13") {
        submint_pay();
    }
}
;
function submint_pay() {
    if (verify_uemail()) {
        $("#submit_pay").button('loading');
        $.ajax({
            url: $("#PageContextPath").val() + "/rs/pay",
            type: "POST",
            data: {
                email: $("#uemail").val()
            },
            cache: false,
            dataType: "json",
            async: false,
            success: function (data) {
                if (data.success == "true") {
                    $("#paymodel").modal("hide");
                    $("#submit_pay").button('reset');
                    alertMessage("请扫描二维码完成支付", '<div class="row"><div class="col-md-12 text-center"><img src="/img/pay.jpeg" style="height: 200px;width: 200px;" alt="..."></div></div>');
                }
            }
        })
    }
    $("#submit_pay").button('reset');
}


function bindMethod(){
    $(".win").each(function(){
        $(this).bind("click",function(){
            window.open ($("#PageContextPath").val()+'/win','newwindow','height=1200px,width=900px,top=0,left=0,toolbar=no,menubar=no,scrollbars=no, resizable=no,location=no, status=no')
        })
    })
}

bindMethod();
