(function (app) {
    app.controller('accountEditViewCtrl', accountEditViewCtrl);

    accountEditViewCtrl.$inject = ['$scope', 'apiService', 'notificationService', '$state', '$stateParams'];
    function accountEditViewCtrl($scope, apiService, notificationService, $state, $stateParams) {
        $scope.account = {};
        $scope.idAccount = $stateParams.id;

        $scope.getAccount = getAccount;
        $scope.updateAccount = updateAccount;


        function getAccount() {

            itemRef.ref('account/' + $stateParams.id + '/').on('value', function (snapshot) {
                $scope.account = snapshot.val();
                console.log($scope.account);
                if (!$scope.$$phase)
                    $scope.$apply();
            });

        }

        function updateAccount(){
            var params = {
                email: $scope.account.email,
                username: $scope.account.username,
                password: $scope.account.password
            }
            apiService.update('account/' + $stateParams.id + '/', params, 
                function(){
                    notificationService.displaySuccess("Update success!");
                    $state.go('account');
                }, 
                function(){
                    notificationService.displaySuccess("Update failed!");
                });
        }

        getAccount();
    }
})(angular.module('vesselfinder.account'));