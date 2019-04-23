(function (app) {
    app.controller('portDetailViewCtrl', portDetailViewCtrl);

    portDetailViewCtrl.$inject = ['$scope', 'apiService', 'notificationService', '$state', '$stateParams'];

    function portDetailViewCtrl($scope, apiService, notificationService, $state, $stateParams) {
        $scope.port = {};
        $scope.idPort = $stateParams.id;
        $scope.picPort = '';
        $scope.picCountry = '';

        $scope.getPort = getPort;

        function getPort() {

            itemRef.ref('port/' + $scope.idPort + '/').once('value', function (snapshot) {
                $scope.port = snapshot.val();
                console.log($scope.port)

                // get picture's port
                var gsRef = storageRef.refFromURL('https://firebasestorage.googleapis.com/v0/b/vessel-dc69e.appspot.com/o/images/ports/' + $scope.port.picture);
                gsRef.getDownloadURL().then(function (url) {
                    $scope.picPort = url;
                    if (!$scope.$$phase) {
                        $scope.$apply()
                    }
                }).catch(function (error) {
                    // Handle any errors
                    notificationService.displayWarning("Cannot download vessel's image");
                });
                // End get picture's port

                var gsCRef = storageRef.refFromURL('https://firebasestorage.googleapis.com/v0/b/vessel-dc69e.appspot.com/o/images/country/' + $scope.port.pictureFlag);
                // storageRef.ref('https://firebasestorage.googleapis.com/v0/b/vessel-dc69e.appspot.com/o/images/country/' + value.flagCode + '.png').getDownloadURL().then(function (url) {
                gsCRef.getDownloadURL().then(function (url) {
                    $scope.picCountry = url;
                    if (!$scope.$$phase)
                        $scope.$apply();
                }).catch(function (error) {
                    // Handle any errors
                    notificationService.displayWarning("Cannot download country's image");
                });
            });

        }

        getPort();
    }
})(angular.module('vesselfinder.port'));