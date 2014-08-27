(function(window) {
    var applicationContextPath = $("#applicationContextPath").val();
    var signinApp = angular.module('userSignin', []);
    signinApp.controller('signinController', ['$scope','$http', function ($scope,$http) {
        $scope.user = {};
        $scope.submitted = false;
        $scope.requiredCode = false;
        $scope.wrongPassword = false;
        $scope.wrongAccount = false;
        $scope.wrongVerifyCode = false;
        $scope.checkedFlog = "checked";
        $scope.validateCodeUrl = applicationContextPath+"/rs/create_validate_code";
        $scope.verfity_code_img = function(){
            $scope.validateCodeUrl = applicationContextPath+"/rs/create_validate_code?d="+new Date().getMilliseconds();
        }
        $scope.update = function(str){
            if(str=="wrongPassword"){
                $scope.wrongPassword = false;
            }
            if(str=="wrongAccount"){
                $scope.wrongAccount = false;
            }
            if(str=="wrongVerifyCode"){
                $scope.wrongVerifyCode = false;
            }
        };
        $scope.submitForm = function () {
            $("#signinbtn").button("loading");
            if ($scope.signinForm.$valid) {
                var verifyUserUrl = applicationContextPath+"/ruc/verifyUserInfo?account="+$scope.user.account+"&password="+$scope.user.userpassword+"&verifyCode="+$scope.user.verificationCode;
                $http.get(verifyUserUrl).success(function (data) {
                    if(data.note=="允许登录"){
                        document.getElementById("loginForm").submit();
                    }else{
                        $("#signinbtn").button("reset");
                        $scope.validateCodeUrl = applicationContextPath+"/rs/create_validate_code?d"+new Date().getMilliseconds();
                        //alert(data.note);
                        if(data.note=="密码错误"){
                            $scope.wrongPassword = true;
                        }
                        if(data.note=="用户不存在"){
                            $scope.wrongAccount = true;
                        }
                        if(data.note=="验证码错误"){
                            $scope.wrongVerifyCode = true;
                        }
                        if(data.requiredCode){
                            $scope.requiredCode = true;
                        }
                    }
                });
            }else{
                $("#signinbtn").button("reset");
                $scope.submitted = true;
            }
        }
    }])
})(window);