(function (app) {
    app.controller('loginController', loginController);

    loginController.$inject = ['$scope', '$rootScope', 'apiService', 'notificationService'];
    function loginController($scope, $rootScope, apiService, notificationService) {
        $root.username = 'abc';
        //$rootScope.rule = 1;
    }
})(angular.module('vesselfinder'));