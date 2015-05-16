(function () {

    angular.module('ng.jsignature', [])
        .controller('jSignatureController',
        [
            '$scope',
            jSignatureController
        ]);

    function jSignatureController($scope) {
        console.log($scope);
    }

})();
