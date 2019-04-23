(function (app) {
    app.controller('vesselAddViewCtrl', vesselAddViewCtrl);

    vesselAddViewCtrl.$inject = ['$scope', 'notificationService', '$state'];
    function vesselAddViewCtrl($scope, notificationService, $state) {
        $scope.addVessel = addVessel;

        // get email account
        itemRef.ref('account/1/').on('value', function (snapshot) {
            $scope.listAccount = snapshot.val()           
            if (!$scope.$$phase)
                $scope.$apply()
        });
        console.log($scope.listAccount)
        function addVessel() {
           
        }

        addVessel();
    }
})(angular.module('vesselfinder.vessel'));