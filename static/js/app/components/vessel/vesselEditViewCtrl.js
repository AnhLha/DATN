(function (app) {
    app.controller('vesselEditViewCtrl', vesselEditViewCtrl);

    vesselEditViewCtrl.$inject = ['$scope', 'apiService', 'notificationService', '$state', '$stateParams'];
    function vesselEditViewCtrl($scope, apiService, notificationService, $state, $stateParams) {
        $scope.vesselInfoData = {};
        $scope.imoVessel = $stateParams.imo;

        $scope.getVessel = getVessel;
        $scope.updateVessel = updateVessel;

        function getVessel() {

            itemRef.ref('vessel/' + $stateParams.imo + '/').once('value', function (snapshot) {
                $scope.vesselInfoData = snapshot.val();


                // get picture's vessel
                var gsRef = storageRef.refFromURL('https://firebasestorage.googleapis.com/v0/b/vessel-dc69e.appspot.com/o/images/vessels/' + $scope.vesselInfoData.picture);
                gsRef.getDownloadURL().then(function (url) {
                    $scope.picVessel = url;
                    if (!$scope.$$phase)
                        $scope.$apply();
                }).catch(function (error) {
                    // Handle any errors
                    notificationService.displayWarning("Cannot download vessel's image");
                });
                // End get picture's vessel
            });

        }

        function updateVessel() {
            var params = {
                name: $scope.vesselInfoData.name,
                type:  $scope.vesselInfoData.type,
                GT:  $scope.vesselInfoData.GT,
                DWT: $scope.vesselInfoData.DWT,
                lenght:  $scope.vesselInfoData.length,
                width:  $scope.vesselInfoData.width,
                draught:  $scope.vesselInfoData.draught
            }
            apiService.update("vessel/" + $stateParams.imo + "/",params,
            function(){
                notificationService.displaySuccess("Update success!");
                $state.go('vessel.list');
            },
            function(){
                notificationService.displaySuccess("Update failed!");
            })
        }

        getVessel();
    }
})(angular.module('vesselfinder.vessel'));