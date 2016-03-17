angular.module('starter.controllers', [])


myApp.controller('AccountController', ['$scope', 'Authentication', 'sharedExercises', '$firebaseAuth', 'FIREBASE_URL', '$ionicPopup', '$timeout', 
  function($scope, Authentication, sharedExercises, $firebaseAuth, FIREBASE_URL, $ionicPopup, $timeout) {
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

  // $scope.changeEmail = function(newEmail, password) {
  //   // console.log("attempting email change", "password:", password, "password.type:", typeof password);
  //   Authentication.changeEmail(newEmail);
  // }

  $scope.updateFirstname = function(newFirstname) {
    sharedExercises.updateAccountFirstname(newFirstname);
    $scope.firstname = newFirstname;
  }

  $scope.updateLastname = function(newLastname) {
    sharedExercises.updateAccountLastname(newLastname);
    $scope.lastname = newLastname;
  }

  // add last Name function...
  $scope.updateEmail = function(oldEmail, newEmail, currentPassword) {
    $scope.newUserSettings = {};
    var myPopup = $ionicPopup.show({
        template: "<input class='inputIndent' placeholder='Old Email' type='text' ng-model='newUserSettings.oldEmail'><br><input type='password' class='inputIndent' placeholder='Current Password' ng-model='newUserSettings.currentPassword'><br><input type='text' class='inputIndent' placeholder='New Email' ng-model='newUserSettings.newEmail'>",
        title: 'Confirm Email Change',
        scope: $scope,
        buttons: [
          { text: 'Cancel' },
          {
            text: '<b>Submit</b>',
            type: 'button-positive',
            onTap: function(e) {
              if (!$scope.newUserSettings) {
                e.preventDefault();
              } else {
                Authentication.changeEmail($scope.newUserSettings.oldEmail, $scope.newUserSettings.newEmail, $scope.newUserSettings.currentPassword);
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
        }, 1200000);

  }

  $scope.updatePassword = function(email, oldPassword, newPassword) {
    $scope.newUserSettings = {};
    var myPopup = $ionicPopup.show({
        template: "<input class='inputIndent' placeholder='Email' type='text' ng-model='newUserSettings.email'><br><input type='password' class='inputIndent' placeholder='Old Password' ng-model='newUserSettings.oldPassword'><br><input type='password' class='inputIndent' placeholder='New Password' ng-model='newUserSettings.newPassword'>",
        title: 'Confirm Password Change',
        scope: $scope,
        buttons: [
          { text: 'Cancel' },
          {
            text: '<b>Submit</b>',
            type: 'button-positive',
            onTap: function(e) {
              if (!$scope.newUserSettings) {
                e.preventDefault();
              } else {
                Authentication.changePassword($scope.newUserSettings.email, $scope.newUserSettings.oldPassword, $scope.newUserSettings.newPassword);
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
        }, 1200000);

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

