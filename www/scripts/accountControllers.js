angular.module('starter.controllers', [])


myApp.controller('AccountController', ['$scope', 'Authentication', 'sharedExercises', function($scope, Authentication, sharedExercises) {
  $scope.firstname;
  $scope.lastname;

  // $scope.showLoginContent = true;  

  $scope.initUserData = function() {
    $scope.firstname = sharedExercises.getFirstname();
    $scope.lastname = sharedExercises.getLastname();

    // add more to the account.html later
    // $scope.showLoginContent = sharedExercises.getShowLoginContent();
  }

  $scope.logout = function() {
    Authentication.logout();
  }; //logout

  $scope.login = function(email, password) {
      console.log(email);
      var user = {
        'email': email,
        'password': password
      }
      Authentication.login(user);
      $scope.showLoginContent = false;
  }; //login

  $scope.saveAccountChanges = function(newFirstname, newLastname, newEmail) {
    sharedExercises.updateAccountFirstname(newFirstname);
    sharedExercises.updateAccountLastname(newLastname);
    sharedExercises.updateAccountEmail(newEmail);
  }


}])

// myApp.controller('LoginController', ['$scope', 'Authentication', function($scope, Authentication) {
//     $scope.login = function(email, password) {
//       console.log(email);
//       var user = {
//         'email': email,
//         'password': password
//       }
//       Authentication.login(user);
//   }; //login
// }]);

