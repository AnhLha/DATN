(function (app) {
    app.controller('journeyAddViewCtrl', journeyAddViewCtrl);

    journeyAddViewCtrl.$inject = ['$scope', 'apiService', 'notificationService', '$state', '$stateParams'];
    function journeyAddViewCtrl($scope, apiService, notificationService, $state, $stateParams) {
        $scope.imo = $stateParams.imo;
        function initialize() {
            var map = L.map('leaflet-map').setView([16.0669077, 108.2137987], 5);

            L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
              attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(map);
            var iconVesselRun = L.icon({
              iconUrl: 'static/img/icon-ship/running/0/45.png',
              iconSize: [20, 20]
            });
          }   
             
            initialize();     
    }
})(angular.module('vesselfinder.vessel'));