(function (app) {
    app.controller('vesselEditViewCtrl', vesselEditViewCtrl);

    vesselEditViewCtrl.$inject = ['$scope', 'apiService', 'notificationService', '$state', '$stateParams'];
    function vesselEditViewCtrl($scope, apiService, notificationService, $state, $stateParams) {
        $scope.vesselInfoData = {};
        $scope.imoVessel = $stateParams.imo;

        $scope.getVessel = getVessel;
        $scope.picFiles = [];
        $scope.updateVessel = updateVessel;

        function getVessel() {

            itemRef.ref('vessel/' + $stateParams.imo + '/').once('value', function (snapshot) {
                $scope.vesselInfoData = snapshot.val();


                // get picture's vessel
                var gsRef = storageRef.refFromURL('https://firebasestorage.googleapis.com/v0/b/vessel-dc69e.appspot.com/o/images/vessels/' + $scope.vesselInfoData.picture);
                gsRef.getDownloadURL().then(function (url) {
                    $scope.picVessel = url;
                    if (!$scope.$$phase)
                        $scope.$apply();
                }).catch(function (error) {
                    // Handle any errors
                    notificationService.displayWarning("Cannot download vessel's image");
                });
                // End get picture's vessel
            });

        }

        $scope.uploadFile = function () {
            // console.log($scope.picFiles);

            if ($scope.picFiles.length > 0) {
                var file = $scope.picFiles[0];
                var url = '';
                var uploadTask = storageRef.ref().child('images/vessels/' + file.name).put(file);

                // Register three observers:
                // 1. 'state_changed' observer, called any time the state changes
                // 2. Error observer, called on failure
                // 3. Completion observer, called on successful completion
                uploadTask.on('state_changed', function (snapshot) {
                    // Observe state change events such as progress, pause, and resume
                    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + progress + '% done');
                    switch (snapshot.state) {
                        case firebase.storage.TaskState.PAUSED: // or 'paused'
                            console.log('Upload is paused');
                            break;
                        case firebase.storage.TaskState.RUNNING: // or 'running'
                            console.log('Upload is running');
                            break;
                    }
                }, function (error) {
                    // Handle unsuccessful uploads
                }, function () {
                    // Handle successful uploads on complete
                    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                    uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
                        console.log('File available at', downloadURL);
                        $scope.picVessel = downloadURL;
                        if (!$scope.$$phase)
                            $scope.$apply();
                    });
                });

            }
        }

        $scope.selectFiles = function (element) {
            $scope.picFiles = element.files;
        }

        function updateVessel() {
            var params = {
                name: $scope.vesselInfoData.name,
                type: $scope.vesselInfoData.type,
                GT: $scope.vesselInfoData.GT,
                DWT: $scope.vesselInfoData.DWT,
                lenght: $scope.vesselInfoData.length,
                width: $scope.vesselInfoData.width,
                draught: $scope.vesselInfoData.draught,
                picture: $scope.picFiles[0].name
            }
            apiService.update("vessel/" + $stateParams.imo + "/", params,
                function () {
                    notificationService.displaySuccess("Update success!");
                    $state.go('vessel.list');
                },
                function () {
                    notificationService.displaySuccess("Update failed!");
                })
        }
        getVessel();
    }
})(angular.module('vesselfinder.vessel'));