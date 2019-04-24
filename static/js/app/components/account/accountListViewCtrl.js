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
            apiService.get("account/", null,
                function (snapshot) {
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
                    })
                    $scope.accounts = listAccount;
                    $scope.totalCount = listAccount.length;
                    if (!$scope.$$phase)
                        $scope.$apply();
                    notificationService.displaySuccess("Found account!")
                }, 
                function(){
                    notificationService.displayError("Found failed!")
                });
        }

        function search() {

        }

        function deleteAccount(id) {
            apiService.del("account/" + id + "/",
            function(){
                notificationService.displaySuccess("Remove succeeded.");
            },
            function(){
                notificationService.displayError("Remove failed: " + error.message);
            })      
        }

        $scope.getAccounts();
    }
})(angular.module('vesselfinder.account'));