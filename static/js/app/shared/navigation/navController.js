(function (app) {
    app.controller('navController', navController);

    navController.$inject = ['$scope', '$cookies', 'apiService', 'notificationService'];
    function navController($scope, $cookies, apiService, notificationService) {
        //$rootScope.username = 'abc';
        //$rootScope.rule = 1;
        $scope.username = 'Chos';
    }
})(angular.module('vesselfinder'));
