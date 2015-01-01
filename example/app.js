var app = angular.module('faMeterExample', ['ah.meter']);

app.controller('ExampleCtrl', ['$scope', '$interval', '$timeout', '$window',  function($scope, $interval, $timeout, $window) {

  $scope.options = {
    top: {
      duration: 500,
      segmented: true,
      labelPosition: 'top',
      segmentColor: '#202020'
    },
    bottom: {
      duration: 300,
      segmented: false,
      segmentColor: '#202020',
      labelPosition: 'bottom',
      color: '#7389C3'
    }
  }

  $scope.penguins = {
    top: 0,
    bottom: 0
  }

  var slots = Math.round($window.innerWidth/100)
  $scope.peakPenguin = {
    top: slots,
    bottom: slots * 2
  }


  $scope.$watch('penguins', function(penguins){
    $scope.label = {
      top: penguins.top + ' samples',
      bottom: penguins.bottom + ' synths'
    }
  }, true);

  var increment = function(bar){
    // console.log($scope.penguins)
    // console.log('incrementing ' + bar + ' to ' + $scope.penguins[bar] + 1)
    $scope.penguins[bar] = $scope.penguins[bar] + 1;
    if($scope.penguins[bar] > $scope.peakPenguin[bar]) {
      $scope.penguins[bar] = 0;
    }
    if($scope.penguins[bar] > 0.3 * $scope.max){
      $scope.options[bar].label = true
    }
    // console.log($scope.penguins)
  };

  $timeout(function(){
    $scope.penguins = {top: 3, bottom: 5};
    // increment('top')
    // increment('bottom')
    $interval(function(){
      increment('bottom');
    }, 1000);
  }, 500);

  $timeout(function(){
    $interval(function(){
      increment('top');
    }, 2000);
  }, 1500);

  $timeout(function(){
    $scope.options.top.label = true;
    $scope.options.bottom.label = true;
  }, 670)

}]);