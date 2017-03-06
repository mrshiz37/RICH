angular.module('discoverNode', ['nodes'])
    .controller('discoverNodeCtrl', function($scope, $state, nodeService) {
        $scope.formData = {
          nodes: []
        };
        var nodes = [];
        var discoveredNodes = [];
        nodeService.getNodes(function(returnedNodes) {
            nodes = returnedNodes;
        });
        $scope.custom_name = "";
        var success = function(devices) {
            for (var i = 0; i < devices.length; i++) {
                if (devices[i].Server === "RICH") {
                    var str = devices[i].LOCATION;
                    str = str.slice(7);
                    var result = str.split(":");
                    var ip_address = {"ip_address": result[0]};
                    $scope.formData.nodes.push(ip_address);
                }
            }
            for (var a = 0; i < $scope.formData.nodes.length; i++) {
                for (var j = 0; j < nodes.length; j++) {
                    if (nodes[j].ip_address === $scope.formData.nodes[a].ip_address) {
                        $scope.formData.nodes.splice(a, 1);
                        a--;
                        break;
                    }
                }
            }
            $scope.$apply();
        };

        var failure = function() {
            alert("Error calling Service Discovery Plugin");
        };

        $scope.addNode = function() {
            var node = {
                custom_name: $scope.formData.custom_name,
                ip_address: $scope.formData.selectedNode
            };
            nodeService.addNode(node, function() {
                $state.go('app.nodes');
            });
        };

        var serviceType = "urn:schemas-upnp-org:service:ContentDirectory:1";
        serviceDiscovery.getNetworkServices(serviceType, success, failure);
    });
