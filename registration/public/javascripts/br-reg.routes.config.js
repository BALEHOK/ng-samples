(function() {
    'use strict';

    angular
        .module('br-reg')
        .config(routesConfig);

    routesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

    /* @ngInject */
    function routesConfig($stateProvider, $urlRouterProvider) {
      $urlRouterProvider.otherwise('/');
       
      $stateProvider
        .state('form', {
          url: '/',
          templateUrl: 'partials/form',
          controller: 'FormController',
          controllerAs: 'form'
        })
        .state('form.success', {
          url: 'registered',
          templateUrl: 'partials/form-success'
        })
        .state('form.error', {
          url: 'error',
          templateUrl: 'partials/form-error'
        });
    }
})();