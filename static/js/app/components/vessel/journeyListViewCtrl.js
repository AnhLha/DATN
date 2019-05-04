(function (app) {
  app.controller('journeyListViewCtrl', journeyListViewCtrl);

  journeyListViewCtrl.$inject = ['$scope', 'apiService', 'notificationService', '$state', '$stateParams'];
  function journeyListViewCtrl($scope, apiService, notificationService, $state, $stateParams) {

    $scope.lsJourney = [];
    $scope.selectedJourney = {};
    $scope.polyline = L.polyline([[0, 0]], { color: 'red' });
    $scope.polylineJourney = L.polyline([0.1, 0.1], { color: 'blue' });

    // $scope.select = select;

    itemRef.ref('journey/' + $stateParams.imo + '/').on('value', function (snapshot) {
      var listJourney = snapshot.val();
      $scope.imo = $stateParams.imo;
      $scope.lsJourney = [];
      $scope.finished = true;
     
      angular.forEach(listJourney, function (valJourney, keyJourney) {
        var itemJourney = {
          idJourney: keyJourney,
          eta: moment.unix(valJourney.eta).format("DD/MM/YYYY hh:mm"),
          etd: moment.unix(valJourney.etd).format("DD/MM/YYYY hh:mm"),
          from: valJourney.from,
          to: valJourney.to,
          status: valJourney.status,
          schedule: valJourney.schedule,
          trackhistory: valJourney.trackhistory
        }
        if(itemJourney.status=='false')
        {
          $scope.finished = false;
          $scope.curFrom = itemJourney.from;
          $scope.curTo = itemJourney.to;
        }
        
        $scope.lsJourney.push(itemJourney);
        if (!$scope.$$phase)
          $scope.$apply();
      })

      // console.log($scope.lsJourney);
      initialize();

    })

    function initialize() {
      var map = L.map('leaflet-map').setView([16.0669077, 108.2137987], 5);

      L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);
      var iconVesselRun = L.icon({
        iconUrl: 'static/img/icon-ship/running/0/45.png',
        iconSize: [20, 20]
      });

      $scope.select = function (idJourney) {
        $scope.lsJourney.forEach(function (journey) {
          if (journey.idJourney == idJourney) {
            $scope.selectedJourney = journey;
            if ($scope.polyline._map == map && $scope.polylineJourney._map == map) {
              map.removeLayer($scope.polyline);
              map.removeLayer($scope.polylineJourney);
            }
            //////////////////// get data version 02 /////////////////////////////
            // struct table journey : imo/ idJourney/ {eta, etd, from, to, latlngFrom [,], latlngTo [,], schedule: [[,]], status (true/false), trackhistory}
            var latlngJourney = [];
            $scope.polylineJourney = L.polyline(latlngJourney, { color: 'blue' });
            var latlngs = [];
            $scope.polyline = L.polyline(latlngs, { color: 'red' });
            itemRef.ref('journey/' + $stateParams.imo + '/').on('value', function (snapshot) {
              var journeyData = snapshot.val(); // get journey data a vessel 
              angular.forEach(journeyData, function (valJourney, keyJourney) {

                /// get plan journey
                itemRef.ref('journey/' + $stateParams.imo + '/' + idJourney + '/schedule/').on('value', function (snapshot) {
                  var scheduleData = snapshot.val(); // get journey data a vessel 
                  // console.log(scheduleData);
                  var latlnglisten = [];
                  angular.forEach(scheduleData, function (val) {
                    latlnglisten.push([val[1], val[0]]);
                  })
                  $scope.polylineJourney.setLatLngs(latlnglisten);
                });
                $scope.polylineJourney.addTo(map);
                if (!$scope.$$phase)
                  $scope.$apply();
                /// get history journey
                itemRef.ref('journey/' + $stateParams.imo + '/' + idJourney + '/trackhistory/').on('value', function (snapshot) {
                  var timeData = snapshot.val(); // get thoi gian tung tau
                  var latlngsListen = [];
                  angular.forEach(timeData, function (valLatLng, keyLatLng) {
                    angular.forEach(valLatLng, function (valPos) {
                      // latlngsListen.push([parseFloat(valPos.lat), parseFloat(valPos.lng)]);
                      latlngsListen.push([valPos.lat, valPos.lng]);
                    })
                  })
                  $scope.polyline.setLatLngs(latlngsListen);
                });
                $scope.polyline.addTo(map);
                if (!$scope.$$phase)
                  $scope.$apply();
                // if (polyline._map == map && polylineJourney._map == map) {
                //   map.removeLayer(polyline);
                //   map.removeLayer(polylineJourney);
                // }
                // else {
                //   polyline.addTo(map);
                //   polylineJourney.addTo(map);
                //   map.fitBounds(polyline.getBounds());
                // }              
              })
            });
            //////////////////// end get data version 02 /////////////////////////////
          }
        });

      }


    }

  }
})(angular.module('vesselfinder.vessel'));