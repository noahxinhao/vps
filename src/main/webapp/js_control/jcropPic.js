function upload_ico() {
    document.getElementById("primaryImg").src = "";
    document.getElementById("previewImg").src = "";
    $("#myModal").modal("show");

}

var jcrop_api = null, boundx, boundy;
function compareScaleImage() {
    $("#primaryImg").css("display", "block");
    $("#previewPane").css("display", "block");

    var preview = $('#previewPane'),
        previewContainer = $('#previewPane .previewContainer'),
        previewImg = $('#previewPane .previewContainer img'),

        xsize = previewContainer.width(),
        ysize = previewContainer.height();
    $('#primaryImg').Jcrop({
            onChange: updatePreview,
            onSelect: updatePreview,
            onRelease: function (c) {
                previewImg.css({
                    width: '130px',
                    height: '130px',
                    marginLeft: '0px',
                    marginTop: '0px'
                });

            },
            aspectRatio: xsize / ysize
        }, function () {
            // Use the API to get the real image size
            var bounds = this.getBounds();
            boundx = bounds[0];
            boundy = bounds[1];
            jcrop_api = this;
            jcrop_api.setOptions({maxSize: [ 200, 200 ]});
            jcrop_api.setSelect([0, 0, 200, 200]);
            preview.appendTo(jcrop_api.ui.holder);
        }

    );
    function updatePreview(c) {
        if (parseInt(c.w) > 0) {
            var rx = xsize / c.w;
            var ry = ysize / c.h;

            previewImg.css({
                width: Math.round(rx * boundx) + 'px',
                height: Math.round(ry * boundy) + 'px',
                marginLeft: '-' + Math.round(rx * c.x) + 'px',
                marginTop: '-' + Math.round(ry * c.y) + 'px'
            });
        }

        $("#img_x1").val(c.x);
        $("#img_y1").val(c.y);
        $("#img_x2").val(c.x2);
        $("#img_y2").val(c.y2);
    };
}
var previewPane = "<div id='previewPane'><div class='previewContainer'><img id='previewImg' style='max-width: none;height:130px;width: 130px;' alt='Preview' src=''/></div></div>"
function displayImageForPreview() {
    if (jcrop_api != null) {
        jcrop_api.destroy();
        $("#primaryImg").css("height", "auto");
        $(previewPane).insertAfter("#primaryImg");
    }
    //判断浏览器
    var Sys = {};
    var uploadFileField = document.getElementById("file0");
    var primaryImg = document.getElementById("primaryImg");
    var previewImage = document.getElementById("previewImg");
    var ua = navigator.userAgent.toLowerCase();
    var isWin8 = navigator.userAgent.indexOf("Windows NT 6.2") > -1 || ua.indexOf("Windows 8") > -1;
    var s;
    (s = ua.match(/msie ([\d.]+)/)) ? Sys.ie = s[1] :
        (s = ua.match(/firefox\/([\d.]+)/)) ? Sys.firefox = s[1] :
            (s = ua.match(/chrome\/([\d.]+)/)) ? Sys.chrome = s[1] :
                (s = ua.match(/opera.([\d.]+)/)) ? Sys.opera = s[1] :
                    (s = ua.match(/version\/([\d.]+).*safari/)) ? Sys.safari = s[1] : 0;
    if (Sys.ie >= 10) {
        uploadFileField.select();
        //加上这一句防止报告安全问题
        uploadFileField.blur();
        var obj = new Image();
        obj.src = window.URL.createObjectURL(uploadFileField.files[0]);
        obj.onload = function () {
            primaryImg.src = this.src;
            previewImage.src = this.src;
            $('#primaryImg').ready(compareScaleImage);
        }
    }
    else if (isWin8) {
        $("#primaryImg").css("display", "none");
        $("#previewPane").css("display", "none");
        return;
    }
    else if (Sys.ie <= 6) {
        primaryImg.src = uploadFileField.value;
        previewImage.src = uploadFileField.value;
        $('#photo').ready(
            compareScaleImage
        );
    } else if (Sys.ie >= 7 && Sys.ie <= 8) {
        uploadFileField.select();
        //加上这一句防止报告安全问题
        uploadFileField.blur();
        var path = document.selection.createRange().text;
    } else if (Sys.ie > 8 && Sys.ie < 10) {
        uploadFileField.select();
        //加上这一句防止报告安全问题
        uploadFileField.blur();
        primaryImg.src = window.URL.createObjectURL(uploadFileField.files[0]);
        previewImage.src = window.URL.createObjectURL(uploadFileField.files[0]);
        $('#primaryImg').ready(compareScaleImage);
    }
    else if (Sys.firefox) {
        if (uploadFileField.files) {
            var accept = ["image/png", "image/jpeg", "image/jpg", "image/gif"];
            if (accept.indexOf(uploadFileField.files[0].type) > -1) {
                var reader = new FileReader();
                reader.readAsDataURL(uploadFileField.files[0]);
                //延迟一会等待文件读取完毕
                var t = setTimeout(function () {
                    primaryImg.src = reader.result;
                    previewImage.src = reader.result;

                    clearTimeout(t);
                }, 100);
            }
            $('#primaryImg').load(compareScaleImage);
        }
        else {
            primaryImg.src = uploadFileField.value;
            previewImage.src = uploadFileField.value;
            $('#primaryImg').load(compareScaleImage);
        }
    } else if (Sys.chrome) {
        primaryImg.src = window.URL.createObjectURL(uploadFileField.files.item(0));
        previewImage.src = window.URL.createObjectURL(uploadFileField.files.item(0));
        $('#primaryImg').load(compareScaleImage);
    }
}