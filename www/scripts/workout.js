myApp.controller('WorkoutController', ['$scope', '$rootScope', 'Authentication', 'sharedExercises',
  function($scope, $rootScope, Authentication, sharedExercises) {
    
    // $scope.numOfExercises = 10;
    // $scope.timeForExercises = 60;

   

    // ab challenge
    // a set of ab specific exercises to randomly choose from

    // crunches, flutter kicks, pushups, plank, diamond pushups, jumping jacks, wall sits, lunges

    // var randomExercises = ['crunches', 'flutter kicks', 'pushups', 'plank', 'diamond pushups', 'jumping jacks', 'wall sits', 'lunges', 'leg raises', 'crunch twists'];

    // $scope.build = function(numOfExercises, timeForExercises) {
    // 	console.log(numOfExercises, timeForExercises, "numOfE, timeForE");

    // 	// build an array that workout.js can use to construct a list of exercises
    // 	// pick from random set of exercises

    // 	// of length numOfExercises, of time timeForExercises


    // 	var exerciseList = [];

    // 	// c for create, and c++ :)
    // 	for (c=0; c<numOfExercises; c++) {
    // 		var exercise = {
    // 			'time': timeForExercises,
    // 			'exercise': randomExercises[Math.random()*randomExercises.length]
    // 		}
    // 		exerciseList.push(exercise);
    // 	}

    // 	$rootScope.$broadcast('sendExerciseList', exerciseList);

    // $scope.$on('sendExerciseList', function(exerciseList) {
    //     console.log(exerciseList[0]);
    // });
    $scope.exerciseList = sharedExercises.getExerciseList();

    $scope.updateExerciseList = function() {
        return sharedExercises.getExerciseList();
    }

    $scope.testEL = function() {
        // $scope.exerciseList = sharedExercises.getExerciseList();
        console.log($scope.exerciseList[0]);
    }

}]); // Controller


// to send exerciseList from build.js to to workout.js

// 
// 8
// down vote
// In one controller, you can do:

// $rootScope.$broadcast('eventName', data);
// and listen to the event in another:

// $scope.$on('eventName', function (event, data) {...});

