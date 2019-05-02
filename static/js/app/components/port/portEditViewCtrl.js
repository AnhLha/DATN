(function (app) {
    app.controller('portEditViewCtrl', portEditViewCtrl);

    portEditViewCtrl.$inject = ['$scope', 'apiService', 'notificationService', '$state', '$stateParams'];
    function portEditViewCtrl($scope, apiService, notificationService, $state, $stateParams) {
        $scope.port = {};
        $scope.idPort = $stateParams.id;

        $scope.getPort = getPort;
        $scope.updatePort = updatePort;
        $scope.drydocks = [{
            id: 1,
            name: "small"
        }, {
            id: 2,
            name: "medium"
        }, {
            id: 3,
            name: "large"
        }];
        $scope.shelters = [{
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
        $scope.sizes = [{
            id: 1,
            name: "small"
        }, {
            id: 2,
            name: "medium"
        }, {
            id: 3,
            name: "large"
        }];
        $scope.shiprepairs = [{
            id: 1,
            name: "limited"
        }, {
            id: 2,
            name: "unlimited"
        }];
        $scope.types = [{
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
        $scope.sizevessels = [{
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

        function updatePort() {
            var params ={
                dryDock: $scope.itemDD,              
                name: $scope.port.name,
                picture: "cailan.jpg",            
                shelter: $scope.itemS,
                shipRepairs: $scope.itemSR,
                size: $scope.itemSize,
                type: $scope.itemT,
                vesselSize: $scope.itemVS
            }
            apiService.update('port/'+ $stateParams.id + '/',params,
            function(){
                notificationService.displaySuccess("Update success!");
                $state.go('port');
            }, 
            function(){
                notificationService.displaySuccess("Update failed!");
            } )
        }

        getPort();
    }
})(angular.module('vesselfinder.port'));