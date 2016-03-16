myApp.controller('BuildController', ['$scope', '$rootScope', 'Authentication', 'sharedExercises', '$window',
  function($scope, $rootScope, Authentication, sharedExercises, $window) {
    
    $scope.numOfExercises = 10;
    // change to 60, 4 for testing
    $scope.timeForExercises = 4;

   

    // ab challenge
    // a set of ab specific exercises to randomly choose from

    // crunches, flutter kicks, pushups, plank, diamond pushups, jumping jacks, wall sits, lunges
    // 'Crunches', 'Flutter Kicks', 'Pushups', 'Plank', 'Diamond Pushups', 'Jumping Jacks', 'Wall Sits', 'Lunges', 'Leg Raises', 'Crunch Twists', 'Side Plank', 'Side Lunges', 'Tuck Jumps', 'Burpees', 'Squats', 'Calf Raises', 'Bicycle', 'Crunches'];

    // add custom set to Firebase,
    // draw from customSet and append to exercises.

    var randomExercises = [];
    var abExercises = ['Crunches', 'Plank', 'Side Plank', 'Crunch Twists', 'Flutter Kicks', 'Bicycle'];
    var cardioExercises = ['Pushups', 'Plank', 'Diamond Pushups', 'Jumping Jacks', 'Wall Sits', 'Lunges', 'Leg Raises', 'Side Plank', 'Side Lunges', 'Tuck Jumps', 'Burpees', 'Squats', 'Calf Raises'];
    var allExercises = ['Crunches', 'Flutter Kicks', 'Pushups', 'Plank', 'Diamond Pushups', 'Jumping Jacks', 'Wall Sits', 'Lunges', 'Leg Raises', 'Crunch Twists', 'Side Plank', 'Side Lunges', 'Tuck Jumps', 'Burpees', 'Squats', 'Calf Raises', 'Bicycle', 'Crunches'];

    $scope.build = function(numOfExercises, timeForExercises, exerciseType) {
        switch(exerciseType) {
            case 'abs':
                randomExercises = abExercises;
                break;
            case 'cardio':
                randomExercises = cardioExercises;
                break;
            case 'all':
                randomExercises = allExercises;
            default:
                randomExercises = allExercises;
        }


    	var exerciseList = [];

    	// c for create, and c++ :)
    	for (c=0; c<numOfExercises; c++) {
    		// picking a randomExercise from list
    		var randEx = randomExercises[Math.floor(Math.random()*randomExercises.length)];
    		var exercise = {
    			'time': timeForExercises,
    			'exercise': randEx,
                'currentTime': 0
    		}
    		exerciseList.push(exercise);
    	}

    	sharedExercises.setExerciseList(exerciseList);
		$window.location.href = '#/tab/workout';
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

