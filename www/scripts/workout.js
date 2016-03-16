myApp.controller('WorkoutController', ['$scope', '$rootScope', 'Authentication', 'sharedExercises', '$ionicPopup', '$timeout',
  function($scope, $rootScope, Authentication, sharedExercises, $ionicPopup, $timeout) {

    var exerciseList;
    $scope.currentExercise;
    $scope.exerciseList;

    var exerciseTimeLimit;



    $scope.updateExerciseList = function() {
        exerciseList = sharedExercises.getExerciseList();
        if (exerciseList.length>0) {
            $scope.currentExercise = exerciseList[0];
            exerciseTimeLimit = $scope.currentExercise["time"];
            console.log("exerciseTimeLimit:", exerciseTimeLimit);
        }
        $scope.exerciseList = exerciseList;
        return exerciseList;
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
        // fill: '#aaa',
        // font_size: 3rem;
    })


    $scope.editExercise = function(index) {
        // pull up input field where you can change the name
        // and change the time
        // $scope.exerciseList[index] = ;
        $scope.newExercise = {};

        // update shared properties
        var myPopup = $ionicPopup.show({
        template: "<input placeholder='&nbsp;&nbsp;Name' type='text' ng-model='newExercise.exercise'><br><input type='number' placeholder='&nbsp;&nbsp;Time' ng-model='newExercise.time'>",
        title: 'Edit Exercise',
        // subTitle: 'Enter a new name and time',
        scope: $scope,
        // cssClass: 'popupCenter',
        buttons: [
          { text: 'Cancel' },
          {
            text: '<b>Save</b>',
            type: 'button-positive',
            onTap: function(e) {
              if (!$scope.newExercise) {
                //don't allow the user to close unless he enters wifi password
                e.preventDefault();
              } else {
                $scope.exerciseList[index]["exercise"] = $scope.newExercise.exercise;
                $scope.exerciseList[index]["time"] = $scope.newExercise.time;
                // return $scope.newExercise.name;
                sharedExercises.setExerciseList($scope.exerciseList);
                // $scope.currentExercise = 
                $scope.updateExerciseList();
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

    $scope.currentExerciseProgress = 0;
    var timer;
    var exTime = 0;

    var addTime = function() {
        exerciseTimeLimit = $scope.currentExercise["time"];
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
        exerciseTimeLimit = $scope.currentExercise["time"];
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

// prevent multiple starts