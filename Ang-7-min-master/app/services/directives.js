(function() {
    'use strict';

    var app = angular.module('app');

    app.directive('ccSpinner', ['$window', function ($window) {
        // Description:
        //  Creates a new Spinner and sets its options
        // Usage:
        //  <div data-cc-spinner="vm.spinnerOptions"></div>
        var directive = {
            link: link,
            restrict: 'A'
        };
        return directive;

        function link(scope, element, attrs) {
            scope.spinner = null;
            scope.$watch(attrs.ccSpinner, function (options) {
                if (scope.spinner) {
                    scope.spinner.stop();
                }
                scope.spinner = new $window.Spinner(options);
                scope.spinner.spin(element[0]);
            }, true);
        }
    }]);

    app.directive('a7mImgEx', ['config', function (config) {
        //Usage:
        //<img data-a7m-img-ex={{ex.img}}></div>
        var basePath = config.exImageBasePath;

        var directive = {
            link: link,
            restrict: 'A',
        };
        return directive;

        function link(scope, element, attrs) {
            attrs.$observe('a7mImgEx', function (value) {
                value = basePath + value;
                attrs.$set('src', value);
            });

        }
    }]);
})();