myApp.controller('BuildController', ['$scope', '$rootScope', 'Authentication', 'sharedExercises', '$window',
  function($scope, $rootScope, Authentication, sharedExercises, $window) {
    
    $scope.numOfExercises = 10;
    $scope.timeForExercises = 60;

   
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

        var combinedExerciseList = exerciseList.concat(sharedExercises.getExerciseList());

    	sharedExercises.setExerciseList(combinedExerciseList);
		$window.location.href = '#/tab/workout';
    }



}]); // Controller
