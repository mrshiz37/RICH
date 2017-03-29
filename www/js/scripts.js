angular.module('scripts', ['nodes'])
    .factory('Authorization', function() {

        authorization = {};
        authorization.id = "";
        return authorization;
    })


<<<<<<< HEAD
    .controller('scriptsCtrl', function($scope, $http ,$timeout, $ionicModal, Authorization, nodeService) {
=======
    .controller('scriptsCtrl', function($scope, $timeout, $ionicModal, Authorization, nodeService) {
>>>>>>> da942dfd967805d7d032973dd2e637d58691f30c

        // nodeService.getNodes(function(nodes) {
        //     $scope.nodes = nodes;
        // });


        $scope.formData = {};
        $scope.getRemoteBrands = function() {
            /*$scope.brands = [ { brandName: 'a' },
                              { brandName: 'b' },
                              { brandName: 'c' },
                              { brandName: 'custom' } ];*/
<<<<<<< HEAD
            // $http.get('http://' + $scope.formData.selectedNode.ip_address + ':3000/addRemoteBackend/getRemoteBrands').success(function(data) {
            $http.get('http://192.168.254.1:3000/addRemoteBackend/getRemoteBrands').success(function(data) {

=======
            $http.get('http://' + $scope.formData.selectedNode.ip_address + ':3000/addRemoteBackend/getRemoteBrands').success(function(data) {
>>>>>>> da942dfd967805d7d032973dd2e637d58691f30c
                $scope.brands = data;
            });
        };


        //holds data for second page
        $scope.input = Authorization;

        //controls list delete
        $scope.data = {
            showDelete: false
        };

        $scope.getRemoteBrands = function() {
            /*$scope.brands = [ { brandName: 'a' },
                              { brandName: 'b' },
                              { brandName: 'c' },
                              { brandName: 'custom' } ];*/
            $http.get('http://' + $scope.formData.selectedNode.ip_address + ':3000/addRemoteBackend/getRemoteBrands').success(function(data) {
                $scope.brands = data;
            });
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
        $scope.items = [{
                id: 0
            },
            {
                id: 1
            },
            {
                id: 2
            },
            {
                id: 3
            },
            {
                id: 4
            },
            {
                id: 5
            },
            {
                id: 6
            },
            {
                id: 7
            },
            {
                id: 8
            },
            {
                id: 9
            },
            {
                id: 10
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
        $scope.gotomodifyScript = function(data) {
            if (data !== null) {
                Authorization.id = data.id;
            } else Authorization.id = null;
        };

        $ionicModal.fromTemplateUrl('templates/ScriptPage/AddScriptSteps.html', {
            scope: $scope
        }).then(function(modal) {
            $scope.modal = modal;
        });

        // Triggered in the login modal to close it
        $scope.closeLogin = function() {
            $scope.modal.hide();
        };

        // Open the login modal
        $scope.login = function() {
            $scope.modal.show();
        };
    });
