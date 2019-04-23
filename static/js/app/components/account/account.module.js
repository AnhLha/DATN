(function () {
    angular.module('vesselfinder.account', ['vesselfinder.common']).config(config);

    config.$inject = ['$stateProvider', '$urlRouterProvider'];

    function config($stateProvider, $urlRouterProvider) {
        $stateProvider.state('account', {
            url: "/account",
            templateUrl: "/static/js/app/components/account/accountListView.html",
            controller: "accountListViewCtrl"
        }).state('account_edit', {
            url: "/account_edit/:id",
            templateUrl: "/static/js/app/components/account/accountEditView.html",
            controller: "accountEditViewCtrl"
        }).state('account_add', {
            url: "/account_add",
            templateUrl: "/static/js/app/components/account/accountAddView.html",
            controller: "accountAddViewCtrl"
        });
    }
})();