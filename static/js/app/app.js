(function () {
    angular.module('vesselfinder', 
                ['vesselfinder.mymap',
                 'vesselfinder.vessel',
                 'vesselfinder.port',
                 'vesselfinder.account',
                 'vesselfinder.common'])
                 .config(config);

    config.$inject = ['$stateProvider', '$urlRouterProvider'];
    function config($stateProvider, $urlRouterProvider) {
        $stateProvider.state('home', {
            url: "/",
            templateUrl: "/static/js/app/components/home/homeView.html",
            controller: "homeController"
        });
        $urlRouterProvider.otherwise('/');
    }
})();