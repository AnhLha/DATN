(function () {
    angular.module('vesselfinder.vessel', ['vesselfinder.common']).config(config);

    config.$inject = ['$stateProvider', '$urlRouterProvider'];

    function config($stateProvider, $urlRouterProvider) {
        $stateProvider.state('vessel', {
            url: "/vessel",
            templateUrl: "/static/js/app/shared/navigation/navView.html",
            controller: "navController"
        }).state('vessel.list', {
            url: "/list",
            templateUrl: "/static/js/app/components/vessel/vesselListView.html",
            controller: "vesselListViewCtrl"
        }).state('vessel.detail', {
            url: "/detail/:imo",
            templateUrl: "/static/js/app/components/vessel/vesselDetailView.html",
            controller: "vesselDetailViewCtrl"
        }).state('vessel.edit', {
            url: "/edit/:imo",
            templateUrl: "/static/js/app/components/vessel/vesselEditView.html",
            controller: "vesselEditViewCtrl"
        }).state('vessel.add', {
            url: "/add",
            templateUrl: "/static/js/app/components/vessel/vesselAddView.html",
            controller: "vesselAddViewCtrl"
        }).state('vessel.journey', {
            url: "/journey/:imo",
            templateUrl: "/static/js/app/components/vessel/journeyListView.html",
            controller: "journeyListViewCtrl"
        }).state('vessel.add_journey', {
            url: "/add/:imo",
            templateUrl: "/static/js/app/components/vessel/journeyAddView.html",
            controller: "journeyAddViewCtrl"
        });
    }
})();