var gulp = require('gulp');
var tsc = require('gulp-tsc');

gulp.task("build:test", function (done) {
  gulp.src(['test/**/*.ts'])
    .pipe(tsc())
    .pipe(gulp.dest('build-test/'))
    .on('end', done);
});
