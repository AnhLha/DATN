(function (app) {
  app.controller('journeyAddViewCtrl', journeyAddViewCtrl);

  journeyAddViewCtrl.$inject = ['$scope', 'apiService', 'notificationService', '$state', '$stateParams'];
  function journeyAddViewCtrl($scope, apiService, notificationService, $state, $stateParams) {
    $scope.imo = $stateParams.imo;
    $scope.startDate = moment().startOf('hour').subtract(24, 'hour');
    $scope.endDate = moment().startOf('hour');
    $scope.etaEtd = $scope.startDate.format("DD/MM/YYYY hh:mm") + ' - ' + $scope.endDate.format("DD/MM/YYYY hh:mm");
    $scope.Accept = Accept;
    $scope.journeyiD = itemRef.ref().child('journey/' + $scope.imo + '/').push().key;

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

    function Accept() {
      var arr = $scope.etaEtd.split(' - ');
      $scope.startDate = moment(arr[0], "DD/MM/YYYY hh:mm").valueOf() / 1000;
      $scope.endDate = moment(arr[1], "DD/MM/YYYY hh:mm").valueOf() / 1000;
      var params = {
        eta: $scope.startDate,
        etd: $scope.endDate,
        from: $scope.from,
        to: $scope.to,
        latlngFrom: 0,
        latlngTo: 0,
        schedule: [[107.2705, 20.99282], [107.2707, 20.97282], [107.2709, 20.99482]],
        status: "false",
        trackhistory: []
      };
      apiService.insert("journey/" + $scope.imo + "/" + $scope.journeyiD + "/", params,
        function () {
          notificationService.displaySuccess("Add succeeded!");
        },
        function () {
          notificationService.displayError("Add failed!");
        })

    }
    initialize();



  }
})(angular.module('vesselfinder.vessel'));