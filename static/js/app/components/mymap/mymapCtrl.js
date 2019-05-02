(function (app) {
  app.controller('mymapCtrl', mymapCtrl);

  mymapCtrl.$inject = ['$scope', 'apiService', 'notificationService'];

  function mymapCtrl($scope, apiService, notificationService) {
    $scope.vessels = [];
    $scope.vessel = {
      name: "",
      imo: "imo",
      country: "flag code",
      type: "type_vessel",
      callsign: "Callsign",
      built: '0',
      gt: '0',
      dwt: '0',
      length: '0',
      width: '0',
      picture: '',
      mssi: '',
      course: 'value.course',
      speed: 'value.speed',
      draught: 'value.draught',
      currentDraught: 'value.currentDraught',
      lastReportTime: 'value.lastReportTime',
      lat: 'value.lat',
      lng: 'value.lng'
    };

    $scope.position = {
      lng: '',
      lat: ''
    }

    var lsPosOfVessel = [];

    itemRef.ref('vessel/').on('value', function (snapshot) {
      var listImo = snapshot.val();

      lsPosOfVessel = [];
      angular.forEach(listImo, function (value, key) {

        var data = {
          position: [value.lat, value.lng],
          name: value.name,
          imo: key,
          country: value.flagCode,
          type: value.type,
          callsign: value.callsign,
          built: value.built,
          gt: value.GT,
          dwt: value.DWT,
          length: value.length,
          width: value.width,
          flagCode: value.flagCode,
          picture: value.picture,
          mssi: value.mssi,
          course: value.course,
          speed: value.speed,
          draught: value.draught,
          currentDraught: value.currentDraught,
          lastReportTime: value.lastReportTime,
          lat: value.lat,
          lng: value.lng
        };
        lsPosOfVessel.push(data);
      })


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


      // start foreach ls post of vessel data
      angular.forEach(lsPosOfVessel, function (value, key) {
        var tempvessel = L.marker(value.position, { icon: iconVesselRun }).addTo(map).bindPopup(value.name);

        // set popup for vessel in map
        var popup = L.popup()
          .setLatLng(value.position)
          .setContent(value.name)
          .openOn(map);
        // End set popup for vessel in map

        var polygon = [
          [value.position.lat - 0.001, value.position.lng - 0.001],
          [value.position.lat + 0.001, value.position.lng - 0.001],
          [value.position.lat + 0.001, value.position.lng + 0.001],
          [value.position.lat - 0.001, value.position.lng + 0.001]
        ];



        //////////////////// get data version 02 /////////////////////////////
        // struct table journey : imo/ idJourney/ {eta, etd, from, to, latlngFrom [,], latlngTo [,], schedule: [[,]], status (true/false), trackhistory}
        var latlngJourney = [];
        var polylineJourney = L.polyline(latlngJourney, { color: 'blue' });
        var latlngs = [];
        var polyline = L.polyline(latlngs, { color: 'red' });

        itemRef.ref('journey/' + value.imo + '/').once('value', function (snapshot) {
          var journeyData = snapshot.val(); // get journey data a vessel 
          angular.forEach(journeyData, function (valJourney, keyJourney) {

            if (valJourney.status == 'false') { // get unfinished journey
              /// get plan journey

              itemRef.ref('journey/' + value.imo + '/' + keyJourney + '/schedule/').on('value', function (snapshot) {
                var scheduleData = snapshot.val(); // get journey data a vessel 
                console.log(scheduleData);
                var latlnglisten = [];
                angular.forEach(scheduleData, function (val) {
                  latlnglisten.push([val[1], val[0]]);
                })
                polylineJourney.setLatLngs(latlnglisten);
              });

              /// get history journey

              itemRef.ref('journey/' + value.imo + '/' + keyJourney + '/trackhistory/').on('value', function (snapshot) {
                var timeData = snapshot.val(); // get thoi gian tung tau
                var latlngsListen = [];
                angular.forEach(timeData, function (valLatLng, keyLatLng) {
                  angular.forEach(valLatLng, function (valPos) {
                    // latlngsListen.push([parseFloat(valPos.lat), parseFloat(valPos.lng)]);
                    latlngsListen.push([valPos.lat, valPos.lng]);
                  })
                })
                polyline.setLatLngs(latlngsListen);
              });
            }
          })
        });
        //////////////////// end get data version 02 /////////////////////////////

        itemRef.ref('vessel/' + value.imo + '/').on('value', function (snapshot) {
          var vesselData = snapshot.val();
          tempvessel.setLatLng([vesselData.lat, vesselData.lng]);
        })

        // set event click a vessel in map
        
        tempvessel.on('click', function (ev) {

          $scope.vessel = {
            name: value.name,
            imo: value.imo,
            country: value.flagCode,
            type: value.type,
            callsign: value.callsign,
            built: value.built,
            gt: value.gt,
            dwt: value.dwt,
            length: value.length,
            width: value.width,
            picture: value.picture,
            mssi: value.mssi,
            course: value.course,
            speed: value.speed,
            draught: value.draught,
            currentDraught: value.currentDraught,
            lastReportTime: value.lastReportTime,
            lat: value.lat,
            lng: value.lng
          };

          // get picture's vessel
          var gsRef = storageRef.refFromURL('https://firebasestorage.googleapis.com/v0/b/vessel-dc69e.appspot.com/o/images/vessels/' + value.picture);
          gsRef.getDownloadURL().then(function (url) {
            $scope.picVessel = url;
            if (!$scope.$$phase)
              $scope.$apply();
          }).catch(function (error) {
            // Handle any errors
            notificationService.displayWarning("Cannot download vessel's image");
          });
          // End get picture's vessel

          // get picture's country
          var gsCRef = storageRef.refFromURL('https://firebasestorage.googleapis.com/v0/b/vessel-dc69e.appspot.com/o/images/country/' + value.flagCode + '.png');
          gsCRef.getDownloadURL().then(function (url) {
            $scope.picCountry = url;
            if (!$scope.$$phase)
              $scope.$apply();
          }).catch(function (error) {
            // Handle any errors
            alert("Cannot download country's image");
          });
          // End get picture's country

          // $apply()
          if (!$scope.$$phase) {
            $scope.$apply();
          }

          // End $apply()

          // function visible or disvisible trackhistory line
          $scope.trackhistoryFunc = function () {
            if (polyline._map == map) {
              map.removeLayer(polyline);
            }
            else {
              polyline.addTo(map);
              map.fitBounds(polyline.getBounds());
            }
          };
          // End function visible or disvisible trackhistory line

          // function visible or disvisible journey line
          $scope.trackJourneyFunc = function () {
            if (polylineJourney._map == map) {
              map.removeLayer(polylineJourney);
            }
            else {
              polylineJourney.addTo(map);
              map.fitBounds(polylineJourney.getBounds());
            }
          };
          // End function visible or disvisible journey line

          // show polygon on map 
          if (polygon._map == map) {
            window.polygon.remove();
          }
          else {
            //L.polygon(polygon).addTo(map);
          }
          // end show polygon in map
        });
        // End set event click a vessel in map
      })
      // end start foreach ls post of vessel data
    }
  }
})(angular.module('vesselfinder.mymap'));