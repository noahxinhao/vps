var applicationContextPath = $("#applicationContextPath").val();
angular.module('blogApp', []).controller("blogsController",
    function ($scope, $http) {
        $scope.js_ready = false;
        $http.get(applicationContextPath + '/rs/getBlogs/1').success(function (data) {
            if (data.success == "true") {
                $scope.blogs = data.articles;
                for(var i=0;i<$scope.blogs.length;i++){
                    var temp = $scope.blogs[i];
                    temp.basic.content = temp.basic.content.replace(/<\/?.+?>/g,"");
                    $scope.blogs[i].basic.content = temp.basic.content.length>500?temp.basic.content.substring(0,500)+"....":temp.basic.content;
                    $scope.blogs[i].basic.createTime = new Date($scope.blogs[i].basic.createTime).format(("yyyy年MM月dd日 hh:mm:ss"))
                }
                $scope.js_ready = true;
            }
        });
    });

Date.prototype.format = function(format) {
    var o = {
        "M+" : this.getMonth() + 1, // month
        "d+" : this.getDate(), // day
        "h+" : this.getHours(), // hour
        "m+" : this.getMinutes(), // minute
        "s+" : this.getSeconds(), // second
        "q+" : Math.floor((this.getMonth() + 3) / 3), // quarter
        "S" : this.getMilliseconds()
        // millisecond
    };
    if (/(y+)/.test(format))
        format = format.replace(RegExp.$1, (this.getFullYear() + "")
            .substr(4 - RegExp.$1.length));
    for ( var k in o)
        if (new RegExp("(" + k + ")").test(format))
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k]
                : ("00" + o[k]).substr(("" + o[k]).length));
    return format;
}