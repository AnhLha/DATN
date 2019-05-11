(function () {
    angular.module('vesselfinder.mymap', ['vesselfinder.common']).config(config);

    config.$inject = ['$stateProvider', '$urlRouterProvider'];

    function config($stateProvider, $urlRouterProvider) {
        $stateProvider.state('mymap', {
            url: "/mymap",
            templateUrl: "/static/js/app/shared/navigation/navView.html",
            controller: "navController"
        }).state('mymap.map', {
            url: "/map",
            templateUrl: "/static/js/app/components/mymap/mymap.html",
            controller: "mymapCtrl"
        }).state('mymap.vesselDetail', {
            url: "/vesselDetail/:imo",
            templateUrl: "/static/js/app/components/mymap/vesselDetailView.html",
            controller: "vesselDetailViewCtrl"
        });
    }
})();