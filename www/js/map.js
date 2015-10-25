// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('starter', ['ionic'])

app.run(function($ionicPlatform) {
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

app.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('eventmenu', {
      url: "/event",
      abstract: true,
      templateUrl: "templates/event-menu.html"
    })
    .state('eventmenu.home', {
      url: "/home",
      views: {
        'menuContent' :{
          templateUrl: "templates/home.html"
        }
      }
    })  
  $urlRouterProvider.otherwise("/event/home");
})



app.controller('MapController', function($scope, $ionicLoading) {
    google.maps.event.addListener(map, 'click', function(event) {
        placeMarker(event.latLng);
    });

    $scope.visible = 0;
    var directionsDisplay;
    var directionsService = new google.maps.DirectionsService();
    onDeviceReady();

      $scope.toggleLeft = function() {
        $ionicSideMenuDelegate.toggleLeft();
      };

      $scope.changeMode = function() {
        console.log("hola");
        $window.location.assign('blind.html');    
      }

    function initRuta(map) {
        directionsDisplay = new google.maps.DirectionsRenderer();
        directionsDisplay.setMap(map);
    }

    function placeMarker(location) {
        var marker = new google.maps.Marker({
            position: location, 
            map: map
        });
    }

    function onDeviceReady() {
        var a;
        var b;
        var onSuccess = function(position){
            a = position.coords.latitude;
            b = position.coords.longitude;
            $ionicLoading.show({
            template: '<ion-spinner icon="bubbles"></ion-spinner><br/>Acquiring location!'
        });
         
        var posOptions = {
            enableHighAccuracy: true,
            timeout: 20000,
            maximumAge: 0
        };
        var myLatlng = new google.maps.LatLng(a,b);
        var mapOptions = {
            center: myLatlng,
            zoom: 16,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };          
             
        var map = new google.maps.Map(document.getElementById("map"), mapOptions);          
        var marker = new google.maps.Marker({
            position: myLatlng,
            map: map,
            title: "soc aqui"
        })   
        initRuta(map);
              
        $scope.map = map;   
        $ionicLoading.hide();
        
        }
        function onError(error){
            alert('code: ' + error.code);
        }

      $scope.askRouteTap = function(){
       
        //Make visible or invisible the search boxes
        if ($scope.visible == 0) $scope.visible = 1;
        else $scope.visible = 0;
       


        // Create the search box and link it to the UI element.
       document.getElementById("pac-input-origin").value = "";
        var origin = document.getElementById("pac-input-origin");
        var originAutocomplete = new google.maps.places.Autocomplete(origin);

        // Create the search box and link it to the UI element.
        document.getElementById("pac-input-destination").value = "";
        var destination = document.getElementById("pac-input-destination");
        var destinationAutocomplete = new google.maps.places.Autocomplete(destination);

        

        google.maps.event.addListener(originAutocomplete, 'place_changed', function() {
          var place = originAutocomplete.getPlace();
          if(place.geometry) {
            originCoord = place.geometry.location;
            originAutocomplete = null;
          }
        });

        google.maps.event.addListener(destinationAutocomplete, 'place_changed', function() {
          var place = destinationAutocomplete.getPlace();
          if(place.geometry) {
            destinationCoord = place.geometry.location;
            destinationAutcomplete = null;
          }
        });
    };

    $scope.getRouteTap =  function() {
        if(originCoord != null && destinationCoord != null) {
          $scope.visible = 0;
          calcRoute(originCoord, destinationCoord);
        }
        else if(originCoord != null) {
          alert("Please, insert DESTINATION.");
        }
        else if(destinationCoord != null) {
          alert("Please, insert ORIGIN.");
        }
      };


    $scope.disableOriginTap = function() {
      var container;
      container = document.getElementsByClassName('pac-container');
      angular.element(container).attr('data-tap-disabled', 'true');
      angular.element(container).css('display', 'none !important');
      angular.element(container).on('click', function() {
        document.getElementById('pac-input-origin').blur();
      });
    };

    $scope.disableDestinationTap = function() {
      var container;
      container = document.getElementsByClassName('pac-container');
      angular.element(container).css('display', 'none !important');
      angular.element(container).attr('data-tap-disabled', 'true');
      angular.element(container).on('click', function() {
        document.getElementById('pac-input-destination').blur();
      });
    };

    function calcRoute(start, end) {
        var request = {
            origin:start,
            destination:end,
            travelMode: google.maps.TravelMode.TRANSIT //TRANSIT per transport public, WALKING per ruta a peu
        };
        directionsService.route(request, function(result, status) {
            if (status == google.maps.DirectionsStatus.OK) {
                directionsDisplay.setDirections(result);
            }
        });
   }

   navigator.geolocation.getCurrentPosition(onSuccess,onError)

}                            
});
