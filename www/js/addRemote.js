angular.module('addRemote', ['nodes'])
    .controller('addRemoteCtrl', function($scope, $http, $state, nodeService) {
        /*nodeService.getNodes(function(nodes) {
            $scope.nodes = nodes;
        });*/

        $scope.formData = {};
        $scope.custom_name = "";
        $scope.getRemoteBrands = function() {
            /*$scope.brands = [ { brandName: 'a' },
                              { brandName: 'b' },
                              { brandName: 'c' },
                              { brandName: 'custom' } ];*/
            $http.get('http://' + $scope.formData.selectedNode.ip_address + ':3000/addRemoteBackend/getRemoteBrands').success(function(data) {
                $scope.brands = data;
            });
        };

        $scope.getRemoteModels = function() {
            $scope.models = [{
                    modelName: 'aa'
                },
                {
                    modelName: 'bb'
                },
                {
                    modelName: 'cc'
                }
            ];
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
    });
