angular.module('starter.controllers', [])


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

