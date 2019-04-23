(function (app) {
    app.controller('vesselAddViewCtrl', vesselAddViewCtrl);

    vesselAddViewCtrl.$inject = ['$scope', 'notificationService', '$state'];
    function vesselAddViewCtrl($scope, notificationService, $state) {
        $scope.addVessel = addVessel;
        $scope.Accounts = [];
        // get email account
        itemRef.ref('account/').on('value', function (snapshot) {
            var data = snapshot.val();
            var listAccount = [];
            angular.forEach(data, function (valAcc, keyAcc) {
                var item = {
                    id: keyAcc,
                    email: valAcc.email,
                    username: valAcc.username,
                    password: valAcc.password,
                    type: valAcc.type
                }
                listAccount.push(item);
            })
            $scope.Accounts = listAccount;
            if (!$scope.$$phase)
                $scope.$apply()
        });

        function addVessel() {
            
        }

        addVessel();
    }
})(angular.module('vesselfinder.vessel'));