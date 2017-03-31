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
    .service('scriptManagement', function(nodeService) {
        var updatedNodeList = [];
        var nodes;
        this.getScripts = function(fn) {
            nodeService.getNodes(function(returnedNodes) {
                nodes = returnedNodes;
            });

            var scripts_node1 = [{
                    name: "script1",
                    steps: [{
                            remote: "a",
                            button: "b",
                            count: "1"
                        },
                        {
                            remote: "b",
                            button: "c",
                            count: "2"
                        }
                    ]
                },
                {
                    name: "script2",
                    steps: [{
                            remote: "c",
                            button: "d",
                            count: "3"
                        },
                        {
                            remote: "e",
                            button: "f",
                            count: "4"
                        }
                    ]
                }
            ];

            var scripts_node2 = [{
                    name: "script3",
                    steps: [{
                            remote: "a",
                            button: "b",
                            count: "1"
                        },
                        {
                            remote: "b",
                            button: "c",
                            count: "2"
                        }
                    ]
                },
                {
                    name: "script4",
                    steps: [{
                            remote: "c",
                            button: "d",
                            count: "3"
                        },
                        {
                            remote: "e",
                            button: "f",
                            count: "4"
                        }
                    ]
                }
            ];
            var newNode = {
                custom_name: nodes[0].custom_name,
                scripts: scripts_node1
            };

            updatedNodeList.push(newNode);
            console.log(updatedNodeList);

            newNode = {
                custom_name: nodes[1].custom_name,
                scripts: scripts_node2
            };

            updatedNodeList.push(newNode);
            console.log(updatedNodeList);

            fn(updatedNodeList);
        };

        this.updateScriptName = function(oldName, newName, node) {
            for (var i = 0; i < updatedNodeList.length; i++) {
                if (updatedNodeList[i].custom_name === node.custom_name) {
                    for(var j = 0; j < updatedNodeList[i].scripts.length; j++) {
                      if(updatedNodeList[i].scripts[j].name === oldName) {
                        updatedNodeList[i].scripts[j].name = newName;
                      }
                    }
                }
            }
            console.log(updatedNodeList);
        };

        this.updateScript = function(node, script, updateFlag, fn) {
            console.log(node);
            if (updateFlag) {
                for (var i = 0; i < updatedNodeList.length; i++) {
                    if (updatedNodeList[i].custom_name === node.custom_name) {
                        for (var j = 0; j < updatedNodeList[i].scripts.length; j++) {
                            if (updatedNodeList[i].scripts[j].name === script.name) {
                                updatedNodeList[i].scripts[j] = script;
                            }
                        }
                    }
                }
            } else {
                for (var i = 0; i < updatedNodeList.length; i++) {
                    if (updatedNodeList[i].custom_name === node.custom_name) {
                        updatedNodeList[i].scripts.push(script);
                    }
                }
            }
            fn();
            console.log(updatedNodeList);
        };
    })


    .controller('scriptsCtrl', function($scope, $timeout, $state, $ionicPopup, scriptHolder, scriptManagement) {
        $scope.formData = {};

        //controls list delete
        $scope.data = {
            showDelete: false
        };

        $scope.onHold = function(script, node) {
            $ionicPopup.prompt({
                title: 'Change Script Name',
                template: 'Enter a new script name',
                inputType: 'text',
                inputPlaceholder: script.name
            }).then(function(res) {
                scriptManagement.updateScriptName(script.name, res, node);
            });
        };

        //deleting things from a list
        $scope.onItemDelete = function(item) {
            $scope.items.splice($scope.items.indexOf(item), 1);
        };

        //dummy data
        scriptManagement.getScripts(function(nodeList) {
            $scope.formData.nodes = nodeList;
        });

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
