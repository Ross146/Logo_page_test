var gulp = require('gulp'),
    stylus = require('gulp-stylus'),
    nib = require('nib'),    
    livereload = require('gulp-livereload'),
    connect = require('gulp-connect'),
    sourcemaps =require('gulp-sourcemaps'),
    fontFace = require('stylus-font-face'),
    minifyCss = require('gulp-minify-css'),
    rename = require("gulp-rename");

// server connect

gulp.task('connect', function() {
  connect.server({
    root: ['./app'],
    livereload: true,
    port: 8888
  });
});

// main.styl

gulp.task('stylus', function() {
  gulp.src('./stylus/*.styl')
  .pipe(rename({suffix: '.min', prefix : ''}))
  .pipe(sourcemaps.init())
  .pipe(stylus({
  	compress: false,
    sourcemaps: { inline: true },
  	use:[nib()]
  }))
  .pipe(minifyCss({compatibility: 'ie8'}))
  .pipe(sourcemaps.write())
  .pipe(gulp.dest('./app/css/'))
});

// reload

  gulp.task('reload', function () {
    gulp.src('./app/index.html')
    .pipe(connect.reload())
});


// watch
gulp.task('watch', function() {
  gulp.watch('./stylus/*.styl', ['stylus']);
  gulp.watch('./stylus/import/*.styl', ['stylus']);
  gulp.watch('./app/index.html', ['reload']);
  gulp.watch('./app/css/*.css', ['reload']);
})


gulp.task('default', ['connect','watch']);