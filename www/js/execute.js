angular.module('execute', ['scripts'])
    .controller('executeCtrl', function($scope, $state, scriptManagement) {
      $scope.formData = {};
        $scope.$on('$ionicView.enter', function() {
          scriptManagement.getScripts(function(nodeAndScriptList) {
            $scope.formData.nodeScriptList = nodeAndScriptList;
          });
        });

        $scope.getNodeInfo = function() {
          $scope.formData.scripts = $scope.formData.selectedNode.scripts;

          $scope.formData.remotes = [{
                  "brand": "a",
                  "model": "a",
                  "custom_name": "a",
                  "buttons": [{
                      "button": "KEY_REWIND"
                  }, {
                      "button": "KEY_BACK"
                  }, {
                      "button": "KEY_MENU"
                  }, {
                      "button": "KEY_LEFT"
                  }, {
                      "button": "KEY_RIGHT"
                  }, {
                      "button": "KEY_UP"
                  }, {
                      "button": "KEY_DOWN"
                  }, {
                      "button": "KEY_OK"
                  }, {
                      "button": "KEY_F11"
                  }, {
                      "button": "KEY_SEARCH"
                  }, {
                      "button": "KEY_GREEN"
                  }, {
                      "button": "KEY_BLUE"
                  }, {
                      "button": "KEY_YELLOW"
                  }, {
                      "button": "KEY_ORANGE"
                  }, {
                      "button": "KEY_PURPLE"
                  }, {
                      "button": "KEY_PLAY"
                  }, {
                      "button": "KEY_VOLUMEUP"
                  }, {
                      "button": "KEY_VOLUMEDOWN"
                  }, {
                      "button": "KEY_HOME"
                  }]
              },
              {
                  "brand": "b",
                  "model": "c",
                  "custom_name": "c",
                  "buttons": [{
                      "button": "KEY_POWER"
                  }, {
                      "button": "KEY_BACK"
                  }, {
                      "button": "KEY_MENU"
                  }, {
                      "button": "KEY_LEFT"
                  }, {
                      "button": "KEY_RIGHT"
                  }, {
                      "button": "KEY_UP"
                  }, {
                      "button": "KEY_DOWN"
                  }, {
                      "button": "KEY_OK"
                  }, {
                      "button": "KEY_F11"
                  }, {
                      "button": "KEY_SEARCH"
                  }, {
                      "button": "KEY_GREEN"
                  }, {
                      "button": "KEY_BLUE"
                  }, {
                      "button": "KEY_YELLOW"
                  }, {
                      "button": "KEY_ORANGE"
                  }, {
                      "button": "KEY_PURPLE"
                  }, {
                      "button": "KEY_PLAY"
                  }, {
                      "button": "KEY_VOLUMEUP"
                  }, {
                      "button": "KEY_VOLUMEDOWN"
                  }, {
                      "button": "KEY_HOME"
                  }]
              }
          ];
        };
        function initBools(fn) {
          $scope.formData.keyRewind = false;
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

          for(var i = 0; i < $scope.formData.selectedRemote.buttons.length; i++) {
            if($scope.formData.selectedRemote.buttons[i].button === "KEY_REWIND") {
              $scope.formData.keyRewind = true;
            }
            else if ($scope.formData.selectedRemote.buttons[i].button === "KEY_STOP"){
              $scope.formData.keyStop = true;
            }
            else if ($scope.formData.selectedRemote.buttons[i].button === "KEY_PAUSE"){
              $scope.formData.keyPause = true;
            }
            else if ($scope.formData.selectedRemote.buttons[i].button === "KEY_PLAY"){
              $scope.formData.keyPlay = true;
            }
            else if ($scope.formData.selectedRemote.buttons[i].button === "KEY_FASTFORWARD"){
              $scope.formData.keyFF = true;
            }
            else if ($scope.formData.selectedRemote.buttons[i].button === "KEY_0"){
              $scope.formData.keyZero = true;
            }
            else if ($scope.formData.selectedRemote.buttons[i].button === "KEY_1"){
              $scope.formData.keyOne = true;
            }
            else if ($scope.formData.selectedRemote.buttons[i].button === "KEY_2"){
              $scope.formData.keyTwo = true;
            }
            else if ($scope.formData.selectedRemote.buttons[i].button === "KEY_3"){
              $scope.formData.keyThree = true;
            }
            else if ($scope.formData.selectedRemote.buttons[i].button === "KEY_4"){
              $scope.formData.keyFour = true;
            }
            else if ($scope.formData.selectedRemote.buttons[i].button === "KEY_5"){
              $scope.formData.keyFive = true;
            }
            else if ($scope.formData.selectedRemote.buttons[i].button === "KEY_6"){
              $scope.formData.keySix = true;
            }
            else if ($scope.formData.selectedRemote.buttons[i].button === "KEY_7"){
              $scope.formData.keySeven = true;
            }
            else if ($scope.formData.selectedRemote.buttons[i].button === "KEY_8"){
              $scope.formData.keyEight = true;
            }
            else if ($scope.formData.selectedRemote.buttons[i].button === "KEY_9"){
              $scope.formData.keyNine = true;
            }
            else if ($scope.formData.selectedRemote.buttons[i].button === "KEY_VOLUMEDOWN"){
              $scope.formData.keyVolDown = true;
            }
            else if ($scope.formData.selectedRemote.buttons[i].button === "KEY_VOLUMEUP"){
              $scope.formData.keyVolUp = true;
            }
            else if ($scope.formData.selectedRemote.buttons[i].button === "KEY_CHANNELDOWN"){
              $scope.formData.keyChanDown = true;
            }
            else if ($scope.formData.selectedRemote.buttons[i].button === "KEY_CHANNELUP"){
              $scope.formData.keyChanUp = true;
            }
            else {

            }
          }
        };
        $scope.executeButton = function(button) {
          console.log($scope.formData.selectedNode);
          console.log($scope.formData.selectedRemote);
          console.log(button);
        };

        $scope.executeScript = function() {
          console.log($scope.formData.selectedScript);
        };


    });
