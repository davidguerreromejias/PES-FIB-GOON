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

  var   startX,
        startY,
        thresholdLeft = -60, //required min distance traveled to be considered swipe
        allowedTime = 75, // maximum time allowed to travel that distance
        allowedTimeChange = 2300,
        elapsedTime,
        startTime;

  var div = document.getElementById("divBlind");

  function handleswipe(isleftswipe){
      if(isleftswipe) {
        var msg = new SpeechSynthesisUtterance('Interficie Principal');
        msg.lang = 'es-ES';  
        window.speechSynthesis.speak(msg);          
        $window.location.assign('blind.html');
      }
  }

  div.addEventListener("touchstart", function(e){
        console.log("touchstart");
        var touchobj = e.changedTouches[0]
        dist = 0
        startX = touchobj.pageX
        startY = touchobj.pageY
        startTime = new Date().getTime() // record time when finger first makes contact with surface
        e.preventDefault()
    }, false)

    div.addEventListener("touchmove", function(e){
      console.log("touchmove");
        e.preventDefault() // prevent scrolling when inside DIV
    }, false)
 
    div.addEventListener("touchend", function(e){
        console.log("touchend");
        var touchobj = e.changedTouches[0]
        dist = touchobj.pageX - startX // get total dist traveled by finger while in contact with surface
        elapsedTime = new Date().getTime() - startTime // get time elapsed
        // check that elapsed time is within specified, horizontal dist traveled >= threshold, and vertical dist traveled <= 100
        var swiperightBol;
        swiperightBol = (elapsedTime >= allowedTime && dist <= thresholdLeft && Math.abs(touchobj.pageY - startY) <= 100)  

        handleswipe(swiperightBol)
        e.preventDefault()
    }, false)

});