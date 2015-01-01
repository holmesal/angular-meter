# fa-meter

annotated meters for famo.us + angular

### [demo](http://holmesal.github.io/fa-meter/)

## getting started

1. `bower install fa-meter`
2. In your html, make sure you're importing the following styles:
  * `bower_components/famous/dist/famous-global.css`
  * `bower_components/famous-angular/dist/famous-angular.css`
  * `bower_components/fa-meter/dist/fa-meter.css`
3. ... and the following scripts
  * `bower_components/famous/dist/famous-global.js`
  * `bower_components/famous-angular/dist/famous-angular.js`
  * `bower_components/fa-meter/dist/fa-meter.js`
4. Add `ah.meter` as a dependency to your module:
  * `var app = angular.module('yourAppName', ['ah.meter']);`

***note*** - even if you're using gulp or grunt to autopopulate index.html with your bower dependencies, **you still need to manually add famo.us**. This is because they have chosen not to have the `main` property in bower.json point to the famo.us global build, which will break your autopopulator. Hi ho. Place your comments on [famo.us issue #396](https://github.com/Famous/famous/issues/396)

## usage

You must provide values for the `max` and `value` attributes:

``` html
<fa-meter value="penguins" max="20" options="options"></fa-meter>
```

You can pass additional options via the `options` attribute:

``` javascript
  $scope.options = {
    segmented: true,
    segmentColor: '#202020'
  }
```

## api

The following attributes are available:

- `value` **required** - the current value
- `max` **required** - the maximum value, corresponding to the right side of the bar
- `min` - the minimum value, corresponding to the left side of the bar. Defaults to `0`
- `text` - an optional string. If provided, this will be displayed instead of `value`. This is useful if you want to display "no penguins", "one penguin", "2 penguins", etc. Note that you still need to provide `value`
- `options` - an optional object with any of the following properties
  - `color` - the color of the bar. Defaults to `#81BB84`.
  - `height` - the height of the bar, in pixels. Defaults to `6`.
  - `duration` - the length of the animation from one value to another, in milliseconds. Defaults to `500`.
  - `label` - whether to show the label above/below the bar. Defaults to `false`
  - `labelPosition` - `top` floats the label above the bar, `bottom` floats it underneath. Try stacking bars with opposite layouts for fun and profit. Defaults to `top`.
  - `fade` - how much to fade the background by. Defaults to `0.21`.
  - `segmented` - whether to display the bar in segments. Defaults to `false`. *If true, you should set `segmentColor` as well.*
  - `segmentColor` - if `segmented=true`, small surfaces are used to mask out the bar. Set this to your page's background color for a nice effect. Defaults to `{{color}}`

## faq

### My segments don't line up properly! WTF!
You have to patch famo.us core, until [this issue]() is resolved. In the `_reflow` function of `GridLayout` in `bower_components/famous/dist/famous-global.js` (around line 16262), replace this:
``` javascript
var rowSize = Math.round(usableSize[1] / rows);
var colSize = Math.round(usableSize[0] / cols);
```
with this:
``` javascript
var rowSize = usableSize[1] / rows;
var colSize = usableSize[0] / cols;
```


## todo
* naked bar dynamic height problem
  * famous-angular wants a specific size on the container on app launch. this should really be more dynamic. famo.us will already respond to window size changes, so it might be possible to listen for `fa-app` size changes in famous-angular and get famo.us to reflow.
* investigate masking for seperators
  * placing divs over the progress bar is a bad solution. Is it possible to use the gridlayout to mask out portions of the underlying progress bars?