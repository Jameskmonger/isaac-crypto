/// <reference path="typings/gulp/gulp.d.ts" />

import * as gulp from 'gulp';

class GulpEnvironment {
  constructor() {

  }

  public registerTasks(): void {
    gulp.task('bla', () => {
      console.log("bla bla bla");
    });
  }
}

(function() {
  var g = new GulpEnvironment();
  g.registerTasks();
})();
