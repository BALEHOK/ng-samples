(function () {
    'use strict';

    var serviceId = 'routeMediator';
    angular.module('app').factory(serviceId, ['$rootScope', '$location', 'config', 'logger', routeMediator]);

    function routeMediator($rootScope, $location, config, logger) {
        var handleRouteChangeError = false;

        // Define the functions and properties to reveal.
        var service = {
            setRoutingHandlers: setRoutingHandlers
        };

        return service;
        
        function setRoutingHandlers() {
            handleRoutingErrors();
            updateDocTitle();
        }

        function handleRoutingErrors() {
            $rootScope.$on('$routeChangeError',
                function (event, current, previous, rejection) {
                    if (handleRouteChangeError) {
                        return;
                    }
                    handleRouteChangeError = true;
                    var msg = 'Error routing: '
                        + (current && current.name)
                        + '. ' + (rejection.msg || '');
                    logger.logWarning(msg, current, serviceId, true);
                    $location.path('/');
                });
        }

        function updateDocTitle() {
            $rootScope.$on('$routeChangeSuccess',
                function (event, current) {
                    handleRouteChangeError = false;
                    var title = config.docTitle + ' ' + (current.title || '');
                    $rootScope.title = title;
                });
        }
    }
})();