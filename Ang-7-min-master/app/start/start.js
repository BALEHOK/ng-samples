(function () {
    'use strict';

    var controllerId = 'start';
    angular.module('app').controller(controllerId,
        ['$scope', 'common', 'workoutTimer', start]);

    function start($scope, common,  workoutTimer) {
        var logSuccess = common.logger.getLogFn(controllerId, 'success');

        var vm = this;
        vm.workoutTime = workoutTimer.workoutTime();

        activate();

        function activate() {
            $scope.$on('$routeChangeStart',
                function () {
                    workoutTimer.workoutTime(vm.workoutTime);
                }
            );
            
            logSuccess('[Start Controller] loaded!', null, false);
            common.activateController([], controllerId);
        }
    }
})();
