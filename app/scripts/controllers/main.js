'use strict';

/**
 * @ngdoc function
 * @name apisApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the apisApp
 */
angular.module('apisApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
