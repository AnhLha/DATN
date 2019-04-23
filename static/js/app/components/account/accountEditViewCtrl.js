(function (app) {
    app.controller('accountEditViewCtrl', accountEditViewCtrl);

    accountEditViewCtrl.$inject = ['$scope', 'apiService', 'notificationService', '$state', '$stateParams'];
    function accountEditViewCtrl($scope, apiService, notificationService, $state, $stateParams) {
        $scope.account = {};
        $scope.idAccount = $stateParams.id;

        $scope.getAccount = getAccount;


        function getAccount() {

            itemRef.ref('account/' + $stateParams.id + '/').on('value', function (snapshot) {
                $scope.account = snapshot.val();
                console.log($scope.account);
                if (!$scope.$$phase)
                    $scope.$apply();
            });

        }

        $scope.updateAccount = function (userid) {
            var updated_user_info = {
                email: $scope.account.email,
                username: $scope.account.username,
                password: $scope.account.password
            };
            itemRef.ref('account/' + userid + "/").update(updated_user_info).then(function () {
                notificationService.displaySuccess("Update account!")
            }).catch(function (error) {
                notificationService.displayWarning("Cannot update account");
        })
        }


        getAccount();
    }
})(angular.module('vesselfinder.account'));