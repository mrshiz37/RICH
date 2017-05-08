angular.module('execute', ['nodes'])
    .controller('executeCtrl', function($scope, $http, $state, nodeService) {
        $scope.formData = {};
        $scope.$on('$ionicView.enter', function() {
            nodeService.getNodes(function(nodes) {
                $scope.formData.nodeScriptList = nodes;
            });
        });

        $scope.getNodeInfo = function() {
            $scope.formData.scripts = $scope.formData.selectedNode.scripts;
            $http.get('http://' + $scope.formData.selectedNode.ip_address + ':3000/editScriptsBackend/getRemotes').success(function(data) {
                $scope.formData.remotes = data;
            });
        };

        function initBools(fn) {
            $scope.formData.keyRewind = false;
            $scope.formData.keyPower = false;
            $scope.formData.keyStop = false;
            $scope.formData.keyPause = false;
            $scope.formData.keyPlay = false;
            $scope.formData.keyFF = false;
            $scope.formData.keyZero = false;
            $scope.formData.keyOne = false;
            $scope.formData.keyTwo = false;
            $scope.formData.keyThree = false;
            $scope.formData.keyFour = false;
            $scope.formData.keyFive = false;
            $scope.formData.keySix = false;
            $scope.formData.keySeven = false;
            $scope.formData.keyEight = false;
            $scope.formData.keyNine = false;
            $scope.formData.keyVolDown = false;
            $scope.formData.keyVolUp = false;
            $scope.formData.keyChanDown = false;
            $scope.formData.keyChanUp = false;
            fn();
        }
        $scope.getDisabledButtons = function() {
            initBools(function() {
                console.log("Reset");
            });

            for (var i = 0; i < $scope.formData.selectedRemote.buttons.length; i++) {
                if ($scope.formData.selectedRemote.buttons[i].button === "KEY_REWIND") {
                    $scope.formData.keyRewind = true;
                } else if ($scope.formData.selectedRemote.buttons[i].button === "KEY_POWER") {
                    $scope.formData.keyPower = true;
                } else if ($scope.formData.selectedRemote.buttons[i].button === "KEY_STOP") {
                    $scope.formData.keyStop = true;
                } else if ($scope.formData.selectedRemote.buttons[i].button === "KEY_PAUSE") {
                    $scope.formData.keyPause = true;
                } else if ($scope.formData.selectedRemote.buttons[i].button === "KEY_PLAY") {
                    $scope.formData.keyPlay = true;
                } else if ($scope.formData.selectedRemote.buttons[i].button === "KEY_FASTFORWARD") {
                    $scope.formData.keyFF = true;
                } else if ($scope.formData.selectedRemote.buttons[i].button === "KEY_0") {
                    $scope.formData.keyZero = true;
                } else if ($scope.formData.selectedRemote.buttons[i].button === "KEY_1") {
                    $scope.formData.keyOne = true;
                } else if ($scope.formData.selectedRemote.buttons[i].button === "KEY_2") {
                    $scope.formData.keyTwo = true;
                } else if ($scope.formData.selectedRemote.buttons[i].button === "KEY_3") {
                    $scope.formData.keyThree = true;
                } else if ($scope.formData.selectedRemote.buttons[i].button === "KEY_4") {
                    $scope.formData.keyFour = true;
                } else if ($scope.formData.selectedRemote.buttons[i].button === "KEY_5") {
                    $scope.formData.keyFive = true;
                } else if ($scope.formData.selectedRemote.buttons[i].button === "KEY_6") {
                    $scope.formData.keySix = true;
                } else if ($scope.formData.selectedRemote.buttons[i].button === "KEY_7") {
                    $scope.formData.keySeven = true;
                } else if ($scope.formData.selectedRemote.buttons[i].button === "KEY_8") {
                    $scope.formData.keyEight = true;
                } else if ($scope.formData.selectedRemote.buttons[i].button === "KEY_9") {
                    $scope.formData.keyNine = true;
                } else if ($scope.formData.selectedRemote.buttons[i].button === "KEY_VOLUMEDOWN") {
                    $scope.formData.keyVolDown = true;
                } else if ($scope.formData.selectedRemote.buttons[i].button === "KEY_VOLUMEUP") {
                    $scope.formData.keyVolUp = true;
                } else if ($scope.formData.selectedRemote.buttons[i].button === "KEY_CHANNELDOWN") {
                    $scope.formData.keyChanDown = true;
                } else if ($scope.formData.selectedRemote.buttons[i].button === "KEY_CHANNELUP") {
                    $scope.formData.keyChanUp = true;
                } else {

                }
            }
        };
        $scope.executeButton = function(chosenButton) {
            console.log(chosenButton);
            var script = {
                name: "SingleKey",
                steps: [{
                    remote: $scope.formData.selectedRemote.custom_name,
                    model: $scope.formData.selectedRemote.model,
                    button: chosenButton,
                    count: 1
                }]
            };
            console.log(script);
            $http.get('http://' + $scope.formData.selectedNode.ip_address + ':3000/editScriptsBackend/executeScript', {params:{script: JSON.stringify(script)}}).success(function(data) {});
        };

        $scope.executeScript = function() {
          $http.get('http://' + $scope.formData.selectedNode.ip_address + ':3000/editScriptsBackend/executeScript', {params:{script: JSON.stringify($scope.formData.selectedScript)}}).success(function(data) {});
          $scope.formData.selectedScript = '0';
        };

        $scope.$on("$ionicView.beforeLeave", function(event, data) {
          $scope.formData.scripts = [];
          $scope.formData.remotes = [];
        });

    });
