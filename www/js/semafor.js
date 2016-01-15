
// Range beacons screen.
;(function(app)
{

  var entra25 = true;
  var entra69 = true;
  var entra252 = true;
  var entra692 = true;
  var checked22 = false;
  var checkedH10 = false;

  var rojo = true;
  var verde  = true;
  var yellow = true;




  app.startRangingBeacons = function()
  {

    function onRange(beaconInfo)
    {
      displayBeconInfo(beaconInfo);
    }

    function onError(errorMessage)
    {
      console.log('Range error: ' + errorMessage);
    }

    function displayBeconInfo(beaconInfo)
    {
      // Clear beacon HTML items.
      $('#id-screen-range-beacons .style-item-list').empty();

      // Sort beacons by distance.
      beaconInfo.beacons.sort(function(beacon1, beacon2) {
        return beacon1.distance > beacon2.distance; });

      // Generate HTML for beacons.
      $.each(beaconInfo.beacons, function(key, beacon)
      {
        var element = $(createBeaconHTML(beacon));
        $('#id-screen-range-beacons .style-item-list').append(element);
      });
    };

    function createBeaconHTML(beacon)
    {
      var htm = '<label>';
      
      var colorClasses = app.beaconColorStyle(beacon.color);
      
      /*var htm = '<div class="' + colorClasses + '">'
        + '<table><tr><td>Major</td><td>' + beacon.major
        + '</td></tr><tr><td>Minor</td><td>' + beacon.minor
        + '</td></tr><tr><td>RSSI</td><td>' + beacon.rssi
      if (beacon.proximity)
      {
        htm += '</td></tr><tr><td>Proximity</td><td>'
          + app.formatProximity(beacon.proximity)
      }
      if (beacon.distance)
      {
        htm += '</td></tr><tr><td>Distance</td><td>'
          + app.formatDistance(beacon.distance)
      }
      htm += '</td></tr></table></div>';*/
      if (beacon.distance)
      {
        var dis = app.formatDistance(beacon.distance);

        if(dis < 6){
          if(document.getElementsByClassName("lampGreen").length > 0 && verde) {
            var msg = new SpeechSynthesisUtterance('Esta verde');
            msg.lang = 'es-ES';
            window.speechSynthesis.speak(msg);

            verde = false;
            rojo = true;
            yellow = true;
          }

          else if(document.getElementsByClassName("lampRed").length > 0 && rojo) {
            var msg = new SpeechSynthesisUtterance('Esta rojo, no pase porfavor');
            msg.lang = 'es-ES';
            window.speechSynthesis.speak(msg);

            verde = true;
            rojo = false;
            yellow = true;
          }

          else if(document.getElementsByClassName("lampYellow").length > 0 && yellow) {
            var msg = new SpeechSynthesisUtterance('Esta ambar. Corran! Corran!');
            msg.lang = 'es-ES';
            window.speechSynthesis.speak(msg);

            verde = true;
            rojo = true;
            yellow = false;
          }

          entra25 = false;
          entra69 = true;
        }
      }
      htm += '</label></br>';
      return htm;
    };

    // Show screen.
    app.showScreen('id-screen-range-beacons');
    $('#id-screen-range-beacons .style-item-list').empty();

    // Request authorisation.
    estimote.beacons.requestAlwaysAuthorization();

    // Start ranging.
    estimote.beacons.startRangingBeaconsInRegion(
      {}, // Empty region matches all beacons.
      onRange,
      onError);
  };

  app.stopRangingBeacons = function()
  {
    estimote.beacons.stopRangingBeaconsInRegion({});
    app.showHomeScreen();
  };

  var changeState = (function () {
    var state = 0,
        lamps = ["Red", "Yellow", "Green"],
        lampsLength = lamps.length,
        order = [
            [5000, "Red"],
            [5000, "Green"],
            [3000, "Yellow"]
        ],
        orderLength = order.length,
        lampIndex,
        orderIndex,
        sId;

    return function (stop) {
        if (stop) {
            clearTimeout(sId);
            return;
        }

        var lamp,
        lampDOM;

        for (lampIndex = 0; lampIndex < lampsLength; lampIndex += 1) {
            lamp = lamps[lampIndex];
            lampDOM = document.getElementById(lamp);
            if (order[state].indexOf(lamp) !== -1) {
                lampDOM.classList.add("lamp" + lamp);
            } else {
                lampDOM.classList.remove("lamp" + lamp);
            }
            if(document.getElementsByClassName("lampRed").length > 0) console.log("Lampara Roja");
        }

        sId = setTimeout(changeState, order[state][0]);
        state += 1;
        if (state >= orderLength) {
            state = 0;
        }
    };
}());



document.getElementById("trafficLight").addEventListener("click", (function () {
    var state = false;
    
    return function () {
        //if(document.getElementByClass(lampRed)) console.log("Hola");
        changeState(state);
        state = !state;
    };
}()), false);

})(app);