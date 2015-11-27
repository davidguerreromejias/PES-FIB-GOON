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

app.controller('MapController', function($scope, $http, $ionicLoading, $ionicPopup, $timeout, $ionicSideMenuDelegate, $window) {
    //console.log("hola");
    $scope.visible = 0;
    var directionsDisplay;
    var directionsService = new google.maps.DirectionsService();
    onDeviceReady();

    function initRuta(map) {
        directionsDisplay = new google.maps.DirectionsRenderer();
        directionsDisplay.setMap(map);
    }

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

    $scope.semafors = function(){
        $window.location.assign('semafors.html');  
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


    function placeMarker(location) {
        var marker = new google.maps.Marker({
            position: location, 
            map: map
        });
    }

    function playAudio(audioElm) {
         // Get file from text box and assign it to the source of the audio element 
        audioElm.src = document.getElementById('audioFile').value;
        audioElm.play();
    }

    function pauseAudio(audioElm) {
        audioElm.src = document.getElementById('audioFile').value;
        audioElm.pause();
    }

    var lastinfowindow;
    function bindInfoWindow(marker) {
        var infoWindow = new google.maps.InfoWindow({});
        google.maps.event.addListener(marker, 'click', function() {

            if(lastinfowindow != null) 
                lastinfowindow.close();        
            
            lastinfowindow = infoWindow;

            infoWindow.setContent(
                '<div class="list card" ng-app="starter"  ng-controller="MapController">' +
                    '<div class="item item-avatar">' +
                        '<img src="' + marker.userImg + '">' +
                        '<h2 style="color:#2FF5F1">' + marker.user + '</h2>' +
                        '<h2 style="color:#2FF5F1">' + marker.email + '</h2>' +
                        '<p>' + marker.date + '</p>' +
                    '</div>' +

                  '<div class="item item-body">' +
                    '<img class="full-image" src="' + marker.barrierImg + '">' +
                    '<p>' +
                      marker.title +
                    '</p>' +
                  '</div>' +

                  '<div class="item tabs tabs-secondary tabs-icon-left">'+
                    '<a id="report" style="color:#FF0000" class="tab-item" href="#" type="button">'+
                      '<i class="icon ion-sad-outline"></i>'+
                      'Report' +
                    '</a>' +
                  '</div>' +

                '</div>'
            );
            infoWindow.open(marker.get('map'), marker);
            google.maps.event.addDomListener(report, 'click', function(event) {
                alert(marker.id);
                var data = 
                {
                  "id": marker.id
                };
                $http.post("https://goonpes.herokuapp.com/markerdelete", data)
                .success(function (response) {
                  if(response['msg']=="Success") {
                      // An elaborate, custom popup
                      var myPopup = $ionicPopup.show({
                        title: 'You have warned about an error with the barrier!',
                        subTitle: 'Do not panic if the barrier does not disappear immediately. Wait for the administrator approves the warning.',
                        scope: $scope
                      });
                      $timeout(function() {
                         myPopup.close(); //close the popup after 3 seconds for some reason
                      }, 3000);
                  }
                  else {
                      var myPopup = $ionicPopup.show({
                        title: 'Problem while submitting the warning!',
                        subTitle: 'Please, check your internet connection.',
                        scope: $scope
                      });
                      $timeout(function() {
                         myPopup.close(); //close the popup after 3 seconds for some reason
                      }, 2000);
                  }
                });
            });
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

            var houseIcon = '../img/house_marker.png';
            var marker = new google.maps.Marker({
                position: myLatlng,
                map: map,
                title: 'soc aqui',
                icon: houseIcon
            })   
            //marker.setIcon('../img/house_marker.png');

            $http.get("https://goonpes.herokuapp.com/marker")
            .success(function (response) {

                var markers;
                var index;
                markers = response.markers; 

                var barrierIcon = '../img/barrier.png';
                if(markers != null) {
                    for (index = 0; index < markers.length; ++index) {
                        var savedMarker = new google.maps.Marker({
                            position: new google.maps.LatLng(markers[index].lat, markers[index].lon),
                            map: map,
                            title: markers[index].description,
                            //Only for testing
                            user: 'Stormtrooper',
                            email: markers[index].email,
                            date: '20 Novembre, 2015',
                            userImg: '../img/stormtrooper.png',
                            barrierImg: '../img/obres.jpg',
                            id: markers[index].id,
                            icon: barrierIcon
                            //icon: 'www/img/barrier.png'
                        })   
                        //savedMarker.setIcon('../img/barrier.png');
                        bindInfoWindow(savedMarker);            
                    }
                }
            });

            initRuta(map);
              
            $scope.map = map;   
            $ionicLoading.hide();
		
        		$scope.useMyPosition = function() {
        		    originCoord = myLatlng;
                document.getElementById("pac-input-origin").value = "My position";
        		};

            var origin_marker, 
                destination_marker,
                barrier_marker,
                init_marker;

            var origcoord,
                desticoord;

            //Place a new marker
            google.maps.event.addListener($scope.map, 'click', function(event) {  
                if(lastinfowindow != null) 
                    lastinfowindow.close(); 
                if(init_marker != null)      
                    init_marker.setMap(null); 
                if(document.getElementById("marker-menu").style.display == 'block')
                    document.getElementById("marker-menu").style.display = 'none';
                else {
                    document.getElementById("marker-menu").style.display = 'block';

                    var tapLocation = event.latLng;

                    init_marker = new google.maps.Marker({
                            position: tapLocation,
                            map: map,
                            title: "marker placed"
                    })  
                }

                if(barrier_marker != null)
                    barrier_marker.setMap(null);

                document.getElementById("barrier-form").style.display = 'none';

                var cautionIcon = '../img/caution.png';
                $scope.barrierON = function () {
                    init_marker.setMap(null);     
                    if(origin_marker != null)
                        origin_marker.setMap(null);
                    if(destination_marker != null)
                        destination_marker.setMap(null);
                    barrier_marker = new google.maps.Marker({
                        position: tapLocation,
                        map: map,
                        title: "marker placed",
                        icon: cautionIcon
                        //icon: 'www/img/caution.png'
                    })     
                    //barrier_marker.setIcon('../img/caution.png');
                    barrier_marker.setAnimation(google.maps.Animation.BOUNCE);

                    document.getElementById("barrier-form").style.display = 'block';
                    document.getElementById("marker-menu").style.display = 'none';
                    origcoord = null
                    document.getElementById("origin-marker").style.display = 'block';                                            
                    desticoord = null;
                    document.getElementById("destination-marker").style.display = 'block';
                }

                $scope.submitBarrier = function () {
                    var data = 
                    {
                      "email": (window.localStorage['email'] || ''),
                      "lon": tapLocation.lng(),
                      "lat": tapLocation.lat(),
                      "description": document.getElementById("description_input").value 
                    };
                    $http.post("https://goonpes.herokuapp.com/marker", data)
                    .success(function (response) {
                      if(response['msg']=="Success") {
                          // An elaborate, custom popup
                          var myPopup = $ionicPopup.show({
                            title: 'Barrier submitted!',
                            subTitle: 'Do not panic if the barrier does not appear immediately. Wait for the administrator approves the barrier.',
                            scope: $scope
                          });
                          $timeout(function() {
                             myPopup.close(); //close the popup after 3 seconds for some reason
                          }, 3000);
                          document.getElementById("barrier-form").style.display = 'none';
                      }
                      else {
                          var myPopup = $ionicPopup.show({
                            title: 'Problem while submitting the barrier!',
                            subTitle: 'Please, check your internet connection.',
                            scope: $scope
                          });
                          $timeout(function() {
                             myPopup.close(); //close the popup after 3 seconds for some reason
                          }, 2000);
                          document.getElementById("barrier-form").style.display = 'none';
                      }
                    });
                }

                var AIcon = '../img/A.png';
                $scope.originON = function () {
                    init_marker.setMap(null);   
                    origin_marker = new google.maps.Marker({
                        position: tapLocation,
                        map: map,
                        title: "marker placed",
                        icon: AIcon
                        //icon: 'www/img/A.png'
                    })  
                    //origin_marker.setIcon('../img/A.png');
                    origcoord = event.latLng;
                    document.getElementById("marker-menu").style.display = 'none';
                    document.getElementById("origin-marker").style.display = 'none';
                    if(desticoord != null) {
                        document.getElementById("origin-marker").style.display = 'block';
                        document.getElementById("destination-marker").style.display = 'block';
                        origin_marker.setMap(null);
                        destination_marker.setMap(null);
                        calcRoute(origcoord, desticoord);
                        origcoord = null;
                        desticoord = null;
                    }
                }

                var BIcon = '../img/B.png';
                $scope.destinationON = function () {
                    init_marker.setMap(null);   
                    destination_marker = new google.maps.Marker({
                        position: tapLocation,
                        map: map,
                        title: "marker placed",
                        icon: BIcon
                        //icon: 'www/img/B.png'
                    })  
                    //destination_marker.setIcon('../img/B.png');
                    desticoord = event.latLng;
                    document.getElementById("marker-menu").style.display = 'none';
                    document.getElementById("destination-marker").style.display = 'none';
                    if(origcoord != null) {
                        document.getElementById("origin-marker").style.display = 'block';
                        document.getElementById("destination-marker").style.display = 'block';
                        origin_marker.setMap(null);
                        destination_marker.setMap(null);
                        calcRoute(origcoord, desticoord);
                        origcoord = null;
                        desticoord = null;
                    }
                }

                $scope.restartON = function () {
                    init_marker.setMap(null);   
                    if(origin_marker != null)
                        origin_marker.setMap(null);
                    if(destination_marker != null)
                        destination_marker.setMap(null);
                    document.getElementById("marker-menu").style.display = 'none';
                    document.getElementById("origin-marker").style.display = 'block';
                    document.getElementById("destination-marker").style.display = 'block';
                    origcoord = null;
                    desticoord = null;
                }
            });
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

        $scope.audioPrueba = function() {
            $window.location.assign('audio.html');  
        };


        var audioElm = document.getElementById("audio1"); // Audio element
        var cont = 2;

       //  Alternates between play and pause based on the value of the paused property
        /*$scope.togglePlay = function() {
            
            /*if (cont%2 == 0) {
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
        //}

       


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
