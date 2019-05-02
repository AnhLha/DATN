(function (app) {
    app.controller('homeController', homeController);

    homeController.$inject = ['$scope', '$cookies', 'apiService', 'notificationService'];
    function homeController($scope, $cookies, apiService, notificationService) {
        //$rootScope.username = 'abc';
        //$rootScope.rule = 1;
        $cookies.put('username', 'abc');
    }
})(angular.module('vesselfinder'));

