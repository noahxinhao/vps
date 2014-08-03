/*路由配置*/
angular.module('mainPage', []).
    config(['$routeProvider','$locationProvider', function ($routeProvider,$locationProvider) {
        $routeProvider.
            when('/home', {templateUrl: 'templete/homePage/userDetail.html', controller: userDetail}).
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
            otherwise({redirectTo: '/home/'});
        $locationProvider.html5Mode(true);
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
    $http.get('../templete/homePage/user.json').success(function (data) {
        $scope.user = data;
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
    $http.get('../templete/homePage/vps.json').success(function (data) {
        $scope.user = data;
    });
    $scope.title = "用户设置"
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
