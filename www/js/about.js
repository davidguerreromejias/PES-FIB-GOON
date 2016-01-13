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

app.controller('AboutController', function($scope, $http, $ionicLoading, $ionicPopup, $timeout, $ionicSideMenuDelegate, $window, $ionicPopover) {
    //console.log("hola");
    $scope.visible = 0;

    $ionicPopover.fromTemplateUrl('menu.html', {
        scope: $scope,
    }).then(function(popover) {
        $scope.popover = popover;
    });

    $scope.showMenu = function($event) {
        $scope.popover.show($event);
    }

    $scope.toggleLeft = function(){
        $ionicSideMenuDelegate.toggleLeft();
    };

    $scope.mapa = function(){
        $window.location.assign('map.html');  
    };

    $scope.informacio = function(){
        $window.location.assign('informacio.html');  
    };

    $scope.changeMode = function(){
		window.localStorage['blind'] = 'yes';
        $window.location.assign('blind.html');  
    };

    $scope.changeAbout = function(){
        $window.location.assign('about.html');  
    };
	
	$scope.logOut = function(){
		window.localStorage['email'] = '';
		window.localStorage['blind'] = '';
        $window.location.assign('index.html');  
    };

    $scope.autobus = function(){
        $window.location.assign('autobus.html');  
    };

    $scope.semafor = function(){
        $window.location.assign('semafor.html');  
    };        
});