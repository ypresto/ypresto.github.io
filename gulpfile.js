/* jshint node: true */
'use strict';

var gulp = require('gulp');
var haml = require('gulp-haml');
var sass = require('gulp-sass');
var watch = require('gulp-watch');
var plumber = require('gulp-plumber');
var webserver = require('gulp-webserver');
var DIST_DIR = './dist';
var HAML_GLOB = './haml/*.haml';
var SASS_GLOB = './sass/*.sass';
var IMG_GLOB = './img/*';

gulp.task('haml', function() {
  gulp.src(HAML_GLOB)
    .pipe(plumber())
    .pipe(haml())
    .pipe(gulp.dest(DIST_DIR));
});

gulp.task('sass', function() {
  gulp.src(SASS_GLOB)
    .pipe(plumber())
    .pipe(sass({ indentedSyntax: true }))
    .pipe(gulp.dest(DIST_DIR + '/css'));
});

gulp.task('img', function() {
  gulp.src(IMG_GLOB)
    .pipe(plumber())
    .pipe(gulp.dest(DIST_DIR + '/img'));
});

gulp.task('build', function() {
  gulp.start('img');
  gulp.start('sass');
  gulp.start('haml');
});

gulp.task('webserver', function() {
  gulp.src(DIST_DIR)
    .pipe(webserver({
      livereload: true,
      port: 8123,
      open: true,
      fallback: 'index.html'
    }));
});

gulp.task('watch', function() {
  watch(HAML_GLOB, function() {
    gulp.start('haml');
  });
  watch(SASS_GLOB, function() {
    gulp.start('sass');
  });
  watch(IMG_GLOB, function() {
    gulp.start('img');
  });
});

gulp.task('develop', function() {
  gulp.start('build');
  gulp.start('watch');
  gulp.start('webserver');
});
