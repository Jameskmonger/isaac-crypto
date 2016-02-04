var gulp = require('gulp');
var tsc = require('gulp-tsc');
var tape = require('gulp-tape');
var tapSpec = require('tap-spec');
var del = require('del');

gulp.task("test:clean", function(done) {
  del(['build-test/**']).then(function(paths) {
    console.log("=====\nDeleted the following files:\n" + paths.join('\n')+ "\n=====");
    done();
  });
});

gulp.task("test:build", function (done) {
  gulp.src(['test/**/*.ts'])
    .pipe(tsc())
    .pipe(gulp.dest('build-test/'))
    .on('end', done);
});

gulp.task("test:run", function (done) {
  gulp.src('build-test/test/**/*.test.js')
    .pipe(tape({
      reporter: tapSpec()
    }))
    .on('end', done);;
});

gulp.task("test", ["test:build"], function (done) {
  gulp.src('build-test/test/**/*.test.js')
    .pipe(tape({
      reporter: tapSpec()
    }));
});
