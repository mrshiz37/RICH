angular.module('recordRemote', ['nodes'])
    .controller('recordRemoteCtrl', function($scope, $http, $location, $timeout, $state, $ionicHistory, $ionicPopup, nodeService) {
        $scope.formData = {};
        $scope.formData.alternateView = false;
        nodeService.getNodes(function(nodes) {
            $scope.formData.nodes = nodes;
        });

        $scope.$on('$ionicView.enter', function() {
            var newScriptPopup = $ionicPopup.show({
                templateUrl: 'templates/partials/recordRemotePopup.html',
                title: 'New Remote',
                scope: $scope,
                buttons: [{
                        text: 'Cancel'
                    },
                    {
                        text: '<b>Save</b>',
                        type: 'button-positive',
                        onTap: function(e) {
                            if (!$scope.formData.selectedPopupNode) {
                                e.preventDefault();
                            } else {
                                return $scope.formData.selectedPopupNode;
                            }
                        }
                    }
                ]
            });
            newScriptPopup.then(function(res) {
                $scope.formData.node = res;
                $http.get('http://' + $scope.formData.node.ip_address + ':3000/recordRemoteBackend/getRemoteButtons').success(function(data) {
                    $scope.buttons = data;
                });
                getData();
            });
        });

        $scope.startRecording = function() {
            $http.get('http://' + $scope.formData.node.ip_address + ':3000/recordRemoteBackend/startRecording', {
                params: {
                    custom_name: $scope.formData.custom_name
                }
            }).success(function(data) {});

            $scope.output = "Now start pressing buttons on your remote control. " +
                "It is very important that you press many different buttons and hold them " +
                "down for approximately one second. Do not stop pressing buttons until this page changes";

            $scope.formData.alternateView = !$scope.formData.alternateView;
        };

        $scope.formData.initFlag = true;
        $scope.formData.buttonFlag = false;
        $scope.formData.remoteFlag = false;
        $scope.formData.toggleFlag = false;
        $scope.formData.savedFlag = false;

        var loadTime = 500; //Load the data every second
        var errorCount = 0; //Counter for the server errors
        var loadPromise; //Pointer to the promise created by the Angular $timout service

        var buttonReg = new RegExp("Please enter the name for the next button*");
        var remoteReg = new RegExp("Now hold down button*");
        var toggleReg = new RegExp("Checking for toggle bit mask*");
        var savedReg = new RegExp("Successfully written config file*");

        var getData = function() {
            $http.get('http://' + $scope.formData.node.ip_address + ':3000/recordRemoteBackend/getRecordOutput')
                .success(function(data) {
                    console.log(data);
                    if (data === "") {

                    } else if (buttonReg.test(data)) {
                        $scope.formData.buttonFlag = true;
                        $scope.formData.initFlag = false;
                        $scope.formData.remoteFlag = false;
                        $scope.formData.toggleFlag = false;
                        $scope.formData.savedFlag = false;
                        $scope.output = "Now, choose a button you want to record on your remote from the list below. " +
                            "If you are finished recording, do not choose a button and press Submit";
                    } else if (remoteReg.test(data)) {
                        $scope.formData.buttonFlag = false;
                        $scope.formData.initFlag = false;
                        $scope.formData.remoteFlag = true;
                        $scope.formData.toggleFlag = false;
                        $scope.formData.savedFlag = false;
                        $scope.output = "Now press and hold down that button until this screen changes.";
                    } else if (toggleReg.test(data)) {
                        $scope.formData.buttonFlag = false;
                        $scope.formData.initFlag = false;
                        $scope.formData.remoteFlag = false;
                        $scope.formData.toggleFlag = true;
                        $scope.formData.savedFlag = false;
                        $scope.output = "Now press any button as fast as possible without holding the button down. " +
                            "Keep pressing the button until this screen changes";
                    } else if (savedReg.test(data)) {
                        $scope.formData.buttonFlag = false;
                        $scope.formData.initFlag = false;
                        $scope.formData.remoteFlag = false;
                        $scope.formData.toggleFlag = false;
                        $scope.formData.savedFlag = true;
                        $scope.output = "Remove saved successfully. Press the button below to go back home.";
                    } else {

                    }

                    errorCount = 0;
                    nextLoad();
                })
                .catch(function(res) {
                    $scope.data = 'Server error';
                    nextLoad(++errorCount * 2 * loadTime);
                });
        };

        var cancelNextLoad = function() {
            $timeout.cancel(loadPromise);
        };

        var nextLoad = function(mill) {
            mill = mill || loadTime;
            //Always make sure the last timeout is cleared before starting a new one
            cancelNextLoad();
            loadPromise = $timeout(getData, mill);
        };

        $scope.writeData = function(chosenButton) {
            console.log($scope.formData.selectedButton.button);
            var button = {
                button: $scope.formData.selectedButton.button,
                custom_name: $scope.formData.custom_name,
                doneFlag: false
            };
            console.log(chosenButton);
            $http.post('http://' + $scope.formData.node.ip_address + ':3000/recordRemoteBackend/postRecordData', JSON.stringify(button)).success(function(data) {
                console.log(data);
                $scope.buttons.splice($scope.buttons.indexOf(chosenButton), 1);
                $scope.formData.selectedButton = "";
            });

        };

        $scope.$on("$destroy", function(event, data) {
            $http.get('http://' + $scope.formData.node.ip_address + ':3000/recordRemoteBackend/quitIRRecord').success(function(data) {
              $timeout.cancel(loadPromise);
            });
        });

        $scope.$on("$ionicView.beforeLeave", function(event, data) {
          $http.get('http://' + $scope.formData.node.ip_address + ':3000/recordRemoteBackend/quitIRRecord').success(function(data) {
            $timeout.cancel(loadPromise);
          });
        });

        $scope.go = function(path) {
            var button = {
                button: $scope.formData.selectedButton.button,
                custom_name: $scope.formData.custom_name,
                doneFlag: true
            };

            $http.post('http://' + $scope.formData.node.ip_address + ':3000/recordRemoteBackend/postRecordData', JSON.stringify(button)).success(function(data) {
                console.log(data);
            });

            $ionicHistory.goBack();
        };
    });
