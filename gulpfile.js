var gulp = require('gulp'),
  cssmin = require('gulp-cssmin'),
  uglify = require('gulp-uglify'),
  concat = require('gulp-concat');

gulp.task('default',['minify', 'make-debug-site']);

gulp.task('minify', function () {
  gulp.src([
    'public/bower_components/jquery/dist/jquery.js',
    'public/bower_components/angular/angular.js',
    'public/bower_components/angular-ui-router/release/angular-ui-router.js',
    'public/bower_components/bootstrap-sass/assets/javascripts/bootstrap.js',
    'public/bower_components/angular-environment/dist/angular-environment.js',
    'public/bower_components/moment/moment.js',
    'public/bower_components/angular-css/angular-css.js'
  ]).pipe(concat('vendor.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('public/javascripts/'));
});

gulp.task('make-debug-site', function() {
  gulp.src([
    'public/javascripts/**/*.module.js',
    'public/javascripts/**/*.config.js',
    'public/javascripts/**/*.service.js',
    'public/javascripts/**/*.controller.js',
    'public/javascripts/**/*.directive.js',
    'public/javascripts/**/*.provider.js'
  ]).pipe(concat('site.angular.js'))
    .pipe(gulp.dest('public/javascripts/'));
});