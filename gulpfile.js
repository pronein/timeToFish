var gulp = require('gulp'),
  cssmin = require('gulp-cssmin'),
  uglify = require('gulp-uglify'),
  concat = require('gulp-concat');

var bowerPath = 'public/bower_components/',
  jsPath = 'public/javascripts/',
  fontsPath = 'public/fonts/',
  stylesPath = 'public/stylesheets/';

gulp.task('default',[
  'gen-vendor-js',
  'gen-vendor-styles',
  'gen-site-js'
]);

gulp.task('gen-vendor-js', function () {
  gulp.src([
    bowerPath + 'jquery/dist/jquery.js',
    bowerPath + 'angular/angular.js',
    bowerPath + 'angular-ui-router/release/angular-ui-router.js',
    bowerPath + 'bootstrap/dist/js/bootstrap.js',
    bowerPath + 'angular-environment/dist/angular-environment.js',
    bowerPath + 'moment/moment.js',
    bowerPath + 'angular-css/angular-css.js'
  ]).pipe(concat('vendor.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(jsPath));
});

gulp.task('gen-vendor-styles', function() {
  // fonts
  gulp.src([
    bowerPath + 'bootstrap/dist/fonts/*',
    bowerPath + 'font-awesome/fonts/*'
  ]).pipe(gulp.dest(fontsPath));

  // css
  gulp.src([
    bowerPath + 'bootstrap/dist/css/bootstrap.css',
    bowerPath + 'font-awesome/css/font-awesome.css'
  ]).pipe(concat('vendor.min.css'))
    .pipe(cssmin())
    .pipe(gulp.dest(stylesPath));
});

gulp.task('gen-site-js', function () {
  gulp.src([
    jsPath + 'auxiliary/helpers.js'
  ]).pipe(concat('site.helpers.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(jsPath));

  gulp.src([
    /* Add site javascript files here */
  ]).pipe(concat('site.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(jsPath));
});