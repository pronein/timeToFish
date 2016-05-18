var gulp = require('gulp'),
  cssmin = require('gulp-cssmin'),
  uglify = require('gulp-uglify'),
  concat = require('gulp-concat');

gulp.task('default', function() {

});

gulp.task('minify', function() {
  gulp.src([
      'public/bower_components/jquery/dist/jquery.js',
      'public/bower_components/angular/angular.js',
      'public/bower_components/angular-ui-router/release/angular-ui-router.js',
      'public/bower_components/bootstrap-sass/assets/javascripts/bootstrap.js',
      'public/bower_components/angular-environment/dist/angular-environment.js',
      'public/bower_components/moment/moment.js'
  ]).pipe(concat('vendor.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('public/javascripts/'));
});