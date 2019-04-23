(function (app) {
    app.controller('accountListViewCtrl', accountListViewCtrl);

    accountListViewCtrl.$inject = ['$scope', 'apiService', 'notificationService'];

    function accountListViewCtrl($scope, apiService, notificationService) {
        $scope.accounts = [];
        $scope.totalCount = 0;
        $scope.keyword = '';

        $scope.getAccounts = getAccounts;
        $scope.search = search;
        $scope.deleteAccount = deleteAccount;

        function getAccounts() {

            itemRef.ref('account/').on('value', function (snapshot) {
                var accountData = snapshot.val();
                var listAccount = [];
                angular.forEach(accountData, function (value, key) {
                    var data = {
                        id: key,
                        name: value.username,
                        password: value.password,
                        email: value.email,
                        type: value.type
                    };
                    listAccount.push(data);
                    $scope.totalCount++;
                })
                $scope.accounts = listAccount;
                if (!$scope.$$phase)
                    $scope.$apply();
                notificationService.displaySuccess("Found account!")
            });
        }

        function search() {

        }

        function deleteAccount(id) {

            notificationService.displaySuccess("click delete button success")
            $scope.getPorts();
        }

        $scope.getAccounts();

    }
})(angular.module('vesselfinder.account'));