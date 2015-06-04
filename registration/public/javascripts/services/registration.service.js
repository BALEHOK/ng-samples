(function() {
    'use strict';

    angular
        .module('br-reg.services')
        .factory('registrationService', registrationService);

    registrationService.$inject = ['$http'];

    /* @ngInject */
    function registrationService($http) {
        var service = {
            register: register
        };
        return service;

        ////////////////
        function register(merchant) {
          var registrationUrl = '/api/register';

          return $http.post(registrationUrl, merchant);
        }
    }
})();