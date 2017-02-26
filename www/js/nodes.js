angular.module('nodes', [])
  .controller('nodesCtrl', function($scope, $http, $state) {
    var serviceType = "ssdp:all";

    var success = function(devices) {
        console.log(devices);
        $scope.devices = devices;
    };

    var failure = function() {
        alert("Error calling Service Discovery Plugin");
    };

   /**
    * Similar to the W3C specification for Network Service Discovery api 'http://www.w3.org/TR/discovery-api/'
    * @method getNetworkServices
    * @param {String} serviceType e.g. "urn:schemas-upnp-org:service:ContentDirectory:1", "ssdp:all", "urn:schemas-upnp-org:service:AVTransport:1"
    * @param {Boolean} gets the config.xml from the device
    * @param {Function} success callback an array of services
    * @param {Function} failure callback
   */
    serviceDiscovery.getNetworkServices(serviceType, true, success, failure);
  });
