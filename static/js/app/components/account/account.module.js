(function () {
    angular.module('vesselfinder.account', ['vesselfinder.common']).config(config);

    config.$inject = ['$stateProvider', '$urlRouterProvider'];

    function config($stateProvider, $urlRouterProvider) {
        $stateProvider.state('account', {
            url: "/account",
            templateUrl: "/static/js/app/shared/navigation/navView.html",
            controller: "navController"
        }).state('account.list', {
            url: "/list",
            templateUrl: "/static/js/app/components/account/accountListView.html",
            controller: "accountListViewCtrl"
        }).state('account.edit', {
            url: "/edit/:id",
            templateUrl: "/static/js/app/components/account/accountEditView.html",
            controller: "accountEditViewCtrl"
        }).state('account.add', {
            url: "/add",
            templateUrl: "/static/js/app/components/account/accountAddView.html",
            controller: "accountAddViewCtrl"
        });
    }
})();