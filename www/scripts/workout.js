myApp.controller('WorkoutController', ['$scope', '$rootScope', 'Authentication', 'sharedExercises',
  function($scope, $rootScope, Authentication, sharedExercises) {

    var exerciseList;
    $scope.currentExercise;
    $scope.exerciseList;

    $scope.updateExerciseList = function() {
        exerciseList = sharedExercises.getExerciseList();
        $scope.currentExercise = exerciseList[0];
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

    

    // $scope.testEL = function() {
    //     // $scope.exerciseList = sharedExercises.getExerciseList();
    //     console.log($scope.exerciseList[0]);
    // }

}]); // Controller
