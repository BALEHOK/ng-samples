describe('Workout Timer', function () {
    var workoutTimer;
    var exs = [
                {
                    name: 'Crunch',
                    img: 'crunch.png',
                    flip: false
                },
                {
                    name: 'Lunge',
                    img: 'lunge.png',
                    flip: true
                }
    ];
    var dataContextmock = {
        getExercises: function() {
            return exs;
        }
    };

    beforeEach(function () {
        // disable routing on $timeout.flush()
        module('app', { $route: {}, datacontext: dataContextmock });

        inject(['workoutTimer', function (_workoutTimer_) {
            workoutTimer = _workoutTimer_;
        }]);
    });

    it('it should not be null', function () {
        expect(workoutTimer).toBeDefined();
        expect(workoutTimer).not.toBeNull();
    });

    describe('exercise time', function() {
        it('it should be defaulted to 7 min', function() {
            expect(workoutTimer.workoutTime()).toBe(7);
        });

        it('it can be changed', function() {
            var time = 12;
            workoutTimer.workoutTime(time);
            expect(workoutTimer.workoutTime()).toBe(time);
        });
    });

    describe('rest time', function() {
        it('it should be defaulted to 10 seconds', function() {
            expect(workoutTimer.restTime()).toBe(10);
        });

        it('it can be changed', function() {
            var time = 12;
            workoutTimer.restTime(time);
            expect(workoutTimer.restTime()).toBe(time);
        });
    });

    describe('when in progress', function () {
        var $timeout;
        var exLength = exs.length;
        var exTime = 0.2;
        var ticksPerEx = exTime * 60 / exLength;
        var tickPerRest = 3;
        
        var dummy = function () {
        };

        beforeEach(function () {
            inject(['$timeout', function(_$timeout_) {
                $timeout = _$timeout_;
            }]);

            workoutTimer.workoutTime(exTime);
            workoutTimer.restTime(tickPerRest);
        });
        
        it('can stop it', function() {
            var count = 0;

            var onTick = function(time) {
                console.log(time, count);
                ++count;
            };

            // onTick runned immediatly after start
            workoutTimer.start(dummy, dummy, onTick, dummy);

            // onTick runned on timeout
            $timeout.flush();
            
            // should stop timeout
            workoutTimer.stop();
            
            // deffered task was cancelled, so waiting a nexception
            expect($timeout.flush).toThrow();
            expect(count).toBe(2);
        });
        
        it('it will pass each second to onTick', function() {
            var time = ticksPerEx;

            var onTick = function (t) {
                if (time <= 0) {
                    // the next cycle is started, do not care in this test
                    return;
                }
                
                expect(t).toBe(time);
                --time;
            };

            workoutTimer.start(dummy, dummy, onTick, dummy);
            
            for (var i = ticksPerEx; i--;) {
               $timeout.flush(); 
            }
        });
        
        it('it will fetch each exercise and pass it to callback', function() {
            var expectedIndex = 0;

            var onExLoaded = function (ex, index) {
                expect(index).toBe(expectedIndex++);
                expect(ex).toEqual(exs[index]);
            };

            workoutTimer.start(onExLoaded, dummy, dummy, dummy);

            var totalTime = exLength * (ticksPerEx + tickPerRest);
            for (var i = totalTime; i--;) {
               $timeout.flush(); 
            }
            
            expect($timeout.flush).toThrow();
            expect(expectedIndex).toBe(exLength);
        });
    });
});