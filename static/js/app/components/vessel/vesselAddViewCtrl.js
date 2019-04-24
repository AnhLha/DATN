(function (app) {
    app.controller('vesselAddViewCtrl', vesselAddViewCtrl);

    vesselAddViewCtrl.$inject = ['$scope', 'notificationService', '$state'];
    function vesselAddViewCtrl($scope, notificationService, $state) {
        $scope.addVessel = addVessel;
        $scope.Accounts = [];
        // get email account
        itemRef.ref('account/').on('value', function (snapshot) {
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
            $scope.lsJourney.forEach(function (Accounts) {
                if (Accounts.id == idAcc) {
                    $scope.selectedJourney = journey;
                    $scope.idAcc = idAcc
                }
            })
        };
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
        function addVessel() {
            var vessel = {
                DWT: $scope.dwt,
                GT: $scope.gt,
                accountId: $scope.idAcc,
                built: $scope.built,
                callsign: $scope.callsign,
                draught: $scope.draught,
                flagCode: $scope.flagCode

            }
        }
        addVessel();
    }
})(angular.module('vesselfinder.vessel'));