/// <reference path="typings/gulp/gulp.d.ts" />
/// <reference path="typings/run-sequence/run-sequence.d.ts" />

import * as gulp from 'gulp';
import * as sequence from 'run-sequence';

const tape = require('gulp-tape');
const tsc = require('gulp-tsc');

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

    gulp.task('test', () => {
      sequence('build:test',
          'run:test');
    });
  }
}

(function() {
  var g = new GulpEnvironment();
  g.registerTasks();
})();
