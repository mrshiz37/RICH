angular.module('scripts', ['nodes'])
    .factory('Authorization', function() {

        authorization = {};
        authorization.id = "";
        return authorization;
    })


    .controller('scriptsCtrl', function($scope, $timeout, Authorization) {

        //holds data for second page
        $scope.input = Authorization;

        //controls list delete
        $scope.data = {
            showDelete: false
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
            },
            {
                id: 11
            },
            {
                id: 12
            },
            {
                id: 13
            },
            {
                id: 14
            },
            {
                id: 15
            },
            {
                id: 16
            },
            {
                id: 17
            },
            {
                id: 18
            },
            {
                id: 19
            },
            {
                id: 20
            },
            {
                id: 21
            },
            {
                id: 22
            },
            {
                id: 23
            },
            {
                id: 24
            },
            {
                id: 25
            },
            {
                id: 26
            },
            {
                id: 27
            },
            {
                id: 28
            },
            {
                id: 29
            },
            {
                id: 30
            },
            {
                id: 31
            },
            {
                id: 32
            },
            {
                id: 33
            },
            {
                id: 34
            },
            {
                id: 35
            },
            {
                id: 36
            },
            {
                id: 37
            },
            {
                id: 38
            },
            {
                id: 39
            },
            {
                id: 40
            },
            {
                id: 41
            },
            {
                id: 42
            },
            {
                id: 43
            },
            {
                id: 44
            },
            {
                id: 45
            },
            {
                id: 46
            },
            {
                id: 47
            },
            {
                id: 48
            },
            {
                id: 49
            },
            {
                id: 50
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
            }
            else Authorization.id = null;
        };
    });
