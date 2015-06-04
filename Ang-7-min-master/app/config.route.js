(function () {
    'use strict';

    var app = angular.module('app');

    // Collect the routes
    app.constant('routes', getRoutes());
    
    // Configure the routes and route resolvers
    app.config(['$routeProvider', 'routes', routeConfigurator]);
    function routeConfigurator($routeProvider, routes) {

        routes.forEach(function (r) {
            $routeProvider.when(r.url, r.config);
        });
        $routeProvider.otherwise({ redirectTo: '/' });
    }

    // Define the routes 
    function getRoutes() {
        return [
            {
                url: '/',
                config: {
                    templateUrl: 'app/start/start.html',
                    title: 'Start',
                    settings: {
                    }
                }
            },
            {
                url: '/workout',
                config: {
                    templateUrl: 'app/workout/workout.html',
                    title: 'Workout',
                    settings: {
                    }
                }
            },
            {
                url: '/finish',
                config: {
                    templateUrl: 'app/finish/finish.html',
                    title: 'Finish',
                    settings: {
                    }
                }
            }
        ];
    }
})();