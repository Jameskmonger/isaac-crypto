/// <reference path="typings/gulp/gulp.d.ts" />

import * as gulp from 'gulp';
const tape = require('gulp-tape');
const tsc = require('gulp-tsc');
const sequence = require('runSequence');

class GulpEnvironment {
  constructor() { }

  public registerTasks(): void {
    gulp.task('build:test', () => {
      gulp.src(['test/**/*.ts'])
        .pipe(tsc())
        .pipe(gulp.dest('build-test/'))
    });

    gulp.task('run:test', () => {
      gulp.src('build-test/test/*.test.js')
        .pipe(tape());
    });
  }
}

(function() {
  var g = new GulpEnvironment();
  g.registerTasks();
})();
