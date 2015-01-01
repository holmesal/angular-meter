angular.module "ah.meter", ['famous.angular']
  .directive "faMeter", ($famous, $timeline, $timeout, $interval) ->
    templateUrl: 'templates/fa-meter.html'
    restrict: 'E'
    scope:
      value: '='
      max: '='
      min: '=?'
      text: '=?'
      options: '=?'
    link: (scope, element, attrs) ->
      # # default min is 0
      scope.min = 0 unless scope.min
      # # default max is 1
      scope.max = 1 unless scope.max

      # default options
      defaults = 
        color: '#81BB84'
        fade: 0.21
        height: 6
        layout: 'none'
        label: false
        labelPosition: 'top'
        duration: 500
        segmented: false
        segmentColor: '#FFFFFF'

      scope.options = angular.extend defaults, scope.options

      if scope.value is undefined
        console.error '[fa-meter] you didn\'t pass in "value" so i\'ve got nothing to display.'

      # loading famou.us directives
      Transitionable = $famous['famous/transitions/Transitionable']


      scope.dividers = [0...scope.max]

      scope.gridOptions =
        dimensions: [scope.dividers.length, 1]
        gutterSize: [0,0]

      scope.progress = new Transitionable 0
      scope.value = 0 unless scope.value


      # fade the labels in or out when options.label changes
      scope.labelFade = new Transitionable 0
      scope.$watch 'options.label', (label) ->
        if label
          scope.labelFade.set 1,
            duration: 300
        else
          scope.labelFade.set 0,
            duration: 300
      # fade in the labels
      scope.timeline = 
        indicator:
          rotate: $timeline [
            [0, Math.PI]
            [1, 0]
          ]
          opacity: $timeline [
            [0.25, 0]
            [1, 1]
          ]
          translate: $timeline [
            [0, [0,5,0]]
            [1, [0,0,0]]
          ]
        label:
          rotate: $timeline [
            [0, Math.PI/4]
            [1, 0]
          ]
          opacity: $timeline [
            [0.35, 0]
            [1, 1]
          ]
          translate: $timeline [
            [0, [0,10,0]]
            [1, [0,0,0]]
          ]
      # positions for top/bottom labels
      scope.layouts =
        indicator:
          translate:
            top: [0,-18,0]
            bottom: [0,17,0]
          rotate:
            top: 0
            bottom: Math.PI
        value:
          translate:
            top: [0,-36,0]
            bottom: [0,36,0]
        guide:
          top: 1
          bottom: 0


      # change position when value changes
      scope.$watch 'value', (value) ->
        target = scope.value/scope.max
        target = 1 if target > 1
        target = 0 if target < 0
        scope.progress.halt()
        scope.progress.set target,
          duration: scope.options.duration
          curve: 'easeOut'
        # set the label when we're 80% of the way there
        $timeout scope.setLabel, scope.options.duration * 0.8

      scope.setLabel = ->
        if scope.text
          scope.labelText = scope.text
        else
          scope.labelText = scope.value
        # scope.label = "#{scope.value} #{scope.noun}"
        # scope.label += 's' if scope.value isnt 1

      scope.setLabel()
