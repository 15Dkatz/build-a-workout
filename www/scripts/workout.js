myApp.controller('WorkoutController', ['$scope', '$rootScope', 'Authentication', 'sharedExercises',
  function($scope, $rootScope, Authentication, sharedExercises) {

    var exerciseList;
    $scope.currentExercise;
    $scope.exerciseList;

    var exerciseTimeLimit;



    $scope.updateExerciseList = function() {
        exerciseList = sharedExercises.getExerciseList();
        if (exerciseList.length>0) {
            $scope.currentExercise = exerciseList[0];
            exerciseTimeLimit = $scope.currentExercise["time"];
        }
        $scope.exerciseList = exerciseList;
        return exerciseList;
    }


    $scope.data = {
        showReordering: false,
        shouldShowDelete: false
    }

    $scope.reorderItem = function(item, fromIndex, toIndex) {
        $scope.exerciseList.splice(fromIndex, 1)
        $scope.exerciseList.splice(toIndex, 0, item)
    }

    // change color here later!
    var progressBarCircle = new ProgressBar.Circle("#progressBarCircle", {
        color: '#ef473a',
        strokeWidth: 3
        // fill: '#aaa',
        // font_size: 3rem;
    })

    $scope.currentExerciseProgress = 0;
    var timer;
    var exTime = 0;

    var addTime = function() {
        exTime+=1;
        console.log("exTime", exTime)
        $scope.$apply(function() {
            $scope.currentExerciseProgress = exTime;
        });

        if (exTime>exerciseTimeLimit) {
            removeCurrentTask($scope.currentExercise);
            exTime=0;
        }

        progressBarCircle.animate(exTime/exerciseTimeLimit, function() {
            progressBarCircle.setText(exTime);
        });

    }

    $scope.removeExercise = function(index) {
        $scope.exerciseList.splice(index, 1);
        sharedExercises.setExerciseList($scope.exerciseList);
    }




    var removeCurrentTask = function(task) {
        $scope.exerciseList.shift();

        console.log($scope.exerciseList);

        sharedExercises.setExerciseList($scope.exerciseList);

        exerciseList = $scope.exerciseList;
        // $scope.updateExerciseList();
    }

    $scope.startExercise = function() {
        timer = setInterval(addTime, 1000);


    }

    $scope.pauseBtn = {
        'name': 'pause',
        'ionname': 'ion-pause'
    }

    $scope.pauseExercise = function() {
        clearInterval(timer);
        if ($scope.pauseBtn['name']=='pause') {
            $scope.pauseBtn['name']='resume';
            $scope.pauseBtn['ionname'] = 'ion-play';
        } else {
            $scope.pauseBtn['name']='pause';
            $scope.pauseBtn['ionname'] = 'ion-pause';
            $scope.startExercise();
        }

    }

        


}]); // Controller

