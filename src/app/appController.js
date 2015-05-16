(function(){
    console.log('Instantiate appController');
    angular.module('App', ['ng.jsignature'])
        .controller('appController',
        [
            '$scope',
            function($scope){
                $scope.vm = {
                    signatureOptions: {
                        //width: 'ratio',
                        //height: 'ratio',
                        //sizeRatio: 6, // only used when height = 'ratio'
                        //color: '#000',
                        //'background-color': '#fff',
                        //'decor-color': '#eee',
                        //lineWidth: 0,
                        //minFatFingerCompensation: -10,
                        //showUndoButton: false,
                        //readOnly: false,
                        //data: []
                    }
                };

                $scope.applySettings = function(){
                    var fields = [
                        'width',
                        'height',
                        'sizeRatio',
                        'lineWidth',
                        'readOnly'
                    ], i, iLen;
                    var newSettings = {};
                    for(i=0,iLen=fields.length;i<iLen;i++){
                        if($scope[fields[i]]){
                            newSettings[fields[i]] = $scope[fields[i]];
                        }
                    }
                    $scope.vm.signatureOptions = newSettings;
                };
            }
        ]);

})();
