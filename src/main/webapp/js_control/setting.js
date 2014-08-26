$(document).ready(function () {
    $('#myModal').on('shown.bs.modal', function (e) {
        displayImageForPreview();
    });
    $("#change").bind("click", function () {
        $("#previewPane").css("border-radius", "77px");
    });

    $("#userImg").bind("click",function(){
        $("#file0").click();
    });

    $("#changeImg").bind("click", function () {
        $("#file0").click();
    });

    $("#file0").change(function () {
        upload_ico();
    });

    $("#upload").bind("click", function () {
        var url = $("#applicationContextPath").val()+"/set/uploadImg"
        console.log("上传图片地址:"+url);
        $.ajaxFileUpload({
            type: "POST",
            url: url,
            dataType: 'json',
            data: {
                x1:$("#img_x1").val(),
                y1:$("#img_y1").val(),
                x2:$("#img_x2").val(),
                y2:$("#img_y2").val()
            },
            //secureuri:false,
            fileElementId: 'file0',
            success: function (data) {
                console.log("上传图片成功");
                window.location.href=$("#applicationContextPath").val()+"/home#/setting";
            },
            error: function (data, status, e) {
                console.log("上传图片失败");
            }
        });
        window.location.href=$("#applicationContextPath").val()+"/home#/setting";
        console.log("上传图片执行完成");
    });
});