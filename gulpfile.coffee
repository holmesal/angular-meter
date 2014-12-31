gulp = require 'gulp'
gutil = require 'gulp-util'
coffee = require 'gulp-coffee'
sass = require 'gulp-sass'
jade = require 'gulp-jade'
minifyHtml = require 'gulp-minify-html'
prefix = require 'gulp-autoprefixer'
cssmin = require 'gulp-cssmin'
replace = require 'gulp-replace'
templateCache = require 'gulp-angular-templatecache'
concat = require 'gulp-concat'
debug = require 'gulp-debug'
merge = require 'gulp-merge'
uglify = require 'gulp-uglify'
rename = require 'gulp-rename'

gulp.task 'scripts', ->

  # coffee -> js
  js = gulp.src 'src/*.coffee'
  .pipe coffee
    bare: true
  .on 'error', gutil.log

  # jade -> html -> js
  html = gulp.src 'src/*.jade'
  .pipe jade()
  .pipe templateCache
    module: 'ah.meter'
    root: 'templates'

  # cross the streams
  merge js, html
  .pipe concat 'fa-meter.js'
  .pipe gulp.dest 'dist/'
  .pipe uglify()
  .pipe rename
    extname: '.min.js'
  .pipe gulp.dest 'dist/'


gulp.task 'styles', ->
  gulp.src 'src/*.sass'
  .pipe sass
    errLogToConsole: true
    sourceComments: 'normal'
  .pipe prefix '> 1%'
  .pipe cssmin()
  .pipe gulp.dest 'dist/'

gulp.task 'watch', ->
  gulp.watch 'src/*.sass', ['styles']
  gulp.watch 'src/*.{coffee,jade}', ['scripts']

gulp.task 'default', ['styles', 'scripts', 'watch']