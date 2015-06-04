(function () {
    'use strict';

    var serviceId = 'workoutTimer';
    angular.module('app').factory(serviceId, ['common', 'datacontext', workoutTimer]);

    function workoutTimer(common, datacontext) {
        var exs = datacontext.getExercises();
        
        var exTimeMin = 7;
        var restTimeSec = 10;
        var timeout = common.$timeout;
        var tick;

        var service = {
            exerciseCount: exs.length,
            workoutTime: workoutTime,
            restTime: restTime,
            start: start,
            stop: stop
        };
        

        return service;

        function workoutTime(mins) {
            if (mins) {
                exTimeMin = mins;
            }
            
            return exTimeMin;
        }

        function restTime(secs) {
            if (secs) {
                restTimeSec = secs;
            }
            
            return restTimeSec;
        }
        
        function stop() {
            timeout.cancel(tick);
        }
        
        function start(onExLoaded, onRest, onTick, onFinish) {
            var timePerEx = Math.floor(exTimeMin * 60 / exs.length) || Math.floor(7 * 60 / exs.length);
            
            loadExercise(0, false);
            
            function loadExercise(exIndex, isRest) {
                var i;
                var ex;
                var rest;
                var exTime;

                if (exIndex < exs.length) {
                    if (!isRest) {
                        i = exIndex;
                        ex = exs[exIndex];
                        onExLoaded(ex, exIndex);
                        exTime = timePerEx;
                    } else {
                        i = exIndex + 1;
                        if (i < exs.length) {
                            ex = exs[i];
                        } else {
                            ex = null;
                        }
                        onRest(ex, i);
                        exTime = restTimeSec;
                    }

                    rest = !isRest;
                } else {
                    onFinish();
                    return;
                }

                tick = tickCycle(exTime);

                function tickCycle(t) {
                    onTick(t);

                    var timeLeft = t - 1;

                    if (timeLeft < 0) {
                        loadExercise(i, rest);
                        return null;
                    } else {
                        return timeout(function() {
                            tick = tickCycle(timeLeft);
                        }, 1000);
                    }
                }
            }
        }
    }
})();