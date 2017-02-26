angular.module('addRemote', [])
  .controller('addRemoteCtrl', function($scope, $http, $state) {
    $http.get('http://192.168.1.255:3000/addRemoteBackend/getRemoteBrands').success(function(data) {
      $scope.brands = data;
    });
    $scope.formData = {};
    $scope.custom_name = "";
    $scope.brands = [ { brandName: 'a' },
                      { brandName: 'b' },
                      { brandName: 'c' },
                      { brandName: 'custom' } ];

    $scope.getRemoteModels = function() {
      $scope.models = [ { modelName: 'aa'},
                        { modelName: 'bb'},
                        { modelName: 'cc'}];
    };

    $scope.addRemote = function() {
      //TODO http post request with $scope.selectedBrand and $scope.selectedModel and $scope.custom_name
      var remote = {
        brand: $scope.formData.selectedBrand.brandName,
        model: $scope.formData.selectedModel.modelName,
        custom_name: $scope.formData.custom_name
      };
      console.log(remote);
    };

    $scope.go = function(path) {
      $state.go(path);
    };
  })
  .controller('recordRemoteCtrl', function ($scope, $http, $location) {
    $http.get('/files/lirc_namespace.json').success(function(data) {
      $scope.buttons = data;
    });
    $scope.buttonStep = 0;
    $scope.fromBackend = 'When you are ready to begin, press the button below.';
    var counter = 0;
    $scope.selectedButton='';
    $scope.buttonState = [
      {step:0, state:"Begin"},
      {step:1, state:"Press Enter"},
      {step:2, state:"Press Enter after selecting"},
      {step:3, state:"Finished"}
    ];

    $scope.updateHtml = function() {
      if ($scope.buttonStep < $scope.buttonState.length -1) {
        $scope.buttonStep++;
        collectBackend();
      }
    };

    function collectBackend() {
      $http.get('addRemoteBackend',{params:{selected:$scope.selectedButtond}}).success(function(data) {
        $scope.fromBackend = data + counter;
        counter++;
      });
    }
  })
  .directive('remoteSelect', function () {
    return {
      template: "<h1>Made by a directive!</h1>"
    };
  });
