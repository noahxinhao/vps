/*路由配置*/
var applicationContextPath = $("#applicationContextPath").val();
var userInfoUrl = applicationContextPath+"/ruc/userInfo"
angular.module('mainPage', []).
    config(['$routeProvider','$locationProvider', function ($routeProvider,$locationProvider) {
        $routeProvider.
            /*when('/home', {templateUrl: 'templete/homePage/userDetail.html', controller: userDetail}).
            when('/home/userDetail', {templateUrl: 'templete/homePage/userDetail.html', controller: userDetail}).
            when('/home/vpsDetail', {templateUrl: 'templete/homePage/vpsList.html', controller: vpsDetail}).
            when('/home/setting', {templateUrl: 'templete/homePage/setting.html', controller: setting}).
            when('/home/resources', {templateUrl: 'templete/homePage/resources.html', controller: resources}).
            when('/home/myFriends', {templateUrl: 'templete/homePage/myFriends.html', controller: myFriends}).
            when('/home/myBlog', {templateUrl: 'templete/homePage/myBlog.html', controller: myBlog}).
            when('/home/friendDynamic', {templateUrl: 'templete/homePage/friendDynamic.html', controller: friendDynamic}).
            when('/vps', {redirectTo:'/'}).
            when('/index', {redirectTo:'/'}).
            when('/blog', {redirectTo:'/'}).
            otherwise({redirectTo: '/'});*/

            when('/', {templateUrl: 'templete/homePage/userDetail.html', controller: userDetail}).
            when('/userDetail', {templateUrl: 'templete/homePage/userDetail.html', controller: userDetail}).
            when('/vpsDetail', {templateUrl: 'templete/homePage/vpsList.html', controller: vpsDetail}).
            when('/setting', {templateUrl: 'templete/homePage/setting.html', controller: setting}).
            when('/resources', {templateUrl: 'templete/homePage/resources.html', controller: resources}).
            when('/myFriends', {templateUrl: 'templete/homePage/myFriends.html', controller: myFriends}).
            when('/myBlog', {templateUrl: 'templete/homePage/myBlog.html', controller: myBlog}).
            when('/friendDynamic', {templateUrl: 'templete/homePage/friendDynamic.html', controller: friendDynamic}).
            otherwise({redirectTo: '/'});
        /*$locationProvider.html5Mode(true);*/
    }]).controller("pageUrl",
    function ($scope) {
        $scope.userName = "noahli";
        $scope.pageTag = "userDetail";
        $scope.changeTag = function(text){
            $scope.pageTag = text;
        }
    });

/*控制器*/
var userDetail = ['$scope', '$http', function ($scope, $http) {
    $http.get(userInfoUrl).success(function (data) {
        if(data.success=="true"){
            var u = data.user;
            $scope.user = {
                "name": u.real_name,
                "email": u.email,
                "phone": u.phone
            };
        }
    });
    $scope.title = "基本信息"
}];

var vpsDetail = ['$scope', '$http', function ($scope, $http) {
    $http.get('../templete/homePage/vps.json').success(function (data) {
        $scope.vpsList = data;
    });
    $scope.title = "VPS信息"
}];

var setting = ['$scope', '$http', function ($scope, $http) {
    $http.get(userInfoUrl).success(function (data) {
        if(data.success=="true"){
            var u = data.user;
            $scope.user = {
                "name": u.real_name,
                "email": u.email,
                "phone": u.phone
            };
        }
    });
    $scope.title = "用户设置"
    //$scope.user = {};
    $scope.submitted = false;
    $scope.saveChange = function(){
        $("#savebtn").button("loading");
        if ($scope.settingForm.$valid) {
            var user = $scope.user;
            var settingUrl = applicationContextPath+"/set/saveUserInfo?name="+user.name+"&email="+user.email+"&phone="+user.phone;
            $http.post(settingUrl).success(function(data){
                if(data.success=="true"){
                    window.location.href = applicationContextPath+"/home";
                }else{
                    $("#savebtn").button("reset");
                }
            })
        }else{
            $("#savebtn").button("reset");
            $scope.submitted = true;
        }
    }
}];

var resources = ['$scope', '$http', function ($scope, $http) {
    $http.get('../templete/homePage/res.json').success(function (data) {
        $scope.resources = data;
    });
    $scope.title = "我的资源"
}];

var myFriends = ['$scope', '$http', function ($scope, $http) {
    $http.get('../templete/homePage/vps.json').success(function (data) {
        $scope.user = data;
    });
    $scope.title = "我的好友"
}];

var myBlog = ['$scope', '$http', function ($scope, $http) {
    $http.get('../templete/homePage/blogs.json').success(function (data) {
        $scope.blogs = data;
    });
    $scope.title = "我的博客"
}];

var friendDynamic = ['$scope', '$http', function ($scope, $http) {
    $http.get('../templete/homePage/dyn.json').success(function (data) {
        $scope.dyns = data;
    });
    $scope.title = "好友动态"
}];
