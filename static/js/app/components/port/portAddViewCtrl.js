(function (app) {
  app.controller('portAddViewCtrl', portAddViewCtrl);

  portAddViewCtrl.$inject = ['$scope', 'apiService', 'notificationService', '$state', '$stateParams'];
  function portAddViewCtrl($scope, apiService, notificationService, $state, $stateParams) {
    $scope.picture = ' ';
    $scope.picFiles = [];

    $scope.addPort = addPort;
    $scope.countries = [
      {
        id: 1,
        flagCode: "vn",
        name: "VIET NAM"
      }, {
        id: 2,
        flagCode: "th",
        name: "THAILAND"
      }, {
        id: 3,
        flagCode: "sg",
        name: "SINGAPORE"
      }, {
        id: 4,
        flagCode: "ph",
        name: "PHILIPPINES"
      }, {
        id: 5,
        flagCode: "my",
        name: "MALAYSIA"
      }, {
        id: 6,
        flagCode: "id",
        name: "INDONESIA"
      }, {
        id: 7,
        flagCode: "la",
        name: "LAO PEOPLE'S DEMOCRATIC REPUBLIC"
      }, {
        id: 8,
        flagCode: "kh",
        name: "CAMBODIA"
      }, {
        id: 9,
        flagCode: "mm",
        name: "MYANMAR"
      }, {
        id: 10,
        flagCode: "tl",
        name: "TIMOR-LESTE"
      }, {
        id: 11,
        flagCode: "bn",
        name: "BRUNEI DARUSSALAM"
      }];
    $scope.drydocks = [
      {
        id: 1,
        name: "small"
      }, {
        id: 2,
        name: "medium"
      }, {
        id: 3,
        name: "large"
      }];
    $scope.shelters = [
      {
        id: 1,
        name: "bad"
      }, {
        id: 2,
        name: "normal"
      }, {
        id: 3,
        name: "good"
      }, {
        id: 4,
        name: "very good"
      }];
    $scope.sizes = [
      {
        id: 1,
        name: "small"
      }, {
        id: 2,
        name: "medium"
      }, {
        id: 3,
        name: "large"
      }];
    $scope.shiprepairs = [
      {
        id: 1,
        name: "limited"
      }, {
        id: 2,
        name: "unlimited"
      }];
    $scope.types = [
      {
        id: 1,
        name: "River Basin"
      }, {
        id: 2,
        name: "Fishing"
      }, {
        id: 3,
        name: "Passenger Ship"
      }, {
        id: 4,
        name: "Tankers"
      }, {
        id: 5,
        name: "Cargo Ship"
      }, {
        id: 6,
        name: "Cruise Ship"
      }];
    $scope.sizevessels = [
      {
        id: 1,
        name: "< 150m"
      }, {
        id: 1,
        name: "150m - 250m"
      }, {
        id: 1,
        name: "< 300m"
      }];
    $scope.itemDD = "";
    $scope.itemFC = "";
    $scope.itemS = "";
    $scope.itemSR = "";
    $scope.itemSize = "";
    $scope.itemT = "";
    $scope.itemVS = "";
    $scope.selectDD = selectDD;
    $scope.selectFC = selectFC;
    $scope.selectS = selectS;
    $scope.selectSR = selectSR;
    $scope.selectSize = selectSize;
    $scope.selectT = selectT;
    $scope.selectVS = selectVS;
    $scope.portiD = itemRef.ref().child('account').push().key;
    function selectDD(item) {
      $scope.itemDD = item;
    };
    function selectFC(item) {
      $scope.itemFC = item;
    };
    function selectS(item) {
      $scope.itemS = item;
    };
    function selectSR(item) {
      $scope.itemSR = item;
    };
    function selectSize(item) {
      $scope.itemSize = item;
    };
    function selectT(item) {
      $scope.itemT = item;
    };
    function selectVS(item) {
      $scope.itemVS = item;
    };

    // console.log( $scope.itemFC);

    $scope.uploadFile = function () {
     // console.log($scope.picFiles);
     
      if ($scope.picFiles.length > 0) {
        var file = $scope.picFiles[0];
        var url = '';
        var uploadTask = storageRef.ref().child('images/ports/' + file.name).put(file);

        // Register three observers:
        // 1. 'state_changed' observer, called any time the state changes
        // 2. Error observer, called on failure
        // 3. Completion observer, called on successful completion
        uploadTask.on('state_changed', function (snapshot) {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          switch (snapshot.state) {
            case firebase.storage.TaskState.PAUSED: // or 'paused'
              console.log('Upload is paused');
              break;
            case firebase.storage.TaskState.RUNNING: // or 'running'
              console.log('Upload is running');
              break;
          }
        }, function (error) {
          // Handle unsuccessful uploads
        }, function () {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
            console.log('File available at', downloadURL);
            $scope.picture = downloadURL;
            if (!$scope.$$phase)
              $scope.$apply();
          });
        });

      }
    }

    $scope.selectFiles = function (element) {
      $scope.picFiles = element.files;
    }

    function addPort() {
      
      var params = {
        dryDock: $scope.itemDD,
        flagCode: $scope.itemFC,
        lat: $scope.latitude,
        lng: $scope.longitude,
        loCode: $scope.locode,
        name: $scope.name,
        picture: $scope.picFiles[0].name,
        pictureFlag: $scope.itemFC + ".png",
        shelter: $scope.itemS,
        shipRepairs: $scope.itemSR,
        size: $scope.itemSize,
        type: $scope.itemT,
        vesselSize: $scope.itemVS
      };
      console.log(params);
      apiService.insert("port/" + $scope.portiD + "/", params,
        function () {
          notificationService.displaySuccess("Add succeeded!");
          $state.go("port.list");
        },
        function () {
          notificationService.displayError("Add failed!");
        })
    }

  }
})(angular.module('vesselfinder.port'));