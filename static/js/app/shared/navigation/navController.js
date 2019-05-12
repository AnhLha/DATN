(function (app) {
    app.controller('navController', navController);

    navController.$inject = ['$scope', '$cookies', '$state', 'apiService', 'notificationService'];
    function navController($scope, $cookies, $state, apiService, notificationService) {
        //$rootScope.username = 'abc';
        //$rootScope.rule = 1;
        $scope.email = '';
        $scope.password = '';
        $scope.username = '';
        $scope.rule = 2;
        $scope.isLogin = false;

        $scope.checkLogin = checkLogin;
        $scope.logout = logout;

        function checkLogin() {
            $scope.email = $cookies.get('email');
            $scope.password = $cookies.get('password');

            if ($scope.email == null || $scope.email == '' || $scope.password == null || $scope.password == '') {
                $cookies.put('rule', $scope.rule);
            }
            else {
                apiService.login("account/", $scope.email, $scope.password,
                    function (snapshot) {
                        var accountData = snapshot.val();
                        if (accountData == null) {
                            $cookies.put('rule', $scope.rule);
                        }
                        else{
                            angular.forEach(accountData, function (val,key) {
                                if ($scope.email == val.email) {
                                    $cookies.put('rule', val.type);
                                    $scope.username = val.username;
                                    $scope.rule = val.type;
                                    $scope.isLogin = true;
                                }
                            })
                        }
                        if (!$scope.$$phase)
                            $scope.$apply();
                        //notificationService.displaySuccess("Found account!")
                    },
                    function () {
                        notificationService.displayError("Session failed!")
                        $cookies.put('rule', $scope.rule);
                    });
            }
        }

        function logout(){
            $cookies.remove('email');
            $cookies.remove('password');
            $scope.isLogin = false;
            $state.go("login", {});
        }

        $scope.checkLogin();
    }
})(angular.module('vesselfinder'));
