'use strict';

/**
 * @ngdoc function
 * @name apisApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the apisApp
 */
angular.module('apisApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
