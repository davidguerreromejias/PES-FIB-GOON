// Range beacons screen.
;(function(app)
{
  app.startRangingBeacons = function()
  {
    var entra25 = true;
    var entra69 = true;
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
      var bus = "no ha funcionat";
      if(beacon.major == 23825 && beacon.minor == 61543) bus = 33;
      else if (beacon.major == 34430 && beacon.minor == 32267) bus = 7;
      var colorClasses = app.beaconColorStyle(beacon.color);
      var htm = '<label>'
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
        htm += 'El bus número ' + bus + ' està a ' + app.formatDistance(beacon.distance) + ' de distancia.' ;
        var dis = app.formatDistance(beacon.distance);

        if(dis < "5" && dis > "2" && entra25){
          var msg = new SpeechSynthesisUtterance('El bus número '+ bus + ' está a menos de cinco metros. ');
          msg.lang = 'es-ES';
          window.speechSynthesis.speak(msg);
          entra25 = false;
          entra69 = true;
        }

        else if(dis > "6" && dis < "9" && entra69){
          var msg = new SpeechSynthesisUtterance('El bus número '+ bus + ' está a menos de nueve metros.');
          msg.lang = 'es-ES';
          window.speechSynthesis.speak(msg);
          entra69 = false;
          entra25 = true;
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

})(app);
