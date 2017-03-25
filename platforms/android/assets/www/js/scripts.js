angular.module('scripts', ['nodes'])
    .factory('scriptHolder', function() {
        var script = {};
        var node = {};
        script.getScript = function(fn) {
            fn(script, node);
        };
        script.setScript = function(newNode, newScript) {
            script.name = newScript.name;
            script.steps = newScript.steps;
            node = newNode;
        };
        script.clearScript = function() {
            script.name = "";
            script.steps = [];
            node = {};
        };
        return script;
    })
    .service('scriptManagement', function($http, nodeService) {
        var updatedNodeList = [];
        var nodes;
        this.getScripts = function(fn) {
            nodeService.getNodes(function(returnedNodes) {
                nodes = returnedNodes;
                console.log(nodes);
                for (var i = 0; i < nodes.length; i++) {
                  var custom_name = nodes[i].custom_name;
                    $http.get('http://' + nodes[i].ip_address + ':3000/editScriptsBackend/getScripts').success(function(data) {
                        var newNode = {
                            custom_name: custom_name,
                            scripts: data
                        };
                        updatedNodeList.push(newNode);
                    });
                }
                fn(updatedNodeList);
            });
        };

        this.updateScriptName = function(oldName, newName, node, fn) {
            var obj = {
                oldName: oldName,
                newName: newName
            };

            $http.get('http://' + node.ip_address + ':3000/editScriptsBackend/updateScriptName', JSON.stringify(obj)).success(function(data) {
                for (var i = 0; i < updatedNodeList.length; i++) {
                    if (updatedNodeList[i].custom_name === node.custom_name) {
                        updatedNodeList[i].scripts = data;
                    }
                }
                console.log(updatedNodeList);
                fn(updatedNodeList);
            });
        };

        this.updateScript = function(node, script, updateFlag, fn) {
            if (updateFlag) {
              $http.get('http://' + node.ip_address + ':3000/editScriptsBackend/updateExistingScript', JSON.stringify(script)).success(function(data) {
                console.log("Success");
              });
            } else {
              $http.get('http://' + node.ip_address + ':3000/editScriptsBackend/putNewScript', JSON.stringify(script)).success(function(data) {
                console.log("Success");
              });
            }
            fn();
        };

        this.deleteScript = function(node, script) {
          $http.get('http://' + node.ip_address + ':3000/editScriptsBackend/deleteScript', {params:{custom_name: script.name}}).success(function(data) {
            console.log("Success");
          });
        };
    })


    .controller('scriptsCtrl', function($scope, $timeout, $state, $ionicPopup, scriptHolder, scriptManagement) {
        $scope.formData = {};

        //controls list delete
        $scope.data = {
            showDelete: false
        };
        $scope.$on('$ionicView.enter', function() {
            scriptManagement.getScripts(function(nodeList) {
                $scope.formData.nodes = nodeList;
            });
        });

        $scope.onHold = function(script, node) {
            $ionicPopup.prompt({
                title: 'Change Script Name',
                template: 'Enter a new script name',
                inputType: 'text',
                inputPlaceholder: script.name
            }).then(function(res) {
                scriptManagement.updateScriptName(script.name, res, node, function(nodeList) {
                    $scope.formData.nodes = nodeList;
                });
            });
        };

        //deleting things from a list
        $scope.onItemDelete = function(node, script) {
            var index = $scope.formData.nodes.indexOf(node);
            $scope.formData.nodes[index].scripts.splice($scope.formData.nodes[index].scripts.indexOf(script), 1);
            scriptManagement.deleteScript(node, script);
        };

        //function that allows has the selected data transfer to next page
        $scope.gotomodifyScript = function(node, item) {
            scriptHolder.setScript(node, item);
            $state.go('app.modifyScript');
        };

        $scope.createNewItem = function() {
            scriptHolder.clearScript();
            $state.go('app.modifyScript');
        };
    });
