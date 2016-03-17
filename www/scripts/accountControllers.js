angular.module('starter.controllers', [])


myApp.controller('AccountController', ['$scope', 'Authentication', 'sharedExercises', '$firebaseAuth', 'FIREBASE_URL', function($scope, Authentication, sharedExercises, $firebaseAuth, FIREBASE_URL) {
  $scope.firstname;
  $scope.lastname;

  var ref = new Firebase(FIREBASE_URL);
  var auth = $firebaseAuth(ref);

  // $scope.showLoginContent = true;  
  auth.$onAuth(function(authUser) {
      if (authUser) {
        $scope.firstname = sharedExercises.getFirstname();
        $scope.lastname = sharedExercises.getLastname();

        console.log("firstname", $scope.firstname, "lastname", $scope.lastname);
      }
  })




  // $scope.initUserData = function() {
  //   $scope.firstname = sharedExercises.getFirstname();
  //   $scope.lastname = sharedExercises.getLastname();

  //   // add more to the account.html later
  //   // $scope.showLoginContent = sharedExercises.getShowLoginContent();
  // }

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

  $scope.changeEmail = function(newEmail, password) {
    console.log("attempting email change", "password:", password, "password.type:", typeof password);
    Authentication.changeEmail(newEmail);
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

