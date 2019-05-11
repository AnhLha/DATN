(function () {
    angular.module('vesselfinder', 
                ['vesselfinder.mymap',
                 'vesselfinder.vessel',
                 'vesselfinder.port',
                 'vesselfinder.account',
                 'vesselfinder.common',
                 'ngCookies'])
                 .config(config);

    config.$inject = ['$stateProvider', '$urlRouterProvider'];
    function config($stateProvider, $urlRouterProvider) {
        $stateProvider.state('home', {
            url: "/home",
            templateUrl: "/static/js/app/shared/navigation/navView.html",
            controller: "navController"
        }).state('home.static', {
            url: "/static",
            templateUrl: "/static/js/app/components/home/homeView.html",
            controller: "homeController"
        });
        $urlRouterProvider.otherwise('/mymap/map');
    }
})();