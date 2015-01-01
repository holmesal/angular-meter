angular.module "ah.meter", ['famous.angular']
  .directive "faMeter", ($famous, $timeout, $interval) ->
    templateUrl: 'templates/fa-meter.html'
    restrict: 'E'
    scope:
      value: '=?'
      min: '=?'
      max: '=?'
      label: '=?'
      options: '=?'
    link: (scope, element, attrs) ->
      # # default min is 0
      scope.min = 0 unless scope.min
      # # default max is 1
      scope.max = 1 unless scope.max

      # default options
      defaults = 
        # min: 0
        # max: 1
        # options:
        color: '#81BB84'
        fade: 0.21
        height: 6
        layout: 'top'
        duration: 500
        segmented: false
        segmentColor: '#FFFFFF'
      # scope.options = {} unless scope.options
      # scope.options.color =  unless scope.options.color
      # scope.options.fade = 0.21 unless scope.options.fade
      # scope.options.height = 4 unless scope.options.height
      # scope.options.layout = 'top' unless scope.options.layout
      # scope.options.duration = 500 unless scope.options.duration
      # scope.options.segmented = false unless scope.options.dividers
      # scope.options.segmentColor = '#FFFFFF' unless scope.options.segmentColor

      console.log 'user passed in', scope.options

      scope.options = angular.extend defaults, scope.options

      console.log 'object is now', scope.options

      if scope.value is undefined
        console.error '[fa-meter] you didn\'t pass in "value" so i\'ve got nothing to display.'

      # loading famou.us directives
      Transitionable = $famous['famous/transitions/Transitionable']

      # options to be broken out into a directive later
      # capacity = 16

      console.log 'ello ello'
      console.log scope
      console.log scope.options


      scope.dividers = [0...scope.max]

      scope.gridOptions =
        dimensions: [scope.dividers.length, 1]
        gutterSize: [0,0]

      scope.progress = new Transitionable 0
      scope.value = 0 unless scope.value

      # positions for top/bottom layouts
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

      scope.$watch 'value', (value) ->
        target = scope.value/scope.max
        target = 1 if target > 1
        target = 0 if target < 0
        scope.progress.set target,
          duration: scope.options.duration
          curve: 'easeInOut'

        $timeout scope.setLabel, scope.options.duration * 0.8

      scope.setLabel = ->
        if scope.label
          scope.label = scope.label
        else
          scope.label = scope.value
        # scope.label = "#{scope.value} #{scope.noun}"
        # scope.label += 's' if scope.value isnt 1

      scope.setLabel()
