var applicationContextPath = $("#applicationContextPath").val();
angular.module('articles', []).controller("datail", function ($scope, $http) {
    $scope.js_ready = false;
    $http.get(applicationContextPath + '/rs/author/' + $scope.authorId).success(function (data) {
        if (data.success == "true") {
            $scope.author = data.author;
            $scope.js_ready = true;
        }
    });
});
