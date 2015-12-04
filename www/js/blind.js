// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var contrBlind = angular.module('starter', ['ionic', 'ngTouch'])


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

contrBlind.controller('CtrlBlind', function($scope, $window) {

  var   startX,
        startY,
        thresholdRight = 60,
        thresholdLeft = -60, //required min distance traveled to be considered swipe
        allowedTime = 75, // maximum time allowed to travel that distance
        allowedTimeChange = 2300,
        elapsedTime,
        startTime,
        timer = 0,
        timerInterval;

  var div = document.getElementById("divBlind");

    function handleswipe(isrightswipe){
        if (isrightswipe == "right") {
            var msg = new SpeechSynthesisUtterance('Interficie Autobuses');
            msg.lang = 'es-ES';
            window.speechSynthesis.speak(msg);
            $window.location.assign('blindBus.html');
        }
        if (isrightswipe == "left") {
            var msg = new SpeechSynthesisUtterance('Interficie Semáforos');
            msg.lang = 'es-ES';
            window.speechSynthesis.speak(msg);
            $window.location.assign('blindLights.html');
        }
    }

    /*div.addEventListener("mousedown", function() {
    console.log("mousedown");
    timerInterval = setInterval(function(){ 
      timer += 1;  
      if (timer > 2) change();
    }, 1000);
  });

  div.addEventListener("mouseup", function() {
    console.log("mouseup");
    clearInterval(timerInterval);
    timer = 0;
  });*/

    div.addEventListener("touchstart", function(e){
        timerInterval = setInterval(function(){ 
          timer += 1;  
          if (timer > 2) change();
        }, 1000);

        var touchobj = e.changedTouches[0]
        dist = 0
        startX = touchobj.pageX
        startY = touchobj.pageY
        startTime = new Date().getTime() // record time when finger first makes contact with surface
        e.preventDefault()
    }, false)

    div.addEventListener("touchmove", function(e){
        e.preventDefault() // prevent scrolling when inside DIV
    }, false)
 
    div.addEventListener("touchend", function(e){
        clearInterval(timerInterval);
        timer = 0;

        var touchobj = e.changedTouches[0]
        dist = touchobj.pageX - startX // get total dist traveled by finger while in contact with surface
        elapsedTime = new Date().getTime() - startTime // get time elapsed
        // check that elapsed time is within specified, horizontal dist traveled >= threshold, and vertical dist traveled <= 100
        var swiperightBol;
        if (elapsedTime >= allowedTime && dist >= thresholdRight && Math.abs(touchobj.pageY - startY) <= 100) swiperightBol = "right";
        else if (elapsedTime >= allowedTime && dist <= thresholdLeft && Math.abs(touchobj.pageY - startY) <= 100) swiperightBol = "left";

        handleswipe(swiperightBol)
        e.preventDefault()
    }, false)

    function change() {
      window.localStorage['blind'] = 'no';
      $window.location.assign('map.html');
      navigator.vibrate(5000);
    };

  

  /*$("#divBlind").swipe( {
    swipeLeft:function(event, distance, duration, fingerCount) {
      console.log("swipeLeft from callback");
      var msg = new SpeechSynthesisUtterance('Interficie Semáforos');
      msg.lang = 'es-ES';
      window.speechSynthesis.speak(msg);
      $window.location.assign('blindLights.html'); 
    },
    swipeRight:function(event, distance, duration, fingerCount) {
      console.log("swipeRight from callback");
      var msg = new SpeechSynthesisUtterance('Interficie Autobuses');
      msg.lang = 'es-ES';
      window.speechSynthesis.speak(msg);
      $window.location.assign('blindBus.html');  
    } 
  });*/

  /*$scope.left = function(){
        var msg = new SpeechSynthesisUtterance('Interficie Semáforos');
        msg.lang = 'es-ES';
        window.speechSynthesis.speak(msg);
        $window.location.assign('blindLights.html');  
  };

  $scope.right = function(){
        var msg = new SpeechSynthesisUtterance('Interficie Autobuses');
        msg.lang = 'es-ES';
        window.speechSynthesis.speak(msg);
        $window.location.assign('blindBus.html');  
  };
  */

});


