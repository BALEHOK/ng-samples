(function () {
    'use strict';

    var serviceId = 'datacontext';
    angular.module('app').factory(serviceId,
        [datacontext]);

    function datacontext() {
        var service = {
            getExercises: getExercises
        };

        return service;

        function getExercises() {
            var exs = [
                { name: 'Jumping Jacks', img: 'jumping-jack.png' },
                { name: 'Wall Sit', img: 'wall-sit.png' },
                { name: 'Push-Up', img: 'push-up.png' },
                { name: 'Abdominal Crunch', img: 'crunch.png' },
                { name: 'Step-Up onto Chair', flip: true, img: 'step-up.png' },
                { name: 'Squat', img: 'squat.png' },
                { name: 'Triceps Dip on Chair', img: 'triceps-dip.png' },
                { name: 'Plank', img: 'plank.png' },
                { name: 'High Knees Running', img: 'running.png' },
                { name: 'Lunge', flip: true, img: 'lunge.png' },
                { name: 'Push-up and Rotation', flip: true, img: 'push-up-rotate.png' },
                { name: 'Side Plank', flip: true, img: 'side-plank.png' }
            ];
            return exs;
        }
    }
})();