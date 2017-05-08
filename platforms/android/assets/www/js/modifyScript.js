angular.module('modifyScript', ['scripts', 'nodes'])
    .controller('modifyScriptCtrl', function($scope, $http, $timeout, $state, $ionicModal, $ionicPopup, $ionicHistory, scriptHolder, nodeService) {
        $scope.$on('$ionicView.enter', function() {
            $scope.formData = {};
            $scope.updateFlag = true;
            scriptHolder.getScript(function(script, node) {
                $scope.formData.script = script;
                $scope.formData.node = node;
                if ($scope.formData.script.name === "") {
                    nodeService.getNodes(function(returnedNodes) {
                        $scope.formData.nodes = returnedNodes;
                    });
                    var newScriptPopup = $ionicPopup.show({
                        templateUrl: 'templates/partials/scriptsPopup.html',
                        title: 'New Script',
                        scope: $scope,
                        buttons: [{
                                text: 'Cancel'
                            },
                            {
                                text: '<b>Save</b>',
                                type: 'button-positive',
                                onTap: function(e) {
                                    if ($scope.formData.script.name === "") {
                                        e.preventDefault();
                                    } else {
                                        return $scope.formData.selectedNode;
                                    }
                                }
                            }
                        ]
                    });
                    newScriptPopup.then(function(res) {
                        $scope.formData.node = res;
                        $scope.updateFlag = false;

                    });
                }
            });
            $scope.formData.count = 1;
        });

        $scope.data = {
            showDelete: false
        };

        $ionicModal.fromTemplateUrl('templates/scriptModal.html', {
            scope: $scope
        }).then(function(modal) {
            $scope.modal = modal;

        });
        $scope.$on('modal.shown', function() {
          $http.get('http://' + $scope.formData.node.ip_address + ':3000/editScriptsBackend/getRemotes').success(function(data) {
              $scope.remotes = data;
          });
        });
        $scope.$on('modal.hidden', function() {
            $scope.formData.selectedRemote = null;
            $scope.formData.selectedButton = null;
            $scope.formData.count = 1;
        });

        $scope.addStep = function() {
            var step = {
                remote: $scope.formData.selectedRemote.custom_name,
                model: $scope.formData.selectedRemote.model,
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

        $scope.updateButtons = function() {
            $scope.formData.selectedRemote.buttons.unshift({"button": "WAIT"});
        };

        $scope.onHold = function(step) {
            $scope.formData.count = step.count;
            var myPopup = $ionicPopup.show({
                templateUrl: 'templates/partials/countPopup.html',
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
                $scope.formData.count = 1;
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

        $scope.save = function() {
            var script = {
                name: $scope.formData.script.name,
                steps: $scope.formData.script.steps
            };

            var node = $scope.formData.node;

            nodeService.updateScript(node, script, $scope.updateFlag, function() {
                $ionicHistory.goBack();
            });
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
