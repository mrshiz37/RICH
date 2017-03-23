angular.module('scripts', ['nodes'])
    .factory('scriptHolder', function() {
        var script = {};
        script.getScript = function(fn) {
          fn(script);
        };
        script.setScript = function(newScript) {
          script.name = newScript.name;
          script.steps = newScript.steps;
        };
        script.clearScript = function() {
          script.name = "";
          script.steps = [];
        };
        return script;
    })


    .controller('scriptsCtrl', function($scope, $timeout, $state, scriptHolder) {
        $scope.formData = {};

        //controls list delete
        $scope.data = {
            showDelete: false
        };

        //controls edit alert
        $scope.edit = function(item) {
            alert('Edit Item: ' + item.id);
        };

        //this can be used for reordering
        //   $scope.moveItem = function(item, fromIndex, toIndex) {
        //     $scope.items.splice(fromIndex, 1);
        //     $scope.items.splice(toIndex, 0, item);
        //   };

        //deleting things from a list
        $scope.onItemDelete = function(item) {
            $scope.items.splice($scope.items.indexOf(item), 1);
        };

        //dummy data

        $scope.formData.nodes = [{
                custom_name: "living room",
                ip_address: "192.168.1.100",
                scripts: [{
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
                ]
            },
            {
                custom_name: "bathroom",
                ip_address: "192.168.1.100",
                scripts: [{
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
                ]
            }
        ];

        //refreshing page --may or may not need this--
        $scope.doRefresh = function() {
            console.log('Refreshing!');
            $timeout(function() {
                //simulate async response
                $scope.items.push({
                    id: Math.floor(Math.random() * 1000) + 4
                });
                //Stop the ion-refresher from spinning
                $scope.$broadcast('scroll.refreshComplete');
            }, 1000);
        };

        //function that allows has the selected data transfer to next page
        $scope.gotomodifyScript = function(item) {
            scriptHolder.setScript(item);
            $state.go('app.modifyScript');
        };

        $scope.createNewItem = function() {
          scriptHolder.clearScript();
          $state.go('app.modifyScript');
        }
    });
