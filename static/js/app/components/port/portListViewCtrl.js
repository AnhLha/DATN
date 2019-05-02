(function (app) {
    app.controller('portListViewCtrl', portListViewCtrl);

    portListViewCtrl.$inject = ['$scope', 'apiService', 'notificationService'];

    function portListViewCtrl($scope, apiService, notificationService) {
        $scope.ports = [];
        $scope.totalCount = 0;
        $scope.keyword = '';

        $scope.getPorts = getPorts;
        $scope.search = search;
        $scope.deletePort = deletePort;

        function getPorts() {
            apiService.get("port/", null,
                function (snapshot) {
                    var portData = snapshot.val();
                    var listPort = [];
                    angular.forEach(portData, function (valPort, keyPort) {
                        var data = {
                            id: keyPort,
                            name: valPort.name,
                            country: valPort.flagCode,
                            lat: valPort.lat,
                            lng: valPort.lng,
                            size: valPort.size,
                            type: valPort.type,
                            shelter: valPort.shelter,
                            vesselSize: valPort.vesselSize,
                            shipRepairs: valPort.shipRepairs,
                            picture: valPort.picture,
                            pictureFlag: valPort.pictureFlag
                        };
                        console.log(data);
                        listPort.push(data);
                    })
                    $scope.ports = listPort;
                    $scope.totalCount = listPort.length;
                    if (!$scope.$$phase) {
                        $scope.$apply()
                    }
                    notificationService.displaySuccess("Found ports!")

                    $scope.ports.forEach(function (item) {
                        // get picture's port
                        var gsRef = storageRef.refFromURL('https://firebasestorage.googleapis.com/v0/b/vessel-dc69e.appspot.com/o/images/ports/' + item.picture);
                        gsRef.getDownloadURL().then(function (url) {
                            item.picture = url;
                            if (!$scope.$$phase)
                                $scope.$apply();
                        }).catch(function (error) {
                            // Handle any errors
                            notificationService.displayWarning("Cannot download port's image");
                        });
                        // End get picture's port

                        var gsCRef = storageRef.refFromURL('https://firebasestorage.googleapis.com/v0/b/vessel-dc69e.appspot.com/o/images/country/' + item.pictureFlag);
                        // storageRef.ref('https://firebasestorage.googleapis.com/v0/b/vessel-dc69e.appspot.com/o/images/country/' + value.flagCode + '.png').getDownloadURL().then(function (url) {
                        gsCRef.getDownloadURL().then(function (url) {
                            item.pictureFlag = url;
                            if (!$scope.$$phase)
                                $scope.$apply();
                        }).catch(function (error) {
                            // Handle any errors
                            notificationService.displayWarning("Cannot download country's image");
                        });
                        if (!$scope.$$phase)
                            $scope.$apply();
                    },
                        function () {
                            notificationService.displayError("Found failed!")
                        })
                });
        }

        function search() {

        }

        function deletePort(id) {
            apiService.del("port/" + id + "/",
            function(){
                notificationService.displaySuccess("Remove succeeded.");
            },
            function(){
                notificationService.displayError("Remove failed: " + error.message);
            })        
        }
        
        $scope.getPorts();

    }
})(angular.module('vesselfinder.port'));