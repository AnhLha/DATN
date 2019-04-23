(function () {
    angular.module('vesselfinder.port', ['vesselfinder.common']).config(config);

    config.$inject = ['$stateProvider', '$urlRouterProvider'];

    function config($stateProvider, $urlRouterProvider) {
        $stateProvider.state('port', {
            url: "/port",
            templateUrl: "/static/js/app/components/port/portListView.html",
            controller: "portListViewCtrl"
        }).state('port_detail', {
            url: "/port_detail/:id",
            templateUrl: "/static/js/app/components/port/portDetailView.html",
            controller: "portDetailViewCtrl"
        }).state('port_edit', {
            url: "/port_edit/:id",
            templateUrl: "/static/js/app/components/port/portEditView.html",
            controller: "portEditViewCtrl"
        }).state('port_add', {
            url: "/port_add",
            templateUrl: "/static/js/app/components/port/portAddView.html",
            controller: "portAddViewCtrl"
        });
    }
})();