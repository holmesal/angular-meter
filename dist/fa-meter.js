angular.module("ah.meter", ['famous.angular']).directive("faMeter", function($famous, $timeout, $interval) {
  return {
    templateUrl: 'templates/fa-meter.html',
    restrict: 'E',
    scope: {
      value: '=?',
      min: '=?',
      max: '=?',
      label: '=?',
      options: '=?'
    },
    link: function(scope, element, attrs) {
      var Transitionable, defaults, _i, _ref, _results;
      if (!scope.min) {
        scope.min = 0;
      }
      if (!scope.max) {
        scope.max = 1;
      }
      defaults = {
        color: '#81BB84',
        fade: 0.21,
        height: 6,
        layout: 'top',
        duration: 500,
        segmented: false,
        segmentColor: '#FFFFFF'
      };
      console.log('user passed in', scope.options);
      scope.options = angular.extend(defaults, scope.options);
      console.log('object is now', scope.options);
      if (scope.value === void 0) {
        console.error('[fa-meter] you didn\'t pass in "value" so i\'ve got nothing to display.');
      }
      Transitionable = $famous['famous/transitions/Transitionable'];
      console.log('ello ello');
      console.log(scope);
      console.log(scope.options);
      scope.dividers = (function() {
        _results = [];
        for (var _i = 0, _ref = scope.max; 0 <= _ref ? _i < _ref : _i > _ref; 0 <= _ref ? _i++ : _i--){ _results.push(_i); }
        return _results;
      }).apply(this);
      scope.gridOptions = {
        dimensions: [scope.dividers.length, 1],
        gutterSize: [0, 0]
      };
      scope.progress = new Transitionable(0);
      if (!scope.value) {
        scope.value = 0;
      }
      scope.layouts = {
        indicator: {
          translate: {
            top: [0, -17, 0],
            bottom: [0, 17, 0]
          },
          rotate: {
            top: 0,
            bottom: Math.PI
          }
        },
        value: {
          translate: {
            top: [0, -36, 0],
            bottom: [0, 36, 0]
          }
        }
      };
      scope.$watch('value', function(value) {
        var target;
        target = scope.value / scope.max;
        if (target > 1) {
          target = 1;
        }
        if (target < 0) {
          target = 0;
        }
        scope.progress.set(target, {
          duration: scope.options.duration,
          curve: 'easeInOut'
        });
        return $timeout(scope.setLabel, scope.options.duration * 0.8);
      });
      scope.setLabel = function() {
        if (scope.label) {
          return scope.label = scope.label;
        } else {
          return scope.label = scope.value;
        }
      };
      return scope.setLabel();
    }
  };
});

angular.module("ah.meter").run(["$templateCache", function($templateCache) {$templateCache.put("templates/fa-meter.html","<fa-app style=\"height: 200px;\" ng-style=\"{height: options.height+20+\'px\'}\" class=\"wrapper\"><fa-surface fa-size=\"[undefined,undefined]\" fa-background-color=\"\'green\'\"></fa-surface><fa-modifier fa-origin=\"[1,0.5]\" fa-align=\"[1,0.5]\"><fa-surface fa-background-color=\"\'red\'\" fa-size=\"[10,10]\"></fa-surface></fa-modifier><fa-modifier fa-origin=\"[0.5,1]\" fa-align=\"[0.5,1]\" fa-size=\"[undefined,undefined]\"><fa-modifier fa-opacity=\"options.fade\" fa-size=\"[undefined,{{options.height}}]\" fa-translate=\"[0,0,1]\"><fa-surface fa-background-color=\"options.color\"></fa-surface></fa-modifier><fa-grid-layout fa-options=\"gridOptions\" ng-if=\"options.segmented\"><fa-modifier ng-repeat=\"divider in dividers\" fa-translate=\"[1,0,2]\" fa-size=\"[2,{{options.height}}]\" fa-origin=\"[1,0]\" fa-align=\"[1,0]\"><fa-surface fa-background-color=\"\'#202020\'\" ng-if=\"$index != dividers.length - 1\"></fa-surface></fa-modifier></fa-grid-layout><fa-modifier fa-proportions=\"[progress.get(),1]\" fa-size=\"[undefined,{{options.height}}]\" fa-translate=\"[0,0,3]\"><fa-surface fa-background-color=\"options.color\"></fa-surface></fa-modifier><fa-modifier fa-origin=\"[0.5,0.5]\" fa-align=\"[progress.get(),0.5]\" fa-translate=\"layouts.indicator.translate[options.layout]\" fa-size=\"[true,true]\"><fa-modifier fa-origin=\"[0.5,0.5]\" fa-align=\"[0.5,0.5]\" fa-rotate-z=\"layouts.indicator.rotate[options.layout]\"><fa-surface fa-size=\"[true,true]\"><div ng-style=\"{borderTopColor: options.color}\" class=\"meter-arrow\"></div></fa-surface></fa-modifier></fa-modifier><fa-modifier fa-origin=\"[0.5,1]\" fa-align=\"[progress.get(),1]\" fa-translate=\"layouts.value.translate[options.layout]\"><fa-surface fa-size=\"[true,10]\" fa-origin=\"[0.5,0.5]\" fa-align=\"[0.5,0.5]\" class=\"value\">{{label || value}}</fa-surface></fa-modifier></fa-modifier></fa-app>");}]);