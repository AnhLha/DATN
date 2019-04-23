(function (app) {
    app.controller('vesselDetailViewCtrl', vesselDetailViewCtrl);

    vesselDetailViewCtrl.$inject = ['$scope', 'apiService', 'notificationService', '$state', '$stateParams'];
    function vesselDetailViewCtrl($scope, apiService, notificationService, $state, $stateParams) {
        $scope.vesselInfoData = {};
        $scope.imoVessel = $stateParams.imo;
        $scope.picVessel = '';
        $scope.picCountry = '';

        $scope.getVessel = getVessel;

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

                // var spaceRefCountry = storageRef.child('/images/country/' + value.flagCode +'.png?alt=media&token=a283be66-f43b-4a4e-b7cf-774682186a14');
                var gsCRef = storageRef.refFromURL('https://firebasestorage.googleapis.com/v0/b/vessel-dc69e.appspot.com/o/images/country/' + $scope.vesselInfoData.flagCode + '.png');
                // storageRef.ref('https://firebasestorage.googleapis.com/v0/b/vessel-dc69e.appspot.com/o/images/country/' + value.flagCode + '.png').getDownloadURL().then(function (url) {
                gsCRef.getDownloadURL().then(function (url) {
                    $scope.picCountry = url;
                    if (!$scope.$$phase)
                        $scope.$apply();
                }).catch(function (error) {
                    // Handle any errors
                    alert("Cannot download country's image");
                });
                if (!$scope.$$phase)
                    $scope.$apply();
            });

        }

        getVessel();
    }
})(angular.module('vesselfinder.vessel'));