/* jshint node: true */
'use strict';

var gulp = require('gulp');
var pug = require('gulp-pug');
var sass = require('gulp-sass');
var watch = require('gulp-watch');
var plumber = require('gulp-plumber');
var webserver = require('gulp-webserver');
var DIST_DIR = './dist';
var PUG_GLOB = './pug/*.pug';
var SASS_GLOB = './sass/*.sass';
var IMG_GLOB = './img/*';

gulp.task('pug', function() {
  gulp.src(PUG_GLOB)
    .pipe(pug())
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
  gulp.start('pug');
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
  watch(PUG_GLOB, function() {
    gulp.start('pug');
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
