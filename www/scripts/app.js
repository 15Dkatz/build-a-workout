myApp = angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'firebase'])
   .constant('FIREBASE_URL', 'https://build-a-workout.firebaseio.com/');


myApp.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

myApp.service('sharedExercises', ['FIREBASE_URL', '$rootScope', '$firebaseAuth', function(FIREBASE_URL, $rootScope, $firebaseAuth) {
  var exerciseList = [];
  var ref = new Firebase(FIREBASE_URL);
  var auth = $firebaseAuth(ref);
  var exerciseListRef;
  auth.$onAuth(function(authUser) {
      if (authUser) {
        exerciseListRef = new Firebase(FIREBASE_URL + 'users/' + $rootScope.currentUser.$id + '/exercises');
        if (exerciseListRef) {
          exerciseListRef.once("value", function(snapshot) {
              if (snapshot.exists()) {
                  exerciseList = snapshot.val()["exerciseList"];
                  console.log("exerciseList:", $scope.exerciseList);
              }
          }, function(errorObject) {
              console.log("The read failed: ", errorObject.code);
          });
        }
      }
  })

  return {
    getExerciseList: function() {
      
      return exerciseList;
    },
    setExerciseList: function(newList) {
      exerciseList = newList;
      
        // $scope.$apply(function() {
      exerciseListRef.update({"exerciseList": newList});
    }
  }
}])


myApp.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  .state('tab.build', {
    url: '/build',
    views: {
      'tab-build': {
        templateUrl: 'templates/tab-build.html',
        controller: 'BuildController'
      }
    }
  })

  .state('tab.workout', {
      url: '/workout',
      views: {
        'tab-workout': {
          templateUrl: 'templates/tab-workout.html',
          controller: 'WorkoutController'
        }
      }
    })

  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  })

  .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'LoginController'
  })

  .state('register', {
    url: '/register',
    templateUrl: 'templates/register.html',
    controller: 'RegistrationController'
  })

  $urlRouterProvider.otherwise('/login');

});

// show error message if incorrect combination of password and username


// Todo:
// Put login and register in account, unless logged in, show account
// update workout.js
// add more exercises
// change to black-and-orange, giants color-way theme for more intensity
// add exercises to firebase for each user.
// extend exercises, add themes: abs, chest, arms, etc.

// add exercises to firebase
