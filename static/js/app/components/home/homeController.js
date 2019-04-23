(function (app) {
    app.controller('homeController', homeController);

    homeController.$inject = ['$scope', 'apiService', 'notificationService'];
    function homeController($scope, apiService, notificationService) {
        $scope.numbTargets = 0;
        $scope.numbDevices = 0;
        $scope.numbProfiles = 0;
        $scope.targets = [];
        $scope.totalCount = 0;

        $scope.getStatic = getStatic;
        $scope.getTargets = getTargets;

        function getStatic(){
            var config = {}
            apiService.get('/api/static/getall', config, function (result) {
                
                $scope.numbTargets = result.data.numbTargets;
                $scope.numbDevices = result.data.numbDevices;
                $scope.numbProfiles = result.data.numbProfiles;

            }, function () {                   //failure function
                console.log('Load static failed.');
            });
        }

        function getTargets(){
            //$scope.page = $scope.page || 0;
            var config = {
                params: {
                    keyword: ""
                }
            }
            apiService.get('/api/target/getall', config, function (result) {
                if (result.data.TotalCount == 0) {
                    notificationService.displayWarning('Have no targets');
                }
                
                $scope.targets = result.data.items;
                $scope.totalCount = result.data.totalCount;
            }, function () {
                console.log('Load product failed.');
            });
        }

        
        //$scope.getStatic();
        //$scope.getTargets();
    }
})(angular.module('vesselfinder'));