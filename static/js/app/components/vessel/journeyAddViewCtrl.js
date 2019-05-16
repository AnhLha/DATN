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
    $scope.vesselMove = false;

    $scope.listMarker = [];
    $scope.voyage = L.polyline([], { color: 'blue' });
   

    // var position = [];
    // $scope.polylineJourney = L.polyline([], { color: 'blue' });

    $scope.mymap = L.map('leaflet-map').setView([16.0669077, 108.2137987], 5);
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo($scope.mymap);
    $scope.voyage.addTo($scope.mymap);
    $scope.mymap.on("click", function (e) {
      var iconVesselRun = L.icon({
        iconUrl: 'static/img/icon-ship/running/1/pin.png',
        iconSize: [20, 20]
      });

      var vesselMarker = new L.marker(e.latlng, { icon: iconVesselRun, draggable: 'true' })
        .addTo($scope.mymap);
      
        $scope.listMarker.push(vesselMarker);
        drawVoyage();
      //set event dragend
      vesselMarker.on('dragend', function (event) {
        position = vesselMarker.getLatLng();
        vesselMarker.setLatLng(position, {
          draggable: 'true'
        });
        drawVoyage();
      });

      //$scope.polylineJourney.push(position);
      //console.log($scope.polylineJourney);
    });

    function drawVoyage(){
      var voyage = [];
      $scope.listMarker.forEach(marker => {
        voyage.push(marker.getLatLng());
      });
      $scope.voyage.setLatLngs(voyage);
      //$scope.voyage.addTo($scope.mymap);
     //console.log($scope.voyage.getLatLngs());
    }

    
    function Accept() {
      var arr = $scope.etaEtd.split(' - ');
      $scope.startDate = moment(arr[0], "DD/MM/YYYY hh:mm").valueOf() / 1000;
      $scope.endDate = moment(arr[1], "DD/MM/YYYY hh:mm").valueOf() / 1000;
      var voyage = [];
      $scope.voyage.getLatLngs().forEach(pos => {
        voyage.push([pos.lng,pos.lat]);
      });
      console.log(voyage);
      var params = {
        eta: $scope.startDate,
        etd: $scope.endDate,
        from: $scope.from,
        to: $scope.to,
        latlngFrom: 0,
        latlngTo: 0,
        schedule: voyage,
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
    //initialize();



  }
})(angular.module('vesselfinder.vessel'));