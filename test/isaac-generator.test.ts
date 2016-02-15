/// <reference path="../typings/tape/tape.d.ts"/>

import * as test from 'tape';
import { IsaacGenerator } from '../src/isaac-generator';
import { Utils } from './_utils';

test("getValue calls _randomise if count is 0", (t) => {
  t.plan(1);
  let generator = new IsaacGenerator(Utils.createUniformSeed(0));

  generator["_randomise"] = () => {
    t.pass("_randomise called");
  }

  generator["_count"] = 0;
  generator.getValue();
});

test("getValue calls _randomise if count is -1", (t) => {
  t.plan(1);
  let generator = new IsaacGenerator(Utils.createUniformSeed(0));

  generator["_randomise"] = () => {
    t.pass("_randomise called");
  }

  generator["_count"] = -1;
  generator.getValue();
});

test("getValue does not call _randomise if count is 1", (t) => {
  let generator = new IsaacGenerator(Utils.createUniformSeed(0));
  let _randomiseCalled = false;
  generator["_randomise"] = () => {
    _randomiseCalled = true;
  }

  generator["_count"] = 1;
  generator.getValue();

  t.false(_randomiseCalled, "_randomise not called");
  t.end();
});
