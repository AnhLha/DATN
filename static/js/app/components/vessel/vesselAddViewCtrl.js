(function (app) {
    app.controller('vesselAddViewCtrl', vesselAddViewCtrl);

    vesselAddViewCtrl.$inject = ['$scope', 'apiService', '$state', 'notificationService', '$state'];
    function vesselAddViewCtrl($scope, apiService, $state, notificationService, $state) {
        $scope.Accounts = [];
        $scope.picture = ' ';
        $scope.picFiles = [];

        $scope.addVessel = addVessel;

        $scope.countries = [{
            id: 1,
            flagCode: "vn",
            name: "VIET NAM"
        },
        {
            id: 2,
            flagCode: "th",
            name: "THAILAND"
        },
        {
            id: 3,
            flagCode: "sg",
            name: "SINGAPORE"
        },
        {
            id: 4,
            flagCode: "ph",
            name: "PHILIPPINES"
        },
        {
            id: 5,
            flagCode: "my",
            name: "MALAYSIA"
        },
        {
            id: 6,
            flagCode: "id",
            name: "INDONESIA"
        },
        {
            id: 7,
            flagCode: "la",
            name: "LAO PEOPLE'S DEMOCRATIC REPUBLIC"
        },
        {
            id: 8,
            flagCode: "kh",
            name: "CAMBODIA"
        },
        {
            id: 9,
            flagCode: "mm",
            name: "MYANMAR"
        },
        {
            id: 10,
            flagCode: "tl",
            name: "TIMOR-LESTE"
        },
        {
            id: 11,
            flagCode: "bn",
            name: "BRUNEI DARUSSALAM"
        }
        ]
        $scope.itemFC = "";
        $scope.selectFC = selectFC;
        // get email account
        itemRef.ref('account/').once('value', function (snapshot) {
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

        $scope.idAcc;
        $scope.select = function (idAcc) {
            $scope.Accounts.forEach(function (acc) {
                if (acc.id == idAcc) {
                    $scope.idAcc = idAcc
                }
            })
        };

        function selectFC(item) {
            $scope.itemFC = item;
        };

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
                        $scope.picture = downloadURL;
                        if (!$scope.$$phase)
                            $scope.$apply();
                    });
                });

            }
        }

        $scope.selectFiles = function (element) {
            $scope.picFiles = element.files;
        }

        function addVessel() {
            var vesseliD = $scope.imo;
            console.log(vesseliD);
            var params = {
                DWT: $scope.dwt,
                GT: $scope.gt,
                accountId: $scope.idAcc,
                built: $scope.built,
                callsign: $scope.callsign,
                draught: $scope.draught,
                flagCode: $scope.itemFC,
                length: $scope.length,
                mssi: $scope.mssi,
                name: $scope.name,
                picture: $scope.picFiles[0].name,
                type: $scope.type,
                width: $scope.draught,
                course: 90
            }

            apiService.insert("vessel/" + vesseliD + "/", params,
                function () {
                    notificationService.displaySuccess("Add succeeded!");
                    $state.go("vessel.list");
                },
                function () {
                    notificationService.displayError("Add failed!");
                })
        }

    }
})(angular.module('vesselfinder.vessel'));