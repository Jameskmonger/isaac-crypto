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

  generator.getValue();

  t.true(_randomiseCalled, "_randomise called");
  t.end();
});

test("getValue calls _randomise if count is -1", (t) => {
  let generator = new IsaacGenerator();
  generator["_count"] = -1;

  let _randomiseCalled = false;
  generator["_randomise"] = () => {
    _randomiseCalled = true;
  }

  generator.getValue();

  t.true(_randomiseCalled, "_randomise called");
  t.end();
});

test("getValue does not call _randomise if count is 1", (t) => {
  let generator = new IsaacGenerator();
  generator["_count"] = 1;

  let _randomiseCalled = false;
  generator["_randomise"] = () => {
    _randomiseCalled = true;
  }

  generator.getValue();

  t.false(_randomiseCalled, "_randomise not called");
  t.end();
});
