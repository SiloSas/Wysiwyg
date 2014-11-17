'use strict';

/**
 * @ngdoc overview
 * @name apisApp
 * @description
 * # apisApp
 *
 * Main module of the application.
 */
var app = angular
  .module('apisApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/CreateEvent', {
        templateUrl: 'views/CreateEvent.html',
        controller: 'CreateEventCtrl'
      })
      .when('/CreateArtiste', {
          templateUrl: 'views/CreateArtiste.html',
          controller: 'CreateArtisteCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
