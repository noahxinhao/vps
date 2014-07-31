angular.module('phonecat', []).
    config(['$routeProvider', function($routeProvider) {
        $routeProvider.
            when('/phones', {templateUrl: 'partials/phone-list.html',   controller: PhoneListCtrl}).
            when('/phones/:phoneId', {templateUrl: 'partials/phone-detail.html', controller: PhoneDetailCtrl}).
            otherwise({redirectTo: '/phones'});
    }]);

var phones = [
    {"name": "iphone5s",
        "snippet": "Fast just got faster with Nexus S.",
        "id": 1,"price":4000,"date":"2014/5/9","imageUrl":"img/phoneImg/iphone.jpeg"},
    {"name": "Motorola XOOM™ with Wi-Fi",
        "snippet": "The Next, Next Generation tablet.",
        "id": 2,"price":3500,"date":"2014/5/9","imageUrl":"img/phoneImg/moto.jpg"},
    {"name": "Iphone4",
        "snippet": "The Next, Next Generation tablet.",
        "id": 3,"price":4500,"date":"2014/5/9","imageUrl":"img/phoneImg/sanxing.jpg"},
    {"name": "MOTOROLA XOOM™",
        "snippet": "The Next, Next Generation tablet.",
        "id": 4,"price":5000,"date":"2014/5/9","imageUrl":"img/phoneImg/xiaomi.jpg"},
    {"name": "MOTOROLA XOOM™",
        "snippet": "The Next, Next Generation tablet.",
        "id": 5,"price":5000,"date":"2014/5/9","imageUrl":"img/phoneImg/moto.jpg"},
    {"name": "MOTOROLA XOOM™",
        "snippet": "The Next, Next Generation tablet.",
        "id": 6,"price":5000,"date":"2014/5/9","imageUrl":"img/phoneImg/iphone.jpeg"},
    {"name": "MOTOROLA XOOM™",
        "snippet": "The Next, Next Generation tablet.",
        "id": 7,"price":5000,"date":"2014/5/9","imageUrl":"img/phoneImg/xiaomi.jpg"}
];

/*定义控制器*/
function PhoneListCtrl($scope) {
    $scope.phones = phones;
}

function PhoneDetailCtrl($scope, $routeParams) {
    $scope.phoneId = $routeParams.phoneId;
    $scope.phones = phones;
}