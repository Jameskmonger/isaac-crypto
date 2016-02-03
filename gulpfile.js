var gulp = require('gulp');

gulp.task("build:test", function (done) {
  gulp.src(['test/**/*.ts'])
    .pipe(tsc())
    .pipe(gulp.dest('build-test/'))
    .on('end', done);
});
