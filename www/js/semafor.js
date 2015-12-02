
// Range beacons screen.
;(function(app)
{

  var entra25 = true;
  var entra69 = true;
  var entra252 = true;
  var entra692 = true;
  var checked22 = false;
  var checkedH10 = false;
  var bus = "no ha funcionat";
  var bus2 = "no ha funcionat";



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
      var htm = '<label>'
      if(beacon.major == 23825 && beacon.minor == 61543) {
          htm += '<div class="infobus">El bus número ' + bus + ' està a ' + app.formatDistance(beacon.distance) + ' de distancia.</div>' ;
        if (document.getElementById("H10").checked)   {
          bus = "H10";
          checkedH10 = true;
        }
        else checkedH10 = false;
      }
      if (beacon.major == 34430 && beacon.minor == 32267) {
        htm += '<div class="infobus">El bus número ' + bus2 + ' està a ' + app.formatDistance(beacon.distance) + ' de distancia.</div>' ;
        if (document.getElementById("22").checked)   {
          bus2 = "22";
          checked22 = true;
        }
        else checked22 = false;

      }
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

        if(dis < 5 && dis > 2 && entra25 && checkedH10){
          var msg = new SpeechSynthesisUtterance('El bus número '+ bus + ' está a menos de cinco metros. ');
          msg.lang = 'es-ES';
          window.speechSynthesis.speak(msg);
          entra25 = false;
          entra69 = true;
        }

        else if(dis > 6 && dis < 9 && entra69 && checkedH10){
          var msg = new SpeechSynthesisUtterance('El bus número '+ bus + ' está a menos de nueve metros.');
          msg.lang = 'es-ES';
          window.speechSynthesis.speak(msg);
          entra69 = false;
          entra25 = true;
        }

        if(dis < 5 && dis > 2 && entra252 && checked22){
          var msg = new SpeechSynthesisUtterance('El bus número '+ bus2 + ' está a menos de cinco metros. ');
          msg.lang = 'es-ES';
          window.speechSynthesis.speak(msg);
          entra252 = false;
          entra692 = true;
        }

        else if(dis > 6 && dis < 9 && entra692 && checked22){
          var msg = new SpeechSynthesisUtterance('El bus número '+ bus2 + ' está a menos de nueve metros.');
          msg.lang = 'es-ES';
          window.speechSynthesis.speak(msg);
          entra692 = false;
          entra252 = true;
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