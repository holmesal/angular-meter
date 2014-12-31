angular.module "ah.meter", ['famous.angular']
  .directive "faMeter", ($famous, $timeout, $interval) ->
    templateUrl: 'templates/fa-meter.html'
    restrict: 'E'
    scope:
      value: '='
      min: '=?'
      max: '=?'
      string: '=?'
      options: '=?'
    compile: (element, attrs) ->
      # console.log 'compile attrs', attrs

      

      # console.log 'compile phase'
      # console.log attrs

      # REQUIRED
      # value
      # max
      # 
      # OPTIONAL
      # color (something)
      # fade (0.3)
      # layout (top || bottom)

      # return the link function
      link = (scope, element, attrs) ->
        # default min is 0
        scope.min = 0 unless scope.min
        # default max is 1
        scope.max = 1 unless scope.max

        # default options
        scope.options = {} unless scope.options
        scope.options.color = '#81BB84' unless scope.options.color
        scope.options.fade = 0.21 unless scope.options.fade
        scope.options.height = 4 unless scope.options.height
        scope.options.layout = 'top' unless scope.options.layout
        scope.options.duration = 500 unless scope.options.duration

        # loading famou.us directives
        Transitionable = $famous['famous/transitions/Transitionable']

        # options to be broken out into a directive later
        # capacity = 16
        duration = 500

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
              top: [0,-17,0]
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
          scope.progress.set target,
            duration: duration
            curve: 'easeInOut'

          $timeout scope.setLabel, duration * 0.8

        scope.setLabel = ->
          if scope.string
            scope.label = scope.string
          else
            scope.label = scope.value
          # scope.label = "#{scope.value} #{scope.noun}"
          # scope.label += 's' if scope.value isnt 1

        scope.setLabel()
