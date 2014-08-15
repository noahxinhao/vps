(function(window) {
    var applicationContextPath = $("#applicationContextPath").val();
    var verfityApp = angular.module('userSignup', []);
    verfityApp.controller('signupController', ['$scope','$http', function ($scope,$http) {
        $scope.user = {};
        $scope.submitted = false;
        $scope.accountUsed = false;
        $scope.submitForm = function () {
            if ($scope.signupForm.$valid) {
                if($scope.user.confirmPassword==$scope.user.userpassword){
                    var user = $scope.user;
                    /*console.log("帐号:"+user.account);
                    console.log("密码:"+user.userpassword);
                    console.log("确认:"+user.confirmPassword);
                    console.log("验证码:"+user.verificationCode);*/
                    //检测用户名是否存在
                    var verifyAccountUrl = applicationContextPath+"/ruc/verifyAccount?account="+user.account;
                    $http.get(verifyAccountUrl).success(function (data) {
                        if(data.note=="用户名已使用"){
                            $scope.accountUsed = true;
                        }else{
                            $scope.accountUsed = false;
                            /*执行注册*/
                        }
                    });
                }
            } else {
                $scope.submitted = true;
            }
        }
    }]);
})(window);