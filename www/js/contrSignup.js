// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var contrSignup = angular.module('starter', ['ionic'])


contrSignup.run(function($ionicPlatform) {
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

contrSignup.controller('CtrlSignUp', function($scope, $http, $window) {
  
  $scope.sign = function() {
	  var username = $('#username').val();
	  var passwd = $('#password').val();
	  var email = $('#email').val();
	  //client input filter
	  
	  //http petition
	  var data =
	  {
		"email":email,
		"passw":passwd,
		"name":username
	  }
	  //onerror method 
	  $('#loading').css("display","block");
	  $http.post("https://goonpes.herokuapp.com/users",data)
        .success(function (response) {
			if(response['msg'] == "Success"){
				$('#loading').css("display","none");
				//console.log(response);
				alert("Registre completat amb èxit");
				$window.location.assign('index.html');
			}
		});
		$('#loading').css("display","none");
	  }

	

  $scope.goToLogin = function() {
    $window.location.assign('index.html');    
  }

});