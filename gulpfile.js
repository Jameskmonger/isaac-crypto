var gulp = require('gulp'),
    tsc = require('gulp-tsc'),
    tape = require('gulp-tape'),
    tapSpec = require('tap-spec'),
    del = require('del'),
    runSequence = require('run-sequence'),
    istanbul = require('gulp-istanbul');

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
    .on('end', done);
});

gulp.task("test", function (done) {
  runSequence('test:clean', 'test:build', 'test:run', done);
});
