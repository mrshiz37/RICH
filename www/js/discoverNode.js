angular.module('discoverNode', ['nodes'])
  .controller('discoverNodeCtrl', function($scope, $state, nodeService) {
    var serviceType = "urn:schemas-upnp-org:service:ContentDirectory:1";
    $scope.custom_name;
    var success = function(devices) {
        for(var i = 0; i < devices.length; i++) {
          var str = devices[i].LOCATION;
          str = str.slice(7);
          var res = str.split(":");
        }
        var ip_address = res[0];
        var node = {
          custom_name: $scope.custom_name,
          ip_address: ip_address
        };
        nodeService.addNode(node, function() {
          $state.go('app.nodes');
        });
    }
    var failure = function() {
        alert("Error calling Service Discovery Plugin");
    }

    serviceDiscovery.getNetworkServices(serviceType, success, failure);
  }
