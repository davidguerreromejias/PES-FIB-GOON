// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var contrSemafor = angular.module('starter', ['ionic'])


contrBlind.run(function($ionicPlatform) {
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

contrSemafor.controller('CtrlSemafor', function($scope, $window) {

  var timer = 0, timerInterval, div = document.getElementById("divBlind");

  div.addEventListener("mousedown", function() {
    timerInterval = setInterval(function(){ 
      timer += 1;  
      if (timer > 2) change();
    }, 1000);
  });

  div.addEventListener("mouseup", function() {
    clearInterval(timerInterval);
    timer = 0;
  });

  function change() {
    $window.location.assign('map.html');
    navigator.vibrate(5000);
  }


});
