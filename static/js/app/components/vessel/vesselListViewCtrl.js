(function (app) {
    app.controller('vesselListViewCtrl', vesselListViewCtrl);

    vesselListViewCtrl.$inject = ['$scope', 'apiService', 'notificationService'];

    function vesselListViewCtrl($scope, apiService, notificationService) {
        $scope.vessels = [];
        $scope.totalCount = 0;
        $scope.keyword = '';

        $scope.getVessels = getVessels;
        $scope.search = search;
        $scope.deleteVessel = deleteVessel;

        function getVessels() {
            itemRef.ref('vessel/').on('value', function (snapshot) {
                var vesselData = snapshot.val();
                var listVessel = [];
                angular.forEach(vesselData, function (value, key) {
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
                    listVessel.push(data);
                    $scope.totalCount = listVessel.length;
                })
                $scope.vessels = listVessel;
                
                if(!$scope.$$phase)
                    $scope.$apply();
                
                notificationService.displaySuccess("Found vessels!")
            });
        }

        function search() {
            getVessels();
        }

        function deleteVessel(imo) {
            apiService.del("vessel/" + imo + "/",
            function(){
                notificationService.displaySuccess("Remove succeeded.");
            },
            function(){
                notificationService.displayError("Remove failed: " + error.message);
            })
        }

        $scope.getVessels();

    }
})(angular.module('vesselfinder.vessel'));