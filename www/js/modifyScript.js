angular.module('modifyScript', ['scripts'])
    .controller('modifyScriptCtrl', function($scope, $timeout, $state, $ionicModal, $ionicPopup, scriptHolder) {
        $scope.$on('$ionicView.enter', function() {
            $scope.formData = {};
            scriptHolder.getScript(function(script) {
                $scope.formData.script = script;
                console.log($scope.formData.script.steps);
                if ($scope.formData.script.name === "") {
                    $ionicPopup.prompt({
                            title: 'Enter Script Name',
                            template: 'Enter new script name:',
                            inputType: 'text',
                            inputPlaceholder: 'Script Name'
                        })
                        .then(function(res) {
                            $scope.formData.script.name = res;
                        });
                }
            });
            $scope.formData.count = 1;
        });

        $scope.data = {
            showDelete: false
        };

        $scope.remotes = [{
                "brand": "a",
                "model": "a",
                "custom_name": "a",
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

        $ionicModal.fromTemplateUrl('templates/scriptModal.html', {
            scope: $scope
        }).then(function(modal) {
            $scope.modal = modal;
        });
        $scope.$on('modal.hidden', function() {
            $scope.formData.selectedRemote = null;
            $scope.formData.selectedButton = null;
            $scope.formData.count = 1;
        });

        $scope.addStep = function() {
            var step = {
                remote: $scope.formData.selectedRemote.custom_name,
                button: $scope.formData.selectedButton.button,
                count: $scope.formData.count
            };
            $scope.formData.script.steps.push(step);
            $scope.modal.hide();
        };

        $scope.increase = function() {
            $scope.formData.count++;
        };

        $scope.decrease = function() {
            if ($scope.formData.count > 1) {
                $scope.formData.count--;
            }
        };

        $scope.onHold = function(step) {
            $scope.formData.count = step.count;
            var myPopup = $ionicPopup.show({
                templateUrl: 'templates/partials/scriptsPopup.html',
                title: 'Edit Count',
                scope: $scope,
                buttons: [{
                        text: 'Cancel'
                    },
                    {
                        text: '<b>Save</b>',
                        type: 'button-positive',
                        onTap: function(e) {
                            return $scope.formData.count;
                        }
                    }
                ]
            });
            myPopup.then(function(res) {
                step.count = $scope.formData.count;
                console.log(step);
            });

        };

        $scope.moveItem = function(step, fromIndex, toIndex) {
            $scope.formData.script.steps.splice(fromIndex, 1);
            $scope.formData.script.steps.splice(toIndex, 0, step);
            console.log($scope.formData.script.steps);
        };

        $scope.onItemDelete = function(step) {
            $scope.formData.script.steps.splice($scope.formData.script.steps.indexOf(step), 1);
            console.log($scope.formData.script.steps);
        };

        $scope.$on('$destroy', function() {
            $scope.modal.remove();
        });

        $scope.$on('modal.removed', function() {
            $scope.formData.selectedRemote = null;
            $scope.formData.selectedButton = null;
            $scope.formData.count = 1;
        });
    });
