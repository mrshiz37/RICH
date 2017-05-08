angular.module('discoverNode', ['nodes'])
    .controller('discoverNodeCtrl', function($scope, $state, nodeService) {
        $scope.formData = {
            nodes: []
        };

        $scope.custom_name = "";

        function checkAlreadyAddedNodes(nodes) {
            for (var i = 0; i < nodes.length; i++) {
                for (var j = 0; j < $scope.formData.nodes.length; j++) {
                    if (nodes[i].ip_address === $scope.formData.nodes[j].ip_address) {
                        console.log("here");
                        $scope.formData.nodes.splice(j, 1);
                    }
                }
            }
        }

        var success = function(devices) {
          console.log(devices);
            for (var i = 0; i < devices.length; i++) {
                if (devices[i].Server === "RICH") {
                    var str = devices[i].LOCATION;
                    str = str.slice(7);
                    var result = str.split(":");
                    var ip_address = {
                        "ip_address": result[0]
                    };
                    $scope.formData.nodes.push(ip_address);
                }
            }
            nodeService.getNodes(function(returnedNodes) {
                checkAlreadyAddedNodes(returnedNodes);
            });
            $scope.$apply();
        };

        var failure = function() {
            alert("Error calling Service Discovery Plugin");
        };

        $scope.addNode = function() {
            var node = {
                custom_name: $scope.formData.custom_name,
                ip_address: $scope.formData.selectedNode,
                scripts: []
            };
            nodeService.addNode(node, function() {
                $state.go('app.nodes');
            });
        };

        var serviceType = "urn:schemas-upnp-org:service:ContentDirectory:1";
        serviceDiscovery.getNetworkServices(serviceType, success, failure);
    });
