(function () {

    angular.module('ng.jsignature')
        .directive('ngJSignature', [
            function () {
                return {
                    restrict: 'E',
                    scope: {
                        signatureOptions: '=?jSignatureOptions'
                    },
                    controller: 'jSignatureController',
                    require: '?ngModel',
                    link: linkJSignature
                };
            }
        ])
        .constant('defaultJsignatureOptions', {
            width: 'ratio',
            height: 'ratio',
            sizeRatio: 4, // only used when height = 'ratio'
            color: '#000',
            'background-color': '#fff',
            'decor-color': '#eee',
            lineWidth: 0,
            minFatFingerCompensation: -10,
            showUndoButton: false,
            readOnly: false,
            data: []
        })
        .constant('jSignatureInterface', {
            getSettings: 'getSettings',
            isModified: 'isModified'
        });

    function normalizeIntNumber(inp) {
        var result = 0,
            t = typeof inp;
        switch (t) {
            case 'number':
                result = inp;
                break;
            case 'string':
                result = parseInt(inp, 10);
                break;
        }
        result = isNaN(result) ? 0 : result;
        return result;
    }

    function normalizeBoolean(inp){
        return !!inp;
    }

    function applyJsignature(element) {
        var argsToPass = Array.prototype.splice.call(arguments, 1);
        console.log('call applyJsignature');
        console.log(argsToPass);
        var result = element.jSignature.apply(element, argsToPass);
        console.log(result);
        return result;
    }

    function updateSettings(element) {
        return function (newSettings) {
            var currentSettings = applyJsignature(element, 'getSettings');
            var changedSettings = [];
            var prop, i, iLen, valToSet;

            for (prop in currentSettings) {
                if (!newSettings.hasOwnProperty(prop) || newSettings[prop] == currentSettings[prop]) {
                    continue;
                }
                changedSettings.push({
                    prop: prop,
                    value: newSettings[prop]
                });
            }

            for (i = 0, iLen = changedSettings.length; i < iLen; i++) {
                valToSet = void 0;
                switch (changedSettings[i].prop) {
                    case 'height':
                    case 'width':
                        valToSet = changedSettings[i].value === 'ratio' ? 'ratio' :normalizeIntNumber(changedSettings[i].value);
                        break;
                    case 'sizeRatio':
                    case 'lineWidth':
                    case 'minFatFingerCompensation':
                        valToSet = normalizeIntNumber(changedSettings[i].value);
                        break;
                    case 'showUndoButton':
                        valToSet = normalizeBoolean(changedSettings[i].value);
                        break;
                    case 'readOnly':
                        applyJsignature(element, changedSettings[i].value ? 'disable' : 'enable');
                        break;
                    case 'data':
                        // TODO setData
                        break;

                    default:
                        applyJsignature(element, 'updateSetting', changedSettings[i].prop, parseInt(changedSettings[i].value, 10), true);
                        //applyJsignature(element, 'reset');
                        break;
                }
                if(valToSet){
                    applyJsignature(element, 'updateSetting', changedSettings[i].prop, valToSet, true);
                }
            }
        }
    }

    function linkJSignature(scope, element, attrs, ngModel, transcludeFn) {
        console.log(scope);
        console.log(ngModel);

        applyJsignature(element, 'init', scope.signatureOptions);

        scope.$watch('signatureOptions', function(newVal, oldVal){
            if(!newVal){
                return;
            }
            var currentData = applyJsignature(element, 'getData', 'native');
            var currentW = angular.element('canvas', element).get(0).width;
            var currentH = angular.element('canvas', element).get(0).height;
            element.children().remove();
            applyJsignature(element, 'init', newVal);

            var newW = angular.element('canvas', element).get(0).width;
            var newH = angular.element('canvas', element).get(0).height;

            var scale = newW*1.0/currentW;

            var newData = (function(data, scale){
                var newData = [];
                var o, i, l, j, m, stroke;
                for ( i = 0, l = data.length; i < l; i++) {
                    stroke = data[i];

                    o = {'x':[],'y':[]};

                    for ( j = 0, m = stroke.x.length; j < m; j++) {
                        o.x.push(stroke.x[j] * scale);
                        o.y.push(stroke.y[j] * scale);
                    }

                    newData.push(o);
                }
                return newData;
            })(
                currentData,
                scale
            );

            applyJsignature(element, 'setData', newData, 'native');
        });

        console.log(applyJsignature(element, 'getSettings'));
    }

})();
