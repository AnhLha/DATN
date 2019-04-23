(function () {
    angular.module('vesselfinder.mymap', ['vesselfinder.common']).config(config);

    config.$inject = ['$stateProvider', '$urlRouterProvider'];

    function config($stateProvider, $urlRouterProvider) {
        $stateProvider.state('mymap', {
            url: "/mymap",
            templateUrl: "/static/js/app/components/mymap/mymap.html",
            controller: "mymapCtrl"
        }).state('mymap_vessel_detail', {
            url: "/mymap_vessel_detail/:imo",
            templateUrl: "/static/js/app/components/mymap/vesselDetailView.html",
            controller: "vesselDetailViewCtrl"
        });
    }
})();