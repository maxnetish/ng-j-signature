(function(){
    angular.module('App', [])
        .controller('appController',
        [
            '$scope',
            function($scope){
                $scope.foo = "bar";
            }
        ]);

})();
