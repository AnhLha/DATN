(function (app) {
    app.controller('portEditViewCtrl', portEditViewCtrl);

    portEditViewCtrl.$inject = ['$scope', 'apiService', 'notificationService', '$state', '$stateParams'];
    function portEditViewCtrl($scope, apiService, notificationService, $state, $stateParams) {
        $scope.port = {};
        $scope.idPort = $stateParams.id;
        $scope.getPort = getPort;

        $scope.picFiles = [];
        $scope.updatePort = updatePort;
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
        $scope.itemS = "";
        $scope.itemSR = "";
        $scope.itemSize = "";
        $scope.itemT = "";
        $scope.itemVS = "";
        $scope.selectDD = selectDD;
        $scope.selectS = selectS;
        $scope.selectSR = selectSR;
        $scope.selectSize = selectSize;
        $scope.selectT = selectT;
        $scope.selectVS = selectVS;
        function selectDD(item) {
            $scope.itemDD = item;
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
        }

        function getPort() {
            itemRef.ref('port/' + $scope.idPort + '/').on('value', function (snapshot) {
                $scope.port = snapshot.val();
                console.log($scope.port)

                // get picture's vessel
                var gsRef = storageRef.refFromURL('https://firebasestorage.googleapis.com/v0/b/vessel-dc69e.appspot.com/o/images/ports/' + $scope.port.picture);
                gsRef.getDownloadURL().then(function (url) {
                    $scope.picPort = url;
                    if (!$scope.$$phase)
                        $scope.$apply();
                }).catch(function (error) {
                    // Handle any errors
                    notificationService.displayWarning("Cannot download vessel's image");
                });
                // End get picture's vessel
            });

        }

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
                        $scope.picPort = downloadURL;
                        if (!$scope.$$phase)
                            $scope.$apply();
                    });
                });

            }
        }

        $scope.selectFiles = function (element) {
            $scope.picFiles = element.files;
        }

        function updatePort() {
            var params = {
                dryDock: $scope.itemDD,
                name: $scope.port.name,
                picture: $scope.picFiles[0].name,
                shelter: $scope.itemS,
                shipRepairs: $scope.itemSR,
                size: $scope.itemSize,
                type: $scope.itemT,
                vesselSize: $scope.itemVS
            }
            apiService.update('port/' + $stateParams.id + '/', params,
                function () {
                    notificationService.displaySuccess("Update success!");
                    $state.go('port.list');
                },
                function () {
                    notificationService.displaySuccess("Update failed!");
                })
        }

        getPort();
    }
})(angular.module('vesselfinder.port'));