myApp.controller('WorkoutController', ['$scope', '$rootScope', 'Authentication', 'sharedExercises', '$ionicPopup', '$timeout', '$firebaseAuth', 'FIREBASE_URL',
  function($scope, $rootScope, Authentication, sharedExercises, $ionicPopup, $timeout, $firebaseAuth, FIREBASE_URL) {
    var ref = new Firebase(FIREBASE_URL);
    var auth = $firebaseAuth(ref);


    var exerciseList;
    var exerciseTimeLimit;
    
    $scope.currentExercise;
    $scope.exerciseList;

    $scope.initExList = function() {
        exerciseList = sharedExercises.getExerciseList();
    }

    $scope.updateExerciseList = function() {
        exerciseList = sharedExercises.getExerciseList();
        if (exerciseList) {
            if (exerciseList.length>0) {
                $scope.currentExercise = exerciseList[0];
                exerciseTimeLimit = $scope.currentExercise["time"];
                // console.log("exerciseTimeLimit:", exerciseTimeLimit);
            }
        }
        // timer = false;
        $scope.exerciseList = exerciseList;
        // updateExerciseVariables();
        return exerciseList;
    }

    var updateExerciseVariables = function() {
        $scope.exerciseList = sharedExercises.getExerciseList();
        $scope.currentExercise = $scope.exerciseList[0];

        // update firebase
        // var exerciseListRef = new Firebase(FIREBASE_URL + 'users/' + $rootScope.currentUser.$id + '/exercises');
        // // $scope.$apply(function() {
        // exerciseListRef.update({"exerciseList": $scope.exerciseList});
        // })
    }

    auth.$onAuth(function(authUser) {
        if (authUser) {
    //         var exerciseListRef = new Firebase(FIREBASE_URL + 'users/' + $rootScope.currentUser.$id + '/exercises');
    //         exerciseListRef.once("value", function(snapshot) {
    //             if (snapshot.exists()) {
    //                 // $scope.exerciseList = snapshot.val()["exerciseList"];
    //                 // sharedExercises.setExerciseList($scope.setExerciseList);
    //                 // updateExerciseVariables();
    //                 console.log("exerciseList:", $scope.exerciseList);
    //             }
    //         }, function(errorObject) {
    //             console.log("The read failed: ", errorObject.code);
    //         });

            exerciseList = sharedExercises.getExerciseList();
            console.log("exerciseList from authUser", exerciseList); 
        }
    })

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
        var myPopup = $ionicPopup.show({
        template: "<input class='inputIndent' placeholder='Name' type='text' ng-model='newExercise.exercise'><br><input type='number' class='inputIndent' placeholder='Time' ng-model='newExercise.time'>",
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
         myPopup.close(); 
      }, 10000);
    }

    var timer;
    var exTime = 0;

    var addTime = function() {
        exerciseTimeLimit = $scope.currentExercise["time"];
        // console.log($scope.currentExercise["currentTime"], "currentTime");
        exTime+=1;
        console.log("exTime", exTime)
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
        updateExerciseVariables(); 
    }

    $scope.startExercise = function() {
        exerciseTimeLimit = $scope.currentExercise["time"];
        if (!timer) {
            timer = setInterval(addTime, 1000);
        }
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

    $scope.addExercise = function() {
        // popup template for new Exercise
        $scope.newExercise = {};
        // update shared properties
        var myPopup = $ionicPopup.show({
        template: "<input class='inputIndent' placeholder='Name' type='text' ng-model='newExercise.exercise'><br><input type='number' class='inputIndent' placeholder='Time in seconds' ng-model='newExercise.time'>",
        title: 'New Exercise',
        scope: $scope,
        buttons: [
          { text: 'Cancel' },
          {
            text: '<b>Add</b>',
            type: 'button-positive',
            onTap: function(e) {
              if (!$scope.newExercise) {
                e.preventDefault();
              } else {
                $scope.exerciseList.push($scope.newExercise);
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
         myPopup.close(); 
      }, 10000);

    }


}]); // Controller