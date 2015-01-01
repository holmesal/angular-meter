angular.module("ah.meter", ['famous.angular']).directive("faMeter", function($famous, $timeline, $timeout, $interval) {
  return {
    templateUrl: 'templates/fa-meter.html',
    restrict: 'E',
    scope: {
      value: '=',
      max: '=',
      min: '=?',
      text: '=?',
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
        layout: 'none',
        label: false,
        labelPosition: 'top',
        duration: 500,
        segmented: false,
        segmentColor: '#FFFFFF'
      };
      scope.options = angular.extend(defaults, scope.options);
      if (scope.value === void 0) {
        console.error('[fa-meter] you didn\'t pass in "value" so i\'ve got nothing to display.');
      }
      Transitionable = $famous['famous/transitions/Transitionable'];
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
      scope.labelFade = new Transitionable(0);
      scope.$watch('options.label', function(label) {
        if (label) {
          return scope.labelFade.set(1, {
            duration: 300
          });
        } else {
          return scope.labelFade.set(0, {
            duration: 300
          });
        }
      });
      scope.timeline = {
        indicator: {
          rotate: $timeline([[0, Math.PI], [1, 0]]),
          opacity: $timeline([[0.25, 0], [1, 1]]),
          translate: $timeline([[0, [0, 5, 0]], [1, [0, 0, 0]]])
        },
        label: {
          rotate: $timeline([[0, Math.PI / 4], [1, 0]]),
          opacity: $timeline([[0.35, 0], [1, 1]]),
          translate: $timeline([[0, [0, 10, 0]], [1, [0, 0, 0]]])
        }
      };
      scope.layouts = {
        indicator: {
          translate: {
            top: [0, -18, 0],
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
        },
        guide: {
          top: 1,
          bottom: 0
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
        scope.progress.halt();
        scope.progress.set(target, {
          duration: scope.options.duration,
          curve: 'easeOut'
        });
        return $timeout(scope.setLabel, scope.options.duration * 0.8);
      });
      scope.setLabel = function() {
        if (scope.text) {
          return scope.labelText = scope.text;
        } else {
          return scope.labelText = scope.value;
        }
      };
      return scope.setLabel();
    }
  };
});

angular.module("ah.meter").run(["$templateCache", function($templateCache) {$templateCache.put("templates/fa-meter.html","<fa-app zfa-perspective=\"70\" class=\"wrapper\"><fa-modifier fa-opacity=\"options.fade\" fa-size=\"[undefined,{{options.height}}]\" fa-origin=\"[0,{{layouts.guide[options.labelPosition]}}]\" fa-align=\"[0,{{layouts.guide[options.labelPosition]}}]\"><fa-surface fa-background-color=\"options.color\" class=\"faded\"></fa-surface></fa-modifier><fa-modifier ng-if=\"options.segmented\" fa-origin=\"[0,{{layouts.guide[options.labelPosition]}}]\" fa-align=\"[0,{{layouts.guide[options.labelPosition]}}]\" fa-size=\"[undefined, {{options.height}}]\"><fa-grid-layout fa-options=\"gridOptions\"><fa-modifier ng-repeat=\"divider in dividers\" fa-size=\"[2,{{options.height}}]\" fa-origin=\"[1,0]\" fa-align=\"[1,0]\"><fa-surface fa-background-color=\"options.segmentColor\" ng-if=\"$index != dividers.length - 1\" class=\"seperator\"></fa-surface></fa-modifier></fa-grid-layout></fa-modifier><fa-modifier fa-proportions=\"[progress.get(),1]\" fa-size=\"[undefined,{{options.height}}]\" fa-origin=\"[0,{{layouts.guide[options.labelPosition]}}]\" fa-align=\"[0,{{layouts.guide[options.labelPosition]}}]\"><fa-surface fa-background-color=\"options.color\" class=\"fill\"></fa-surface></fa-modifier><fa-modifier fa-origin=\"[0.5,1]\" fa-align=\"[progress.get(),{{layouts.guide[options.labelPosition]}}]\" fa-translate=\"layouts.indicator.translate[options.labelPosition]\" fa-size=\"[true,true]\"><fa-modifier fa-translate=\"timeline.indicator.translate(labelFade.get())\" fa-origin=\"[0.5,0.5]\"><fa-modifier fa-origin=\"[0.5,0.5]\" fa-align=\"[0.5,0.5]\" fa-rotate-z=\"layouts.indicator.rotate[options.labelPosition]\" fa-opacity=\"timeline.indicator.opacity(labelFade.get())\" fa-perspective=\"70\"><fa-modifier fa-origin=\"[0.5,0.5]\" fa-rotate-x=\"timeline.indicator.rotate(labelFade.get())\"><fa-surface fa-size=\"[true,true]\"><div ng-style=\"{borderTopColor: options.color}\" class=\"meter-arrow\"></div></fa-surface></fa-modifier></fa-modifier></fa-modifier></fa-modifier><fa-modifier fa-origin=\"[0.8 * progress.get() + 0.15,1]\" fa-align=\"[progress.get(),{{layouts.guide[options.labelPosition]}}]\" fa-translate=\"layouts.value.translate[options.labelPosition]\"><fa-surface fa-size=\"[true,10]\" class=\"value\">{{text || value}}</fa-surface></fa-modifier></fa-app>");}]);