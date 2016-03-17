myApp.factory('Authentication',
  ['$rootScope', '$firebaseAuth', '$firebaseObject', '$location', '$window', 'FIREBASE_URL',
  function($rootScope, $firebaseAuth, $firebaseObject,
    $location, $window, FIREBASE_URL) {

  var ref = new Firebase(FIREBASE_URL);
  var auth = $firebaseAuth(ref);

  // var user = {};

  auth.$onAuth(function(authUser) {
    if (authUser) {
      var userRef = new Firebase(FIREBASE_URL + 'users/' + authUser.uid);
      var userObj = $firebaseObject(userRef);
      // user["email"]





      $rootScope.currentUser = userObj;
    } else {
      $rootScope.currentUser = '';
    }
  });


  var myObject = {
    login: function(user) {
      auth.$authWithPassword({
        email: user.email,
        password: user.password
      }).then(function(regUser) {
        $window.location.href = '#/tab/workout';
      }).catch(function(error) {
       $rootScope.message = error.message;
      });
      // $location.path('#/build')
    }, //login

    logout: function() {
      console.log("running auth.$unauth()");
      $location.path('/login')
      return auth.$unauth();
    }, //logout

    requireAuth: function() {
      return auth.$requireAuth();
    }, //require Authentication

    register: function(user) {
      auth.$createUser({
        email: user.email,
        password: user.password
      }).then(function(regUser) {

        var regRef = new Firebase(FIREBASE_URL + 'users')
        .child(regUser.uid).set({
          date: Firebase.ServerValue.TIMESTAMP,
          regUser: regUser.uid,
          firstname: user.firstname,
          lastname: user.lastname,
          email:  user.email,
        }); //user info

        myObject.login(user);

      }).catch(function(error) {
        $rootScope.message = error.message;
      }); // //createUser
    }, // register

  //   changeEmail: function(newEmail, password) {
  //     ref.changeEmail({
  //       oldEmail: $rootScope.currentUser.email,
  //       newEmail: newEmail,
  //       password: password
  //     },
  //     // ).then(function(regUser) {
  //     //   var regRef = new Firebase(FIREBASE_URL + 'users');
  //     //   regRef.update({"email": newEmail});
  //     // }).catch( 
  //     function(error) {
  //       if (error) {
  //         switch (error.code) {
  //           case "INVALID_PASSWORD":
  //             console.log("The specified user account password is incorrect.");
  //             break;
  //           case "INVALID_USER":
  //             console.log("The specified user account does not exist.");
  //             break;
  //           default:
  //             console.log("Error creating user:", error);
  //         }
  //       } else {
  //         console.log("User email changed successfully!");
  //       }
  //     })
  // }




  };

  return myObject;

}]); //factory
