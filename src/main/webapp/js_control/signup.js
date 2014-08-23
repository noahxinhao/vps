(function(window) {
    var applicationContextPath = $("#applicationContextPath").val();
    var verfityApp = angular.module('userSignup', []);
    verfityApp.controller('signupController', ['$scope','$http', function ($scope,$http) {
        $scope.user = {};
        $scope.submitted = false;
        $scope.accountUsed = false;
        $scope.wrongCode = false;
        $scope.validateCodeUrl = applicationContextPath+"/rs/create_validate_code";
        $scope.submitForm = function () {
            $("#signupbtn").button("loading");
            if ($scope.signupForm.$valid) {
                if($scope.user.confirmPassword==$scope.user.userpassword){
                    var user = $scope.user;
                    //检测用户名是否存在
                    var verifyAccountUrl = applicationContextPath+"/ruc/verifyAccount?account="+user.account;
                    $http.get(verifyAccountUrl).success(function (data) {
                        if(data.note=="用户名已使用"){
                            $scope.accountUsed = true;
                        }else{
                            $scope.accountUsed = false;
                            /*执行注册*/
                            var signupUrl = applicationContextPath+"/ruc/signup?account="+user.account+"&password="+user.userpassword+"&confirmPassword="+user.confirmPassword+"&verificationCode="+user.verificationCode+"&nu="+new Date().getMilliseconds();
                            $http.post(signupUrl).success(function(data){
                                if(data.success=="true"){
                                    if(data.note=="注册成功"){
                                        window.location.href = applicationContextPath+"/home";
                                        return;
                                    }
                                }else{
                                    $("#signupbtn").button("reset");
                                    $scope.validateCodeUrl = applicationContextPath+"/rs/create_validate_code?d="+new Date().getMilliseconds();
                                    if(data.note=="验证码错误"){
                                        $scope.wrongCode = true;
                                        return
                                    }
                                    if(data.note=="用户名格式错误"){
                                        //$scope.wrongCode = true;
                                        return
                                    }
                                    if(data.note=="请确认密码"){
                                        //$scope.wrongCode = true;
                                        return
                                    }
                                    if(data.note=="用户名已使用"){
                                        $scope.accountUsed = true;
                                        return
                                    }
                                }
                            });
                        }
                        $("#signupbtn").button("reset");
                    });
                }
            } else {
                $("#signupbtn").button("reset");
                $scope.submitted = true;
            }
        };

        $scope.update = function(str){
            if(str=="accountUsed"){
                $scope.accountUsed = false;
            }
            if(str=="wrongCode"){
                $scope.wrongCode = false;
            }
        };
        $scope.refresh_validate_code = function(){
            $scope.validateCodeUrl = applicationContextPath+"/rs/create_validate_code?d="+new Date().getMilliseconds();
        }
    }]);
})(window);