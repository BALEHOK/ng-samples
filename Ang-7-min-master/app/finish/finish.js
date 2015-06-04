(function () {
    'use strict';

    var controllerId = 'finish';
    angular.module('app').controller(controllerId, ['common', workout]);

    function workout(common) {
        var logSuccess = common.logger.getLogFn(controllerId, 'success');
        activate();
        
        function activate() {
            logSuccess('[Finish Controller] loaded!', null, false);
            common.activateController([], controllerId);
        }
    }
})();
