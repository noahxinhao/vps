var applicationContextPath = $("#applicationContextPath").val();
angular.module('articles', []).controller("datail",function($scope,$http){
    $scope.author = {
        "name":"noahxinhao",
        "img":"http://vps.imdou8.com/images/u/183841370836_b892c9.jpg"
    }
});
var articleController = ['$scope', '$http', function ($scope, $http) {
    $scope.js_ready = false;
    //$http.get(applicationContextPath+'/rs/article/'+$("#article_id").value()).success(function (data) {
    $http.get(applicationContextPath+'/rs/article/955651183841370836').success(function (data) {
        if(data.success=="true"){
            $scope.article = data.article;
        }
    });
}];