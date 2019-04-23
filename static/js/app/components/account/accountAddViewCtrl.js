(function (app) {
    app.controller('accountAddViewCtrl', accountAddViewCtrl);

    accountAddViewCtrl.$inject = ['$scope', 'apiService', 'notificationService', '$state', '$stateParams'];
    function accountAddViewCtrl($scope, apiService, notificationService, $state, $stateParams) {

    }
})(angular.module('vesselfinder.account'));