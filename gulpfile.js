var gulp = require('gulp');
var tsc = require('gulp-tsc');
var tape = require('gulp-tape');
var tapSpec = require('tap-spec');

gulp.task("build:test", function (done) {
  gulp.src(['test/**/*.ts'])
    .pipe(tsc())
    .pipe(gulp.dest('build-test/'))
    .on('end', done);
});

gulp.task("test", ["build:test"], function (done) {
  gulp.src('build-test/test/*.test.js')
    .pipe(tape({
      reporter: tapSpec()
    }));
});
