angular.module('nodes', [])
  .service('nodeService', function($cordovaFile) {
    var nodes = [];
    this.getNodes = function(fn) {
        $cordovaFile.checkFile(cordova.file.dataDirectory, "nodes.json")
        .then(function(success) {
          console.log("Success check");
        }, function(error) {
          $cordovaFile.createFile(cordova.file.dataDirectory, "nodes.json", true)
          .then(function(success) {
            console.log("Created file!");
          }, function(error) {
            console.log("FileCreationgError");
          });
        });

        $cordovaFile.readAsText(cordova.file.dataDirectory, "nodes.json")
        .then(function(result) {
          nodes = JSON.parse(result);
          console.log(nodes);
          fn(nodes);
        }, function(error) {
          console.log(error);
        });
    }
    this.addNode = function(node) {
      nodes.push(node);
      $cordovaFile.writeFile(cordova.file.dataDirectory, "nodes.json", JSON.stringify(nodes), true)
       .then(function (success) {
         console.log("Success!");
       }, function (error) {
         // error
       });
    }

    this.removeNode = function(node, node_list) {
      for(var i = 0; i < nodes.length; i++) {
        if(nodes[i].custom_name === node.custom_name) {
          nodes.splice(i, 1);
        }
      }
      $cordovaFile.writeFile(cordova.file.dataDirectory, "nodes.json", JSON.stringify(node_list), true)
       .then(function (success) {
         console.log("Success!");
       }, function (error) {
       });
    }
  })
  .controller('nodesCtrl', function($scope, $http, $state, nodeService) {
    var nodes = [];
    var serviceType = "urn:schemas-upnp-org:service:ContentDirectory:1";

    var success = function(devices) {
        for(var i = 0; i < devices.length; i++) {
          var str = devices[i].LOCATION;
          str = str.slice(7);
          var res = str.split(":");
        }
        var custom_name = "Test1";
        var ip_address = res[0];
        console.log("nodes: " + nodes);
        var node = {
          custom_name: "tes5",
          ip_address: "asfd"
        };
    }

    var failure = function() {
        alert("Error calling Service Discovery Plugin");
    }

   /**
    * Similar to the W3C specification for Network Service Discovery api 'http://www.w3.org/TR/discovery-api/'
    * @method getNetworkServices
    * @param {String} serviceType e.g. "urn:schemas-upnp-org:service:ContentDirectory:1", "ssdp:all", "urn:schemas-upnp-org:service:AVTransport:1"
    * @param {Boolean} gets the config.xml from the device
    * @param {Function} success callback an array of services
    * @param {Function} failure callback
   */
    //serviceDiscovery.getNetworkServices(serviceType, success, failure);
    nodeService.getNodes(function(nodes) {
      $scope.nodes = nodes;
    });
    $scope.data = {
      showDelete: false
    };

    $scope.onItemDelete = function(node) {
      $scope.nodes.splice($scope.nodes.indexOf(node), 1);
      nodeService.removeNode(node, $scope.nodes);
    };

  });
