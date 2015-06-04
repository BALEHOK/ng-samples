(function() {
    'use strict';

    var app = angular.module('app');

    app.filter('range', function() {
        return function(input) {
            var range = [];
            input = parseInt(input);
            for (var i = 0; i < input; i++) {
                range.push(i);
            }

            return range;
        };
    });
})();