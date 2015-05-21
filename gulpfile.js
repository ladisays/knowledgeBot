var browserify = require('browserify'),
    bower = require('gulp-bower'),
    concat = require('gulp-concat'),
    karma = require('gulp-karma'),
    gulp = require('gulp'),
    gutil = require('gulp-util'),
    shell = require('gulp-shell'),
    jade = require('gulp-jade'),
    jshint = require('gulp-jshint'),
    less = require('gulp-less'),
    minifyHtml = require('gulp-minify-html'),
    nodemon = require('gulp-nodemon'),
    path = require('path'),
    protractor = require('gulp-protractor').protractor,
    source = require('vinyl-source-stream'),
    stringify = require('stringify'),
    watchify = require('watchify'),
    mocha = require('gulp-mocha'),
    exit = require('gulp-exit');

var paths = {
  public: 'public/**',
  jade: 'app/**/*.jade',
  styles: [],
  scripts: 'app/**/*.js',
  staticFiles: [
    '!app/**/*.+(less|css|js|jade)',
     'app/**/*.*'
  ],
  clientTests: [],
  serverTests: ['test/server/**/*.js']
};

gulp.task('static-files',function(){
  return gulp.src(paths.staticFiles)
    .pipe(gulp.dest('public/'));
});

gulp.task('nodemon', function () {
  nodemon({ script: 'index.js', ext: 'js', ignore: ['public/**','app/**','node_modules/**'] })
    .on('restart', function () {
      console.log('>> node restart');
    });
});

gulp.task('test:server', ['test:client'], function() {
  return gulp.src(paths.serverTests)
  .pipe(mocha({
    reporter: 'spec',
    timeout: 50000
  }))
  .pipe(exit());
});

gulp.task('production', ['nodemon']);
gulp.task('default', ['nodemon']);
