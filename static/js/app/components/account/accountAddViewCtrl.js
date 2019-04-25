(function (app) {
    app.controller('accountAddViewCtrl', accountAddViewCtrl);

    accountAddViewCtrl.$inject = ['$scope', 'apiService', 'notificationService', '$state'];
    function accountAddViewCtrl($scope, apiService, notificationService, $state) {
        $scope.types = [
            {
                id: 1,
                name: "Owner ship"
            },
            {
                id: 2,
                name: "Viewer"
            },
            {
                id: 0,
                name: "Admin"
            }
        ];
        $scope.id = 0;

        $scope.select = select;
        $scope.addAccount = addAccount;
        $scope.useriD = itemRef.ref().child('account').push().key;
        function select(id){
            $scope.id = id;
        }

        function addAccount() {
            var params = {
                email: $scope.mail,
                username: $scope.username,
                password: $scope.password,
                type: $scope.id
            }
            apiService.insert("account/" + $scope.useriD + "/", params,
            function(){
                notificationService.displaySuccess("Add succeeded!");
                $state.go("account");
            },
            function(){
                notificationService.displayError("Add failed!");
            });
        }

        
    }
})(angular.module('vesselfinder.account'));