// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var contrMenu = angular.module('starter', ['ionic'])


contrMenu.run(function($ionicPlatform, $window) {
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

contrMenu.controller('CtrlMenu', function($scope, $http, $window) {
    $scope.toggleLeft = function(){
        $ionicSideMenuDelegate.toggleLeft();
    };

    $scope.changeMode = function(){
        window.localStorage['blind'] = 'yes';
        $window.location.assign('blind.html');  
    };
    
    $scope.logOut = function(){
        window.localStorage['email'] = '';
        window.localStorage['blind'] = '';
        $window.location.assign('index.html');  
    };

    $scope.autobus = function(){
        $window.location.assign('autobus.html');  
    };

    $scope.semafor = function(){
        $window.location.assign('semafor.html');  
    };

    $scope.togglePlay = function () {
        console.log("hola");
        var msg = new SpeechSynthesisUtterance('Hola a todos!');
        msg.lang = 'es-ES';
        window.speechSynthesis.speak(msg);

            /*var cont = 2;
            
            If (cont%2 == 0) {
                if (document.getElementById("audio1")) {
                    playAudio(audioElm); 
                }
                ++cont;
            }
            else {
                if (document.getElementById("audio1")) {
                    pauseAudio(audioElm); 
                }
                ++cont;
            }*/

    }
});