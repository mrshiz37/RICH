angular.module('deleteRemote', ['nodes'])
    .controller('deleteRemoteCtrl', function($scope, $http, $state, $ionicHistory, nodeService) {
        $scope.formData = {};

        $scope.$on('$ionicView.enter', function() {
          nodeService.getNodes(function(nodes) {
              $scope.nodes = nodes;
          });
          $scope.remotes = null;
        });

        $scope.getRemotes = function() {
            $http.get('http://' + $scope.formData.selectedNode.ip_address + ':3000/editScriptsBackend/getRemotes').success(function(data) {
                $scope.remotes = data;
            });
        };

        $scope.deleteRemote = function() {
            $http.delete('http://' + $scope.formData.selectedNode.ip_address + ':3000/addRemoteBackend/deleteRemote', {
                params: {
                    custom_name: $scope.formData.selectedRemote.custom_name
                }
            }).success(function(data) {
                console.log(data);
                $ionicHistory.nextViewOptions({
                    historyRoot: true
                });
                $state.go('app.home');
            });
        };
    });
