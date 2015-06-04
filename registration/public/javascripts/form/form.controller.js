(function() {
  'use strict';

   angular
    .module('br-reg.form')
    .controller('FormController', FormController);

  FormController.$inject = ['registrationService', '$state'];

  /* @ngInject */
  function FormController(registrationService, $state) {
    var vm = this;
    vm.merchant = {};
    vm.submit = submit;

    activate();

    ////////////////

    function activate() {
      vm.merchant = {
        username: '',
        businessName: '',
        firstName: '',
        lastName: '',
        category: '',
        businessDescription: '',
        businessPhoneNumber: '',
        contactPhoneNumber:'',
        websiteUrl: ''
      };
    }

    function submit(){
      registrationService
        .register(vm.merchant)
        .then(function(){
          $state.go('form.success');
        })
        .catch(function(){
          $state.go('form.error');
        });
    }
  }
})();