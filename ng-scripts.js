var gulp       = require('gulp');
var concat     = require('gulp-concat');
var notify     = require('gulp-notify');
var ngAnnotate = require('gulp-ng-annotate');

var elixir     = require('laravel-elixir');
var parsePath  = require('parse-filepath');
var _          = require('underscore');

var success = notify({
  title: 'Laravel Elixir',
  subtitle: 'Angular Compiled!',
  icon: __dirname + '/../laravel-elixir/icons/laravel.png',
  message: ' '
});

function parseSource(source, baseDir) {
  if (_.isString(source)) {
    source = baseDir + source;
    // get scripts array from json
    if (parsePath(source).extname == '.json') {
      source = require('./' + source);
    }
  }

  if (_.isArray(source)) {
    source = source.map(function(path, i) {
      return baseDir + path;
    });
  }

  return source;
}

elixir.extend('ngScripts', function(source, output, options) {

  var config = this;

  options = _.extend({
    baseDir: this.assetsDir + 'js/',
    ngAnnotate: { single_quotes: true }
  }, options);

  source = parseSource(source, options.baseDir);
  output = output || this.jsOutput + '/app.js';
  output = parsePath(output);

  gulp.task('ng-scripts', function() {
    gulp.src(source)
      .pipe(concat(output.basename))
      .pipe(ngAnnotate(options.ngAnnotate))
      .pipe(gulp.dest(output.dirname))
      .pipe(success);
  });

  return this.queueTask('ng-scripts');

});
