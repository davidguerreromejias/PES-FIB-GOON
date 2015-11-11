// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var contrLogin = angular.module('starter', ['ionic'])


contrLogin.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {

    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }

  });
})

contrLogin.controller('CtrlLogin', function($scope, $http, $window) {
  
  $scope.login = function() {

	  var email = $('#email').val();
	  var passwd = $('#password').val();
	  alert(email);
	  alert(passwd);
	  //client input filter??
	  var url = "https://goonpes.herokuapp.com/login?email=" + email + "&password=" + passwd;
	  //http petition
	  $http.get(url)
        .success(function (response) {
			console.log(response);
			if(response['msg']=="Success"){
				console.log(response);
				//if (document.getElementById('check').checked) $window.location.assign('blind.html');
				//else $window.location.assign('map.html');
			//$scope.names = response;
			//console.log($scope.names);});
			}
			else{
				//alert("Error en les credencials");
			}
      });
      //$window.location.assign('map.html'); 
	

	  
  }

  $scope.goToSignUp = function() {
    $window.location.assign('signup.html');    
  }

});