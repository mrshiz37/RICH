angular.module('addRemote', ['nodes'])
    .controller('addRemoteCtrl', function($scope, $http, $state, $ionicHistory, nodeService) {
      $scope.$on('$ionicView.enter', function() {
        nodeService.getNodes(function(nodes) {
            $scope.nodes = nodes;
        });
        $scope.brands = null;
        $scope.models = null;
      });

        $scope.formData = {};
        $scope.custom_name = "";
        $scope.getRemoteBrands = function() {
            $http.get('http://' + $scope.formData.selectedNode.ip_address + ':3000/addRemoteBackend/getRemoteBrands').success(function(data) {
                $scope.brands = data;
            });
        };

        $scope.getRemoteModels = function() {
            $http.get('http://' + $scope.formData.selectedNode.ip_address + ':3000/addRemoteBackend/getRemoteFiles', {
                params: {
                    custom_name: $scope.formData.selectedBrand.brandName
                }
            }).success(function(data) {
                $scope.models = data;
            });
        };

        $scope.addRemote = function() {
            //TODO http post request with $scope.selectedBrand and $scope.selectedModel and $scope.custom_name
            var remote = {
                brand: $scope.formData.selectedBrand.brandName,
                model: $scope.formData.selectedModel.modelName,
                custom_name: $scope.formData.custom_name
            };
            $http.put('http://' + $scope.formData.selectedNode.ip_address + ':3000/addRemoteBackend/putNewRemote', JSON.stringify(remote)).success(function(data) {
                console.log(data);
                $ionicHistory.nextViewOptions({
                    historyRoot: true
                });
                $state.go('app.home');
            });
        };

        $scope.go = function(path) {
            $state.go(path);
        };
    });
