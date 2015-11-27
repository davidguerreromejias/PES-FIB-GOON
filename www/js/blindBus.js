// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var contrBlindBus = angular.module('starter', ['ionic', 'ngTouch'])


contrBlindBus.run(function($ionicPlatform) {
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

contrBlindBus.controller('CtrlBlindBus', function($scope, $window) {

  $scope.left = function(){
        var msg = new SpeechSynthesisUtterance('Interficie Principal');
        msg.lang = 'es-ES';
        window.speechSynthesis.speak(msg);
        $window.location.assign('blind.html');  
  };

});