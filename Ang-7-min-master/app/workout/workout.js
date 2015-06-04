(function () {
    'use strict';

    var controllerId = 'workout';
    angular.module('app').controller(controllerId,
        ['$location', '$scope', 'common', 'workoutTimer', workout]);

    function workout($location, $scope, common, workoutTimer) {
        var logSuccess = common.logger.getLogFn(controllerId, 'success');
        
        var vm = this;
        vm.isRest = false;
        vm.time = 0;
        vm.exName = '';
        vm.nextExName = '';
        vm.currentEx = null;
        vm.currentIndex = 0;
        vm.totalEx = workoutTimer.exerciseCount;
        

        activate();
        
        function activate() {
            logSuccess('[Workout Controller] loaded!', null, false);
            common.activateController([], controllerId);
            
            $scope.$on('$destroy', function () {
                workoutTimer.stop();
            });

            workoutTimer.start(onExLoaded, onRest, onTick, onFinish);
        }

        function onExLoaded(exercise, index) {
            vm.currentEx = exercise;
            vm.exName = exercise.name;
            vm.currentIndex = index;
            vm.isRest = false;
        }
        
        function onRest(nextEx, index) {
            vm.exName = 'Rest';
            if (nextEx) {
                vm.nextExName = nextEx.name;
            } else {
                vm.nextExName = 'Finish';
            }
            
            vm.isRest = true;
            vm.currentIndex = index;
        }

        function onTick(time) {
            vm.time = time;
        }

        function onFinish() {
            $location.path('/finish');
        }
    }
})();
