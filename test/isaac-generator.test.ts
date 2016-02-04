/// <reference path="../typings/tape/tape.d.ts"/>

import * as test from 'tape';
import { IsaacGenerator } from '../src/isaac-generator';

test("getValue calls _randomise if count is 0", (t) => {
  let generator = new IsaacGenerator();
  generator["_count"] = 0;

  let _randomiseCalled = false;
  generator["_randomise"] = () => {
    _randomiseCalled = true;
  }

  t.true(_randomiseCalled, "_randomise called");
  t.end();
});
