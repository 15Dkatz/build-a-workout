angular.module('starter.controllers', [])


myApp.controller('AccountController', ['$scope', 'Authentication', 'sharedExercises', function($scope, Authentication, sharedExercises) {
  $scope.firstname;
  $scope.lastname;

  $scope.initUserData = function() {
    $scope.firstname = sharedExercises.getFirstname();
    $scope.lastname = sharedExercises.getLastname();

    // add more to the account.html later

  }

  $scope.logout = function() {
    Authentication.logout();
  }; //logout
}])

myApp.controller('LoginController', ['$scope', 'Authentication', function($scope, Authentication) {
    $scope.login = function(email, password) {
      console.log(email);
      var user = {
        'email': email,
        'password': password
      }
      Authentication.login(user);
  }; //login
}]);

