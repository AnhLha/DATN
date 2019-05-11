(function () {
    angular.module('vesselfinder.port', ['vesselfinder.common']).config(config);

    config.$inject = ['$stateProvider', '$urlRouterProvider'];

    function config($stateProvider, $urlRouterProvider) {
        $stateProvider.state('port', {
            url: "/port",
            templateUrl: "/static/js/app/shared/navigation/navView.html",
            controller: "navController"
        }).state('port.list', {
            url: "/list",
            templateUrl: "/static/js/app/components/port/portListView.html",
            controller: "portListViewCtrl"
        }).state('port.detail', {
            url: "/detail/:id",
            templateUrl: "/static/js/app/components/port/portDetailView.html",
            controller: "portDetailViewCtrl"
        }).state('port.edit', {
            url: "/edit/:id",
            templateUrl: "/static/js/app/components/port/portEditView.html",
            controller: "portEditViewCtrl"
        }).state('port.add', {
            url: "/add",
            templateUrl: "/static/js/app/components/port/portAddView.html",
            controller: "portAddViewCtrl"
        });
    }
})();