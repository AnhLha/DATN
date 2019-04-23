(function (app) {
    app.controller('portEditViewCtrl', portEditViewCtrl);

    portEditViewCtrl.$inject = ['$scope', 'apiService', 'notificationService', '$state', '$stateParams'];
    function portEditViewCtrl($scope, apiService, notificationService, $state, $stateParams) {
        $scope.port = {};
        $scope.idPort = $stateParams.id;

        $scope.getPort = getPort;
        $scope.updatePort = updatePort;

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
        }

        getPort();
    }
})(angular.module('vesselfinder.port'));