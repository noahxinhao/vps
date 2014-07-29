function refresh_validate_code() {
    $("#verfity_code_img").attr("src", $("#applicationContextPath").val() + "/rs/create_validate_code?t=" + new Date().getTime());
}

function signup(){
    if(verify_account()&&verify_captcha()&&verify_password&&verify_repassword){
        $.ajax({
            url:"",
            data:{

            },
            type:"POST"
        })
    }
}

/* 检测帐号格式及合法性 */
function verify_account() {
    var value = $("#account").val();
    if (/^[a-zA-Z0-9]{4,16}$/.test(value)) {
        return true;
    } else {
        $("#info_text").html("请输入4~16位字符的用户名");
        $("#error_info").css("display", "block");
        $("#inputPhone").val("");
        //$("#inputPhone").focus();
        return false;
    }
}

/* 检查验证码的合法性 */
function verify_captcha() {
    var captcha = $("#captcha").val();
    if (/^[a-z0-9]{5}$/i.test(captcha)) {
        return true;
    } else {
        $("#info_text").html("验证码格式错误");
        $("#error_info").css("display", "block");
        return false;
    }
}
/* 检查用户密码的合法性 */
function verify_password() {
    var pass = $("#Password").val();
    if (/^[\w]{6,26}$/.test(pass)) {
        return true;
    } else {
        $("#info_text").html("请输入6~26位字符的密码");
        $("#error_info").css("display", "block");
        $("#inputPassword").val("");
        //$("#inputPassword").focus();
        return false;
    }
}
/* 检查用户密码的合法性 */
function verify_repassword() {
    var pass = $("#Password").val();
    if (/^[\w]{6,26}$/.test(pass)) {
        return true;
    } else {
        $("#info_text").html("请输入6~26位字符的密码");
        $("#error_info").css("display", "block");
        $("#inputPassword").val("");
        //$("#inputPassword").focus();
        return false;
    }
}
