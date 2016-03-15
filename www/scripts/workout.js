myApp.controller('WorkoutController', ['$scope', '$rootScope', 'Authentication', 'sharedExercises',
  function($scope, $rootScope, Authentication, sharedExercises) {

    var exerciseList;
    $scope.currentExercise;
    $scope.exerciseList;

    var exerciseTimeLimit;

    $scope.updateExerciseList = function() {
        exerciseList = sharedExercises.getExerciseList();
        $scope.currentExercise = exerciseList[0];
        exerciseTimeLimit = $scope.currentExercise["time"];
        $scope.exerciseList = exerciseList;
        return exerciseList;
    }


    $scope.data = {
        showReordering: false
    }

    $scope.reorderItem = function(item, fromIndex, toIndex) {
        $scope.exerciseList.splice(fromIndex, 1)
        $scope.exerciseList.splice(toIndex, 0, item)
    }

    $scope.currentExerciseProgress = 0;
    var timer;
    var exTime = 0;

    var addTime = function() {
        exTime+=.1;
        console.log("exTime", exTime)
        $scope.$apply(function() {
            $scope.currentExerciseProgress = exTime;
        });
        if (exTime>exerciseTimeLimit) {
            removeCurrentTask($scope.currentExercise);
            exTime=0;
        }
    }

    var removeCurrentTask = function(task) {
        $scope.exerciseList.shift();

        console.log($scope.exerciseList);

        // sharedExercises.setExerciseList($scope.getExerciseList);

        exerciseList = $scope.exerciseList;
        // $scope.updateExerciseList();
    }

    $scope.startExercise = function() {
        timer = setInterval(addTime, 100);

        // console.log(exerciseTimeLimit, "exerciseTimeLimit");
        // if the timer exceeds maxTime, delete the current task, and restart exTime




    }

    $scope.pauseExercise = function() {
        clearInterval(timer);
    }

    // $scope.testEL = function() {
    //     // $scope.exerciseList = sharedExercises.getExerciseList();
    //     console.log($scope.exerciseList[0]);
    // }

}]); // Controller
