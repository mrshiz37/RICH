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
            $cordovaFile.writeFile(cordova.file.dataDirectory, "nodes.json", angular.toJson(nodes), true)
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
            $cordovaFile.writeFile(cordova.file.dataDirectory, "nodes.json", angular.toJson(node_list), true)
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
        this.writeFile = function(newNodeList) {
          console.log(newNodeList);
          $cordovaFile.writeFile(cordova.file.dataDirectory, "nodes.json", angular.toJson(newNodeList), true)
              .then(function(success) {
                  console.log("Success!");
              }, function(error) {
                  // error
              });
        };

        this.updateScriptName = function(oldName, newName, node, fn) {
            var obj = {
                oldName: oldName,
                newName: newName
            };

            for(var i = 0; i < nodes.length; i++) {
              if(nodes[i].custom_name === node.custom_name) {
                for(var j = 0; j < nodes[i].scripts.length; j++) {
                  if(nodes[i].scripts[j].name === oldName) {
                    nodes[i].scripts[j].name = newName;
                    this.writeFile(nodes);
                  }
                }
              }
            }
            fn(nodes);
        };

        this.updateScript = function(node, script, updateFlag, fn) {
            if (updateFlag) {
              for(var i = 0; i < nodes.length; i++) {
                if(nodes[i].custom_name === node.custom_name) {
                  for(var j = 0; j < nodes[i].scripts.length; j++) {
                    if(nodes[i].scripts[j].name === script.name) {
                      nodes[i].scripts[j] = script;
                      this.writeFile(nodes);
                    }
                  }
                }
              }
            } else {
              for(var i = 0; i < nodes.length; i++) {
                if(nodes[i].custom_name === node.custom_name) {
                  nodes[i].scripts.push(script);
                  this.writeFile(nodes);
                }
              }
            }
            fn();
        };

        this.deleteScript = function(node, script, fn) {
          for(var i = 0; i < nodes.length; i++) {
            if(nodes[i].custom_name === node.custom_name) {
              for(var j = 0; j < nodes[i].scripts.length; j++) {
                if(nodes[i].scripts[j].name === script.name) {
                  nodes[i].scripts.splice(j, 1);
                  this.writeFile(nodes);
                }
              }
            }
          }
          this.writeFile(nodes);
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

        $scope.onHold = function(node) {
          var newName = prompt("Rename this node", node.custom_name);
          $scope.nodes[$scope.nodes.indexOf(node)].custom_name = newName;
          nodeService.writeFile($scope.nodes);
        };

        $scope.go = function(path) {
            $state.go(path);
        };

    });
