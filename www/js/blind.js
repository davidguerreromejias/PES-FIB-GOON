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
        thresholdRight = 40,
        thresholdLeft = -40, //required min distance traveled to be considered swipe
        allowedTime = 60, // maximum time allowed to travel that distance
        allowedTimeChange = 2300,
        elapsedTime,
        startTime,
        timer = 0,
        timerInterval;

    document.getElementById("divBlind").addEventListener("touchstart", touchHandler);
    document.getElementById("divBlind").addEventListener("touchmove", touchHandler);
    document.getElementById("divBlind").addEventListener("touchend", touchHandler);

    function touchHandler(e) {
      if (e.type == "touchstart") {
        console.log("touchStart!");
        var touchobj = e.changedTouches[0]
        dist = 0
        startX = touchobj.pageX
        startY = touchobj.pageY
        startTime = new Date().getTime() // record time when finger first makes contact with surface
        //e.preventDefault()

        timerInterval = setInterval(function(){ 
          timer += 1;  
          if (timer > 2) change();
        }, 1000);

      } 
      else if (e.type == "touchmove") {
        console.log("move");
        //e.preventDefault() // prevent scrolling when inside DIV
      } 
      else if (e.type == "touchend") {
        console.log("TOOOOOUCHENDD")
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
        //e.preventDefault()
      }
    }

    function change() {
      window.localStorage['blind'] = 'no';
      $window.location.assign('map.html');
      navigator.vibrate(5000);
    };

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

});