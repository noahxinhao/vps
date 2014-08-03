angular.module('phonecat', ['phonecatFilters']).
    config(['$routeProvider', function ($routeProvider) {
        $routeProvider.
            when('/all', {templateUrl: 'partials/phone-list.html', controller: PhoneListCtrl}).
            when('/details/:phoneId', {templateUrl: 'partials/phone-detail.html', controller: PhoneDetailCtrl}).
            otherwise({redirectTo: '/all'});
    }]);
/*过滤器*/
angular.module('phonecatFilters', []).filter('checkmark',function () {
    return function (input) {
        return input ? '\u2713' : '\u2718';
    };
}).filter('checkPrice',function () {
        return function (input) {
            if (input > 4000) {
                return '比较贵'
            }
            if (input > 3000 && input < 4000) {
                return '价格中等'
            }
            if (input < 3000) {
                return '价格便宜'
            }
            return input > 4000 ? '贵' : '便宜';
        };
    }).filter('checkPrice2', function () {
        return function (input) {
            if (input > 3500) {
                return '不建议购买'
            }
            if (input <= 3500) {
                return '建议购买'
            }
        };
    });

var PhoneListCtrl = ['$scope', '$http', function ($scope, $http) {
    $http.get('phones.json').success(function (data) {
        $scope.phones = data;
    });
    $scope.query = '';
    $scope.selectText = '请选择排序规则';
    $scope.seachPhones = function () {
        $scope.orderText = $scope.order;
        $scope.queryText = $scope.query;
    };
    var km = {"按编号排序": "id", "按价格排序": "price", "按日期排序": "date"}
    $scope.changeSelect = function (text) {
        $scope.selectText = text;
        $scope.order = km[text];
    };
}];

var PhoneDetailCtrl = ['$scope', '$http', '$routeParams', function ($scope, $http, $routeParams) {
    $scope.phoneId = $routeParams.phoneId;
    $http.get('phones.json').success(function (data) {
        $scope.phones = data;
    });
    $scope.mainImageUrl = null;
    $scope.setImage = function (imageUrl) {
        $scope.mainImageUrl = imageUrl;
    }
}];
