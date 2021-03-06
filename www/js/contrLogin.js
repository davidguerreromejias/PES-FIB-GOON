// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var contrLogin = angular.module('starter', ['ionic'])


contrLogin.run(function($ionicPlatform, $window) {
  $ionicPlatform.ready(function() {

    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
	var session = window.localStorage['email'] || '';
	if(session != '')
	{
		var blind = window.localStorage['blind'] || '';
		if(blind == 'yes')
		{
			$window.location.assign('blind.html');
		}
		else
		{
			$window.location.assign('map.html');
		}
	}

  });
})

contrLogin.controller('CtrlLogin', function($scope, $http, $window) {
  
  $scope.login = function() {
	  
	  var email = $('#email').val();
	  var passwd = $('#password').val();
	  //client input filter??
	  var url = "https://goonpes.herokuapp.com/login?email=" + email + "&password=" + passwd;
	  //loading screen
	  $('#loading').css("display","block");
	  
	  //http petition
	  $http.get(url)
        .success(function (response) {
			if(response['msg']=="Success"){
				window.localStorage['email'] = email;
				if (document.getElementById('check').checked)
				{
					window.localStorage['blind'] = 'yes';
					$window.location.assign('blind.html');
				}
				else
				{
					window.localStorage['blind'] = 'no';
					$window.location.assign('map.html');
				}
			}
			else{
				$('#loading').css("display","none");
				alert("Error en les credencials");
			}
      });
  }

  $scope.goToSignUp = function() {
    $window.location.assign('signup.html');    
  }

});