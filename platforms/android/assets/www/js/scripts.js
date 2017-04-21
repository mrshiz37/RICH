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

    .controller('scriptsCtrl', function($scope, $timeout, $state, $ionicPopup, scriptHolder, nodeService) {
        $scope.formData = {};
        //controls list delete
        $scope.data = {
            showDelete: false
        };
        $scope.$on('$ionicView.enter', function() {
          nodeService.getNodes(function(nodes) {
              $scope.formData.nodes = nodes;
          });
        });

        $scope.onHold = function(script, node) {
            $ionicPopup.prompt({
                title: 'Change Script Name',
                template: 'Enter a new script name',
                inputType: 'text',
                inputPlaceholder: script.name
            }).then(function(res) {
              console.log(script.name);
              console.log(res);
              if(res !== undefined && res !== "") {
                nodeService.updateScriptName(script.name, res, node, function(nodeList) {
                    $scope.formData.nodes = nodeList;
                });
              }
            });
        };

        //deleting things from a list
        $scope.onItemDelete = function(node, script) {
            var index = $scope.formData.nodes.indexOf(node);
            $scope.formData.nodes[index].scripts.splice($scope.formData.nodes[index].scripts.indexOf(script), 1);
            nodeService.deleteScript(node, script, function(nodes) {
              $scope.formData.nodes = nodes;
            });
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
