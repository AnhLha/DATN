(function (app) {
    app.controller('loginController', loginController);

    loginController.$inject = ['$scope', '$cookies', '$state', 'apiService', 'notificationService'];
    function loginController($scope, $cookies, $state, apiService, notificationService) {
        $scope.email = '';
        $scope.password = '';
        $scope.rule = 2;
        $scope.loginSuccess = false;

        $scope.login = login;

        function login() {
            if ($scope.email == null || $scope.email == '' || $scope.password == null || $scope.password == '') {
                $cookies.put('rule', $scope.rule);
            }
            else {
                apiService.login("account/", $scope.email, $scope.password,
                    function (snapshot) {
                        var accountData = snapshot.val();
                        if (accountData == null) {
                            notificationService.displayError("Login failed!")
                            $cookies.put('rule', $scope.rule);
                        }
                        else {
                            angular.forEach(accountData, function (val, key) {
                                if ($scope.password == val.password) {
                                    $cookies.put('email', val.email);
                                    $cookies.put('password', val.password);
                                    $cookies.put('rule', val.type);

                                    notificationService.displaySuccess("Login success!")
                                    $scope.loginSuccess = true;
                                    $state.go('mymap.map');
                                }
                            });
                            if ($scope.loginSuccess == false) {
                                notificationService.displayError("Login failed!");
                            }

                        }
                        if (!$scope.$$phase)
                            $scope.$apply();

                    },
                    function () {
                        notificationService.displayError("Login failed!")
                        $cookies.put('rule', $scope.rule);
                    });
            }
        }

        //$scope.login();

    }
})(angular.module('vesselfinder'));