var app = angular.module('faMeterExample', ['famous.angular', 'ah.meter']);

app.controller('ExampleCtrl', ['$scope', '$interval', function($scope, $interval) {

  $scope.options = {
    duration: 200,
    segmented: true,
    segmentColor: 'red'
  }

  $scope.penguins = 0;
  $scope.peakPenguin = 20;

  $scope.$watch('penguins', function(penguins){
    $scope.label = penguins + ' penguins';
  }, true);

  $interval(function(){
    $scope.penguins += 1;
    if($scope.penguins > $scope.peakPenguin) {
      $scope.penguins = 0;
    }
  }, 2000)
}]);