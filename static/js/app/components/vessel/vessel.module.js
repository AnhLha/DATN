(function () {
    angular.module('vesselfinder.vessel', ['vesselfinder.common']).config(config);

    config.$inject = ['$stateProvider', '$urlRouterProvider'];

    function config($stateProvider, $urlRouterProvider) {
        $stateProvider.state('vessel', {
            url: "/vessel",
            templateUrl: "/static/js/app/components/vessel/vesselListView.html",
            controller: "vesselListViewCtrl"
        }).state('vessel_detail', {
            url: "/vessel_detail/:imo",
            templateUrl: "/static/js/app/components/vessel/vesselDetailView.html",
            controller: "vesselDetailViewCtrl"
        }).state('vessel_edit', {
            url: "/vessel_edit/:imo",
            templateUrl: "/static/js/app/components/vessel/vesselEditView.html",
            controller: "vesselEditViewCtrl"
        }).state('vessel_add', {
            url: "/vessel_add",
            templateUrl: "/static/js/app/components/vessel/vesselAddView.html",
            controller: "vesselAddViewCtrl"
        }).state('journey', {
            url: "/journey/:imo",
            templateUrl: "/static/js/app/components/vessel/journeyListView.html",
            controller: "journeyListViewCtrl"
        }).state('journey_add', {
            url: "/journey_add/:imo",
            templateUrl: "/static/js/app/components/vessel/journeyAddView.html",
            controller: "journeyAddViewCtrl"
        });
    }
})();