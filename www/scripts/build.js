myApp.controller('BuildController', ['$scope', '$rootScope', 'Authentication', 'sharedExercises',
  function($scope, $rootScope, Authentication, sharedExercises) {
    
    $scope.numOfExercises = 10;
    $scope.timeForExercises = 60;

   

    // ab challenge
    // a set of ab specific exercises to randomly choose from

    // crunches, flutter kicks, pushups, plank, diamond pushups, jumping jacks, wall sits, lunges

    var randomExercises = ['crunches', 'flutter kicks', 'pushups', 'plank', 'diamond pushups', 'jumping jacks', 'wall sits', 'lunges', 'leg raises', 'crunch twists'];

    $scope.build = function(numOfExercises, timeForExercises) {
    	console.log(numOfExercises, timeForExercises, "numOfE, timeForE");
    	// build an array that workout.js can use to construct a list of exercises
    	// pick from random set of exercises

    	// of length numOfExercises, of time timeForExercises


    	var exerciseList = [];

    	// c for create, and c++ :)
    	for (c=0; c<numOfExercises; c++) {
    		// picking a randomExercise from list
    		var randEx = randomExercises[Math.floor(Math.random()*randomExercises.length)];
    		var exercise = {
    			'time': timeForExercises,
    			'exercise': randEx
    		}
    		exerciseList.push(exercise);
    	}

    	console.log(exerciseList[0], "in build.js");

    	// $rootScope.$broadcast('sendExerciseList', exerciseList);
    	sharedExercises.setExerciseList(exerciseList);

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

