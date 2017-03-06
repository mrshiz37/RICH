angular.module('nodes', [])
    .service('nodeService', function($cordovaFile) {
        var nodes = [];
        this.getNodes = function(fn) {
            $cordovaFile.checkFile(cordova.file.dataDirectory, "nodes.json")
                .then(function(success) {}, function(error) {
                    $cordovaFile.createFile(cordova.file.dataDirectory, "nodes.json", true)
                        .then(function(success) {}, function(error) {});
                });

            $cordovaFile.readAsText(cordova.file.dataDirectory, "nodes.json")
                .then(function(result) {
                    nodes = JSON.parse(result);
                    fn(nodes);
                }, function(error) {
                    console.log(error);
                });
        };
        this.addNode = function(node, fn) {
            nodes.push(node);
            console.log(nodes);
            $cordovaFile.writeFile(cordova.file.dataDirectory, "nodes.json", JSON.stringify(nodes), true)
                .then(function(success) {
                    console.log("Success!");
                    fn();
                }, function(error) {
                    // error
                });
        };

        this.removeNode = function(node, node_list) {
            for (var i = 0; i < nodes.length; i++) {
                if (nodes[i].custom_name === node.custom_name) {
                    nodes.splice(i, 1);
                }
            }
            $cordovaFile.writeFile(cordova.file.dataDirectory, "nodes.json", JSON.stringify(node_list), true)
                .then(function(success) {
                    console.log("Success!");
                }, function(error) {});
        };
        this.removeFile = function() {
          $cordovaFile.removeFile(cordova.file.dataDirectory, "nodes.json")
          .then(function (success) {
            console.log("Success");
          }, function (error) {
            console.log("Error");
          });
        };
    })
    .controller('nodesCtrl', function($scope, $state, nodeService) {
        $scope.$on('$ionicView.enter', function() {
            nodeService.getNodes(function(nodes) {
                $scope.nodes = nodes;
            });
        });

        $scope.data = {
            showDelete: false
        };

        $scope.onItemDelete = function(node) {
            $scope.nodes.splice($scope.nodes.indexOf(node), 1);
            nodeService.removeNode(node, $scope.nodes);
        };

        $scope.go = function(path) {
            $state.go(path);
        };

    });
