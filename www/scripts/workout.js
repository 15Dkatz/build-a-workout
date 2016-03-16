myApp.controller('WorkoutController', ['$scope', '$rootScope', 'Authentication', 'sharedExercises', '$ionicPopup', '$timeout',
  function($scope, $rootScope, Authentication, sharedExercises, $ionicPopup, $timeout) {

    var exerciseList;
    $scope.currentExercise;
    $scope.exerciseList;

    var exerciseTimeLimit;

    // a global startOk boolean to ensure that startTask doesn't press more than once and cause mutliple timers.
    var startOk = true;


    $scope.updateExerciseList = function() {
        exerciseList = sharedExercises.getExerciseList();
        if (exerciseList.length>0) {
            $scope.currentExercise = exerciseList[0];
            exerciseTimeLimit = $scope.currentExercise["time"];
            console.log("exerciseTimeLimit:", exerciseTimeLimit);
        }
        // timer = false;
        $scope.exerciseList = exerciseList;
        return exerciseList;
    }

    var updateExerciseVariables = function() {
        $scope.exerciseList = sharedExercises.getExerciseList();
        $scope.currentExercise = $scope.exerciseList[0];
        // console
        // timer = false;
        // exTime = 0;
    }


    $scope.data = {
        showReordering: false,
        shouldShowDelete: false,
        canSwipe: true,
    }

    $scope.reorderItem = function(item, fromIndex, toIndex) {
        $scope.exerciseList.splice(fromIndex, 1)
        $scope.exerciseList.splice(toIndex, 0, item)
    }

    // change color here later!
    var progressBarCircle = new ProgressBar.Circle("#progressBarCircle", {
        color: '#ef473a',
        strokeWidth: 3
    })


    $scope.editExercise = function(index) {
        $scope.newExercise = {};
        // update shared properties
        var myPopup = $ionicPopup.show({
        template: "<input placeholder='&nbsp;&nbsp;Name' type='text' ng-model='newExercise.exercise'><br><input type='number' placeholder='&nbsp;&nbsp;Time' ng-model='newExercise.time'>",
        title: 'Edit Exercise',
        scope: $scope,
        buttons: [
          { text: 'Cancel' },
          {
            text: '<b>Save</b>',
            type: 'button-positive',
            onTap: function(e) {
              if (!$scope.newExercise) {
                e.preventDefault();
              } else {
                $scope.exerciseList[index]["exercise"] = $scope.newExercise.exercise;
                $scope.exerciseList[index]["time"] = $scope.newExercise.time;
                sharedExercises.setExerciseList($scope.exerciseList);
                updateExerciseVariables();
              }
            }
          }
        ]
      });

      myPopup.then(function(res) {
        console.log('Tapped!', res);
      });

      $timeout(function() {
         myPopup.close(); //close the popup after 3 seconds for some reason
      }, 10000);
    }

    // $scope.currentExerciseProgress = 0;
    var timer;
    var exTime = 0;

    var addTime = function() {
        exerciseTimeLimit = $scope.currentExercise["time"];

        console.log($scope.currentExercise["currentTime"], "currentTime");

        // exTime = $scope.currentExercise["currentTime"];
        // console.log("ex")
        exTime+=1;
        console.log("exTime", exTime)

        // $scope.currentExercise["currentTime"] = exTime;

        // exerciseList[0] = $scope.currentExercise;

        

        // sharedExercises.setExerciseList(exerciseList);
        $scope.$apply(function() {
            updateExerciseVariables();
        });

        if (exTime>exerciseTimeLimit) {
            removeCurrentTask($scope.currentExercise);
            exTime=0;
            // updateExerciseVariables();
        }

        progressBarCircle.animate(exTime/exerciseTimeLimit, function() {
            progressBarCircle.setText(exTime);
        });

    }

    $scope.removeExercise = function(index) {
        $scope.exerciseList.splice(index, 1);
        sharedExercises.setExerciseList($scope.exerciseList);
        // $scope.updateExerciseList();
        // $scope.exerciseList = $scope.updateExerciseList();
        timer = false;
        updateExerciseVariables();
        // exTime = $scope.currentExercise["time"];
    }


    var removeCurrentTask = function(task) {
        $scope.exerciseList.shift();
        console.log($scope.exerciseList);
        sharedExercises.setExerciseList($scope.exerciseList);
        // exerciseList = $scope.exerciseList;
        // $scope.updateExerciseList();
        // timer = false;
        // clearInterval(timer);
        updateExerciseVariables();
        // exerciseList = $scope.exerciseList;
        // $scope.startExercise();
    }

    $scope.startExercise = function() {
        exerciseTimeLimit = $scope.currentExercise["time"];
        if (!timer) {
            timer = setInterval(addTime, 1000);
        }
        // startOk = false;
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
            timer = false;
            $scope.pauseBtn['name']='pause';
            $scope.pauseBtn['ionname'] = 'ion-pause';
            $scope.startExercise();
        }

    }

        


}]); // Controller

// prevent multiple starts