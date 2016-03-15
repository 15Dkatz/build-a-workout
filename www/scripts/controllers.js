angular.module('starter.controllers', [])

.controller('BuildCtrl', function($scope) {


})

.controller('WorkoutCtrl', function($scope) {

})



.controller('AccountCtrl', ['$scope', 'Authentication', function($scope, Authentication) {
  $scope.logout = function() {
    Authentication.logout();
  }; //logout
}])

.controller('LoginController', ['$scope', 'Authentication', function($scope, Authentication) {
    $scope.login = function(email, password) {
      console.log(email);
      var user = {
        'email': email,
        'password': password
      }
      Authentication.login(user);
  }; //login
}]);

